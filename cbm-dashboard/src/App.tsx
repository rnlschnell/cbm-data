import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { testConnection } from '@/lib/supabase'
import { Dashboard } from '@/pages/Dashboard'
import { HeatmapView } from '@/pages/HeatmapView'
import { TopRequests } from '@/pages/TopRequests'
import { AnalyticsBySource } from '@/pages/AnalyticsBySource'
import { AnalyticsByCategory } from '@/pages/AnalyticsByCategory'
import { CustomerAnalysis } from '@/pages/CustomerAnalysis'
import { TopProducts } from '@/pages/TopProducts'
import { Trends } from '@/pages/Trends'
import { ServiceGaps } from '@/pages/ServiceGaps'
import { AddLead } from '@/pages/AddLead'
import { CanonicalValues } from '@/pages/CanonicalValues'

function App() {
  useEffect(() => {
    testConnection().then((result) => {
      console.log('Supabase connection test:', result)
    })
  }, [])

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddLead />} />
          <Route path="/heatmap" element={<HeatmapView />} />
          <Route path="/requests" element={<TopRequests />} />
          <Route path="/analytics/source" element={<AnalyticsBySource />} />
          <Route path="/analytics/category" element={<AnalyticsByCategory />} />
          <Route path="/analytics/customers" element={<CustomerAnalysis />} />
          <Route path="/analytics/products" element={<TopProducts />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/gaps" element={<ServiceGaps />} />
          <Route path="/settings/values" element={<CanonicalValues />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
