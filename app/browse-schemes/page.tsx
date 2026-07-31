'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter, Calendar, Clock, ArrowLeft, BookOpen, Zap, Home, DollarSign, Sprout, Heart, Shield, Wifi } from 'lucide-react'
import { SCHEMES, SCHEME_CATEGORIES, TARGET_AUDIENCES } from '@/lib/schemes-data'

const categoryIcons: Record<string, any> = {
  'Skill Development': Briefcase,
  'Housing': Home,
  'Education & Scholarships': BookOpen,
  'Financial Inclusion': DollarSign,
  'Agriculture & Farming': Sprout,
  'Business & Entrepreneurship': Zap,
  'Employment & Labor': Users,
  'Women & Child Development': Heart,
  'Digital Infrastructure': Wifi,
  'Insurance & Protection': Shield,
}

export default function BrowmeSchemesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'deadline'>('deadline')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredSchemes = useMemo(() => {
    let result = SCHEMES.filter(scheme => {
      const matchesSearch =
        searchQuery === '' ||
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === null || scheme.category === selectedCategory

      const matchesAudience =
        selectedAudience === null || scheme.targetAudience.some(audience => audience.toLowerCase().includes(selectedAudience.toLowerCase()))

      return matchesSearch && matchesCategory && matchesAudience
    })

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      result.sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime())
    }

    return result
  }, [searchQuery, selectedCategory, selectedAudience, sortBy])

  const getDeadlineStatus = (deadline: string) => {
    if (deadline === 'Ongoing') return { status: 'ongoing', label: 'Ongoing', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' }

    const deadlineDate = new Date(deadline)
    const today = new Date()
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysLeft < 0) return { status: 'expired', label: 'Expired', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' }
    if (daysLeft <= 7) return { status: 'urgent', label: `${daysLeft} days left`, color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' }
    if (daysLeft <= 30) return { status: 'closing', label: `${daysLeft} days left`, color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' }

    return { status: 'open', label: `${daysLeft} days left`, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">Browse All Schemes</h1>
          <p className="text-foreground/60">Explore 1000+ government schemes with live deadline tracking</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search schemes by name, category, or audience..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-premium pl-12 w-full"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-foreground/60" />
              <span className="text-sm text-foreground/60">Filter by:</span>
            </div>

            {/* Category Selector */}
            <select
              value={selectedCategory || ''}
              onChange={e => setSelectedCategory(e.target.value || null)}
              className="input-premium py-2 px-3 text-sm"
            >
              <option value="">All Categories</option>
              {SCHEME_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Audience Selector */}
            <select
              value={selectedAudience || ''}
              onChange={e => setSelectedAudience(e.target.value || null)}
              className="input-premium py-2 px-3 text-sm"
            >
              <option value="">All Audiences</option>
              {TARGET_AUDIENCES.map(audience => (
                <option key={audience} value={audience}>
                  {audience}
                </option>
              ))}
            </select>

            {/* Sort & View Options */}
            <div className="ml-auto flex gap-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'name' | 'deadline')}
                className="input-premium py-2 px-3 text-sm"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-foreground/60 mb-6">
          Showing <span className="font-semibold text-foreground">{filteredSchemes.length}</span> scheme{filteredSchemes.length !== 1 ? 's' : ''}
        </p>

        {/* Schemes Grid/List */}
        <div className={`gap-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}`}>
          {filteredSchemes.map(scheme => {
            const deadlineStatus = getDeadlineStatus(scheme.applicationDeadline)
            return (
              <div key={scheme.id} className="card-premium hover-lift overflow-hidden group">
                {/* Top Badge */}
                <div className="h-1 bg-gradient-to-r from-primary to-secondary group-hover:h-2 transition-all duration-300"></div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">{scheme.name}</h3>
                      <p className="text-xs text-foreground/50 mt-1">{scheme.category}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{scheme.description}</p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border/30">
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">Financial Assistance</p>
                      <p className="font-semibold text-foreground text-sm">{scheme.financialAssistance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">Documents</p>
                      <p className="font-semibold text-foreground text-sm">{scheme.requiredDocuments.length} needed</p>
                    </div>
                  </div>

                  {/* Deadline Badge */}
                  <div className="mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${deadlineStatus.color}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{deadlineStatus.label}</span>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-4">
                    <p className="text-xs text-foreground/50 mb-2">For:</p>
                    <div className="flex flex-wrap gap-1">
                      {scheme.targetAudience.slice(0, 2).map(audience => (
                        <span key={audience} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {audience}
                        </span>
                      ))}
                      {scheme.targetAudience.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground">
                          +{scheme.targetAudience.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/scheme/${scheme.id}`} className="btn-primary flex-1 text-sm">
                      View Details
                    </Link>
                    <button className="px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <div className="card-premium p-12 text-center">
            <Search className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
            <p className="text-foreground/60 mb-4">No schemes found matching your filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedAudience(null)
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Import Briefcase at the top
import { Briefcase, Users } from 'lucide-react'
