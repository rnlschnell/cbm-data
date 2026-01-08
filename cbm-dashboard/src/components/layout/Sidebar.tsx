import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Grid3X3,
  ListOrdered,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Users,
  Package,
  Layers,
  X,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Heatmap', href: '/heatmap', icon: Grid3X3 },
  { name: 'Top Requests', href: '/requests', icon: ListOrdered },
]

const analytics = [
  { name: 'By Source', href: '/analytics/source', icon: Layers },
  { name: 'By Category', href: '/analytics/category', icon: BarChart3 },
  { name: 'Customers', href: '/analytics/customers', icon: Users },
  { name: 'Products', href: '/analytics/products', icon: Package },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Service Gaps', href: '/gaps', icon: AlertCircle },
]

const settings = [
  { name: 'Canonical Values', href: '/settings/values', icon: Settings },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-full flex-col gap-4 p-4">
          <nav className="space-y-1">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Views
            </p>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
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
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
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
              Settings
            </p>
            {settings.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
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
    </>
  )
}
