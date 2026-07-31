'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, logout } from '@/lib/auth'
import {
  Menu,
  X,
  LogOut,
  MessageSquare,
  Search,
  Bookmark,
  FileCheck,
  MapPin,
  Bell,
  User,
  Home,
  Compass,
  Plus,
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
    } else {
      setUser(currentUser)
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 animate-pulse"></div>
          <p className="text-foreground/70">Loading...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'check-eligibility', label: 'Check Eligibility', icon: MessageSquare },
    { id: 'browse-schemes', label: 'Browse Schemes', icon: Compass },
    { id: 'saved-schemes', label: 'Saved Schemes', icon: Bookmark },
    { id: 'tracker', label: 'Application Tracker', icon: FileCheck },
    { id: 'documents', label: 'Documents', icon: FileCheck },
    { id: 'offices', label: 'Nearby Offices', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-background rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center text-sm">S</div>
              <span className="hidden sm:inline">SchemeWallah</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2 flex-1 max-w-xs">
              <Search className="w-4 h-4 text-foreground/50" />
              <input
                type="text"
                placeholder="Search schemes..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-foreground/50"
              />
            </div>
            <button className="p-2 hover:bg-background rounded-lg transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            <button onClick={handleLogout} className="p-2 hover:bg-background rounded-lg transition" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative top-16 md:top-0 left-0 z-30 w-64 bg-card border-r border-border h-[calc(100vh-64px)] md:h-screen overflow-y-auto transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-2">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-6">
              <p className="text-sm font-semibold text-foreground mb-1">Welcome!</p>
              <p className="text-sm text-foreground/70">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-foreground/50 mt-2">{user?.email}</p>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-background text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Home Tab */}
            {activeTab === 'home' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to SchemeWallah</h1>
                  <p className="text-foreground/70">Your AI-powered government scheme discovery assistant</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    href="#"
                    onClick={() => setActiveTab('check-eligibility')}
                    className="p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition bg-card group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Check Eligibility</h3>
                    <p className="text-sm text-foreground/70">Answer simple questions to get personalized recommendations</p>
                  </Link>

                  <Link
                    href="#"
                    onClick={() => setActiveTab('browse-schemes')}
                    className="p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition bg-card group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center mb-4 transition">
                      <Compass className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Browse Schemes</h3>
                    <p className="text-sm text-foreground/70">Explore all government schemes available to you</p>
                  </Link>

                  <Link
                    href="#"
                    onClick={() => setActiveTab('saved-schemes')}
                    className="p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition bg-card group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition">
                      <Bookmark className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Saved Schemes</h3>
                    <p className="text-sm text-foreground/70">View your saved schemes and application status</p>
                  </Link>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">How to Find Schemes You Deserve</h2>
                  <ol className="space-y-3 text-foreground/70">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">1.</span>
                      <span>Start the AI eligibility checker and answer simple questions about yourself</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">2.</span>
                      <span>Receive personalized recommendations with match percentages</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">3.</span>
                      <span>Save schemes and check required documents</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">4.</span>
                      <span>Apply directly through government portals with our guidance</span>
                    </li>
                  </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-bold text-foreground mb-3">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Total Schemes</span>
                        <span className="font-bold text-primary">1000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">States Covered</span>
                        <span className="font-bold text-secondary">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Categories</span>
                        <span className="font-bold text-accent">15+</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-bold text-foreground mb-3">Recent Activity</h3>
                    <div className="text-center text-foreground/50 py-8">
                      <p>No recent activity</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Check Eligibility Tab */}
            {activeTab === 'check-eligibility' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">AI Eligibility Checker</h1>
                  <p className="text-foreground/70">
                    Answer a few simple questions and our AI will recommend the best schemes for you
                  </p>
                </div>

                <div className="bg-card rounded-xl border border-border p-8 max-w-2xl">
                  <Link
                    href="/chatbot"
                    className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2 group"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Start Eligibility Check
                    <Plus className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </Link>

                  <div className="mt-8 space-y-4">
                    <h3 className="font-bold text-foreground">What to Prepare:</h3>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Your age and personal details</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Your state and occupation</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Annual family income (approximate)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Education level</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Browse Schemes Tab */}
            {activeTab === 'browse-schemes' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Browse All Schemes</h1>
                  <p className="text-foreground/70">Explore all available government schemes</p>
                </div>
                <Link
                  href="/schemes"
                  className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
                >
                  <Compass className="w-5 h-5" />
                  View All Schemes
                </Link>
              </div>
            )}

            {/* Other Tabs - Placeholder */}
            {['saved-schemes', 'tracker', 'documents', 'offices', 'profile'].includes(activeTab) && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
                <p className="text-foreground/70">
                  This feature is being developed. Check back soon!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
