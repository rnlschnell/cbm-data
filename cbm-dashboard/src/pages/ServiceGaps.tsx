import { useState, useMemo } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/PageHeader'
import { BarChart } from '@/components/charts/BarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import { categoryColors } from '@/constants/colors'
import type { YearRange } from '@/types/filters'

export function ServiceGaps() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { leads, serviceGaps, serviceGapCount, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  type LeadType = { we_offer_this: boolean | null; make: string | null; category: string | null }
  const gapLeads = useMemo(() => leads.filter((l: LeadType) => l.we_offer_this === false), [leads])

  const gapsByMake = useMemo(() => {
    const counts: Record<string, number> = {}
    gapLeads.forEach((lead: { make: string | null }) => {
      if (lead.make) {
        counts[lead.make] = (counts[lead.make] || 0) + 1
      }
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, value]: [string, number]) => ({ name, value }))
  }, [gapLeads])

  const gapsByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    gapLeads.forEach((lead: { category: string | null }) => {
      if (lead.category) {
        counts[lead.category] = (counts[lead.category] || 0) + 1
      }
    })
    return Object.entries(counts).map(([name, value]: [string, number]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: categoryColors[name],
    }))
  }, [gapLeads])

  type ServiceGap = { make: string | null; model: string | null; part_type: string | null; count: number }
  const topGapDetails = useMemo(() => {
    return (Object.values(serviceGaps) as ServiceGap[])
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
  }, [serviceGaps])

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <p className="text-destructive">Error loading data: {error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Service Gap Analysis"
        description="Identify opportunities - products customers request that you don't currently offer"
      >
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium text-primary">
            {serviceGapCount} leads identified as service gaps
          </p>
          <p className="text-sm text-muted-foreground">
            These are products/repairs customers are requesting that you don't currently offer
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Gaps by Make</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={gapsByMake} height={350} horizontal />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gaps by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={gapsByCategory}
              centerLabel="Gaps"
              centerValue={serviceGapCount}
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Service Gap Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topGapDetails.map((gap, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">
                        {gap.make} {gap.model}
                      </p>
                      <p className="text-sm text-muted-foreground">{gap.part_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{gap.count} requests</Badge>
                    <span className="text-sm font-medium text-primary">
                      ${gap.count * 150} potential
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
