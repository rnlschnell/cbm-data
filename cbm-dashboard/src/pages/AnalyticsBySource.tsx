import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import { sourceColors } from '@/constants/colors'
import type { YearRange } from '@/types/filters'

export function AnalyticsBySource() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { leads, leadsBySource, totalLeads, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  const sourceData = useMemo(
    () =>
      Object.entries(leadsBySource).map(([name, value]: [string, number]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: sourceColors[name],
      })),
    [leadsBySource]
  )

  const monthlySourceTrend = useMemo(() => {
    const months: Record<string, Record<string, number>> = {}
    leads.forEach((lead: { date: string; source: string }) => {
      const month = lead.date.substring(0, 7)
      if (!months[month]) months[month] = {}
      months[month][lead.source] = (months[month][lead.source] || 0) + 1
    })

    return Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, sources]) => ({
        date: month,
        value: sources.phone || 0,
      }))
  }, [leads])

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
      <PageHeader title="Analytics by Source" description="Breakdown of leads by acquisition source">
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Source Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={sourceData}
              centerLabel="Total Leads"
              centerValue={totalLeads}
              height={320}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads per Source</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={sourceData} height={320} horizontal />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Phone Leads Trend (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={monthlySourceTrend} height={300} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
