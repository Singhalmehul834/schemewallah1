'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signupUser, loginAsGuest } from '@/lib/auth'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const result = signupUser(email, password, name)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Signup failed')
    }

    setLoading(false)
  }

  const handleGuestLogin = () => {
    loginAsGuest()
    router.push('/dashboard')
  }

  return (
    <div>
      <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
            S
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-foreground/70">Join SchemeWallah and discover schemes you deserve</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-foreground/50 hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-foreground/60 mt-1">At least 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="space-y-3 mb-6 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <p className="text-sm text-foreground/70">Personalized scheme recommendations</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <p className="text-sm text-foreground/70">Save and track your applications</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <p className="text-sm text-foreground/70">Get deadline reminders</p>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-foreground/70">Or continue as</span>
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full px-4 py-3 rounded-lg border border-border hover:bg-background transition text-foreground font-medium"
        >
          Guest User
        </button>

        <div className="mt-6 text-center">
          <p className="text-foreground/70">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
