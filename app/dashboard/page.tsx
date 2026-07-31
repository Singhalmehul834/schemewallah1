'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogOut, Sparkles, BookOpen, CheckCircle2, FileText, TrendingUp, MessageSquare, Search, Bookmark, Bell, Settings } from 'lucide-react'

export default function DashboardPage() {
  const [user] = useState({ name: 'Priya Kumar', email: 'priya@example.com' })

  const features = [
    {
      id: 'chat',
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Ask questions about any government scheme',
      href: '/ai-chat',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'eligibility',
      icon: CheckCircle2,
      title: 'Eligibility Checker',
      description: 'Find schemes you qualify for instantly',
      href: '/eligibility-checker',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'browse',
      icon: BookOpen,
      title: 'Browse All Schemes',
      description: '1000+ schemes with live deadline tracking',
      href: '/browse-schemes',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'documents',
      icon: FileText,
      title: 'Document Checker',
      description: 'Find required documents instantly',
      href: '/document-checker',
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'tracker',
      icon: TrendingUp,
      title: 'Application Tracker',
      description: 'Track your scheme applications',
      href: '/application-tracker',
      color: 'from-pink-500 to-pink-600',
    },
    {
      id: 'saved',
      icon: Bookmark,
      title: 'Saved Schemes',
      description: 'Your bookmarked schemes and progress',
      href: '/saved-schemes',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-75"></div>
              <div className="relative bg-background p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold gradient-text">SchemeWallah</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-foreground/5 rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-foreground/40" />
              <input type="text" placeholder="Quick search..." className="bg-transparent outline-none text-sm w-32" />
            </div>
            <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/profile" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-foreground" />
            </Link>
            <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="card-premium p-8 mb-12 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-4xl font-bold gradient-text mb-2">Welcome back, {user.name}!</h2>
                <p className="text-foreground/60 max-w-2xl">
                  Explore government schemes tailored to your profile, check eligibility instantly, and track your applications all in one place.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Available Schemes', value: '1000+' },
                { label: 'Your Matches', value: '47' },
                { label: 'Applications', value: '3' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-background/50 rounded-lg p-4 border border-border/30">
                  <p className="text-sm text-foreground/60 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">All Features</h3>
            <p className="text-foreground/60">Everything you need to find and apply for government schemes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.id}
                  href={feature.href}
                  className="group card-premium p-6 hover-lift relative overflow-hidden transition-all"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`inline-p-3 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                        <Icon className="w-6 h-6" style={{ color: feature.color.split('-')[1] }} />
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">{feature.title}</h4>
                    <p className="text-sm text-foreground/60 mb-4">{feature.description}</p>

                    {/* Action */}
                    <div className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      <span>Get Started</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="card-premium p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Application Approved', scheme: 'Pradhan Mantri Jan Dhan Yojana', date: '2 days ago' },
              { action: 'Eligibility Check Done', scheme: 'PMKVY Skill Training', date: '5 days ago' },
              { action: 'Document Uploaded', scheme: 'National Scholarship Portal', date: '1 week ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-foreground/60">{activity.scheme}</p>
                </div>
                <p className="text-xs text-foreground/50 whitespace-nowrap">{activity.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
