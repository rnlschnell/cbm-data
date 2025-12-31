import { Users, Package, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { RecentLeads } from '@/components/dashboard/RecentLeads'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'
import {
  mockLeads,
  getLeadsBySource,
  getLeadsByCategory,
  getMonthlyTrends,
} from '@/data/mockLeads'
import { sourceColors, categoryColors } from '@/constants/colors'

export function Dashboard() {
  const leadsBySource = getLeadsBySource()
  const leadsByCategory = getLeadsByCategory()
  const monthlyTrends = getMonthlyTrends()

  const totalLeads = mockLeads.length
  const serviceGaps = mockLeads.filter((l) => l.we_offer_this === false).length
  const thisMonthLeads = mockLeads.filter((l) => l.date.startsWith('2024-12')).length
  const shopCustomers = mockLeads.filter((l) => l.customer_type === 'shop').length

  const sourceData = Object.entries(leadsBySource).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: sourceColors[name],
  }))

  const categoryData = Object.entries(leadsByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: categoryColors[name],
  }))

  const trendData = monthlyTrends.map((t) => ({
    date: t.month,
    value: t.total,
  }))

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your leads intelligence data"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Leads"
          value={totalLeads}
          change={12.5}
          icon={Package}
          iconColor="text-blue-400"
          delay={1}
        />
        <MetricCard
          title="This Month"
          value={thisMonthLeads}
          change={-3.2}
          icon={TrendingUp}
          iconColor="text-emerald-400"
          delay={2}
        />
        <MetricCard
          title="Service Gaps"
          value={serviceGaps}
          icon={AlertTriangle}
          iconColor="text-red-400"
          delay={3}
        />
        <MetricCard
          title="Shop Customers"
          value={shopCustomers}
          change={8.7}
          icon={Users}
          iconColor="text-violet-400"
          delay={4}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="opacity-0 animate-fade-in stagger-3">
          <CardHeader>
            <CardTitle className="text-lg">Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={sourceData}
              centerLabel="Total"
              centerValue={totalLeads}
              height={280}
            />
          </CardContent>
        </Card>

        <Card className="opacity-0 animate-fade-in stagger-4">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={categoryData} height={280} horizontal />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 opacity-0 animate-fade-in stagger-4">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={trendData} height={300} />
          </CardContent>
        </Card>

        <RecentLeads />
      </div>
    </div>
  )
}
