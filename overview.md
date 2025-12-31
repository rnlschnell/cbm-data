# CBM Data - Leads Intelligence Platform

## Project Overview

A data aggregation and intelligence system for Circuit Board Medics to collect, normalize, enrich, and analyze repair request leads from multiple sources. The system enables trend analysis, identifies service gaps, and provides a conversational AI interface for querying business insights.

## Problem Statement

Circuit Board Medics receives repair inquiries from multiple channels:
- Phone call transcripts
- Form submissions (website, ads)
- Word of mouth / manual notes
- Competitor data scraping

This data contains valuable intelligence about:
- What products/parts customers need repaired
- Services we offer vs. don't offer (opportunity gaps)
- Customer segments (individuals, shops, dealers, fleets)
- Lead sources and volume trends

Currently, this data is fragmented and difficult to analyze at scale.

## Goals

1. **Aggregate** all lead data into a single, queryable database
2. **Normalize** unstructured data (transcripts, notes) into structured records
3. **Enrich** part numbers and sparse data with vehicle/appliance information
4. **Visualize** top requested repairs, trends, and opportunities
5. **Enable conversational queries** via AI-powered chat interface

---

## Data Schema

### Lead Record

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| id | uuid | | Primary key (auto-generated) |
| source | string | phone, form, chat, scrape, manual | Data source |
| date | timestamp | 2024-03-15 | When lead was received |
| category | enum | automotive, appliance, industrial, marine | High-level grouping |
| year | integer | 2011 | Vehicle/appliance year |
| make | string | Ford, Whirlpool, John Deere | Manufacturer |
| model | string | F-150, WDT750SAHZ | Specific model |
| part_type | string | PCM, TCM, ECM, cluster, control_board | Component type |
| part_number | string | AL3A-12A650-AKB | OEM part number |
| text | text | "customer called asking about..." | Original unprocessed text |
| symptoms | text | no start, flashing light, error P0606 | Problem description |
| customer_type | enum | individual, shop, dealer, fleet | B2B vs B2C |
| quantity | integer | 1 | Number of units needed |
| we_offer_this | boolean | true/false | Do we currently repair this? |
| confidence | enum | high, medium, low | Extraction confidence |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                              │
├─────────────────┬─────────────────┬─────────────────┬───────────┤
│ Phone Transcripts│ Form Submissions│ Competitor Scrape│ Manual   │
└────────┬────────┴────────┬────────┴────────┬────────┴─────┬─────┘
         │                 │                 │              │
         ▼                 ▼                 ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 INGESTION (Edge Functions)                       │
│  - Claude API for entity extraction from unstructured text       │
│  - Part number lookup/enrichment                                 │
│  - Normalization (make/model standardization)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Postgres   │  │  REST API   │  │Table Editor │              │
│  │  Database   │  │  (auto-gen) │  │ (built-in)  │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │    Edge     │  │   Storage   │                               │
│  │  Functions  │  │  (if needed)│                               │
│  └─────────────┘  └─────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
      ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
      │  Chat UI    │  │ Table Editor│  │   Exports   │
      │ (custom)    │  │ (built-in)  │  │   (CSV)     │
      └─────────────┘  └─────────────┘  └─────────────┘
```

**What Supabase provides:**
- Postgres database with 500 MB free storage
- Auto-generated REST API (no backend code needed for CRUD)
- Table Editor UI for viewing/editing data immediately
- Edge Functions (Deno) for Claude API integration
- Row-level security if needed later
- CSV export built-in

---

## Conversational AI Interface

### Tool Definitions

The AI assistant has access to the following tools for querying the database:

#### 1. `query_leads`
Query the leads database with filters. Returns count and matching records.

Parameters:
- `category`: automotive, appliance, industrial, marine
- `make`: Manufacturer name
- `model`: Model name/number
- `year_min` / `year_max`: Year range
- `part_type`: PCM, TCM, ECM, cluster, control_board, etc.
- `source`: phone, form, chat, scrape, manual
- `customer_type`: individual, shop, dealer, fleet
- `date_range`: last_week, last_month, last_quarter, last_year, all
- `we_offer_this`: boolean filter
- `limit`: Max results to return

#### 2. `get_top_products`
Get most requested products/repairs ranked by volume.

Parameters:
- `group_by`: make, model, part_type, make_model, make_model_part, year_make_model_part
- `category`: Filter by category
- `date_range`: Time period
- `limit`: Number of results
- `we_offer_this`: Filter by service availability

#### 3. `get_trends`
Get request volume trends over time.

Parameters:
- `group_by`: day, week, month
- `category`, `make`, `model`, `part_type`: Filters
- `date_range`: Time period

#### 4. `get_opportunities`
Find repair services people request that we don't currently offer.

Parameters:
- `min_requests`: Minimum request threshold
- `category`: Filter by category
- `date_range`: Time period

### Example Queries

| Natural Language Question | Tool Called |
|---------------------------|-------------|
| "What are our top 20 most requested repairs?" | `get_top_products(group_by="make_model_part", limit=20)` |
| "What repairs do people ask for that we don't offer?" | `get_opportunities(min_requests=5)` |
| "Show me GM TCM request trends over time" | `get_trends(make="GM", part_type="TCM", group_by="month")` |
| "How many Whirlpool dishwasher requests this quarter?" | `query_leads(make="Whirlpool", category="appliance", date_range="last_quarter")` |
| "What do repair shops request most?" | `get_top_products(customer_type="shop", limit=10)` |
| "Show phone leads for Ford PCMs" | `query_leads(source="phone", make="Ford", part_type="PCM")` |

---

## Data Enrichment

### Automotive Part Numbers
- OEM part numbers often encode year/make/model
- Ford: `AL3A-12A650-xxx` → AL3A prefix indicates 2011-2014 F-150
- GM: Part number patterns indicate vehicle family
- Build a lookup table over time

### Appliance Model Numbers
- Manufacturer prefixes: WDT = Whirlpool dishwasher, etc.
- Build manufacturer lookup table

### Unstructured Text Extraction
- Use Claude API to extract structured data from phone transcripts and notes
- Prompt template extracts: category, year, make, model, part_type, part_number, symptoms

---

## Platform: Supabase

**Why Supabase:**
- All-in-one: database + API + dashboard + edge functions
- 500 MB free tier (plenty for leads data)
- No cold starts
- Standard Postgres = easy to migrate later (`pg_dump`)
- Table Editor provides immediate data visibility
- Edge Functions for Claude API integration

---

## Implementation Phases

### Phase 1: Database Setup
- [ ] Create Supabase project
- [ ] Create `leads` table with schema
- [ ] Add sample data via Table Editor
- [ ] Test queries via REST API

### Phase 2: Ingestion Edge Functions
- [ ] `extract-lead` - Claude API extraction from raw text
- [ ] `import-form` - Form submission webhook
- [ ] `enrich-part` - Part number lookup
- [ ] Test with real transcripts/forms

### Phase 3: Chat Interface
- [ ] `chat` Edge Function - Claude API with tool definitions
- [ ] Simple web UI for chat (or CLI)
- [ ] Connect tools to Supabase queries
- [ ] Test conversational queries

### Phase 4: Refinement
- [ ] Add more ingestion sources as needed
- [ ] Build custom dashboard if Table Editor isn't enough
- [ ] Part number enrichment lookup table

---

## Key Business Questions This System Answers

1. **What are customers asking for most?**
   - Top requested repairs by volume
   - Trending products over time
   - Breakdown by category (automotive, appliance, etc.)

2. **Where are we missing opportunities?**
   - Services requested that we don't offer (`we_offer_this = false`)
   - High-volume requests we should consider adding

3. **Who is requesting repairs?**
   - Customer type breakdown (individual vs shop vs dealer vs fleet)
   - Volume patterns by customer segment

4. **Where do leads come from?**
   - Source breakdown (phone, form, chat, scrape, manual)
   - Trends by source over time

5. **What symptoms are most common?**
   - Search symptoms text for patterns
   - Correlate symptoms with part types

---

## Tech Stack

- **Platform**: Supabase (Postgres + API + Edge Functions)
- **AI**: Claude API with tool use
- **Frontend**: Optional - Table Editor works for basic use; custom UI if needed
- **Language**: TypeScript/Deno (Edge Functions)

---

## Portability

This project can be built on personal accounts and migrated to CBM business accounts later. No vendor lock-in.

**To migrate:**
1. Export database: `pg_dump` from Supabase dashboard
2. Create new Supabase project under CBM account
3. Import: `psql` or Supabase SQL editor
4. Update environment variables (API keys)
5. Redeploy Edge Functions

Edge Functions are code in git, so they transfer instantly.

---

## File Structure

```
cbm-data/
├── overview.md                 # This file
├── schema.sql                  # Database schema (run in Supabase SQL editor)
├── supabase/
│   ├── config.toml             # Supabase project config
│   └── functions/
│       ├── extract-lead/       # Claude API extraction from raw text
│       │   └── index.ts
│       ├── import-form/        # Form submission webhook
│       │   └── index.ts
│       ├── enrich-part/        # Part number lookup
│       │   └── index.ts
│       └── chat/               # Chat interface with tool use
│           └── index.ts
├── tools/                      # Tool implementations (used by chat function)
│   ├── query_leads.ts
│   ├── get_top_products.ts
│   ├── get_trends.ts
│   └── get_opportunities.ts
└── scripts/
    └── seed_data.sql           # Sample data for testing
```
