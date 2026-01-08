---
description: Extract structured lead data from board_info and symptoms text
---

# Extract structured lead data from board_info and symptoms

Extract structured lead data from the input below. Follow the schema from extraction.md exactly.

## Input
$ARGUMENTS

## Instructions

1. Parse the board_info and symptoms from the input
2. Extract all fields according to the leads table schema
3. Use canonical make names (Mercedes-Benz not Mercedes, Chevrolet not Chevy, etc.)
4. Use lowercase enum values: automotive, appliance, industrial, marine
5. Use confidence: high, medium, or low
6. If part number is present but make/model unknown, use WebSearch to research it
7. Output valid JSON matching the schema

## Output Schema

```json
{
  "category": "automotive | appliance | industrial | marine | null",
  "year": "integer | null",
  "make": "string | null",
  "model": "string | null",
  "part_type": "string | null",
  "part_number": "string | null",
  "text": "original input",
  "symptoms": "string | null",
  "customer_type": "individual | shop | dealer | fleet",
  "quantity": 1,
  "we_offer_this": null,
  "confidence": "high | medium | low",
  "needs_review": "boolean",
  "review_reason": "string | null"
}
```

## Canonical Makes

- Mercedes, MB, Benz → Mercedes-Benz
- Chevy → Chevrolet
- VW, Volkswagon → Volkswagen
- John Deere, JD → Deere
- Cat, CAT → Caterpillar
- Kitchen Aid, Kitchen aide → KitchenAid
- GE, General Electric → GE Appliances
- Navistar, IH → International

Now extract the lead data and return ONLY the JSON result.
