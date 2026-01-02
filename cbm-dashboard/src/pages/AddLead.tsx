import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, ArrowLeft, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function AddLead() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Build the lead object - only text is required
      // All other fields will be extracted by Claude API
      const lead = {
        text: text.trim(),
        source: 'manual' as const,
        date: new Date().toISOString().split('T')[0],
      }

      // TODO: Send to extract-lead Edge Function
      // The function will:
      // 1. Call Claude API to extract structured data
      // 2. Insert the enriched lead into Supabase
      console.log('Submitting lead for extraction:', lead)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      setText('')

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
            Enter lead details and Claude will extract the structured data
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Lead Details</CardTitle>
            <CardDescription>
              Paste the customer message, call notes, or describe the repair request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Joe from Smith Auto called about a 2018 Chevy Silverado TCM, transmission slipping, needs 2 units. They're a repair shop in Dallas."
              rows={6}
              required
              className="text-base"
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>
                Claude will automatically extract: category, year, make, model, part type, part number, symptoms, customer type, and quantity
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              Lead will be dated today and marked as manually entered
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
              <Button type="submit" disabled={isSubmitting || !text.trim()} size="lg">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Add Lead
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
