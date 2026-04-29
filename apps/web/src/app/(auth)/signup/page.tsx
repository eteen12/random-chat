'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react'

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Create your account</h1>
        <p className="text-[14px] text-muted-foreground">
          Already have one?{' '}
          <Link href="/login" className="text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary">
            Sign in
          </Link>
        </p>
      </div>

      <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-7 shadow-2xl">
        <button className="w-full h-11 flex items-center justify-center gap-2.5 border border-border bg-background/40 hover:bg-accent transition-colors rounded-lg text-[14px] font-medium">
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full bg-background border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 h-11 text-[14px] placeholder:text-muted-foreground/40 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full bg-background border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 h-11 text-[14px] placeholder:text-muted-foreground/40 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 transition-colors rounded-lg text-[14px] font-medium flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <span className="flex gap-1">
                <span className="size-1.5 rounded-full bg-background animate-pulse [animation-delay:0ms]" />
                <span className="size-1.5 rounded-full bg-background animate-pulse [animation-delay:150ms]" />
                <span className="size-1.5 rounded-full bg-background animate-pulse [animation-delay:300ms]" />
              </span>
            ) : (
              <>
                Create account
                <ArrowRight className="size-3.5" strokeWidth={2.25} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border space-y-2">
          {[
            'No credit card required',
            '100 messages per day, free forever',
            'Full memory features included',
          ].map((s) => (
            <div key={s} className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <Check className="size-3.5 text-primary" strokeWidth={2.5} />
              {s}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[12px] text-muted-foreground mt-6">
        By continuing, you agree to our{' '}
        <Link href="#" className="hover:text-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground">
          Terms
        </Link>
        {' '}and{' '}
        <Link href="#" className="hover:text-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
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
