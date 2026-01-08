import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, ArrowLeft, Info, FlaskConical } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createSubmission } from '@/lib/supabase'

export function AddLead() {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isTesting, setIsTesting] = useState(false)
  const [testResponse, setTestResponse] = useState<unknown | null>(null)
  const [testError, setTestError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await createSubmission({
        text: text.trim(),
        source: 'manual',
      })

      if (result.success) {
        setSubmitStatus('success')
        setText('')
      } else {
        console.error('Error submitting:', result.error)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTestSubmission = async () => {
    if (!text.trim()) return

    setIsTesting(true)
    setTestResponse(null)
    setTestError(null)

    try {
      const params = new URLSearchParams({
        text: text.trim(),
        source: 'manual',
      })
      const response = await fetch(
        `https://n8n.srv902453.hstgr.cloud/webhook/9df067aa-2a9d-4c13-a37a-260accbf283e?${params}`,
        {
          method: 'GET',
        }
      )

      const data = await response.json()
      setTestResponse(data)
    } catch (error) {
      console.error('Error testing submission:', error)
      setTestError(error instanceof Error ? error.message : 'Failed to send test submission')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Lead</h1>
          <p className="text-sm text-muted-foreground">
            Submit a new repair request or customer inquiry
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Lead Details</CardTitle>
            <CardDescription>
              Enter the customer message, call notes, or repair request details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Joe from Smith Auto called about a 2018 Chevy Silverado TCM, transmission slipping, needs 2 units. They're a repair shop in Dallas."
              rows={6}
              required
              className="text-base placeholder:text-muted-foreground/40"
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 text-primary" />
              <span>
                Include as much detail as possible: year, make, model, part type, part number, symptoms, and quantity
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
                  Lead submitted successfully!
                </span>
              )}
              {submitStatus === 'error' && (
                <span className="text-sm text-red-500">
                  Error submitting lead. Please try again.
                </span>
              )}
              <Button
                type="button"
                variant="outline"
                disabled={isTesting || !text.trim()}
                size="lg"
                onClick={handleTestSubmission}
              >
                {isTesting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Testing...
                  </>
                ) : (
                  <>
                    <FlaskConical className="h-4 w-4" />
                    Test Submission
                  </>
                )}
              </Button>
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

        {/* Test Response Display */}
        {(testResponse || testError) && (
          <Card className="mt-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                {testError ? 'Test Error' : 'Test Response'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {testError ? (
                <div className="text-sm text-red-500">{testError}</div>
              ) : (
                <TestResponseDisplay response={testResponse} />
              )}
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  )
}

function TestResponseDisplay({ response }: { response: unknown }) {
  // Parse the nested response structure from n8n webhook
  const parseResponse = () => {
    try {
      // Get the content array - handle both array and object responses
      let contentArray: Array<{ type: string; text?: string }> | null = null

      if (Array.isArray(response) && response.length > 0 && response[0]?.content) {
        // Response is [{ content: [...] }]
        contentArray = response[0].content
      } else if (
        response &&
        typeof response === 'object' &&
        'content' in response &&
        Array.isArray((response as { content: unknown }).content)
      ) {
        // Response is { content: [...] }
        contentArray = (response as { content: Array<{ type: string; text?: string }> }).content
      }

      if (contentArray) {
        const textContent = contentArray.find((c) => c.type === 'text')
        if (textContent?.text) {
          // Extract JSON from markdown code block
          const jsonMatch = textContent.text.match(/```json\s*([\s\S]*?)\s*```/)
          if (jsonMatch && jsonMatch[1]) {
            return JSON.parse(jsonMatch[1].trim())
          }
          // Try parsing as raw JSON if no code block
          return JSON.parse(textContent.text)
        }
      }

      // Fallback: return the raw response
      return response
    } catch {
      return response
    }
  }

  const parsed = parseResponse()

  // If we successfully parsed the lead extraction data
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const fields = [
      { key: 'year', label: 'Year' },
      { key: 'make', label: 'Make' },
      { key: 'model', label: 'Model' },
      { key: 'part_type', label: 'Part Type' },
      { key: 'part_number', label: 'Part Number' },
      { key: 'symptoms', label: 'Symptoms' },
    ]

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {fields.map(({ key, label }) => (
            <div key={key} className="rounded-lg border border-border/50 bg-muted/30 p-3">
              <div className="text-xs font-medium text-muted-foreground">{label}</div>
              <div className="mt-1 text-sm font-medium">
                {(parsed as Record<string, unknown>)[key] != null
                  ? String((parsed as Record<string, unknown>)[key])
                  : <span className="text-muted-foreground italic">Not detected</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Fallback: show raw JSON
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-xs">
      {JSON.stringify(response, null, 2)}
    </pre>
  )
}
