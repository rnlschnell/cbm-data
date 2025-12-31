-- CBM Leads Intelligence Platform
-- Run this in Supabase SQL Editor

-- Create enum types
CREATE TYPE lead_category AS ENUM ('automotive', 'appliance', 'industrial', 'marine');
CREATE TYPE lead_source AS ENUM ('phone', 'form', 'chat', 'scrape', 'manual');
CREATE TYPE customer_type AS ENUM ('individual', 'shop', 'dealer', 'fleet');
CREATE TYPE confidence_level AS ENUM ('high', 'medium', 'low');

-- Create leads table
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
    text TEXT,
    symptoms TEXT,
    customer_type customer_type DEFAULT 'individual',
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    we_offer_this BOOLEAN,
    confidence confidence_level DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_leads_date ON leads(date DESC);
CREATE INDEX idx_leads_category ON leads(category);
CREATE INDEX idx_leads_make ON leads(make);
CREATE INDEX idx_leads_part_type ON leads(part_type);
CREATE INDEX idx_leads_we_offer_this ON leads(we_offer_this);

-- Composite index for top products queries
CREATE INDEX idx_leads_make_model_part ON leads(make, model, part_type);

-- Enable Row Level Security (optional, for later)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations" ON leads
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Sample data for testing
INSERT INTO leads (source, date, category, year, make, model, part_type, part_number, text, symptoms, customer_type, we_offer_this, confidence) VALUES
('phone', '2024-03-15', 'automotive', 2011, 'Ford', 'F-150', 'PCM', 'AL3A-12A650-AKB', 'Customer called about truck not starting', 'no start, check engine light', 'individual', true, 'high'),
('form', '2024-03-14', 'automotive', 2015, 'GM', 'Silverado', 'TCM', NULL, 'Transmission shifting hard', 'hard shifting, slipping', 'shop', true, 'medium'),
('phone', '2024-03-13', 'appliance', 2020, 'Whirlpool', 'WDT750SAHZ', 'control_board', 'W10854215', 'Dishwasher not starting cycle', 'no start, beeping', 'individual', true, 'high'),
('form', '2024-03-12', 'automotive', 2018, 'Honda', 'Accord', 'ECM', NULL, 'Engine misfiring', 'misfire, P0300', 'dealer', true, 'medium'),
('manual', '2024-03-11', 'industrial', 2019, 'John Deere', '5075E', 'ECU', NULL, 'Tractor control unit issue', 'error codes, no response', 'fleet', false, 'low');
