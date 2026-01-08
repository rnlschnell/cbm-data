import { createClient } from '@supabase/supabase-js'
import type { Lead } from '@/types/lead'
import type { CanonicalValue, CanonicalValueInsert, CanonicalValueUpdate, CanonicalValueType } from '@/types/canonicalValue'

const supabaseUrl = 'https://myyyvzkhlxcxlipionvf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15eXl2emtobHhjeGxpcGlvbnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTMyMjAsImV4cCI6MjA2MzU4OTIyMH0.y6dNt17ns-vNxwtI7mVkYu0cWDJcUMzobIkq9nKE650'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection by fetching leads count
export async function testConnection(): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    const { count, error } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    if (error) {
      return { success: false, message: `Database error: ${error.message}` }
    }

    return { success: true, message: 'Connected successfully!', count: count ?? 0 }
  } catch (err) {
    return { success: false, message: `Connection error: ${err}` }
  }
}

// Fetch all leads
export async function fetchLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return data as Lead[]
}

// Create a new submission
export async function createSubmission(submission: {
  text: string
  source: 'phone' | 'form' | 'chat' | 'scrape' | 'manual'
  date?: string
}): Promise<{ success: boolean; data?: Lead; error?: string }> {
  const { data, error } = await supabase
    .from('submissions')
    .insert({
      text: submission.text,
      source: submission.source,
      date: submission.date || new Date().toISOString().split('T')[0],
      quantity: 1,
      customer_type: 'individual',
      confidence: 'medium',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating submission:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as Lead }
}

// Fetch all submissions
export async function fetchSubmissions(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching submissions:', error)
    return []
  }

  return data as Lead[]
}

// ============================================
// Canonical Values CRUD Operations
// ============================================

// Fetch all canonical values, optionally filtered by type
export async function fetchCanonicalValues(type?: CanonicalValueType): Promise<CanonicalValue[]> {
  let query = supabase
    .from('canonical_values')
    .select('*')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true })

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching canonical values:', error)
    return []
  }

  return data as CanonicalValue[]
}

// Fetch canonical values grouped by type
export async function fetchCanonicalValuesGrouped(): Promise<{
  makes: CanonicalValue[]
  models: CanonicalValue[]
  part_types: CanonicalValue[]
}> {
  const { data, error } = await supabase
    .from('canonical_values')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching canonical values:', error)
    return { makes: [], models: [], part_types: [] }
  }

  const values = data as CanonicalValue[]
  return {
    makes: values.filter(v => v.type === 'make'),
    models: values.filter(v => v.type === 'model'),
    part_types: values.filter(v => v.type === 'part_type'),
  }
}

// Create a new canonical value
export async function createCanonicalValue(
  value: CanonicalValueInsert
): Promise<{ success: boolean; data?: CanonicalValue; error?: string }> {
  const { data, error } = await supabase
    .from('canonical_values')
    .insert(value)
    .select()
    .single()

  if (error) {
    console.error('Error creating canonical value:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as CanonicalValue }
}

// Update a canonical value
export async function updateCanonicalValue(
  id: string,
  updates: CanonicalValueUpdate
): Promise<{ success: boolean; data?: CanonicalValue; error?: string }> {
  const { data, error } = await supabase
    .from('canonical_values')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating canonical value:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as CanonicalValue }
}

// Delete a canonical value
export async function deleteCanonicalValue(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('canonical_values')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting canonical value:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Toggle active status of a canonical value
export async function toggleCanonicalValueActive(
  id: string,
  active: boolean
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('canonical_values')
    .update({ active })
    .eq('id', id)

  if (error) {
    console.error('Error toggling canonical value:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
