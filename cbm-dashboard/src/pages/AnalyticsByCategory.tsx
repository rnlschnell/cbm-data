import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import { categoryColors } from '@/constants/colors'
import type { YearRange } from '@/types/filters'

export function AnalyticsByCategory() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { leads, leadsByCategory, getTopMakes, totalLeads, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  const categoryData = useMemo(
    () =>
      Object.entries(leadsByCategory).map(([name, value]: [string, number]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: categoryColors[name],
      })),
    [leadsByCategory]
  )

  const makesData = useMemo(
    () =>
      getTopMakes(10).map((m: { make: string; count: number }) => ({
        name: m.make,
        value: m.count,
      })),
    [getTopMakes]
  )

  const automotiveBreakdown = useMemo(() => {
    const makes: Record<string, number> = {}
    leads
      .filter((l: { category: string | null; make: string | null }) => l.category === 'automotive' && l.make)
      .forEach((l: { make: string | null }) => {
        makes[l.make!] = (makes[l.make!] || 0) + 1
      })
    return Object.entries(makes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]: [string, number]) => ({ name, value, color: categoryColors.automotive }))
  }, [leads])

  const applianceBreakdown = useMemo(() => {
    const makes: Record<string, number> = {}
    leads
      .filter((l: { category: string | null; make: string | null }) => l.category === 'appliance' && l.make)
      .forEach((l: { make: string | null }) => {
        makes[l.make!] = (makes[l.make!] || 0) + 1
      })
    return Object.entries(makes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]: [string, number]) => ({ name, value, color: categoryColors.appliance }))
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
      <PageHeader title="Analytics by Category" description="Breakdown of leads by product category">
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

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
