'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Globe, Zap } from 'lucide-react'

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
              S
            </div>
            <span className="font-bold text-xl text-foreground">SchemeWallah</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#stats" className="text-foreground/70 hover:text-foreground transition">
              Impact
            </a>
            <a href="#benefits" className="text-foreground/70 hover:text-foreground transition">
              Benefits
            </a>
          </nav>
          <Link href="/auth/login" className="hidden md:block px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition">
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
            <p className="text-sm font-semibold text-secondary flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI-Powered Government Scheme Discovery
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            Find Every Government Scheme You{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Deserve
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto text-balance">
            Discover government schemes in minutes with AI-powered eligibility checking. No confusion. No paperwork. Just answers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition inline-flex items-center justify-center gap-2 group"
            >
              Check My Eligibility
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/schemes"
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition inline-flex items-center justify-center gap-2"
            >
              Explore Schemes
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-lg bg-secondary/10 text-secondary font-semibold hover:bg-secondary/20 transition inline-flex items-center justify-center gap-2"
            >
              Continue as Guest
            </Link>
          </div>

          {/* Stats */}
          <div
            id="stats"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 p-8 rounded-2xl bg-card border border-border"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">1000+</p>
              <p className="text-sm text-foreground/70">Government Schemes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary mb-2">AI</p>
              <p className="text-sm text-foreground/70">Powered Matching</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent mb-2">5 Mins</p>
              <p className="text-sm text-foreground/70">To Find Schemes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">Free</p>
              <p className="text-sm text-foreground/70">For Everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-card/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">Powerful Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Eligibility Checker',
                description: 'Answer simple questions and get personalized scheme recommendations instantly.',
                icon: Zap,
              },
              {
                title: 'Comprehensive Database',
                description: 'Access 1000+ government schemes across all categories and states.',
                icon: Globe,
              },
              {
                title: 'Smart Matching',
                description: 'Get schemes perfectly matched to your profile with eligibility explanations.',
                icon: CheckCircle,
              },
              {
                title: 'Save & Track',
                description: 'Save your favorite schemes and track application status in one place.',
                icon: Users,
              },
              {
                title: 'Document Checklist',
                description: 'Get personalized document requirements for each scheme.',
                icon: CheckCircle,
              },
              {
                title: 'Multiple Languages',
                description: 'Access the platform in your preferred language.',
                icon: Globe,
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create an account or continue as guest' },
              { step: 2, title: 'Answer Questions', desc: 'Tell us about yourself in simple language' },
              { step: 3, title: 'Get Matches', desc: 'Receive personalized scheme recommendations' },
              { step: 4, title: 'Apply Now', desc: 'Get guidance and apply for schemes' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-4xl text-primary/30">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Find Your Schemes?</h2>
          <p className="text-xl text-foreground/70 mb-10">Join thousands of Indians discovering the government benefits they deserve.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition inline-flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/schemes"
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition"
            >
              Explore All Schemes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold">S</div>
                <span className="font-bold text-foreground">SchemeWallah</span>
              </div>
              <p className="text-sm text-foreground/70">Making government schemes accessible to every Indian citizen.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-foreground/70">© 2025 SchemeWallah. All rights reserved.</p>
            <p className="text-sm text-foreground/70 mt-4 md:mt-0">Built for the Ideathon | Made with ❤️ for India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
