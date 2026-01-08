export type CanonicalValueType = 'make' | 'model' | 'part_type'

export type CanonicalCategory = 'automotive' | 'appliance' | 'marine' | 'industrial'

export interface CanonicalValue {
  id: string
  type: CanonicalValueType
  name: string
  aliases: string[]
  category: CanonicalCategory | null
  parent_value: string | null
  display_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface CanonicalValueInsert {
  type: CanonicalValueType
  name: string
  aliases?: string[]
  category?: CanonicalCategory | null
  parent_value?: string | null
  display_order?: number
  active?: boolean
}

export interface CanonicalValueUpdate {
  name?: string
  aliases?: string[]
  category?: CanonicalCategory | null
  parent_value?: string | null
  display_order?: number
  active?: boolean
}
