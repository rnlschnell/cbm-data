# CBM Leads Intelligence Platform

## Project Structure

```
cbm-data/
├── overview.md          # Project documentation and architecture
├── schema.sql           # PostgreSQL database schema (Supabase)
├── CLAUDE.md            # This file - development guide
└── cbm-dashboard/       # React analytics dashboard (Cloudflare Pages)
```

## Dashboard Deployment

The analytics dashboard is deployed to Cloudflare Pages.

### Prerequisites

- Node.js 18+
- Cloudflare account with Wrangler CLI authenticated (`wrangler login`)

### Development

```bash
cd cbm-dashboard
npm install
npm run dev
```

Opens at http://localhost:5173

### Build

```bash
cd cbm-dashboard
npm run build
```

Output goes to `cbm-dashboard/dist/`

### Deploy to Cloudflare Pages

```bash
cd cbm-dashboard
npm run build
npx wrangler pages deploy dist --project-name cbm-dashboard
```

**Production URL**: https://cbm-dashboard.pages.dev

### Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Charts**: Apache ECharts (echarts-for-react, echarts-wordcloud)
- **Routing**: React Router
- **Hosting**: Cloudflare Pages

### Dashboard Views

| Route | Description |
|-------|-------------|
| `/` | Dashboard overview with metrics and charts |
| `/heatmap` | Heatmap visualizations (Make×Part, Source×Month, Category×Customer) |
| `/wordcloud` | Word cloud visualizations (Symptoms, Makes, Part Types) |
| `/analytics/source` | Leads breakdown by source |
| `/analytics/category` | Leads breakdown by category |
| `/analytics/customers` | Customer type analysis |
| `/analytics/products` | Top makes and part types |
| `/trends` | Time-based trend analysis |
| `/gaps` | Service gap opportunities (we_offer_this = false) |

### Mock Data

The dashboard uses 520 generated mock leads based on the schema.sql structure. Data is generated in `src/data/mockLeads.ts`.
