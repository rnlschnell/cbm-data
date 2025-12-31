# Edge Function Deployment Guide

## Prerequisites

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

## Deploy the Extract-Leads Function

### 1. Set the Anthropic API Key Secret

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### 2. Deploy the Function

```bash
supabase functions deploy extract-leads
```

### 3. Test the Function

```bash
# Test with today's date
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/extract-leads" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"date": "2025-01-15", "limit": 5}'
```

## Setup the Cron Job

### 1. Enable Extensions

In Supabase Dashboard > Database > Extensions, enable:
- `pg_cron` - For scheduling jobs
- `pg_net` - For HTTP requests from Postgres

### 2. Store Secrets in Vault

Run in SQL Editor:

```sql
SELECT vault.create_secret(
  'https://YOUR_PROJECT_REF.supabase.co',
  'project_url',
  'Supabase project URL'
);

SELECT vault.create_secret(
  'YOUR_ANON_KEY',
  'anon_key',
  'Supabase anon key'
);
```

### 3. Run the Migration

Either run the migration file or execute the SQL directly:

```bash
supabase db push
```

Or run `supabase/migrations/002_setup_extraction_cron.sql` in the SQL Editor.

## Monitoring

### Check Job History

```sql
SELECT * FROM public.extraction_job_history LIMIT 10;
```

### Check HTTP Request Responses

```sql
SELECT * FROM net._http_response ORDER BY created DESC LIMIT 10;
```

### Manual Trigger

```sql
-- Process today's leads
SELECT public.trigger_lead_extraction(CURRENT_DATE);

-- Process a specific date
SELECT public.trigger_lead_extraction('2025-01-15');
```

## Troubleshooting

### Function Timeout
Edge Functions have a 150-second timeout. If you have many leads, reduce the `limit` parameter or process multiple batches.

### Missing Secrets
If the function fails with auth errors, verify secrets are set:
```bash
supabase secrets list
```

### View Function Logs
```bash
supabase functions logs extract-leads
```

## Cost Estimation

Using Claude Sonnet 4.5:
- ~500 input tokens/lead
- ~300 output tokens/lead
- Cost: ~$0.003/lead

For 100 leads/day: ~$9/month
