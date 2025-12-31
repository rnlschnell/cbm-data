import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Grid3X3,
  Cloud,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Users,
  Package,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Heatmap', href: '/heatmap', icon: Grid3X3 },
  { name: 'Word Cloud', href: '/wordcloud', icon: Cloud },
]

const analytics = [
  { name: 'By Source', href: '/analytics/source', icon: Layers },
  { name: 'By Category', href: '/analytics/category', icon: BarChart3 },
  { name: 'Customers', href: '/analytics/customers', icon: Users },
  { name: 'Products', href: '/analytics/products', icon: Package },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Service Gaps', href: '/gaps', icon: AlertCircle },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card/50 backdrop-blur-sm">
      <div className="flex h-full flex-col gap-4 p-4">
        <nav className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Views
          </p>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary glow-amber'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <Separator />

        <nav className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Analytics
          </p>
          {analytics.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary glow-amber'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">520</span> leads loaded
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Mock data · Jan-Dec 2024
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
