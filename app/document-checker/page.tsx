'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, FileText, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import { SCHEMES } from '@/lib/schemes-data'

export default function DocumentCheckerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScheme, setSelectedScheme] = useState<(typeof SCHEMES)[0] | null>(null)

  const filteredSchemes = useMemo(() => {
    if (!searchQuery) return SCHEMES
    return SCHEMES.filter(
      scheme =>
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">Document Checker</h1>
          <p className="text-foreground/60">Find all required documents for any government scheme instantly</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!selectedScheme ? (
          <>
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search scheme name or category..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="input-premium pl-12 w-full"
                />
              </div>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map(scheme => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme)}
                  className="card-premium p-6 text-left hover-lift group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative bg-background p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{scheme.name}</h3>
                      <p className="text-xs text-foreground/50 mt-1">{scheme.requiredDocuments.length} documents</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60 line-clamp-2">{scheme.description}</p>
                  <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-2 text-sm text-primary group-hover:translate-x-1 transition-transform">
                    <span>View Documents</span>
                    <span className="text-lg">→</span>
                  </div>
                </button>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
                <p className="text-foreground/60">No schemes found matching your search</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => setSelectedScheme(null)}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 hover-scale"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Schemes
            </button>

            {/* Scheme Details */}
            <div className="card-premium p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50"></div>
                  <div className="relative bg-background p-3 rounded-lg">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{selectedScheme.name}</h1>
                  <p className="text-foreground/60 mb-4">{selectedScheme.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="badge-premium">{selectedScheme.category}</span>
                    <span className="badge-premium">Department: {selectedScheme.department}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Required Documents</h2>
                <div className="space-y-3">
                  {selectedScheme.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="card-premium p-5 flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {doc.name}
                          {doc.optional && <span className="text-xs ml-2 text-foreground/50">(Optional)</span>}
                        </h3>
                        <p className="text-sm text-foreground/60">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-premium p-6">
                  <h3 className="font-bold text-lg mb-3 text-foreground">Application Deadline</h3>
                  <p className="text-2xl font-bold gradient-text">{selectedScheme.applicationDeadline}</p>
                </div>
                <div className="card-premium p-6">
                  <h3 className="font-bold text-lg mb-3 text-foreground">Contact Information</h3>
                  <p className="text-sm text-foreground/60 mb-2">Phone:</p>
                  <p className="text-lg font-semibold text-foreground">{selectedScheme.contactPhone}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link href={selectedScheme.applicationUrl || '#'} target="_blank" className="btn-primary flex-1">
                  Apply Now
                </Link>
                <button
                  onClick={() => {
                    const docList = selectedScheme.requiredDocuments.map(d => d.name).join('\n')
                    const text = `${selectedScheme.name} - Required Documents:\n\n${docList}`
                    const element = document.createElement('a')
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
                    element.setAttribute('download', `${selectedScheme.name}-documents.txt`)
                    element.style.display = 'none'
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }}
                  className="btn-secondary flex-1"
                >
                  Download Checklist
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
