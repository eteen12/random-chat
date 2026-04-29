import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, oklch(61% 0.24 277 / 8%) 0%, transparent 70%)',
        }}
      />

      <header className="relative z-10 flex items-center justify-center py-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Persona
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      <footer className="relative z-10 text-center py-6 text-xs text-muted-foreground/60">
        By signing up you agree to our{' '}
        <Link href="#" className="hover:text-muted-foreground underline-offset-2 underline">
          Terms
        </Link>{' '}
        and{' '}
        <Link href="#" className="hover:text-muted-foreground underline-offset-2 underline">
          Privacy Policy
        </Link>
      </footer>
    </div>
  )
}
