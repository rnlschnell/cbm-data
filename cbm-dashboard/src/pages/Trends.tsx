import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import type { YearRange } from '@/types/filters'

export function Trends() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { leads, monthlyTrends, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  type MonthlyTrend = { month: string; total: number }
  const trendData = useMemo(
    () =>
      monthlyTrends.map((t: MonthlyTrend) => ({
        date: t.month,
        value: t.total,
      })),
    [monthlyTrends]
  )

  const dayOfWeekData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const counts: number[] = [0, 0, 0, 0, 0, 0, 0]

    leads.forEach((lead: { date: string }) => {
      const day = new Date(lead.date).getDay()
      counts[day]++
    })

    return days.map((name, i) => ({
      name,
      value: counts[i],
    }))
  }, [leads])

  const cumulativeData = useMemo(() => {
    let cumulative = 0
    return monthlyTrends.map((t: MonthlyTrend) => {
      cumulative += t.total
      return { date: t.month, value: cumulative }
    })
  }, [monthlyTrends])

  const weeklyData = useMemo(() => {
    const weeks: Record<string, number> = {}
    leads.forEach((lead: { date: string }) => {
      const date = new Date(lead.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split('T')[0]
      weeks[weekKey] = (weeks[weekKey] || 0) + 1
    })

    return Object.entries(weeks)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
      .map(([date, value]: [string, number]) => ({ date, value }))
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
      <PageHeader title="Trends Over Time" description="Track lead volume patterns and growth">
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Lead Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={trendData} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Day of Week Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={dayOfWeekData} height={300} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cumulative Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={cumulativeData} height={300} areaFill />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Trend (Last 12 Weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={weeklyData} height={300} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
