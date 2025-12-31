import type { LeadCategory, LeadSource, CustomerType, ConfidenceLevel } from '@/types/lead'

export const categories: { value: LeadCategory; label: string }[] = [
  { value: 'automotive', label: 'Automotive' },
  { value: 'appliance', label: 'Appliance' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'marine', label: 'Marine' },
]

export const sources: { value: LeadSource; label: string }[] = [
  { value: 'phone', label: 'Phone' },
  { value: 'form', label: 'Form' },
  { value: 'chat', label: 'Chat' },
  { value: 'scrape', label: 'Scrape' },
  { value: 'manual', label: 'Manual' },
]

export const customerTypes: { value: CustomerType; label: string }[] = [
  { value: 'individual', label: 'Individual' },
  { value: 'shop', label: 'Shop' },
  { value: 'dealer', label: 'Dealer' },
  { value: 'fleet', label: 'Fleet' },
]

export const confidenceLevels: { value: ConfidenceLevel; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]
