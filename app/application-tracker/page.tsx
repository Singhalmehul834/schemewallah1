'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, FileCheck, Plus } from 'lucide-react'
import { ApplicationTracker, SCHEMES } from '@/lib/schemes-data'

interface MockApplication {
  id: string
  schemeId: string
  schemeName: string
  status: 'submitted' | 'under_review' | 'approved' | 'rejected'
  submittedDate: string
  progress: number
  lastUpdated: string
}

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState<MockApplication[]>([])
  const [filter, setFilter] = useState<'all' | 'submitted' | 'under_review' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    // Mock applications
    const mockApps: MockApplication[] = [
      {
        id: '1',
        schemeId: 'scheme-001',
        schemeName: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
        status: 'under_review',
        submittedDate: '2025-07-15',
        progress: 65,
        lastUpdated: '2025-07-28',
      },
      {
        id: '2',
        schemeId: 'scheme-003',
        schemeName: 'National Scholarship Portal',
        status: 'submitted',
        submittedDate: '2025-07-20',
        progress: 30,
        lastUpdated: '2025-07-25',
      },
      {
        id: '3',
        schemeId: 'scheme-004',
        schemeName: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
        status: 'approved',
        submittedDate: '2025-06-10',
        progress: 100,
        lastUpdated: '2025-07-10',
      },
    ]
    setApplications(mockApps)
  }, [])

  const filteredApplications = filter === 'all' ? applications : applications.filter(app => app.status === filter)

  const statusConfig = {
    submitted: {
      icon: Clock,
      label: 'Submitted',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    under_review: {
      icon: AlertCircle,
      label: 'Under Review',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    approved: {
      icon: CheckCircle2,
      label: 'Approved',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    rejected: {
      icon: AlertCircle,
      label: 'Rejected',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">Application Tracker</h1>
          <p className="text-foreground/60">Track the status of your scheme applications in real-time</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters & Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(['all', 'submitted', 'under_review', 'approved', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status ? 'bg-primary text-white' : 'bg-card border border-border/50 text-foreground hover:bg-foreground/5'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: applications.length, icon: FileCheck },
            { label: 'Under Review', value: applications.filter(a => a.status === 'under_review').length, icon: Clock },
            { label: 'Approved', value: applications.filter(a => a.status === 'approved').length, icon: CheckCircle2 },
            { label: 'Pending', value: applications.filter(a => a.status === 'submitted').length, icon: AlertCircle },
          ].map((card, idx) => (
            <div key={idx} className="card-premium p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">{card.label}</p>
                  <p className="text-3xl font-bold gradient-text">{card.value}</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30"></div>
                  <div className="relative bg-background p-2 rounded-lg">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => {
              const config = statusConfig[application.status]
              const StatusIcon = config.icon
              return (
                <div key={application.id} className="card-premium p-6 hover-lift">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${config.bg}`}>
                          <StatusIcon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-foreground">{application.schemeName}</h3>
                          <p className="text-sm text-foreground/60">Submitted: {application.submittedDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-foreground/60">Progress</p>
                      <p className="text-sm font-semibold text-foreground">{application.progress}%</p>
                    </div>
                    <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
                        style={{ width: `${application.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Details & Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="text-sm text-foreground/60">
                      Last updated: <span className="font-medium text-foreground">{application.lastUpdated}</span>
                    </div>
                    <div className="ml-auto flex gap-3">
                      <button className="px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium">
                        Upload Docs
                      </button>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <div className="flex gap-2 text-xs">
                      {[
                        { label: 'Submitted', active: true },
                        { label: 'Verification', active: ['under_review', 'approved'].includes(application.status) },
                        { label: 'Approval', active: application.status === 'approved' },
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${step.active ? 'bg-primary' : 'bg-foreground/20'}`}
                          />
                          {idx < 2 && <div className={`w-4 h-px ${step.active ? 'bg-primary' : 'bg-foreground/20'}`} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="card-premium p-12 text-center">
              <FileCheck className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
              <p className="text-foreground/60 mb-4">No applications with this status yet</p>
              <Link href="/schemes" className="btn-primary inline-block">
                Browse Schemes
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
