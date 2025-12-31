import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { mockLeads, getMonthlyTrends } from '@/data/mockLeads'

export function Trends() {
  const monthlyTrends = getMonthlyTrends()

  const trendData = monthlyTrends.map((t) => ({
    date: t.month,
    value: t.total,
  }))

  const dayOfWeekData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const counts: number[] = [0, 0, 0, 0, 0, 0, 0]

    mockLeads.forEach((lead) => {
      const day = new Date(lead.date).getDay()
      counts[day]++
    })

    return days.map((name, i) => ({
      name,
      value: counts[i],
    }))
  }, [])

  const cumulativeData = useMemo(() => {
    let cumulative = 0
    return monthlyTrends.map((t) => {
      cumulative += t.total
      return { date: t.month, value: cumulative }
    })
  }, [])

  const weeklyData = useMemo(() => {
    const weeks: Record<string, number> = {}
    mockLeads.forEach((lead) => {
      const date = new Date(lead.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split('T')[0]
      weeks[weekKey] = (weeks[weekKey] || 0) + 1
    })

    return Object.entries(weeks)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
      .map(([date, value]) => ({ date, value }))
  }, [])

  return (
    <div>
      <PageHeader
        title="Trends Over Time"
        description="Track lead volume patterns and growth"
      />

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
