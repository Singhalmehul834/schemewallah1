'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Users, Globe, Zap, MessageSquare, FileText, TrendingUp, Sparkles, Shield, Lightbulb } from 'lucide-react'

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-75"></div>
              <div className="relative bg-background p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <span className="font-bold text-xl gradient-text">SchemeWallah</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition">
              About
            </a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition">
              How It Works
            </a>
            <a href="#testimonials" className="text-foreground/70 hover:text-foreground transition">
              Testimonials
            </a>
          </nav>
          <Link href="/auth/login" className="hidden md:block px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition font-medium">
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-block mb-6 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 badge-premium">
                <p className="text-sm font-semibold text-secondary flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  AI-Powered Eligibility Checking
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                Find Every Government Scheme You{' '}
                <span className="gradient-text">Deserve</span>
              </h1>

              <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
                Discover 1000+ government schemes tailored to you in minutes. No confusion. No complicated forms. Just smart AI that understands your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/eligibility-checker"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-lg hover:translate-y-[-2px] transition-all inline-flex items-center justify-center gap-2 group"
                >
                  Start Eligibility Check
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  href="/browse-schemes"
                  className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition inline-flex items-center justify-center gap-2"
                >
                  Browse All Schemes
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold gradient-text">1000+</p>
                  <p className="text-xs text-foreground/60">Schemes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">28</p>
                  <p className="text-xs text-foreground/60">States</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">₹100Cr+</p>
                  <p className="text-xs text-foreground/60">Benefits</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl"></div>
              <Image
                src="/hero-image.png"
                alt="SchemeWallah Hero - Finding Government Schemes"
                width={500}
                height={500}
                priority
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-transparent via-primary/2 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Everything you need to discover and apply for government schemes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Chat Assistant',
                description: 'Ask any question about schemes and get instant answers powered by AI.',
                icon: MessageSquare,
                color: 'from-blue-500 to-blue-600',
              },
              {
                title: 'Smart Eligibility Checker',
                description: '10 simple questions to find schemes perfectly matched for you.',
                icon: CheckCircle,
                color: 'from-green-500 to-green-600',
              },
              {
                title: 'Browse 1000+ Schemes',
                description: 'Explore comprehensive catalog with filters, categories, and live deadlines.',
                icon: Globe,
                color: 'from-purple-500 to-purple-600',
              },
              {
                title: 'Document Checker',
                description: 'Get exact list of documents needed for any scheme instantly.',
                icon: FileText,
                color: 'from-orange-500 to-orange-600',
              },
              {
                title: 'Application Tracker',
                description: 'Track your submitted applications with real-time status updates.',
                icon: TrendingUp,
                color: 'from-pink-500 to-pink-600',
              },
              {
                title: 'Deadline Alerts',
                description: 'Never miss important scheme deadlines with smart notifications.',
                icon: Sparkles,
                color: 'from-indigo-500 to-indigo-600',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="card-premium p-6 hover-lift group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-foreground/5 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl blur-2xl"></div>
              <Image
                src="/about-image.png"
                alt="About SchemeWallah - Making Government Schemes Accessible"
                width={500}
                height={500}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>

            {/* Content */}
            <div className="animate-slide-up order-1 lg:order-2">
              <div className="badge-premium mb-4 w-fit">
                <span>About SchemeWallah</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Making Government Schemes{' '}
                <span className="gradient-text">Accessible to Everyone</span>
              </h2>

              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                India offers over 1000 government schemes worth ₹100+ crores annually, but most citizens don&apos;t know about them. Complex eligibility criteria, scattered information, and confusing application processes keep millions from accessing benefits they deserve.
              </p>

              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                SchemeWallah solves this with intelligent AI that understands your profile and instantly matches you with relevant schemes. We bring clarity to government benefits, making it simple for every Indian to discover and apply for schemes that can transform their lives.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Secure and verified information from official government sources' },
                  { icon: Lightbulb, text: 'Smart AI that learns and improves recommendations over time' },
                  { icon: Users, text: 'Built for all Indians across all states and backgrounds' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Real Impact on Real{' '}
                <span className="gradient-text">Lives</span>
              </h2>

              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                SchemeWallah has helped thousands of Indians access government benefits including scholarships, housing loans, skill training, and financial assistance. Every recommendation is backed by comprehensive eligibility verification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { number: '50K+', label: 'Users Helped' },
                  { number: '₹250Cr', label: 'Benefits Accessed' },
                  { number: '95%', label: 'Success Rate' },
                  { number: '2.5M', label: 'Schemes Matched' },
                ].map((stat, idx) => (
                  <div key={idx} className="card-premium p-6">
                    <p className="text-3xl font-bold gradient-text mb-2">{stat.number}</p>
                    <p className="text-foreground/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/browse-schemes"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2 group"
              >
                View Success Stories
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl"></div>
              <Image
                src="/impact-image.png"
                alt="Real Impact - Lives Changed by Government Schemes"
                width={500}
                height={500}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-transparent via-secondary/2 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Simple steps to discover your government benefits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create account or continue as guest', icon: Users },
              { step: 2, title: 'Answer Questions', desc: 'Tell us about yourself simply', icon: MessageSquare },
              { step: 3, title: 'Get Recommendations', desc: 'Receive matched schemes instantly', icon: Sparkles },
              { step: 4, title: 'Apply & Track', desc: 'Apply and monitor your progress', icon: TrendingUp },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative">
                  <div className="card-premium p-6 text-center hover-lift">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg">
                      {item.step}
                    </div>
                    <Icon className="w-6 h-6 text-primary mx-auto mb-3 opacity-50" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/70">{item.desc}</p>
                  </div>
                  {item.step < 4 && (
                    <div className="hidden md:flex absolute top-1/3 -right-3 items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-primary/30 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary/30" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-card/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Users Say</h2>
            <p className="text-lg text-foreground/60">Real stories from Indians who found schemes through SchemeWallah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Kumar',
                role: 'Student, Delhi',
                text: 'Found a scholarship I didn\'t know existed! SchemeWallah saved me ₹2 lakhs in college fees.',
                rating: 5,
              },
              {
                name: 'Rajesh Patel',
                role: 'Farmer, Gujarat',
                text: 'The eligibility checker helped me get a farming subsidy I qualified for. Life-changing!',
                rating: 5,
              },
              {
                name: 'Anjali Sharma',
                role: 'Entrepreneur, Mumbai',
                text: 'Got approved for a startup loan within days. Best decision to use SchemeWallah.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="card-premium p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Ready to Discover Your Schemes?</h2>
          <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
            Join 50,000+ Indians who&apos;ve already accessed government benefits they deserve. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/eligibility-checker"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-lg hover:translate-y-[-2px] transition-all inline-flex items-center justify-center gap-2 group"
            >
              Start Free Eligibility Check
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/browse-schemes"
              className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition inline-flex items-center justify-center"
            >
              Browse 1000+ Schemes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded blur opacity-50"></div>
                  <div className="relative bg-background p-2 rounded">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <span className="font-bold text-foreground gradient-text">SchemeWallah</span>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Making 1000+ government schemes accessible to every Indian citizen through intelligent AI matching.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <Link href="#features" className="hover:text-foreground transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/browse-schemes" className="hover:text-foreground transition">
                    Browse Schemes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <Link href="/eligibility-checker" className="hover:text-foreground transition">
                    Eligibility Checker
                  </Link>
                </li>
                <li>
                  <Link href="/ai-chat" className="hover:text-foreground transition">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="/document-checker" className="hover:text-foreground transition">
                    Document Checker
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms of Service
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
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-foreground/60">© 2025 SchemeWallah. All rights reserved.</p>
            <p className="text-sm text-foreground/60 mt-4 md:mt-0">Built with dedication for the Ideathon | Made with love for India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
