# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Project C.A.P.A.C.I.T.O.R** - Customer Analytics Platform for Automated Category Insights & Trend Opportunity Reports

Also known as **"Aggie"**:
- **AGGIE** - Automated Gap & Growth Insight Engine
- **AGGREGATOR** - Analytics Gateway for Growth, Repair Entity Generation, Acquisition, Tracking & Opportunity Recognition

A data aggregation system for Circuit Board Medics to analyze repair request leads from multiple sources (phone, form, chat, scrape, manual). The platform normalizes unstructured data, identifies service gaps, and provides analytics.

## Commands

### Dashboard Development
```bash
cd cbm-dashboard
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build for production (tsc + vite)
npm run lint       # ESLint check
npm run preview    # Preview production build
```

### Deploy to Cloudflare Pages
```bash
cd cbm-dashboard
npm run build
npx wrangler pages deploy dist --project-name cbm-dashboard
```
Production URL: https://cbm-dashboard.pages.dev

## Architecture

### Overall Structure
- `overview.md` - Full project specification with system architecture diagrams
- `schema.sql` - PostgreSQL schema for Supabase (enum types + leads table with indexes)
- `cbm-dashboard/` - React analytics dashboard

### Dashboard Architecture (cbm-dashboard/)

**Tech Stack**: React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui + Apache ECharts

**Key Directories**:
- `src/pages/` - Route components (Dashboard, HeatmapView, etc.)
- `src/components/charts/` - ECharts wrappers (BaseChart provides theming, specialized charts extend it)
- `src/components/ui/` - shadcn/ui primitives (card, badge, tabs, etc.)
- `src/components/layout/` - MainLayout with Sidebar and Header
- `src/data/mockLeads.ts` - Mock data generator (520 leads matching schema.sql structure)
- `src/types/lead.ts` - TypeScript types mirroring the database schema
- `src/constants/colors.ts` - Color palettes for categories, sources, customer types + chartTheme

**Chart System**: All charts use `BaseChart` component which wraps `echarts-for-react` with consistent theming. Specific chart types (BarChart, LineChart, DonutChart, HeatmapChart, WordCloudChart) provide typed props for their use cases.

**Data Flow**: Mock data is generated in `mockLeads.ts` with helper functions for aggregations (getLeadsBySource, getTopMakes, getHeatmapData, etc.). Pages import these helpers to get data for charts.

**Path Aliases**: Uses `@/` alias mapped to `src/` (configured in vite.config.ts and tsconfig.json)

### Data Model (schema.sql)

**Enum Types**:
- `lead_category`: automotive, appliance, industrial, marine
- `lead_source`: phone, form, chat, scrape, manual
- `customer_type`: individual, shop, dealer, fleet
- `confidence_level`: high, medium, low

**Leads Table Fields**:
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| source | lead_source | Data source (required) |
| date | DATE | When lead was received |
| category | lead_category | High-level grouping |
| year | INTEGER | Vehicle/appliance year (1900-2100) |
| make | TEXT | Manufacturer (Ford, Whirlpool, etc.) |
| model | TEXT | Specific model |
| part_type | TEXT | Component type (PCM, TCM, control_board, etc.) |
| part_number | TEXT | OEM part number |
| text | TEXT | Original unprocessed text |
| symptoms | TEXT | Problem description |
| customer_type | customer_type | B2B vs B2C (default: individual) |
| quantity | INTEGER | Number of units (default: 1) |
| we_offer_this | BOOLEAN | Do we repair this? (false = gap opportunity) |
| confidence | confidence_level | Extraction confidence (default: medium) |
| created_at | TIMESTAMPTZ | Record creation timestamp |

**Indexes**: date (DESC), category, make, part_type, we_offer_this, composite (make, model, part_type)

### Future Backend (Supabase)

The `overview.md` describes planned Edge Functions:
- `extract-lead` - Claude API for entity extraction from unstructured text
- `import-form` - Form submission webhook
- `enrich-part` - Part number lookup (automotive OEM patterns, appliance model prefixes)
- `chat` - Conversational interface with tool use (query_leads, get_top_products, get_trends, get_opportunities)
