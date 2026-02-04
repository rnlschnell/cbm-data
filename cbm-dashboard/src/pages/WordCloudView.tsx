import { useState, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/layout/PageHeader'
import { WordCloudChart } from '@/components/charts/WordCloudChart'
import { YearRangeFilter } from '@/components/filters/YearRangeFilter'
import { useLeadsData } from '@/hooks/useLeadsData'
import type { YearRange } from '@/types/filters'

export function WordCloudView() {
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null })

  const { getWordCloudData, isLoading, error } = useLeadsData({
    yearStart: yearRange.start ?? undefined,
    yearEnd: yearRange.end ?? undefined,
  })

  const symptomsData = useMemo(() => getWordCloudData('symptoms'), [getWordCloudData])
  const makesData = useMemo(() => getWordCloudData('make'), [getWordCloudData])
  const partTypesData = useMemo(() => getWordCloudData('part_type'), [getWordCloudData])

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
      <PageHeader title="Word Cloud Analysis" description="Visualize frequency patterns in your lead data">
        <YearRangeFilter value={yearRange} onChange={setYearRange} />
      </PageHeader>

      <Tabs defaultValue="symptoms" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="makes">Makes</TabsTrigger>
          <TabsTrigger value="parts">Part Types</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <CardTitle>Common Symptom Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <WordCloudChart data={symptomsData} height={500} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="makes">
          <Card>
            <CardHeader>
              <CardTitle>Makes by Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <WordCloudChart data={makesData} height={500} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle>Part Types by Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <WordCloudChart data={partTypesData} height={500} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
