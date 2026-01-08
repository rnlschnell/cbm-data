import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, X, Save, Trash2, ChevronDown, ChevronRight, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import {
  fetchCanonicalValues,
  createCanonicalValue,
  updateCanonicalValue,
  deleteCanonicalValue,
} from '@/lib/supabase'
import type { CanonicalValue, CanonicalValueType, CanonicalCategory } from '@/types/canonicalValue'

const CATEGORIES: { value: CanonicalCategory; label: string }[] = [
  { value: 'automotive', label: 'Automotive' },
  { value: 'appliance', label: 'Appliance' },
  { value: 'marine', label: 'Marine' },
  { value: 'industrial', label: 'Industrial' },
]

export function CanonicalValues() {
  const [values, setValues] = useState<CanonicalValue[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<CanonicalValueType>('make')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // New value form state
  const [newName, setNewName] = useState('')
  const [newAliases, setNewAliases] = useState('')
  const [newCategory, setNewCategory] = useState<CanonicalCategory>('automotive')
  const [newParent, setNewParent] = useState('')

  useEffect(() => {
    loadValues()
  }, [])

  async function loadValues() {
    setLoading(true)
    const data = await fetchCanonicalValues()
    setValues(data)
    setLoading(false)
  }

  // Memoize filtered values to prevent recalculation on every render
  const filteredValues = useMemo(() => {
    let filtered = values.filter((v) => v.type === activeTab)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.aliases.some((a) => a.toLowerCase().includes(query)) ||
          (v.parent_value && v.parent_value.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [values, activeTab, searchQuery])

  const makes = useMemo(() => values.filter((v) => v.type === 'make'), [values])

  const handleAddValue = useCallback(async () => {
    if (!newName.trim()) return

    setSaving(true)
    setMessage(null)

    const aliases = newAliases
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean)

    const result = await createCanonicalValue({
      type: activeTab,
      name: newName.trim(),
      aliases,
      category: newCategory,
      parent_value: activeTab === 'model' && newParent ? newParent : null,
    })

    if (result.success) {
      setMessage({ type: 'success', text: `${newName} added successfully` })
      setNewName('')
      setNewAliases('')
      setNewParent('')
      loadValues()
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to add value' })
    }

    setSaving(false)
  }, [newName, newAliases, activeTab, newCategory, newParent])

  const handleUpdateAliases = useCallback(async (id: string, aliases: string[]) => {
    const result = await updateCanonicalValue(id, { aliases })
    if (result.success) {
      loadValues()
    }
  }, [])

  const handleDelete = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    const result = await deleteCanonicalValue(id)
    if (result.success) {
      setMessage({ type: 'success', text: `${name} deleted` })
      loadValues()
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete' })
    }
  }, [])

  const handleUpdateCategory = useCallback(async (id: string, category: CanonicalCategory) => {
    const result = await updateCanonicalValue(id, { category })
    if (result.success) {
      loadValues()
    }
  }, [])

  const getTabLabel = useCallback((type: CanonicalValueType) => {
    const count = values.filter((v) => v.type === type).length
    switch (type) {
      case 'make':
        return `Makes (${count})`
      case 'model':
        return `Models (${count})`
      case 'part_type':
        return `Part Types (${count})`
    }
  }, [values])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Canonical Values</h1>
          <p className="text-sm text-muted-foreground">
            Configure makes, models, and part types for AI extraction
          </p>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600'
              : 'bg-red-500/10 text-red-600'
          }`}
        >
          {message.text}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CanonicalValueType)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="make">{getTabLabel('make')}</TabsTrigger>
          <TabsTrigger value="model">{getTabLabel('model')}</TabsTrigger>
          <TabsTrigger value="part_type">{getTabLabel('part_type')}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-6">
          {/* Add New Value Form */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                Add New {activeTab === 'make' ? 'Make' : activeTab === 'model' ? 'Model' : 'Part Type'}
              </CardTitle>
              <CardDescription>
                Add a canonical value with optional aliases (comma-separated)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {activeTab === 'make' ? 'Make' : activeTab === 'model' ? 'Model' : 'Part Type'} Name
                  </Label>
                  <Input
                    id="name"
                    placeholder={
                      activeTab === 'make'
                        ? 'e.g., Chevrolet'
                        : activeTab === 'model'
                          ? 'e.g., F-150'
                          : 'e.g., TIPM'
                    }
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aliases">Aliases (comma-separated)</Label>
                  <Input
                    id="aliases"
                    placeholder={
                      activeTab === 'make'
                        ? 'e.g., Chevy, Duramax, Vortec'
                        : activeTab === 'model'
                          ? 'e.g., f150, f 150'
                          : 'e.g., tipum, totally integrated power module'
                    }
                    value={newAliases}
                    onChange={(e) => setNewAliases(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CanonicalCategory)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {activeTab === 'model' && (
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Make</Label>
                    <select
                      id="parent"
                      value={newParent}
                      onChange={(e) => setNewParent(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select a make...</option>
                      {makes.map((make) => (
                        <option key={make.id} value={make.name}>
                          {make.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <Button onClick={handleAddValue} disabled={saving || !newName.trim()}>
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add {activeTab === 'make' ? 'Make' : activeTab === 'model' ? 'Model' : 'Part Type'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Values List */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Existing {activeTab === 'make' ? 'Makes' : activeTab === 'model' ? 'Models' : 'Part Types'}
                  </CardTitle>
                  <CardDescription>
                    Click on aliases to remove them, or add new ones
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or alias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : filteredValues.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  {searchQuery ? (
                    <>No results for "{searchQuery}"</>
                  ) : (
                    <>No {activeTab === 'make' ? 'makes' : activeTab === 'model' ? 'models' : 'part types'} added yet</>
                  )}
                </div>
              ) : (
                <div className="space-y-3 contain-layout">
                  {CATEGORIES.map((category) => {
                    const categoryValues = filteredValues.filter((v) => v.category === category.value)
                    if (categoryValues.length === 0) return null

                    return (
                      <CategorySection
                        key={category.value}
                        category={category}
                        values={categoryValues}
                        onUpdateAliases={handleUpdateAliases}
                        onDelete={handleDelete}
                        onUpdateCategory={handleUpdateCategory}
                        activeTab={activeTab}
                      />
                    )
                  })}

                  {/* Values without category */}
                  {filteredValues.filter((v) => !v.category).length > 0 && (
                    <CategorySection
                      category={{ value: 'automotive' as CanonicalCategory, label: 'Uncategorized' }}
                      values={filteredValues.filter((v) => !v.category)}
                      onUpdateAliases={handleUpdateAliases}
                      onDelete={handleDelete}
                      onUpdateCategory={handleUpdateCategory}
                      activeTab={activeTab}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CategorySectionProps {
  category: { value: CanonicalCategory; label: string }
  values: CanonicalValue[]
  onUpdateAliases: (id: string, aliases: string[]) => void
  onDelete: (id: string, name: string) => void
  onUpdateCategory: (id: string, category: CanonicalCategory) => void
  activeTab: CanonicalValueType
}

const CategorySection = memo(function CategorySection({
  category,
  values,
  onUpdateAliases,
  onDelete,
  onUpdateCategory,
  activeTab,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50"
      >
        <span className="font-medium">
          {category.label} ({values.length})
        </span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="max-h-96 space-y-2 overflow-y-auto border-t border-border/50 p-3 will-change-scroll">
          {values.map((value) => (
            <ValueRow
              key={value.id}
              value={value}
              onUpdateAliases={onUpdateAliases}
              onDelete={onDelete}
              onUpdateCategory={onUpdateCategory}
              activeTab={activeTab}
            />
          ))}
        </div>
      )}
    </div>
  )
})

interface ValueRowProps {
  value: CanonicalValue
  onUpdateAliases: (id: string, aliases: string[]) => void
  onDelete: (id: string, name: string) => void
  onUpdateCategory: (id: string, category: CanonicalCategory) => void
  activeTab: CanonicalValueType
}

const ValueRow = memo(function ValueRow({ value, onUpdateAliases, onDelete }: ValueRowProps) {
  const [isAddingAlias, setIsAddingAlias] = useState(false)
  const [newAlias, setNewAlias] = useState('')

  const handleAddAlias = useCallback(() => {
    if (!newAlias.trim()) return
    onUpdateAliases(value.id, [...value.aliases, newAlias.trim()])
    setNewAlias('')
    setIsAddingAlias(false)
  }, [newAlias, onUpdateAliases, value.id, value.aliases])

  const handleRemoveAlias = useCallback((index: number) => {
    onUpdateAliases(
      value.id,
      value.aliases.filter((_, i) => i !== index)
    )
  }, [onUpdateAliases, value.id, value.aliases])

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/30 p-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <span className="font-medium">{value.name}</span>

        {value.parent_value && (
          <Badge variant="outline" className="text-xs">
            {value.parent_value}
          </Badge>
        )}

        <span className="text-muted-foreground">|</span>

        {value.aliases.map((alias, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => handleRemoveAlias(i)}
          >
            {alias}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}

        {isAddingAlias ? (
          <div className="flex items-center gap-1">
            <Input
              autoFocus
              className="h-7 w-32 text-xs"
              placeholder="Add alias..."
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddAlias()
                if (e.key === 'Escape') setIsAddingAlias(false)
              }}
              onBlur={() => {
                if (!newAlias.trim()) setIsAddingAlias(false)
              }}
            />
            <Button size="sm" variant="ghost" className="h-7 px-2" onClick={handleAddAlias}>
              <Save className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingAlias(true)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            + add alias
          </button>
        )}
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        onClick={() => onDelete(value.id, value.name)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
})
