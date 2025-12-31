import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ArrowLeft, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { categories, sources, customerTypes } from '@/constants/categories'
import type { LeadCategory, LeadSource, CustomerType } from '@/types/lead'

interface FormData {
  source: LeadSource
  category: LeadCategory | ''
  year: string
  make: string
  model: string
  part_type: string
  part_number: string
  text: string
  symptoms: string
  customer_type: CustomerType
  quantity: string
  we_offer_this: string
}

const initialFormData: FormData = {
  source: 'manual',
  category: '',
  year: '',
  make: '',
  model: '',
  part_type: '',
  part_number: '',
  text: '',
  symptoms: '',
  customer_type: 'individual',
  quantity: '1',
  we_offer_this: '',
}

export function AddLead() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Build the lead object
      const lead = {
        source: formData.source,
        category: formData.category || null,
        year: formData.year ? parseInt(formData.year) : null,
        make: formData.make || null,
        model: formData.model || null,
        part_type: formData.part_type || null,
        part_number: formData.part_number?.toUpperCase() || null,
        text: formData.text || null,
        symptoms: formData.symptoms || null,
        customer_type: formData.customer_type,
        quantity: parseInt(formData.quantity) || 1,
        we_offer_this: formData.we_offer_this === '' ? null : formData.we_offer_this === 'true',
        confidence: 'medium' as const,
        date: new Date().toISOString().split('T')[0],
      }

      // TODO: Replace with actual Supabase insert
      // For now, just log and simulate success
      console.log('Submitting lead:', lead)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      setFormData(initialFormData)

      // Redirect after success
      setTimeout(() => navigate('/'), 2000)
    } catch (error) {
      console.error('Error submitting lead:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Lead</h1>
          <p className="text-sm text-muted-foreground">
            Manually enter lead information for processing
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Main Info */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Board Information</CardTitle>
              <CardDescription>
                Enter the raw text or structured information about the board
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Original Text / Description *</Label>
                <Textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="e.g., 2015 Ford F-150 PCM, Part# AL3A-12A650-AKB, truck won't start"
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Paste the customer's original message or describe the board
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="e.g., No start condition, check engine light, error code P0700"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="source">Source *</Label>
                  <Select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  >
                    {sources.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_type">Customer Type *</Label>
                  <Select
                    id="customer_type"
                    name="customer_type"
                    value={formData.customer_type}
                    onChange={handleChange}
                    required
                  >
                    {customerTypes.map((ct) => (
                      <option key={ct.value} value={ct.value}>
                        {ct.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Structured Data */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Structured Data</CardTitle>
              <CardDescription>
                Fill in known fields (optional - can be auto-extracted later)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category...</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    min="1900"
                    max="2100"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="e.g., 2015"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g., Ford, Whirlpool"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., F-150, WDT750SAHZ"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="part_type">Part Type</Label>
                  <Input
                    id="part_type"
                    name="part_type"
                    value={formData.part_type}
                    onChange={handleChange}
                    placeholder="e.g., PCM, TCM, control_board"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="part_number">Part Number</Label>
                  <Input
                    id="part_number"
                    name="part_number"
                    value={formData.part_number}
                    onChange={handleChange}
                    placeholder="e.g., AL3A-12A650-AKB"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="we_offer_this">We Offer This?</Label>
                  <Select
                    id="we_offer_this"
                    name="we_offer_this"
                    value={formData.we_offer_this}
                    onChange={handleChange}
                  >
                    <option value="">Unknown</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Section */}
        <Card className="mt-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>
                Missing fields will be auto-extracted by Claude during nightly processing
              </span>
            </div>

            <div className="flex items-center gap-3">
              {submitStatus === 'success' && (
                <span className="text-sm text-emerald-500">
                  Lead submitted successfully! Redirecting...
                </span>
              )}
              {submitStatus === 'error' && (
                <span className="text-sm text-red-500">
                  Error submitting lead. Please try again.
                </span>
              )}
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Lead
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
