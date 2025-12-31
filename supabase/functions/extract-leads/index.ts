/**
 * Supabase Edge Function: extract-leads
 *
 * Processes unextracted leads from the database using Claude API with tool use.
 * Designed to be triggered by pg_cron on a schedule (e.g., daily at 2 AM).
 *
 * Environment Variables Required:
 * - ANTHROPIC_API_KEY: Claude API key
 * - SUPABASE_URL: Auto-provided by Supabase
 * - SUPABASE_SERVICE_ROLE_KEY: Auto-provided by Supabase
 */

import Anthropic from "npm:@anthropic-ai/sdk@0.39.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.1";

// ============================================================================
// TYPES
// ============================================================================

interface Lead {
  id: string;
  text: string | null;
  symptoms: string | null;
  source: string;
}

interface ExtractionResult {
  category?: string | null;
  year?: number | null;
  make?: string | null;
  model?: string | null;
  part_type?: string | null;
  part_number?: string | null;
  symptoms?: string | null;
  customer_type: string;
  quantity?: number;
  we_offer_this?: boolean | null;
  confidence: string;
  needs_review?: boolean;
  review_reason?: string | null;
  enrichment_used?: boolean;
  enrichment_notes?: string | null;
}

interface ProcessingResult {
  id: string;
  success: boolean;
  confidence?: string;
  make?: string | null;
  model?: string | null;
  error?: string;
}

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const SYSTEM_PROMPT = `You are a lead data extraction system for Circuit Board Medics, an electronics repair company. Your job is to extract structured information from unstructured customer submissions about circuit boards and electronic modules they need repaired.

## Database Schema

Your output must conform to the leads table schema:
- category: 'automotive' | 'appliance' | 'industrial' | 'marine'
- year: integer (1900-2100)
- make: text (use canonical names)
- model: text
- part_type: text (use standard abbreviations: PCM, ECM, TCM, BCM, etc.)
- part_number: text (uppercase, normalized)
- symptoms: text
- customer_type: 'individual' | 'shop' | 'dealer' | 'fleet'
- quantity: integer (default 1)
- we_offer_this: boolean or null
- confidence: 'high' | 'medium' | 'low'

## Your Task

Given a customer's board description and symptoms, extract structured data. You MUST:

1. Use ONLY canonical values from the provided lists for makes and categories
2. Normalize all values consistently (see normalization rules)
3. Map confidence to the enum: high, medium, or low
4. Use web_search ONLY when a part number is present but you cannot determine make/model/part_type
5. Call submit_lead EXACTLY ONCE with your final extraction

## Canonical Make Names (use EXACTLY as written)

### Automotive
Acura, Alfa Romeo, Aston Martin, Audi, Bentley, BMW, Buick, Cadillac, Chevrolet, Chrysler, Dodge, Ferrari, Fiat, Ford, Genesis, GMC, Honda, Hyundai, Infiniti, Jaguar, Jeep, Kia, Lamborghini, Land Rover, Lexus, Lincoln, Lotus, Maserati, Mazda, McLaren, Mercedes-Benz, Mini, Mitsubishi, Nissan, Porsche, Ram, Rolls-Royce, Subaru, Tesla, Toyota, Volkswagen, Volvo

### Heavy Equipment / Industrial
Bobcat, Case, Caterpillar, Deere, Doosan, Hitachi, JCB, Komatsu, Kubota, New Holland, Takeuchi, Volvo CE, Yanmar

### Commercial Trucks
Freightliner, International, Kenworth, Mack, Peterbilt, Volvo Trucks, Western Star

### Appliances
Bosch, Electrolux, Frigidaire, GE Appliances, KitchenAid, LG, Maytag, Samsung, Sub-Zero, Thermador, Whirlpool, Wolf

### HVAC (category: industrial)
Bryant, Carrier, Daikin, Goodman, Lennox, Rheem, Ruud, Trane, York

## Normalization Rules

ALWAYS apply these normalizations:
- "Mercedes", "MB", "Benz", "MERCEDES BENZ" → "Mercedes-Benz"
- "Chevy", "CHEVROLET" → "Chevrolet"
- "VW", "Volkswagon" → "Volkswagen"
- "John Deere", "JD" → "Deere"
- "Cat", "CAT" → "Caterpillar"
- "Kitchen Aid", "Kitchen aide" → "KitchenAid"
- "GE", "General Electric" → "GE Appliances"
- "Navistar", "IH" → "International"
- "FoMoCo" → "Ford"
- Part numbers: uppercase, remove extra spaces, keep hyphens

## Category Assignment

- automotive: Cars, trucks, SUVs, motorcycles, ATVs
- appliance: Kitchen, laundry, refrigeration, dishwashers, ovens, microwaves
- industrial: Heavy equipment, tractors, forklifts, HVAC systems, generators, commercial equipment
- marine: Boats, jet skis, outboard motors, marine electronics

## Customer Type Inference

- individual: Personal email, residential address, single unit
- shop: Repair shop, automotive service, appliance repair business
- dealer: Dealership, franchise, OEM distributor
- fleet: Multiple units, company/commercial, property management

## Confidence Mapping

- high: Make, model, part_number clearly stated; unambiguous category
- medium: Most fields extractable; some inference required
- low: Significant guessing; missing critical fields; ambiguous input

## When to Use Web Search

Use the web_search tool ONLY when:
1. A part number is present but you cannot determine the make/model from context
2. You have low confidence on make/model and a part number to research

DO NOT use web search when:
1. The make/model/year is already clearly stated
2. No part number is available to search
3. The input is too vague to form a useful query

After gathering information, you MUST call submit_lead with your extraction.`;

// ============================================================================
// TOOL DEFINITIONS
// ============================================================================

const TOOLS: Anthropic.Tool[] = [
  {
    name: "web_search",
    description:
      "Search the web for part number information or vehicle fitment data. Use sparingly and only when part number is available but make/model cannot be determined from context.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description:
            "Search query. Include part number and terms like 'OEM', 'fitment', or 'what vehicle'.",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "submit_lead",
    description:
      "Submit the final extracted lead data. Call this exactly once after extraction is complete.",
    input_schema: {
      type: "object" as const,
      properties: {
        category: {
          type: ["string", "null"],
          enum: ["automotive", "appliance", "industrial", "marine", null],
        },
        year: {
          type: ["integer", "null"],
          minimum: 1900,
          maximum: 2100,
        },
        make: { type: ["string", "null"] },
        model: { type: ["string", "null"] },
        part_type: { type: ["string", "null"] },
        part_number: { type: ["string", "null"] },
        symptoms: { type: ["string", "null"] },
        customer_type: {
          type: "string",
          enum: ["individual", "shop", "dealer", "fleet"],
          default: "individual",
        },
        quantity: {
          type: "integer",
          minimum: 1,
          default: 1,
        },
        we_offer_this: { type: ["boolean", "null"] },
        confidence: {
          type: "string",
          enum: ["high", "medium", "low"],
        },
        needs_review: { type: "boolean" },
        review_reason: { type: ["string", "null"] },
        enrichment_used: { type: "boolean" },
        enrichment_notes: { type: ["string", "null"] },
      },
      required: ["confidence", "customer_type"],
    },
  },
];

// ============================================================================
// WEB SEARCH FUNCTION
// ============================================================================

async function performWebSearch(
  anthropic: Anthropic,
  query: string
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system:
        "You are a parts research assistant. Return relevant details about what vehicle/appliance a part number fits, the manufacturer, and what type of part it is. Be concise.",
      messages: [
        {
          role: "user",
          content: `Search for: ${query}\n\nReturn any information about this part number including manufacturer, vehicle/appliance fitment, and part type.`,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock && "text" in textBlock
      ? textBlock.text
      : "No results found";
  } catch (error) {
    return `Search failed: ${error}. Please infer from your knowledge.`;
  }
}

// ============================================================================
// MAIN EXTRACTION FUNCTION
// ============================================================================

async function extractLead(
  anthropic: Anthropic,
  boardInfo: string,
  symptoms: string | null,
  enableSearch: boolean = true,
  maxTurns: number = 5
): Promise<ExtractionResult> {
  let userContent = `Extract lead data from:\n\nBoard Info: ${boardInfo}`;
  if (symptoms) {
    userContent += `\n\nSymptoms: ${symptoms}`;
  }

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userContent },
  ];

  let enrichmentUsed = false;
  const enrichmentSources: string[] = [];

  for (let turn = 0; turn < maxTurns; turn++) {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: enableSearch ? TOOLS : [TOOLS[1]],
      messages,
    });

    if (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (block) => block.type === "tool_use"
      );

      for (const toolUse of toolUseBlocks) {
        if (toolUse.type !== "tool_use") continue;

        if (toolUse.name === "submit_lead") {
          // Extraction complete
          const result = toolUse.input as ExtractionResult;
          result.enrichment_used = enrichmentUsed;
          if (enrichmentSources.length > 0) {
            result.enrichment_notes = enrichmentSources.join("; ");
          }
          return result;
        }

        if (toolUse.name === "web_search" && enableSearch) {
          const query = (toolUse.input as { query: string }).query;
          console.log(`  [Searching: ${query}]`);

          const searchResult = await performWebSearch(anthropic, query);
          enrichmentUsed = true;
          enrichmentSources.push(`web_search: ${query}`);

          // Add assistant response and tool result
          messages.push({
            role: "assistant",
            content: response.content,
          });
          messages.push({
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: toolUse.id,
                content: searchResult,
              },
            ],
          });
        }
      }
    } else if (response.stop_reason === "end_turn") {
      // Fallback if no tool call
      return {
        confidence: "low",
        customer_type: "individual",
        needs_review: true,
        review_reason: "Extraction did not complete with tool call",
        enrichment_used: enrichmentUsed,
      };
    }
  }

  // Max turns exceeded
  return {
    confidence: "low",
    customer_type: "individual",
    needs_review: true,
    review_reason: `Extraction exceeded ${maxTurns} turns`,
    enrichment_used: enrichmentUsed,
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

Deno.serve(async (req: Request) => {
  try {
    // Parse request body
    const body = await req.json().catch(() => ({}));
    const targetDate = body.date || new Date().toISOString().split("T")[0];
    const limit = body.limit || 50;

    console.log(`Processing leads for date: ${targetDate}, limit: ${limit}`);

    // Initialize clients
    const anthropic = new Anthropic({
      apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Query unprocessed leads (where make is null = not yet extracted)
    const { data: leads, error: queryError } = await supabase
      .from("leads")
      .select("id, text, symptoms, source")
      .eq("date", targetDate)
      .is("make", null)
      .limit(limit);

    if (queryError) {
      throw new Error(`Query failed: ${queryError.message}`);
    }

    console.log(`Found ${leads?.length || 0} unprocessed leads`);

    const results: ProcessingResult[] = [];

    for (const lead of leads || []) {
      console.log(`\nProcessing: ${lead.id.substring(0, 8)}...`);

      try {
        const extracted = await extractLead(
          anthropic,
          lead.text || "",
          lead.symptoms,
          true // enable search
        );

        // Prepare update data (only database columns)
        const updateData: Record<string, unknown> = {
          category: extracted.category,
          year: extracted.year,
          make: extracted.make,
          model: extracted.model,
          part_type: extracted.part_type,
          part_number: extracted.part_number,
          symptoms: extracted.symptoms,
          customer_type: extracted.customer_type,
          quantity: extracted.quantity || 1,
          we_offer_this: extracted.we_offer_this,
          confidence: extracted.confidence,
        };

        // Remove undefined values
        Object.keys(updateData).forEach((key) => {
          if (updateData[key] === undefined) {
            delete updateData[key];
          }
        });

        // Update the lead in database
        const { error: updateError } = await supabase
          .from("leads")
          .update(updateData)
          .eq("id", lead.id);

        if (updateError) {
          throw new Error(`Update failed: ${updateError.message}`);
        }

        results.push({
          id: lead.id,
          success: true,
          confidence: extracted.confidence,
          make: extracted.make,
          model: extracted.model,
        });

        console.log(
          `  OK: ${extracted.make || "?"} ${extracted.model || "?"} - ${extracted.confidence}`
        );
      } catch (error) {
        results.push({
          id: lead.id,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
        console.error(`  FAIL: ${error}`);
      }
    }

    // Summary
    const successCount = results.filter((r) => r.success).length;
    console.log(
      `\nProcessed: ${results.length} | Success: ${successCount} | Failed: ${results.length - successCount}`
    );

    return new Response(
      JSON.stringify({
        date: targetDate,
        processed: results.length,
        success: successCount,
        failed: results.length - successCount,
        results,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
