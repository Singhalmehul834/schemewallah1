import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-foreground mb-4">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-foreground/70 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition font-semibold"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-background transition font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
