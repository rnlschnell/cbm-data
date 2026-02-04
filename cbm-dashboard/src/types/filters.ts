import type { LeadCategory } from './lead'

export interface YearRange {
  start: number | null
  end: number | null
}

export interface LeadsFilter {
  yearStart?: number
  yearEnd?: number
  category?: LeadCategory | 'all'
}
