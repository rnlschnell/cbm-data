export type LeadCategory = 'automotive' | 'appliance' | 'industrial' | 'marine'
export type LeadSource = 'phone' | 'form' | 'chat' | 'scrape' | 'manual'
export type CustomerType = 'individual' | 'shop' | 'dealer' | 'fleet'
export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface Lead {
  id: string
  source: LeadSource
  date: string
  category: LeadCategory | null
  year: number | null
  make: string | null
  model: string | null
  part_type: string | null
  part_number: string | null
  text: string | null
  symptoms: string | null
  customer_type: CustomerType
  quantity: number
  we_offer_this: boolean | null
  confidence: ConfidenceLevel
  created_at: string
}

export interface FilterState {
  dateRange: {
    start: Date | null
    end: Date | null
  }
  category: LeadCategory | 'all'
  source: LeadSource | 'all'
  customerType: CustomerType | 'all'
  weOfferThis: boolean | 'all'
}

export interface AggregatedData {
  label: string
  value: number
  color?: string
}

export interface TrendData {
  date: string
  value: number
  category?: string
}

export interface HeatmapData {
  x: string
  y: string
  value: number
}
