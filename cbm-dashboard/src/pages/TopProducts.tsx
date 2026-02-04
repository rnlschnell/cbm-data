import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { BarChart } from '@/components/charts/BarChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import type { YearRange } from '@/types/filters'

export function TopProducts() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { getTopMakes, getTopPartTypes, isLoading, error } = useLeadsData({
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

  const topMakes = getTopMakes(10)
  const topPartTypes = getTopPartTypes(10)

  const makesData = topMakes.map((m: { make: string; count: number }) => ({
    name: m.make,
    value: m.count,
  }))

  const partTypesData = topPartTypes.map((p: { partType: string; count: number }) => ({
    name: p.partType,
    value: p.count,
  }))

  return (
    <div>
      <PageHeader
        title="Top Products"
        description="Most requested makes, models, and part types"
      >
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Makes</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={makesData} height={400} horizontal />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Part Types</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={partTypesData} height={400} horizontal />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
