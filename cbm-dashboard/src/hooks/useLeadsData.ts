import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchLeads } from '@/lib/supabase'
import type { Lead, LeadCategory } from '@/types/lead'
import type { LeadsFilter } from '@/types/filters'

export interface TopRequest {
  category: LeadCategory | null
  make: string | null
  model: string | null
  part_type: string | null
  count: number
  weOfferCount: number
  dontOfferCount: number
}

export function useLeadsData(filter?: LeadsFilter) {
  const {
    data: leads = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  })

  // Apply filters to the leads
  const filteredLeads = useMemo(() => {
    let result = leads

    if (filter?.yearStart) {
      result = result.filter((lead) => lead.year !== null && lead.year >= filter.yearStart!)
    }
    if (filter?.yearEnd) {
      result = result.filter((lead) => lead.year !== null && lead.year <= filter.yearEnd!)
    }
    if (filter?.category && filter.category !== 'all') {
      result = result.filter((lead) => lead.category === filter.category)
    }

    return result
  }, [leads, filter?.yearStart, filter?.yearEnd, filter?.category])

  // Count by source
  const leadsBySource = useMemo(() => {
    const result: Record<string, number> = {}
    for (const lead of filteredLeads) {
      result[lead.source] = (result[lead.source] || 0) + 1
    }
    return result
  }, [filteredLeads])

  // Count by category
  const leadsByCategory = useMemo(() => {
    const result: Record<string, number> = {}
    for (const lead of filteredLeads) {
      if (lead.category) {
        result[lead.category] = (result[lead.category] || 0) + 1
      }
    }
    return result
  }, [filteredLeads])

  // Count by customer type
  const leadsByCustomerType = useMemo(() => {
    const result: Record<string, number> = {}
    for (const lead of filteredLeads) {
      result[lead.customer_type] = (result[lead.customer_type] || 0) + 1
    }
    return result
  }, [filteredLeads])

  // Top makes by count
  const getTopMakes = useMemo(() => {
    return (limit: number = 10) => {
      const counts: Record<string, number> = {}
      for (const lead of filteredLeads) {
        if (lead.make) {
          counts[lead.make] = (counts[lead.make] || 0) + 1
        }
      }
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([make, count]) => ({ make, count }))
    }
  }, [filteredLeads])

  // Top part types by count
  const getTopPartTypes = useMemo(() => {
    return (limit: number = 10) => {
      const counts: Record<string, number> = {}
      for (const lead of filteredLeads) {
        if (lead.part_type) {
          counts[lead.part_type] = (counts[lead.part_type] || 0) + 1
        }
      }
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([partType, count]) => ({ partType, count }))
    }
  }, [filteredLeads])

  // Service gaps (we_offer_this = false)
  type ServiceGap = { make: string | null; model: string | null; part_type: string | null; count: number }
  const serviceGaps = useMemo(() => {
    return filteredLeads
      .filter((lead: Lead) => lead.we_offer_this === false)
      .reduce(
        (acc: Record<string, ServiceGap>, lead: Lead) => {
          const key = `${lead.make}-${lead.model}-${lead.part_type}`
          if (!acc[key]) {
            acc[key] = {
              make: lead.make,
              model: lead.model,
              part_type: lead.part_type,
              count: 0,
            }
          }
          acc[key].count++
          return acc
        },
        {} as Record<string, ServiceGap>
      )
  }, [filteredLeads])

  // Monthly trends
  type MonthlyData = { total: number; automotive: number; appliance: number; industrial: number; marine: number }
  const monthlyTrends = useMemo(() => {
    const months: Record<string, MonthlyData> = {}

    for (const lead of filteredLeads) {
      const month = lead.date.substring(0, 7)
      if (!months[month]) {
        months[month] = { total: 0, automotive: 0, appliance: 0, industrial: 0, marine: 0 }
      }
      months[month].total++
      if (lead.category && lead.category in months[month]) {
        months[month][lead.category as keyof MonthlyData]++
      }
    }

    return Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, data]) => ({ month, ...data }))
  }, [filteredLeads])

  // Heatmap data
  const getHeatmapData = useMemo(() => {
    return (
      xField: 'make' | 'part_type' | 'source',
      yField: 'category' | 'customer_type'
    ) => {
      const matrix: Record<string, Record<string, number>> = {}

      for (const lead of filteredLeads) {
        const xValue = lead[xField] || 'Unknown'
        const yValue = lead[yField] || 'Unknown'

        if (!matrix[yValue]) {
          matrix[yValue] = {}
        }
        matrix[yValue][xValue] = (matrix[yValue][xValue] || 0) + 1
      }

      return matrix
    }
  }, [filteredLeads])

  // Word cloud data
  const getWordCloudData = useMemo(() => {
    return (field: 'symptoms' | 'make' | 'part_type') => {
      const counts: Record<string, number> = {}

      for (const lead of filteredLeads) {
        const value = lead[field]
        if (value) {
          if (field === 'symptoms') {
            const words = value.toLowerCase().split(/\s+/)
            for (const word of words) {
              if (word.length > 3) {
                counts[word] = (counts[word] || 0) + 1
              }
            }
          } else {
            counts[value] = (counts[value] || 0) + 1
          }
        }
      }

      return Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
    }
  }, [filteredLeads])

  // Top requests (make/model/part combinations)
  const getTopRequests = useMemo(() => {
    return (filterCategory?: LeadCategory | 'all'): TopRequest[] => {
      const map = new Map<string, TopRequest>()

      for (const lead of filteredLeads) {
        if (filterCategory && filterCategory !== 'all' && lead.category !== filterCategory) {
          continue
        }

        const key = `${lead.category}|${lead.make}|${lead.model}|${lead.part_type}`

        if (!map.has(key)) {
          map.set(key, {
            category: lead.category,
            make: lead.make,
            model: lead.model,
            part_type: lead.part_type,
            count: 0,
            weOfferCount: 0,
            dontOfferCount: 0,
          })
        }

        const entry = map.get(key)!
        entry.count++
        if (lead.we_offer_this === true) {
          entry.weOfferCount++
        } else if (lead.we_offer_this === false) {
          entry.dontOfferCount++
        }
      }

      return Array.from(map.values()).sort((a, b) => b.count - a.count)
    }
  }, [filteredLeads])

  // Recent leads
  const getRecentLeads = useMemo(() => {
    return (limit: number = 5): Lead[] => {
      return [...filteredLeads]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, limit)
    }
  }, [filteredLeads])

  // Total counts for quick access
  const totalLeads = filteredLeads.length
  const serviceGapCount = filteredLeads.filter((l: Lead) => l.we_offer_this === false).length
  const shopCustomerCount = filteredLeads.filter((l: Lead) => l.customer_type === 'shop').length

  // Current month leads count
  const currentMonthLeads = useMemo(() => {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    return filteredLeads.filter((l: Lead) => l.date.startsWith(currentMonth)).length
  }, [filteredLeads])

  return {
    // Raw data
    leads: filteredLeads,
    allLeads: leads,
    isLoading,
    error,
    refetch,

    // Aggregations
    leadsBySource,
    leadsByCategory,
    leadsByCustomerType,
    monthlyTrends,
    serviceGaps,

    // Functions that take parameters
    getTopMakes,
    getTopPartTypes,
    getHeatmapData,
    getWordCloudData,
    getTopRequests,
    getRecentLeads,

    // Quick counts
    totalLeads,
    serviceGapCount,
    shopCustomerCount,
    currentMonthLeads,
  }
}
