import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import { DonutChart } from '@/components/charts/DonutChart'
import { BarChart } from '@/components/charts/BarChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import { customerTypeColors } from '@/constants/colors'
import type { YearRange } from '@/types/filters'

export function CustomerAnalysis() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { leads, leadsByCustomerType, totalLeads, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  const customerData = useMemo(
    () =>
      Object.entries(leadsByCustomerType).map(([name, value]: [string, number]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: customerTypeColors[name],
      })),
    [leadsByCustomerType]
  )

  const avgQuantityByCustomer = useMemo(() => {
    const totals: Record<string, { sum: number; count: number }> = {}
    leads.forEach((lead: { customer_type: string; quantity: number }) => {
      if (!totals[lead.customer_type]) {
        totals[lead.customer_type] = { sum: 0, count: 0 }
      }
      totals[lead.customer_type].sum += lead.quantity
      totals[lead.customer_type].count++
    })
    return Object.entries(totals)
      .map(([name, data]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: Math.round((data.sum / data.count) * 10) / 10,
        color: customerTypeColors[name],
      }))
      .sort((a, b) => b.value - a.value)
  }, [leads])

  const customerByCategory = useMemo(() => {
    const data: Record<string, Record<string, number>> = {}
    leads.forEach((lead: { customer_type: string; category: string | null }) => {
      if (!data[lead.customer_type]) data[lead.customer_type] = {}
      if (lead.category) {
        data[lead.customer_type][lead.category] =
          (data[lead.customer_type][lead.category] || 0) + 1
      }
    })
    return Object.entries(data).map(([customerType, categories]) => ({
      name: customerType.charAt(0).toUpperCase() + customerType.slice(1),
      value:
        (categories.automotive || 0) +
        (categories.appliance || 0) +
        (categories.industrial || 0) +
        (categories.marine || 0),
      color: customerTypeColors[customerType],
    }))
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
      <PageHeader title="Customer Analysis" description="Breakdown of leads by customer type">
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={customerData}
              centerLabel="Total"
              centerValue={totalLeads}
              height={320}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Quantity per Request</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={avgQuantityByCustomer} height={320} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads by Customer Type</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={customerByCategory} height={300} horizontal />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
