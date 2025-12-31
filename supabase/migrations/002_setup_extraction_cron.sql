-- ============================================================================
-- Migration: Setup Lead Extraction Cron Job
-- ============================================================================
-- This migration sets up the pg_cron job to automatically trigger the
-- extract-leads Edge Function daily at 2 AM UTC.
--
-- Prerequisites:
-- 1. Enable pg_cron extension in Supabase Dashboard (Database > Extensions)
-- 2. Enable pg_net extension in Supabase Dashboard (Database > Extensions)
-- 3. Deploy the extract-leads Edge Function
-- 4. Store secrets in Vault (see below)
-- ============================================================================

-- Enable required extensions (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- ============================================================================
-- Step 1: Store secrets in Vault (run these manually with your actual values)
-- ============================================================================
-- Replace YOUR_PROJECT_REF with your actual Supabase project reference
-- Replace YOUR_ANON_KEY with your actual anon/public key

-- IMPORTANT: Run these commands manually in the SQL Editor:
/*
SELECT vault.create_secret(
  'https://YOUR_PROJECT_REF.supabase.co',
  'project_url',
  'Supabase project URL for Edge Function calls'
);

SELECT vault.create_secret(
  'YOUR_ANON_KEY',
  'anon_key',
  'Supabase anon key for Edge Function auth'
);
*/

-- ============================================================================
-- Step 2: Create helper function to call the Edge Function
-- ============================================================================

CREATE OR REPLACE FUNCTION public.trigger_lead_extraction(target_date DATE DEFAULT CURRENT_DATE)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id BIGINT;
  project_url TEXT;
  anon_key TEXT;
BEGIN
  -- Get secrets from vault
  SELECT decrypted_secret INTO project_url
  FROM vault.decrypted_secrets
  WHERE name = 'project_url';

  SELECT decrypted_secret INTO anon_key
  FROM vault.decrypted_secrets
  WHERE name = 'anon_key';

  -- Make HTTP POST request to Edge Function
  SELECT net.http_post(
    url := project_url || '/functions/v1/extract-leads',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'date', target_date::TEXT,
      'limit', 50
    )
  ) INTO request_id;

  RETURN request_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.trigger_lead_extraction TO service_role;

-- ============================================================================
-- Step 3: Schedule the daily extraction job
-- ============================================================================

-- Remove existing job if it exists (for idempotency)
SELECT cron.unschedule('daily-lead-extraction')
WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'daily-lead-extraction'
);

-- Schedule extraction to run daily at 2 AM UTC
SELECT cron.schedule(
  'daily-lead-extraction',
  '0 2 * * *',  -- 2 AM UTC every day
  $$SELECT public.trigger_lead_extraction(CURRENT_DATE)$$
);

-- ============================================================================
-- Step 4: Create view for monitoring job runs
-- ============================================================================

CREATE OR REPLACE VIEW public.extraction_job_history AS
SELECT
  j.jobname,
  jrd.runid,
  jrd.start_time,
  jrd.end_time,
  jrd.end_time - jrd.start_time AS duration,
  jrd.status,
  jrd.return_message
FROM cron.job j
JOIN cron.job_run_details jrd ON j.jobid = jrd.jobid
WHERE j.jobname = 'daily-lead-extraction'
ORDER BY jrd.start_time DESC;

-- Grant access to the view
GRANT SELECT ON public.extraction_job_history TO authenticated;

-- ============================================================================
-- Utility: Manual trigger for testing
-- ============================================================================

-- To manually trigger extraction for a specific date:
-- SELECT public.trigger_lead_extraction('2025-01-15');

-- To check job status:
-- SELECT * FROM public.extraction_job_history LIMIT 10;

-- To check pending HTTP requests:
-- SELECT * FROM net._http_response ORDER BY created DESC LIMIT 10;

-- ============================================================================
-- Cron Schedule Reference
-- ============================================================================
-- ┌───────────── minute (0 - 59)
-- │ ┌───────────── hour (0 - 23)
-- │ │ ┌───────────── day of month (1 - 31)
-- │ │ │ ┌───────────── month (1 - 12)
-- │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
-- │ │ │ │ │
-- * * * * *
--
-- Examples:
-- '0 2 * * *'     = 2:00 AM every day
-- '*/5 * * * *'   = Every 5 minutes
-- '0 */4 * * *'   = Every 4 hours
-- '0 9 * * 1-5'   = 9 AM on weekdays
-- '0 0 1 * *'     = Midnight on the 1st of each month
