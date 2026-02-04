import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { YearRange } from '@/types/filters'

interface YearRangeFilterProps {
  value: YearRange
  onChange: (range: YearRange) => void
  className?: string
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 31 }, (_, i) => currentYear - i)

export function YearRangeFilter({ value, onChange, className }: YearRangeFilterProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <div className="flex items-center gap-2">
        <Label htmlFor="year-start" className="text-sm text-muted-foreground whitespace-nowrap">
          Year Range:
        </Label>
        <Select
          id="year-start"
          value={value.start?.toString() ?? ''}
          onChange={(e) =>
            onChange({
              ...value,
              start: e.target.value ? parseInt(e.target.value, 10) : null,
            })
          }
        >
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>

      <span className="text-muted-foreground">to</span>

      <Select
        id="year-end"
        value={value.end?.toString() ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            end: e.target.value ? parseInt(e.target.value, 10) : null,
          })
        }
      >
        <option value="">All</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </div>
  )
}
