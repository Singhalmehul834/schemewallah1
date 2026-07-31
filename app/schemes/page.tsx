'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SCHEMES } from '@/lib/schemes-data'
import { getAllCategories, searchSchemes } from '@/lib/recommendation-engine'
import {
  Search,
  X,
  ChevronDown,
  CheckCircle,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  ExternalLink,
} from 'lucide-react'

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTargetAudience, setSelectedTargetAudience] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'newest' | 'popular'>('name')
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)

  const categories = getAllCategories()

  // Get unique target audiences
  const targetAudiences = useMemo(() => {
    const audiences = new Set<string>()
    SCHEMES.forEach((scheme) => {
      scheme.targetAudience.forEach((audience) => audiences.add(audience))
    })
    return Array.from(audiences).sort()
  }, [])

  // Filter and search schemes
  const filteredSchemes = useMemo(() => {
    let result = [...SCHEMES]

    if (searchQuery) {
      const matching = searchSchemes(searchQuery)
      result = result.filter((scheme) => matching.some((s) => s.id === scheme.id))
    }

    if (selectedCategory) {
      result = result.filter((scheme) => scheme.category === selectedCategory)
    }

    if (selectedTargetAudience) {
      result = result.filter((scheme) => scheme.targetAudience.includes(selectedTargetAudience))
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      // Reverse order for "newest"
      result.reverse()
    }

    return result
  }, [searchQuery, selectedCategory, selectedTargetAudience, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Browse Schemes</h1>
              <p className="text-foreground/70">Explore {SCHEMES.length}+ government schemes</p>
            </div>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition text-sm">
              Back to Dashboard
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search schemes by name, category, or benefit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Category
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === null
                        ? 'bg-primary text-white'
                        : 'hover:bg-background text-foreground/70'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'hover:bg-background text-foreground/70'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience Filter */}
              <div>
                <h3 className="font-bold text-foreground mb-3">Target Audience</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => setSelectedTargetAudience(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                      selectedTargetAudience === null
                        ? 'bg-primary text-white'
                        : 'hover:bg-background text-foreground/70'
                    }`}
                  >
                    All Audiences
                  </button>
                  {targetAudiences.map((audience) => (
                    <button
                      key={audience}
                      onClick={() => setSelectedTargetAudience(audience)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedTargetAudience === audience
                          ? 'bg-primary text-white'
                          : 'hover:bg-background text-foreground/70'
                      }`}
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="font-bold text-foreground mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Popular</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory || selectedTargetAudience || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedTargetAudience(null)
                    setSearchQuery('')
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-border hover:bg-background transition text-sm"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Schemes List */}
          <main className="lg:col-span-3">
            <div className="mb-4 text-sm text-foreground/70">
              Showing {filteredSchemes.length} of {SCHEMES.length} schemes
            </div>

            {filteredSchemes.length > 0 ? (
              <div className="space-y-4">
                {filteredSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition bg-card"
                  >
                    <button
                      onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                      className="w-full p-6 text-left hover:bg-background/50 transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">{scheme.name}</h3>
                          <p className="text-sm text-foreground/70 mb-3">{scheme.department}</p>
                          <p className="text-foreground/70 mb-3 line-clamp-2">{scheme.description}</p>

                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {scheme.category}
                            </span>
                            {scheme.targetAudience.slice(0, 2).map((audience) => (
                              <span key={audience} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                                {audience}
                              </span>
                            ))}
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-foreground/50 flex-shrink-0 transition-transform ${
                            expandedScheme === scheme.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {expandedScheme === scheme.id && (
                      <div className="border-t border-border px-6 py-6 bg-background/50 space-y-6">
                        {/* Eligibility */}
                        <div>
                          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-secondary" />
                            Eligibility Criteria
                          </h4>
                          <ul className="space-y-2">
                            {scheme.eligibility.map((criterion, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-foreground/70">
                                <span className="text-secondary">•</span>
                                {criterion}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h4 className="font-bold text-foreground mb-3">Key Benefits</h4>
                          <ul className="space-y-2">
                            {scheme.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-foreground/70">
                                <span className="text-secondary">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Financial & Timeline */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-4 h-4 text-primary" />
                              <p className="text-xs text-foreground/70">Financial Assistance</p>
                            </div>
                            <p className="font-bold text-foreground">{scheme.financialAssistance}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-secondary" />
                              <p className="text-xs text-foreground/70">Application Deadline</p>
                            </div>
                            <p className="font-bold text-foreground">{scheme.applicationDeadline}</p>
                          </div>
                        </div>

                        {/* Required Documents */}
                        <div>
                          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Required Documents
                          </h4>
                          <ul className="space-y-2">
                            {scheme.requiredDocuments.map((doc, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-foreground/70">
                                <span className="text-secondary">✓</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Contact Info */}
                        {(scheme.contactPhone || scheme.emailId) && (
                          <div>
                            <h4 className="font-bold text-foreground mb-3">Contact Information</h4>
                            <div className="space-y-2">
                              {scheme.contactPhone && (
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <Phone className="w-4 h-4" />
                                  {scheme.contactPhone}
                                </div>
                              )}
                              {scheme.emailId && (
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  📧 {scheme.emailId}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-border">
                          {scheme.applicationUrl && (
                            <a
                              href={scheme.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                            >
                              Apply Now
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-background transition font-semibold">
                            Save Scheme
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">No schemes found matching your search</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setSelectedTargetAudience(null)
                  }}
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
