import { Cpu, Zap, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
              <Zap className="h-2.5 w-2.5 text-black" />
            </div>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight">
              <span className="gradient-text">CBM</span>
              <span className="text-foreground"> LEADS</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/add"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add New</span>
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 md:flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Live Data Sync</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
            CB
          </div>
        </div>
      </div>
    </header>
  )
}
