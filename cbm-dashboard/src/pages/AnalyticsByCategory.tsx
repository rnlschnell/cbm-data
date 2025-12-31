import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { mockLeads, getLeadsByCategory, getTopMakes } from '@/data/mockLeads'
import { categoryColors } from '@/constants/colors'

export function AnalyticsByCategory() {
  const leadsByCategory = getLeadsByCategory()
  const topMakes = getTopMakes(10)
  const totalLeads = mockLeads.length

  const categoryData = Object.entries(leadsByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: categoryColors[name],
  }))

  const makesData = topMakes.map((m) => ({
    name: m.make,
    value: m.count,
  }))

  const automotiveBreakdown = useMemo(() => {
    const makes: Record<string, number> = {}
    mockLeads
      .filter((l) => l.category === 'automotive' && l.make)
      .forEach((l) => {
        makes[l.make!] = (makes[l.make!] || 0) + 1
      })
    return Object.entries(makes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value, color: categoryColors.automotive }))
  }, [])

  const applianceBreakdown = useMemo(() => {
    const makes: Record<string, number> = {}
    mockLeads
      .filter((l) => l.category === 'appliance' && l.make)
      .forEach((l) => {
        makes[l.make!] = (makes[l.make!] || 0) + 1
      })
    return Object.entries(makes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value, color: categoryColors.appliance }))
  }, [])

  return (
    <div>
      <PageHeader
        title="Analytics by Category"
        description="Breakdown of leads by product category"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={categoryData}
              centerLabel="Total"
              centerValue={totalLeads}
              height={320}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Makes (All Categories)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={makesData} height={320} horizontal />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Automotive - Top Makes</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={automotiveBreakdown} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appliance - Top Makes</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={applianceBreakdown} height={300} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
