import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockLeads } from '@/data/mockLeads'
import { formatDate } from '@/lib/utils'
import type { LeadCategory, ConfidenceLevel } from '@/types/lead'

export function RecentLeads() {
  const recentLeads = mockLeads.slice(0, 8)

  return (
    <Card className="opacity-0 animate-fade-in stagger-5">
      <CardHeader>
        <CardTitle className="text-lg">Recent Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {lead.make} {lead.model}
                  </span>
                  <Badge variant={lead.category as LeadCategory}>{lead.category}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{lead.part_type}</span>
                  <span>·</span>
                  <span className="capitalize">{lead.source}</span>
                  <span>·</span>
                  <span>{formatDate(lead.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={lead.confidence as ConfidenceLevel} className="text-[10px]">
                  {lead.confidence}
                </Badge>
                {lead.we_offer_this === false && (
                  <div className="h-2 w-2 rounded-full bg-red-500" title="Service Gap" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
