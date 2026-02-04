import { useMemo, useState } from 'react'
import { Loader2, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/PageHeader'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData, type TopRequest } from '@/hooks/useLeadsData'
import { categoryColors } from '@/constants/colors'
import type { LeadCategory } from '@/types/lead'
import type { YearRange } from '@/types/filters'

function RequestRow({ request, rank }: { request: TopRequest; rank: number }) {
  const offerRate = request.count > 0 ? Math.round((request.weOfferCount / request.count) * 100) : 0

  return (
    <div className="flex items-center gap-4 border-b border-border/50 py-3 last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
        {rank}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {request.make} {request.model}
          </span>
          {request.category && (
            <Badge
              variant="outline"
              className="text-xs"
              style={{ borderColor: categoryColors[request.category], color: categoryColors[request.category] }}
            >
              {request.category}
            </Badge>
          )}
        </div>
        <div className="mt-0.5 text-sm text-muted-foreground">
          {request.part_type}
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="text-right">
          <div className="font-semibold text-lg">{request.count}</div>
          <div className="text-xs text-muted-foreground">requests</div>
        </div>

        <div className="flex items-center gap-1.5 min-w-[100px]">
          {offerRate >= 75 ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          ) : offerRate >= 50 ? (
            <TrendingUp className="h-4 w-4 text-amber-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={offerRate >= 75 ? 'text-emerald-600' : offerRate >= 50 ? 'text-amber-600' : 'text-red-600'}>
            {offerRate}% covered
          </span>
        </div>
      </div>
    </div>
  )
}

export function TopRequests() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })
  const [category, setCategory] = useState<LeadCategory | 'all'>('all')

  const { getTopRequests, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  const data = useMemo(() => getTopRequests(category), [getTopRequests, category])

  const stats = useMemo(() => {
    const total = data.reduce((sum: number, r: TopRequest) => sum + r.count, 0)
    const covered = data.reduce((sum: number, r: TopRequest) => sum + r.weOfferCount, 0)
    const uncovered = data.reduce((sum: number, r: TopRequest) => sum + r.dontOfferCount, 0)
    return { total, covered, uncovered, coverageRate: total > 0 ? Math.round((covered / total) * 100) : 0 }
  }, [data])

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
      <PageHeader
        title="Top Requests"
        description="Exact products and services customers are asking about most"
      >
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{data.length}</div>
            <p className="text-sm text-muted-foreground">Unique combinations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-600">{stats.coverageRate}%</div>
            <p className="text-sm text-muted-foreground">Service coverage</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={category} onValueChange={(v) => setCategory(v as LeadCategory | 'all')} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="automotive">Automotive</TabsTrigger>
          <TabsTrigger value="appliance">Appliance</TabsTrigger>
          <TabsTrigger value="industrial">Industrial</TabsTrigger>
          <TabsTrigger value="marine">Marine</TabsTrigger>
        </TabsList>

        <TabsContent value={category}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Top {Math.min(50, data.length)} Requested Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {data.slice(0, 50).map((request: TopRequest, i: number) => (
                  <RequestRow
                    key={`${request.category}-${request.make}-${request.model}-${request.part_type}`}
                    request={request}
                    rank={i + 1}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
