import { useState } from 'react'
import { Users, Package, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { RecentLeads } from '@/components/dashboard/RecentLeads'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import { sourceColors, categoryColors } from '@/constants/colors'
import type { YearRange } from '@/types/filters'

export function Dashboard() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const {
    leadsBySource,
    leadsByCategory,
    monthlyTrends,
    totalLeads,
    serviceGapCount,
    shopCustomerCount,
    currentMonthLeads,
    isLoading,
    error,
  } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

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

  const sourceData = Object.entries(leadsBySource).map(([name, value]: [string, number]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: sourceColors[name],
  }))

  const categoryData = Object.entries(leadsByCategory).map(([name, value]: [string, number]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: categoryColors[name],
  }))

  const trendData = monthlyTrends.map((t: { month: string; total: number }) => ({
    date: t.month,
    value: t.total,
  }))

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your leads intelligence data"
      >
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

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
          value={currentMonthLeads}
          change={-3.2}
          icon={TrendingUp}
          iconColor="text-emerald-400"
          delay={2}
        />
        <MetricCard
          title="Service Gaps"
          value={serviceGapCount}
          icon={AlertTriangle}
          iconColor="text-red-400"
          delay={3}
        />
        <MetricCard
          title="Shop Customers"
          value={shopCustomerCount}
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
