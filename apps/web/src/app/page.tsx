import Link from 'next/link'
import { ArrowRight, Brain, Shield, Download, Check, X, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -10%, oklch(61% 0.24 277 / 12%) 0%, transparent 70%),
            linear-gradient(oklch(21% 0.018 275) 1px, transparent 1px),
            linear-gradient(90deg, oklch(21% 0.018 275) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Persona
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#compare" className="hover:text-foreground transition-colors">
            vs Character.AI
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center gap-1.5"
          >
            Get started free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Now in early access — free tier available
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The character chat platform
          <br />
          <span className="text-primary">that actually remembers.</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Real lorebooks. Pinned memories. Transparent context. Characters that stay in character.
          No waiting rooms. No silent filters. No guessing what the AI can see.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors text-sm"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#compare"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-elevated border border-border text-foreground px-6 py-3 rounded-md font-medium transition-colors text-sm"
          >
            See what's different
          </Link>
        </div>

        {/* Hero code block — the memory transparency feature */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl text-left">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span
                className="text-xs text-muted-foreground ml-2 font-mono"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                What the AI currently sees
              </span>
            </div>
            <div
              className="p-4 text-xs leading-6 font-mono space-y-1"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <div className="text-muted-foreground">// System context</div>
              <div>
                <span className="text-primary">▸ Character</span>
                <span className="text-muted-foreground"> Aria — always active</span>
              </div>
              <div>
                <span className="text-yellow-400">▸ Triggered lore</span>
                <span className="text-muted-foreground">
                  {' '}
                  &quot;Thornwood&quot; → [forest history entry]
                </span>
              </div>
              <div>
                <span className="text-green-400">▸ Pinned</span>
                <span className="text-muted-foreground"> &quot;User&apos;s name is Elara&quot;</span>
              </div>
              <div>
                <span className="text-blue-400">▸ Extracted facts</span>
                <span className="text-muted-foreground"> 4 remembered</span>
              </div>
              <div>
                <span className="text-purple-400">▸ History RAG</span>
                <span className="text-muted-foreground"> 3 relevant snippets recalled</span>
              </div>
              <div className="text-muted-foreground">// 14 recent messages verbatim</div>
              <div className="pt-1 text-muted-foreground/60">
                estimated prompt: ~4,200 tokens · context: 8k
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built around three principles
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything else is a nice-to-have. These three are the product.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <PillarCard
            icon={<Brain className="w-5 h-5" />}
            number="01"
            title="Memory that works"
            description="Lorebooks with keyword triggers. Pinned facts that never get evicted. Auto-extracted entities. RAG over your full chat history. A live panel that shows you exactly what the AI remembers right now."
            items={[
              'Lorebook entries with keyword matching',
              'Pinned memories — always in context',
              'Auto fact extraction every 5 turns',
              'Vector search over full chat history',
              '"What can the AI see?" live inspector',
            ]}
            accent="violet"
          />
          <PillarCard
            icon={<Shield className="w-5 h-5" />}
            number="02"
            title="Honest moderation"
            description="Two tiers — SFW (default) and Adult (age-gated). If something is blocked, you're told why. No silent rerouting. Hard limits apply to both tiers with no exceptions."
            items={[
              'SFW mode: PG-13, no surprises',
              'Adult mode: age-verified toggle',
              'Hard limits: minors, real persons — no exceptions',
              'Every block has an explanation',
              'No silent rerouting or character softening',
            ]}
            accent="blue"
          />
          <PillarCard
            icon={<Download className="w-5 h-5" />}
            number="03"
            title="You own your stuff"
            description="Import character cards from SillyTavern. Export in the same format. Full JSON data export. Bring your own API key on Pro. No lock-in, no proprietary formats."
            items={[
              'Tavern v2 card import (PNG + JSON)',
              'Export in the same open format',
              'Full chat history export',
              'Bring-your-own API key (Pro)',
              'Model choice on paid tiers',
            ]}
            accent="green"
          />
        </div>
      </section>

      {/* What we don't do */}
      <section id="compare" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What we don&apos;t do
            </h2>
            <p className="text-muted-foreground">
              This is the list we put on our roadmap and promised to keep.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['Silent content filtering', 'If we block something, we tell you exactly why.'],
              ['Waiting rooms', 'If capacity is constrained, we degrade honestly with a banner.'],
              ['Artificial slow mode', 'Rate limits are real and shown plainly — not manufactured friction.'],
              ['Hiding what the AI sees', 'The full prompt is always inspectable. No black box.'],
              ['Treating adults like children', 'Adults in adult mode get adult content. Simple.'],
              ['Lorebook as a paid feature', 'Every user gets lorebooks. Memory is the core, not an upsell.'],
              ['Character card lock-in', 'Your characters export in a format any tool can read.'],
              ['Dismissing community feedback', 'We have a public changelog and we actually respond.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="flex gap-3 p-4 rounded-lg bg-card border border-border hover:border-border/60 transition-colors"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/15 flex items-center justify-center mt-0.5">
                  <X className="w-3 h-3 text-destructive" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-0.5">{title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Straightforward pricing
          </h2>
          <p className="text-muted-foreground">
            Free tier is genuinely usable. No degradation strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <PricingCard
            name="Free"
            price="$0"
            description="Everything you need to get started. No tricks."
            features={[
              '100 messages / day',
              'All memory features',
              'Lorebook (20 entries)',
              '3 personas',
              'Group chats (3 chars)',
              'Full import/export',
              'SFW mode',
            ]}
            cta="Start free"
            href="/signup"
          />
          <PricingCard
            name="Plus"
            price="$9"
            description="Unlimited messages and adult mode."
            features={[
              'Unlimited messages',
              'Adult mode (age-verified)',
              '3 model choices',
              'Unlimited lorebook',
              'Unlimited personas',
              'Group chats (8 chars)',
              'Priority queue',
            ]}
            cta="Get Plus"
            href="/signup?plan=plus"
            highlighted
          />
          <PricingCard
            name="Pro"
            price="$19"
            description="Bring your own keys. Full control."
            features={[
              'Everything in Plus',
              'Bring-your-own API key',
              'OpenAI / Anthropic / OpenRouter',
              'Longest context window',
              'Early access features',
            ]}
            cta="Get Pro"
            href="/signup?plan=pro"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-12">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Start for free today
          </h2>
          <p className="text-muted-foreground mb-8">
            Import your existing character cards. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-md font-medium transition-colors text-sm"
          >
            Create your account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <span>Persona</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Changelog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PillarCard({
  icon,
  number,
  title,
  description,
  items,
  accent,
}: {
  icon: React.ReactNode
  number: string
  title: string
  description: string
  items: string[]
  accent: 'violet' | 'blue' | 'green'
}) {
  const accentClass = {
    violet: 'text-primary bg-primary/10 border-primary/20',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    green: 'text-green-400 bg-green-400/10 border-green-400/20',
  }[accent]

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-border/60 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${accentClass}`}>
          {icon}
        </div>
        <span className="text-xs font-mono text-muted-foreground/50">{number}</span>
      </div>
      <h3
        className="text-lg font-semibold mb-2 tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  highlighted,
}: {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-6 border transition-colors ${
        highlighted
          ? 'bg-primary/5 border-primary/40 ring-1 ring-primary/20'
          : 'bg-card border-border hover:border-border/60'
      }`}
    >
      {highlighted && (
        <div className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-0.5 mb-4 w-fit">
          Most popular
        </div>
      )}
      <div className="mb-4">
        <div
          className="text-lg font-semibold mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {name}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== '$0' && <span className="text-sm text-muted-foreground">/month</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{description}</p>
      </div>
      <Link
        href={href}
        className={`block text-center text-sm font-medium py-2.5 rounded-md mb-6 transition-colors ${
          highlighted
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
            : 'bg-secondary hover:bg-secondary/80 text-foreground'
        }`}
      >
        {cta}
      </Link>
      <ul className="space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
