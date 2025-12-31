import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { BarChart } from '@/components/charts/BarChart'
import { getTopMakes, getTopPartTypes } from '@/data/mockLeads'

export function TopProducts() {
  const topMakes = getTopMakes(10)
  const topPartTypes = getTopPartTypes(10)

  const makesData = topMakes.map((m) => ({
    name: m.make,
    value: m.count,
  }))

  const partTypesData = topPartTypes.map((p) => ({
    name: p.partType,
    value: p.count,
  }))

  return (
    <div>
      <PageHeader
        title="Top Products"
        description="Most requested makes, models, and part types"
      />

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
