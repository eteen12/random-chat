'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up Supabase auth
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1
          className="text-2xl font-bold tracking-tight mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Already have one?{' '}
          <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        {/* Google OAuth */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 bg-surface hover:bg-surface-elevated border border-border text-foreground rounded-md py-2.5 text-sm font-medium transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full bg-input border border-border rounded-md px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create account
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-muted-foreground/60 mt-4">
        Free forever. No credit card required.
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
