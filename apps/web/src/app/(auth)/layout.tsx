import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />

      <header className="relative z-10 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-medium tracking-tight text-[15px]">Persona</span>
        </Link>
        <Link
          href="/"
          className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        {children}
      </main>

      <footer className="relative z-10 px-6 h-14 flex items-center justify-center text-[12px] text-muted-foreground">
        <Link href="#" className="hover:text-foreground transition-colors">
          Terms
        </Link>
        <span className="mx-3 text-border">·</span>
        <Link href="#" className="hover:text-foreground transition-colors">
          Privacy
        </Link>
        <span className="mx-3 text-border">·</span>
        <Link href="#" className="hover:text-foreground transition-colors">
          Help
        </Link>
      </footer>
    </div>
  )
}

function Logo() {
  return (
    <div className="relative size-6 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary rounded-md" />
      <div className="absolute inset-[3px] bg-background rounded-[3px]" />
      <div className="absolute inset-[6px] bg-primary rounded-sm" />
    </div>
  )
}
