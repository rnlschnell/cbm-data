-- ============================================================================
-- Migration: Add columns for extraction metadata
-- ============================================================================
-- Adds columns needed by the lead extraction system that aren't in the
-- original schema.sql
-- ============================================================================

-- Add needs_review column for flagging leads that need manual review
ALTER TABLE leads ADD COLUMN IF NOT EXISTS needs_review BOOLEAN DEFAULT false;

-- Add review_reason column for explaining why review is needed
ALTER TABLE leads ADD COLUMN IF NOT EXISTS review_reason TEXT;

-- Add enrichment_used column to track if web search was used
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment_used BOOLEAN DEFAULT false;

-- Add enrichment_notes column for storing search context
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment_notes TEXT;

-- Add index for finding leads needing review
CREATE INDEX IF NOT EXISTS idx_leads_needs_review ON leads(needs_review) WHERE needs_review = true;

-- Add index for finding unprocessed leads (where make is null)
CREATE INDEX IF NOT EXISTS idx_leads_unprocessed ON leads(date, make) WHERE make IS NULL;

-- ============================================================================
-- Comments for documentation
-- ============================================================================

COMMENT ON COLUMN leads.needs_review IS 'Flag for leads that need manual review due to low confidence or extraction issues';
COMMENT ON COLUMN leads.review_reason IS 'Explanation of why the lead was flagged for review';
COMMENT ON COLUMN leads.enrichment_used IS 'Whether web search was used to enrich extraction';
COMMENT ON COLUMN leads.enrichment_notes IS 'Notes from web search enrichment process';
