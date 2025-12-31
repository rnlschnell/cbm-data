import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'
import { mockLeads, getLeadsBySource } from '@/data/mockLeads'
import { sourceColors } from '@/constants/colors'

export function AnalyticsBySource() {
  const leadsBySource = getLeadsBySource()
  const totalLeads = mockLeads.length

  const sourceData = Object.entries(leadsBySource).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: sourceColors[name],
  }))


  const monthlySourceTrend = useMemo(() => {
    const months: Record<string, Record<string, number>> = {}
    mockLeads.forEach((lead) => {
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
  }, [])

  return (
    <div>
      <PageHeader
        title="Analytics by Source"
        description="Breakdown of leads by acquisition source"
      />

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
