import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/layout/PageHeader'
import { HeatmapChart } from '@/components/charts/HeatmapChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import type { YearRange } from '@/types/filters'

export function HeatmapView() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { leads, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  const makePartTypeData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {}
    const makes = new Set<string>()
    const partTypes = new Set<string>()

    leads.forEach((lead: { make: string | null; part_type: string | null }) => {
      if (lead.make && lead.part_type) {
        makes.add(lead.make)
        partTypes.add(lead.part_type)
        if (!matrix[lead.make]) matrix[lead.make] = {}
        matrix[lead.make][lead.part_type] = (matrix[lead.make][lead.part_type] || 0) + 1
      }
    })

    const topMakes = [...makes].slice(0, 12)
    const topPartTypes = [...partTypes].slice(0, 10)

    const data: { x: string; y: string; value: number }[] = []
    topMakes.forEach((make) => {
      topPartTypes.forEach((partType) => {
        data.push({
          x: partType,
          y: make,
          value: matrix[make]?.[partType] || 0,
        })
      })
    })

    return { data, xLabels: topPartTypes, yLabels: topMakes }
  }, [leads])

  const sourceMonthData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {}
    const sources = ['phone', 'form', 'chat', 'scrape', 'manual']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    sources.forEach((s) => (matrix[s] = {}))

    leads.forEach((lead: { date: string; source: string }) => {
      if (!lead.date || !lead.source || !matrix[lead.source]) return
      const month = new Date(lead.date).getMonth()
      const monthName = months[month]
      if (monthName) {
        matrix[lead.source][monthName] = (matrix[lead.source][monthName] || 0) + 1
      }
    })

    const data: { x: string; y: string; value: number }[] = []
    sources.forEach((source) => {
      months.forEach((month) => {
        data.push({
          x: month,
          y: source.charAt(0).toUpperCase() + source.slice(1),
          value: matrix[source]?.[month] || 0,
        })
      })
    })

    return {
      data,
      xLabels: months,
      yLabels: sources.map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
    }
  }, [leads])

  const categoryCustomerData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {}
    const categories = ['automotive', 'appliance', 'industrial', 'marine']
    const customerTypes = ['individual', 'shop', 'dealer', 'fleet']

    categories.forEach((c) => (matrix[c] = {}))

    leads.forEach((lead: { category: string | null; customer_type: string }) => {
      if (lead.category) {
        matrix[lead.category][lead.customer_type] =
          (matrix[lead.category][lead.customer_type] || 0) + 1
      }
    })

    const data: { x: string; y: string; value: number }[] = []
    categories.forEach((category) => {
      customerTypes.forEach((customerType) => {
        data.push({
          x: customerType.charAt(0).toUpperCase() + customerType.slice(1),
          y: category.charAt(0).toUpperCase() + category.slice(1),
          value: matrix[category]?.[customerType] || 0,
        })
      })
    })

    return {
      data,
      xLabels: customerTypes.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
      yLabels: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
    }
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
      <PageHeader title="Heatmap Analysis" description="Visualize lead density across different dimensions">
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <Tabs defaultValue="make-part" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="make-part">Make × Part Type</TabsTrigger>
          <TabsTrigger value="source-month">Source × Month</TabsTrigger>
          <TabsTrigger value="category-customer">Category × Customer</TabsTrigger>
        </TabsList>

        <TabsContent value="make-part">
          <Card>
            <CardHeader>
              <CardTitle>Make vs Part Type Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <HeatmapChart
                data={makePartTypeData.data}
                xLabels={makePartTypeData.xLabels}
                yLabels={makePartTypeData.yLabels}
                height={500}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="source-month">
          <Card>
            <CardHeader>
              <CardTitle>Source vs Month Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <HeatmapChart
                data={sourceMonthData.data}
                xLabels={sourceMonthData.xLabels}
                yLabels={sourceMonthData.yLabels}
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category-customer">
          <Card>
            <CardHeader>
              <CardTitle>Category vs Customer Type Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <HeatmapChart
                data={categoryCustomerData.data}
                xLabels={categoryCustomerData.xLabels}
                yLabels={categoryCustomerData.yLabels}
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
