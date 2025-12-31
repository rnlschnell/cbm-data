# Lead Data Extraction System

## Overview

This document describes the Claude API-based system for extracting structured lead data from unstructured customer submissions. The system uses no hardcoded patterns—all extraction, normalization, and enrichment is handled by Claude with optional web search for unknown part numbers.

**Output aligns directly with the `leads` table in `schema.sql`.**

## Design Principles

1. **No Hardcoding**: No regex patterns, lookup tables, or rule-based parsing
2. **Consistent Output**: Canonical naming enforced via prompt engineering and schema constraints
3. **Confidence-Aware**: Every extraction maps to `confidence_level` enum (high/medium/low)
4. **Enrichment on Demand**: Web search only when critical fields are missing or unverifiable
5. **Schema-Aligned**: Extraction output maps directly to database columns

---

## Database Schema Reference

From `schema.sql`:

```sql
-- Enum types
CREATE TYPE lead_category AS ENUM ('automotive', 'appliance', 'industrial', 'marine');
CREATE TYPE lead_source AS ENUM ('phone', 'form', 'chat', 'scrape', 'manual');
CREATE TYPE customer_type AS ENUM ('individual', 'shop', 'dealer', 'fleet');
CREATE TYPE confidence_level AS ENUM ('high', 'medium', 'low');

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source lead_source NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category lead_category,
    year INTEGER CHECK (year >= 1900 AND year <= 2100),
    make TEXT,
    model TEXT,
    part_type TEXT,
    part_number TEXT,
    text TEXT,                    -- Original unprocessed input
    symptoms TEXT,
    customer_type customer_type DEFAULT 'individual',
    quantity INTEGER DEFAULT 1,
    we_offer_this BOOLEAN,
    confidence confidence_level DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Pipeline Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         INPUT                                    │
│  board_info: "siemens vdo, a00344603410, 2005 sl500"            │
│  symptoms: "p0722 signal from y3/8n3 not avail..."              │
│  source: "form"                                                  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    EXTRACTION PROMPT                             │
│                                                                  │
│  System prompt with:                                             │
│  - Canonical value lists (makes, categories, part types)         │
│  - Database schema alignment                                     │
│  - Few-shot examples                                             │
│  - Instructions for when to use web search                       │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    CLAUDE API CALL                               │
│                                                                  │
│  Tools available:                                                │
│  - web_search: Research unknown part numbers                     │
│  - submit_lead: Return final structured data                     │
│                                                                  │
│  Claude extracts, normalizes, and optionally enriches            │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    STRUCTURED OUTPUT                             │
│                                                                  │
│  {                                                               │
│    "category": "automotive",                                     │
│    "year": 2005,                                                 │
│    "make": "Mercedes-Benz",                                      │
│    "model": "SL500",                                             │
│    "part_type": "TCM",                                           │
│    "part_number": "A0034460310",                                 │
│    "symptoms": "P0722 transmission signal fault",                │
│    "confidence": "high",                                         │
│    ...                                                           │
│  }                                                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## Canonical Value Lists

To ensure consistent output across all extractions, Claude is provided with canonical value lists. When extracting data, Claude MUST use values from these lists.

### Categories (lead_category enum)

```
automotive
appliance
industrial
marine
```

**Category Assignment Rules:**
| Input Clues | Category |
|-------------|----------|
| Cars, trucks, SUVs, motorcycles | `automotive` |
| Kitchen, laundry, refrigeration, dishwasher, oven | `appliance` |
| Heavy equipment, tractors, forklifts, HVAC, generators | `industrial` |
| Boats, jet skis, outboard motors | `marine` |

### Customer Types (customer_type enum)

```
individual
shop
dealer
fleet
```

**Assignment Rules:**
| Clues | Customer Type |
|-------|---------------|
| Personal email, single unit, residential | `individual` |
| Repair shop, automotive service, appliance repair | `shop` |
| Dealership, franchise, OEM | `dealer` |
| Multiple units, company, commercial | `fleet` |

### Confidence Levels (confidence_level enum)

```
high
medium
low
```

**Mapping Rules:**
| Extraction Quality | Confidence |
|--------------------|------------|
| Make, model, and part_number all clearly stated | `high` |
| Most fields extractable but some inferred | `medium` |
| Significant guessing required, missing critical fields | `low` |

---

## Canonical Make Names

### Automotive Makes

```
Acura, Alfa Romeo, Aston Martin, Audi, Bentley, BMW, Buick, Cadillac,
Chevrolet, Chrysler, Dodge, Ferrari, Fiat, Ford, Genesis, GMC, Honda,
Hyundai, Infiniti, Jaguar, Jeep, Kia, Lamborghini, Land Rover, Lexus,
Lincoln, Lotus, Maserati, Mazda, McLaren, Mercedes-Benz, Mini,
Mitsubishi, Nissan, Porsche, Ram, Rolls-Royce, Subaru, Tesla, Toyota,
Volkswagen, Volvo
```

**Normalization Rules:**
| Input Variations | Canonical Output |
|------------------|------------------|
| `Mercedes`, `MB`, `Benz`, `MERCEDES BENZ` | `Mercedes-Benz` |
| `Chevy`, `CHEVROLET`, `chevrolet` | `Chevrolet` |
| `VW`, `vw`, `Volkswagon` | `Volkswagen` |
| `Land rover`, `LAND ROVER`, `Range Rover` | `Land Rover` |
| `BMW`, `Bmw`, `bmw` | `BMW` |
| `GMC`, `Gmc` | `GMC` |
| `GM`, `General Motors` | Use specific brand (Chevrolet, GMC, Buick, Cadillac) |

### Heavy Equipment / Industrial Makes

```
Bobcat, Case, Caterpillar, Deere, Doosan, Hitachi, JCB, Komatsu,
Kubota, New Holland, Takeuchi, Volvo CE, Yanmar
```

**Normalization Rules:**
| Input Variations | Canonical Output |
|------------------|------------------|
| `John Deere`, `DEERE`, `JD` | `Deere` |
| `Cat`, `CAT`, `Caterpillar` | `Caterpillar` |
| `NH`, `New holland` | `New Holland` |
| `Case IH`, `CASE` | `Case` |

### Commercial Truck Makes

```
Freightliner, International, Kenworth, Mack, Peterbilt, Volvo Trucks,
Western Star
```

**Normalization Rules:**
| Input Variations | Canonical Output |
|------------------|------------------|
| `Navistar`, `IH`, `IHC` | `International` |
| `Pete`, `PETERBILT` | `Peterbilt` |
| `KW`, `KENWORTH` | `Kenworth` |

### Appliance Makes

```
Bosch, Electrolux, Frigidaire, GE Appliances, KitchenAid, LG, Maytag,
Samsung, Sub-Zero, Thermador, Whirlpool, Wolf
```

**Normalization Rules:**
| Input Variations | Canonical Output |
|------------------|------------------|
| `Kitchen Aid`, `Kitchen aide`, `KITCHENAID` | `KitchenAid` |
| `GE`, `General Electric` | `GE Appliances` |
| `Sub Zero`, `SUBZERO` | `Sub-Zero` |

### HVAC Makes (category: industrial)

```
Bryant, Carrier, Daikin, Goodman, Lennox, Rheem, Ruud, Trane, York
```

---

## Part Types (Canonical Names)

### Automotive Part Types

```
PCM    - Powertrain Control Module
ECM    - Engine Control Module
TCM    - Transmission Control Module
BCM    - Body Control Module
ABS    - ABS Module / EBCM
Cluster - Instrument Cluster
HVAC   - HVAC Control Module
SRS    - Airbag Module
FPDM   - Fuel Pump Driver Module
ICM    - Ignition Control Module
TCCM   - Transfer Case Control Module
TPMS   - Tire Pressure Monitor Module
LCM    - Lighting Control Module
SCM    - Steering Control Module
Camera - Camera Module (ADAS, backup, etc.)
Radio  - Infotainment / Radio Module
Amp    - Amplifier
```

### Appliance Part Types

```
control_board    - Main Control Board
display_board    - Display / UI Board
motor_board      - Motor Control Board
inverter_board   - Inverter Board
power_board      - Power Supply Board
timer            - Timer Module
relay_board      - Relay Board
sensor_board     - Sensor Board
```

### Industrial Part Types

```
ECU     - Engine Control Unit
Controller - General Controller
Display - Display Module
Sensor  - Sensor Module
```

---

## Output Schema

The extraction output maps directly to the `leads` table, plus metadata fields for processing:

```json
{
  // === Database Fields (leads table) ===
  "category": "automotive | appliance | industrial | marine | null",
  "year": "integer (1900-2100) | null",
  "make": "string | null",
  "model": "string | null",
  "part_type": "string | null",
  "part_number": "string | null",
  "text": "string",
  "symptoms": "string | null",
  "customer_type": "individual | shop | dealer | fleet",
  "quantity": "integer (default: 1)",
  "we_offer_this": "boolean | null",
  "confidence": "high | medium | low",

  // === Processing Metadata (not stored in DB) ===
  "_extraction": {
    "needs_review": "boolean",
    "review_reason": "string | null",
    "enrichment_used": "boolean",
    "enrichment_sources": ["string"],
    "enrichment_notes": "string | null",
    "confidence_details": {
      "make": "high | medium | low",
      "year": "high | medium | low",
      "model": "high | medium | low",
      "part_number": "high | medium | low",
      "part_type": "high | medium | low"
    }
  }
}
```

### Field Mapping

| Extraction Field | DB Column | Notes |
|------------------|-----------|-------|
| `category` | `category` | Must be valid enum value |
| `year` | `year` | Single year, not range |
| `make` | `make` | Canonical name from list |
| `model` | `model` | Normalized model name |
| `part_type` | `part_type` | Canonical abbreviation |
| `part_number` | `part_number` | Uppercase, normalized |
| `text` | `text` | Original input preserved |
| `symptoms` | `symptoms` | Extracted/summarized symptoms |
| `customer_type` | `customer_type` | Inferred from context |
| `quantity` | `quantity` | Default 1 |
| `we_offer_this` | `we_offer_this` | null if unknown |
| `confidence` | `confidence` | high/medium/low |

---

## System Prompt

```
You are a lead data extraction system for Circuit Board Medics, an electronics repair company. Your job is to extract structured information from unstructured customer submissions about circuit boards and electronic modules they need repaired.

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
5. Preserve the original input in the 'text' field

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
```

---

## Tool Definitions

### web_search

```json
{
  "name": "web_search",
  "description": "Search the web for part number information or vehicle fitment data. Use sparingly and only when part number is available but make/model cannot be determined from context.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query. Include part number and terms like 'OEM', 'fitment', or 'what vehicle'."
      }
    },
    "required": ["query"]
  }
}
```

### submit_lead

```json
{
  "name": "submit_lead",
  "description": "Submit the final extracted lead data. Call this exactly once after extraction is complete.",
  "input_schema": {
    "type": "object",
    "properties": {
      "category": {
        "type": ["string", "null"],
        "enum": ["automotive", "appliance", "industrial", "marine", null]
      },
      "year": {
        "type": ["integer", "null"],
        "minimum": 1900,
        "maximum": 2100
      },
      "make": { "type": ["string", "null"] },
      "model": { "type": ["string", "null"] },
      "part_type": { "type": ["string", "null"] },
      "part_number": { "type": ["string", "null"] },
      "text": { "type": "string" },
      "symptoms": { "type": ["string", "null"] },
      "customer_type": {
        "type": "string",
        "enum": ["individual", "shop", "dealer", "fleet"],
        "default": "individual"
      },
      "quantity": {
        "type": "integer",
        "minimum": 1,
        "default": 1
      },
      "we_offer_this": { "type": ["boolean", "null"] },
      "confidence": {
        "type": "string",
        "enum": ["high", "medium", "low"]
      },
      "_extraction": {
        "type": "object",
        "properties": {
          "needs_review": { "type": "boolean" },
          "review_reason": { "type": ["string", "null"] },
          "enrichment_used": { "type": "boolean" },
          "enrichment_sources": {
            "type": "array",
            "items": { "type": "string" }
          },
          "enrichment_notes": { "type": ["string", "null"] }
        }
      }
    },
    "required": ["text", "confidence", "customer_type"]
  }
}
```

---

## Few-Shot Examples

### Example 1: Well-Structured Automotive

**Input:**
```
board_info: "FoMoCo, 2008, Model # 7210BCN0EB, Part # 7C3T-15604-AN"
symptoms: "High beam headlights stay on, cannot switch to low beams. DTC B2C23."
```

**Output:**
```json
{
  "category": "automotive",
  "year": 2008,
  "make": "Ford",
  "model": "F-350",
  "part_type": "BCM",
  "part_number": "7C3T-15604-AN",
  "text": "FoMoCo, 2008, Model # 7210BCN0EB, Part # 7C3T-15604-AN",
  "symptoms": "High beams stuck on, cannot switch to low beams. DTC B2C23.",
  "customer_type": "individual",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "high",
  "_extraction": {
    "needs_review": false,
    "enrichment_used": false
  }
}
```

### Example 2: Part Number Only (Requires Enrichment)

**Input:**
```
board_info: "4G0907217A"
symptoms: null
```

**Action:** Use web_search with query "4G0907217A OEM part fitment vehicle"

**Output:**
```json
{
  "category": "automotive",
  "year": null,
  "make": "Audi",
  "model": "A6",
  "part_type": "Camera",
  "part_number": "4G0907217A",
  "text": "4G0907217A",
  "symptoms": null,
  "customer_type": "individual",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "medium",
  "_extraction": {
    "needs_review": false,
    "enrichment_used": true,
    "enrichment_sources": ["https://parts.audiusa.com/..."],
    "enrichment_notes": "Part fits 2011-2018 A6/A7/A8 models. Lane departure camera."
  }
}
```

### Example 3: Appliance

**Input:**
```
board_info: "Kitchen aide double wall oven KEBS209BSS01 wpw10751155"
symptoms: "Error code F2E1 Keyboard. Comes up after opening oven door."
```

**Output:**
```json
{
  "category": "appliance",
  "year": null,
  "make": "KitchenAid",
  "model": "KEBS209BSS01",
  "part_type": "control_board",
  "part_number": "WPW10751155",
  "text": "Kitchen aide double wall oven KEBS209BSS01 wpw10751155",
  "symptoms": "Error code F2E1 (keyboard error) appears after opening oven door.",
  "customer_type": "individual",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "high",
  "_extraction": {
    "needs_review": false,
    "enrichment_used": false
  }
}
```

### Example 4: Industrial / Heavy Equipment

**Input:**
```
board_info: "Doosan, 2008-DSAN-B50X, Part # A584911"
symptoms: "Multiple Error Codes: FC, F4, FD, F3, A. Tractor stops intermittently."
```

**Output:**
```json
{
  "category": "industrial",
  "year": 2008,
  "make": "Doosan",
  "model": "B50X",
  "part_type": "ECU",
  "part_number": "A584911",
  "text": "Doosan, 2008-DSAN-B50X, Part # A584911",
  "symptoms": "Multiple error codes (FC, F4, FD, F3, A). Tractor stops intermittently, restarts after key cycle.",
  "customer_type": "fleet",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "high",
  "_extraction": {
    "needs_review": false,
    "enrichment_used": false
  }
}
```

### Example 5: Low Confidence (Needs Review)

**Input:**
```
board_info: "Burned circuit"
symptoms: "Doesn't work"
```

**Output:**
```json
{
  "category": null,
  "year": null,
  "make": null,
  "model": null,
  "part_type": null,
  "part_number": null,
  "text": "Burned circuit",
  "symptoms": "Non-functional, board has burn damage",
  "customer_type": "individual",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "low",
  "_extraction": {
    "needs_review": true,
    "review_reason": "Insufficient information - no make, model, or part number provided",
    "enrichment_used": false
  }
}
```

### Example 6: Shop Customer with Multiple Units

**Input:**
```
board_info: "E338178"
symptoms: "Doesn't turn on blower motor. We have a lot of units with similar issues. We are a Marriott franchise."
```

**Action:** Use web_search with query "E338178 electronic control module"

**Output:**
```json
{
  "category": "industrial",
  "year": null,
  "make": "Trane",
  "model": "GC62",
  "part_type": "motor_board",
  "part_number": "E338178",
  "text": "E338178",
  "symptoms": "Blower motor not turning on. Multiple units affected.",
  "customer_type": "fleet",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "medium",
  "_extraction": {
    "needs_review": false,
    "enrichment_used": true,
    "enrichment_sources": ["https://surpluscityliquidators.com/..."],
    "enrichment_notes": "Trane/Genteq electronic motor control module for HVAC. Customer is Marriott franchise (fleet)."
  }
}
```

---

## Consistency Guarantees

### Make Normalization

The system guarantees that these variations will ALWAYS produce the canonical output:

| Input (any case/spacing) | Canonical Output |
|--------------------------|------------------|
| mercedes, benz, mb, mercedes-benz, mercedes benz | `Mercedes-Benz` |
| chevy, chevrolet | `Chevrolet` |
| vw, volkswagen, volkswagon | `Volkswagen` |
| john deere, jd, deere | `Deere` |
| cat, caterpillar | `Caterpillar` |
| kitchen aid, kitchenaid, kitchen aide | `KitchenAid` |
| ge, general electric | `GE Appliances` |
| navistar, ih, ihc, international | `International` |

### Part Number Normalization

All part numbers are normalized to:
- Uppercase letters
- Single spaces removed (or preserved if meaningful)
- Preserved hyphens
- No leading/trailing whitespace

Examples:
- `"7c3t-15604-an"` → `"7C3T-15604-AN"`
- `"wpw10751155"` → `"WPW10751155"`
- `"4g0 907 217 a"` → `"4G0907217A"`

### Category Assignment

| Input Type | Category |
|------------|----------|
| Any car, truck, SUV, motorcycle, ATV | `automotive` |
| Kitchen appliance, laundry, refrigerator | `appliance` |
| Tractor, forklift, HVAC, generator, commercial equipment | `industrial` |
| Boat, jet ski, outboard, marine electronics | `marine` |

---

## Processing Modes

### Batch Processing (Cost-Optimized)

For bulk historical data:
1. Use `claude-sonnet` for initial extraction (fast, cheap)
2. Route `needs_review: true` items to human queue
3. Optionally re-process low-confidence items with `claude-opus` and enrichment

```python
# Pseudocode
for lead in leads:
    result = extract_with_sonnet(lead)
    if result["_extraction"]["needs_review"] and result["part_number"]:
        result = extract_with_opus(lead, enable_enrichment=True)

    # Map to database record
    db_record = {k: v for k, v in result.items() if not k.startswith("_")}
    save_to_supabase(db_record)
```

### Real-Time Processing (Quality-Optimized)

For new submissions:
1. Use `claude-sonnet` with enrichment enabled
2. Return structured data immediately
3. Flag for human review if confidence = "low"

---

## Database Insert

After extraction, insert into Supabase:

```python
def insert_lead(extraction_result, source):
    # Remove metadata fields (prefixed with _)
    db_fields = {k: v for k, v in extraction_result.items() if not k.startswith("_")}

    # Add source (required field)
    db_fields["source"] = source  # "form", "phone", etc.

    # Insert
    supabase.table("leads").insert(db_fields).execute()
```

---

## Metrics and Monitoring

Track these metrics to monitor extraction quality:

| Metric | Target |
|--------|--------|
| % confidence = "high" | > 50% |
| % confidence = "low" | < 15% |
| % needing review | < 20% |
| % with enrichment | < 30% |
| Make normalization accuracy | > 99% |
| Part number extraction rate | > 85% |

---

## Future Enhancements

1. **Feedback Loop**: Use human review corrections to improve prompts
2. **we_offer_this Classification**: Train on historical data to auto-classify repair capability
3. **Image Analysis**: Extract part numbers from photos using vision
4. **Symptom Classification**: Categorize repair types (relay failure, capacitor, corrosion, etc.)
5. **VIN Decoding**: Auto-decode VINs when present to populate year/make/model
