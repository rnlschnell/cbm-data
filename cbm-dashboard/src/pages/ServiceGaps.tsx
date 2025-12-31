import { useMemo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/PageHeader'
import { BarChart } from '@/components/charts/BarChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { mockLeads, getServiceGaps } from '@/data/mockLeads'
import { categoryColors } from '@/constants/colors'

export function ServiceGaps() {
  const serviceGaps = getServiceGaps()
  const gapLeads = mockLeads.filter((l) => l.we_offer_this === false)
  const totalGaps = gapLeads.length

  const gapsByMake = useMemo(() => {
    const counts: Record<string, number> = {}
    gapLeads.forEach((lead) => {
      if (lead.make) {
        counts[lead.make] = (counts[lead.make] || 0) + 1
      }
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))
  }, [])

  const gapsByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    gapLeads.forEach((lead) => {
      if (lead.category) {
        counts[lead.category] = (counts[lead.category] || 0) + 1
      }
    })
    return Object.entries(counts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: categoryColors[name],
    }))
  }, [])

  const topGapDetails = useMemo(() => {
    return Object.values(serviceGaps)
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
  }, [])

  return (
    <div>
      <PageHeader
        title="Service Gap Analysis"
        description="Identify opportunities - products customers request that you don't currently offer"
      />

      <div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <div>
          <p className="font-medium text-amber-400">
            {totalGaps} leads identified as service gaps
          </p>
          <p className="text-sm text-muted-foreground">
            These are products/repairs customers are requesting that you don't currently offer
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Gaps by Make</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={gapsByMake} height={350} horizontal />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gaps by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={gapsByCategory}
              centerLabel="Gaps"
              centerValue={totalGaps}
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Service Gap Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topGapDetails.map((gap, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">
                        {gap.make} {gap.model}
                      </p>
                      <p className="text-sm text-muted-foreground">{gap.part_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{gap.count} requests</Badge>
                    <span className="text-sm font-medium text-emerald-400">
                      ${gap.count * 150} potential
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
