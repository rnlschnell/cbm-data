import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatNumber, formatPercent } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number | string
  change?: number
  icon: LucideIcon
  iconColor?: string
  delay?: number
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
  delay = 0,
}: MetricCardProps) {
  const isPositive = change && change > 0
  const displayValue = typeof value === 'number' ? formatNumber(value) : value

  return (
    <Card
      className={cn(
        'opacity-0 animate-fade-in card-shine',
        delay === 1 && 'stagger-1',
        delay === 2 && 'stagger-2',
        delay === 3 && 'stagger-3',
        delay === 4 && 'stagger-4'
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="font-display text-3xl font-bold tracking-tight">{displayValue}</p>
            {change !== undefined && (
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {formatPercent(change)} from last month
              </div>
            )}
          </div>
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-lg',
              'bg-secondary/50'
            )}
          >
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
