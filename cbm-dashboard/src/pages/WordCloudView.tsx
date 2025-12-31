import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/layout/PageHeader'
import { WordCloudChart } from '@/components/charts/WordCloudChart'
import { getWordCloudData } from '@/data/mockLeads'

export function WordCloudView() {
  const symptomsData = useMemo(() => getWordCloudData('symptoms'), [])
  const makesData = useMemo(() => getWordCloudData('make'), [])
  const partTypesData = useMemo(() => getWordCloudData('part_type'), [])

  return (
    <div>
      <PageHeader
        title="Word Cloud Analysis"
        description="Visualize frequency patterns in your lead data"
      />

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
