import Link from 'next/link'
import { ArrowRight, Check, Sparkles, Brain, Lock, Download } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <SocialProof />
      <FeatureMemory />
      <FeatureModeration />
      <FeatureOwnership />
      <AntiFeatures />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  )
}

/* ─────────────────────────── NAV ─────────────────────────── */

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4">
      <div className="max-w-6xl mx-auto h-12 px-5 flex items-center justify-between glass border border-border/50 rounded-full">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-medium tracking-tight text-[15px]">Persona</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[13px] text-muted-foreground">
          <Link href="#memory" className="hover:text-foreground transition-colors">
            Memory
          </Link>
          <Link href="#moderation" className="hover:text-foreground transition-colors">
            Moderation
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] bg-foreground text-background hover:bg-foreground/90 transition-colors h-8 px-4 rounded-full font-medium flex items-center gap-1.5"
          >
            Get started
            <ArrowRight className="size-3" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
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

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-4">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className="reveal inline-flex items-center gap-2 mb-9 border border-border/80 bg-card/40 backdrop-blur-sm rounded-full pl-1 pr-4 py-1 text-[12px]"
        >
          <span className="bg-primary/15 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 text-[11px] font-medium">
            New
          </span>
          <span className="text-muted-foreground">
            Public beta — free tier with 100 msg/day
          </span>
          <ArrowRight className="size-3 text-muted-foreground/60" strokeWidth={2} />
        </div>

        {/* Headline */}
        <h1
          className="reveal text-[44px] sm:text-6xl lg:text-7xl xl:text-[88px] font-medium leading-[1.02] tracking-[-0.04em] max-w-5xl mx-auto mb-7"
          style={{ animationDelay: '60ms' }}
        >
          Character chat
          <br />
          that{' '}
          <span className="font-serif italic font-normal text-foreground/95">
            actually
          </span>{' '}
          <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            remembers.
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="reveal text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ animationDelay: '120ms' }}
        >
          Lorebooks, pinned memories, and live RAG over your full chat history.
          See exactly what the model can read, before it reads it.
        </p>

        {/* CTAs */}
        <div
          className="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          style={{ animationDelay: '180ms' }}
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all h-11 px-6 rounded-full text-[14px] font-medium w-full sm:w-auto justify-center"
          >
            Start for free
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </Link>
          <Link
            href="#memory"
            className="inline-flex items-center gap-2 border border-border bg-card/40 backdrop-blur-sm hover:bg-card transition-colors h-11 px-6 rounded-full text-[14px] w-full sm:w-auto justify-center"
          >
            See how it works
          </Link>
        </div>

        {/* Hero mockup */}
        <div className="reveal relative max-w-4xl mx-auto" style={{ animationDelay: '300ms' }}>
          <div className="absolute -inset-x-12 -top-8 -bottom-8 bg-primary/10 blur-3xl pointer-events-none rounded-full" />
          <ChatMockup />
        </div>
      </div>
    </section>
  )
}

function ChatMockup() {
  return (
    <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-border bg-surface/40">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
        </div>
        <div className="text-[11px] text-muted-foreground font-mono">
          persona.app — chat / aria
        </div>
        <div className="size-2 rounded-full bg-primary pulse-soft" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] min-h-[420px]">
        {/* Chat side */}
        <div className="border-r border-border p-5 space-y-5 text-left">
          {/* Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
            <div className="size-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20 flex items-center justify-center text-sm font-medium">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium">Aria</div>
              <div className="text-[11px] text-muted-foreground">
                forest spirit · deepseek-chat
              </div>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground bg-surface px-2 py-0.5 rounded-full border border-border">
              ~2.8k tok
            </div>
          </div>

          {/* Message — character */}
          <div className="flex gap-2.5">
            <div className="size-6 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-relaxed">
                <em className="text-muted-foreground italic">
                  *The forest stirs as you step beneath the canopy.*
                </em>
                <br />
                You&apos;ve found me, Elara. Few do without being called.
              </p>
            </div>
          </div>

          {/* Message — user */}
          <div className="flex gap-2.5 justify-end">
            <div className="bg-foreground text-background rounded-2xl rounded-tr-md px-3.5 py-2 max-w-[80%]">
              <p className="text-[13px] leading-relaxed">
                I&apos;m looking for the Ember Stone.
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary pulse-soft" />
            <span className="text-[12px]">Aria is writing…</span>
          </div>
        </div>

        {/* Memory side */}
        <div className="bg-surface/30 p-4 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Memory
            </span>
            <span className="text-[10px] font-mono text-primary">live</span>
          </div>

          <MemoryRow tag="lore" label="Thornwood — ancient forest" />
          <MemoryRow tag="lore" label="Aria — 2,000y old spirit" />
          <MemoryRow tag="trig" label="Ember Stone — legendary" highlight />
          <MemoryRow tag="pin" label="User name: Elara" />
          <MemoryRow tag="fact" label="Searching 3 weeks" />
          <MemoryRow tag="rag" label="msg #4: lost brother" />

          <div className="pt-3 border-t border-border/50 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Context</span>
              <span className="font-mono text-foreground">35%</span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <div className="h-full w-[35%] bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MemoryRow({
  tag,
  label,
  highlight,
}: {
  tag: string
  label: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] py-1 px-2 rounded-md transition-colors ${
        highlight ? 'bg-primary/10 border border-primary/20' : ''
      }`}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-wider w-9 ${
          highlight ? 'text-primary' : 'text-muted-foreground/70'
        }`}
      >
        {tag}
      </span>
      <span className="text-foreground/80 truncate">{label}</span>
    </div>
  )
}

/* ─────────────────────────── SOCIAL PROOF ─────────────────────────── */

function SocialProof() {
  return (
    <section className="relative py-16 border-y border-border bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-[12px] text-muted-foreground uppercase tracking-[0.18em] mb-10">
          Built on the model layer of
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground/70">
          {['OpenAI', 'Anthropic', 'DeepSeek', 'OpenRouter', 'Mistral', 'Google'].map(
            (name) => (
              <span
                key={name}
                className="text-xl font-medium tracking-tight hover:text-foreground transition-colors"
              >
                {name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── FEATURE: MEMORY ─────────────────────────── */

function FeatureMemory() {
  return (
    <section id="memory" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Memory"
          title={
            <>
              Long-term context, finally.{' '}
              <span className="text-muted-foreground">
                Your characters know who you are.
              </span>
            </>
          }
        />

        <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-7">
            <FeatureRow
              icon={<Brain className="size-4" />}
              title="Lorebooks with keyword triggers"
              desc="Define world info entries with keywords — they get injected automatically when relevant."
            />
            <FeatureRow
              icon={<Sparkles className="size-4" />}
              title="Pinned memories never get evicted"
              desc="Click to pin any message or fact. It stays in context for the lifetime of the chat."
            />
            <FeatureRow
              icon={<Brain className="size-4" />}
              title="Auto fact extraction every 5 turns"
              desc="A background job distills the conversation into atomic facts and embeds them for retrieval."
            />
            <FeatureRow
              icon={<Sparkles className="size-4" />}
              title="Live memory inspector"
              desc='Click "What can the AI see?" at any time. Full prompt, in your hands. No black box.'
            />
          </div>

          <div className="order-1 lg:order-2">
            <MemoryInspectorMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function MemoryInspectorMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 h-10 border-b border-border bg-surface/40">
          <span className="text-[11px] font-mono text-muted-foreground">
            inspector.tsx
          </span>
          <span className="text-[11px] font-mono text-primary">live</span>
        </div>
        <div className="p-5 space-y-4">
          {[
            { tag: 'always', count: 2, items: ['Thornwood — ancient forest bordering Vael', 'Aria — 2,000-year-old forest spirit'] },
            { tag: 'triggered', count: 1, items: ['Ember Stone — restarts a dead star'] },
            { tag: 'pinned', count: 2, items: ["User's character: Elara", 'Searching for 3 weeks'] },
            { tag: 'extracted', count: 4, items: ['Aria recognized Elara without being told'] },
            { tag: 'rag', count: 3, items: ['msg #4 · "I lost my brother in the war."'] },
          ].map((s) => (
            <div key={s.tag}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                    {s.tag}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    [{s.count}]
                  </span>
                </div>
              </div>
              <div className="space-y-1 pl-3 border-l border-border/50">
                {s.items.map((it, i) => (
                  <div key={i} className="text-[12px] text-muted-foreground leading-relaxed">
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-border bg-surface/40 flex items-center justify-between text-[11px] font-mono">
          <span className="text-muted-foreground">total</span>
          <span className="text-foreground">~2,840 / 8,000 tokens</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── FEATURE: MODERATION ─────────────────────────── */

function FeatureModeration() {
  return (
    <section id="moderation" className="relative py-32 px-6 border-t border-border bg-surface/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Moderation"
          title={
            <>
              Two tiers. Honest defaults.{' '}
              <span className="text-muted-foreground">No silent rerouting.</span>
            </>
          }
        />

        <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ModerationMockup />
          </div>
          <div className="space-y-7">
            <FeatureRow
              icon={<Lock className="size-4" />}
              title="SFW by default, predictable"
              desc="PG-13. No explicit content. No surprise filtering inside the bounds. The model stays in character."
            />
            <FeatureRow
              icon={<Lock className="size-4" />}
              title="Adult mode is age-verified, opt-in"
              desc="Date of birth, explicit toggle, audit logged. Adults get adult content. Within hard limits."
            />
            <FeatureRow
              icon={<Lock className="size-4" />}
              title="Hard limits in both modes"
              desc="Sexual content involving minors, real-person sexual content, real-world harm instructions — never. Period."
            />
            <FeatureRow
              icon={<Lock className="size-4" />}
              title="Every block has a reason"
              desc="If something is filtered, you see the category, the rule, and what would unlock it."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ModerationMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-2 border-b border-border">
          <div className="p-5 border-r border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-medium">SFW mode</span>
              <span className="size-2 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-2">
              {['romance', 'mystery', 'fantasy combat', 'dialogue'].map((x) => (
                <div key={x} className="flex items-center gap-2 text-[11px]">
                  <Check className="size-3 text-emerald-400" strokeWidth={2.5} />
                  <span className="text-muted-foreground">{x}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-medium">Adult mode</span>
              <span className="size-2 rounded-full bg-primary" />
            </div>
            <div className="space-y-2">
              {['everything in SFW', 'explicit content', 'graphic violence', 'mature themes'].map((x) => (
                <div key={x} className="flex items-center gap-2 text-[11px]">
                  <Check className="size-3 text-primary" strokeWidth={2.5} />
                  <span className="text-muted-foreground">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5 bg-surface/30">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Hard limits — both modes
          </div>
          <div className="space-y-2">
            {[
              'Sexual content involving minors',
              'Real-person sexual content',
              'Real-world harm instructions',
            ].map((x) => (
              <div key={x} className="flex items-center gap-2 text-[11px]">
                <span className="size-3 flex items-center justify-center rounded-full bg-destructive/15 border border-destructive/30">
                  <span className="size-1.5 bg-destructive rounded-full" />
                </span>
                <span className="text-muted-foreground">{x}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── FEATURE: OWNERSHIP ─────────────────────────── */

function FeatureOwnership() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Ownership"
          title={
            <>
              Standard formats end-to-end.{' '}
              <span className="text-muted-foreground">Bring it. Take it.</span>
            </>
          }
        />

        <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <FeatureRow
              icon={<Download className="size-4" />}
              title="Tavern v2 card import"
              desc="Drop a PNG with embedded JSON, or paste raw JSON. Years of community work, instantly available."
            />
            <FeatureRow
              icon={<Download className="size-4" />}
              title="SillyTavern world info compatible"
              desc="Lorebooks import directly. Your existing universe comes with you."
            />
            <FeatureRow
              icon={<Download className="size-4" />}
              title="Bring your own API key (Pro)"
              desc="OpenAI, Anthropic, OpenRouter — use your own keys. We pass them through; we don't store usage."
            />
            <FeatureRow
              icon={<Download className="size-4" />}
              title="Full export, anytime"
              desc="Characters, chats, memories — one click, full JSON. No API friction. No retention games."
            />
          </div>
          <div>
            <CodeMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function CodeMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 h-10 border-b border-border bg-surface/40">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-primary/15 border border-primary/30 rounded-sm flex items-center justify-center">
              <span className="text-[8px] font-mono text-primary">{'{}'}</span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              aria.character.json
            </span>
          </div>
          <span className="text-[11px] font-mono text-primary">v2 spec</span>
        </div>
        <pre className="p-5 text-[12px] font-mono leading-relaxed overflow-x-auto custom-scroll">
          <code>
            <span className="text-muted-foreground/60">{'{'}</span>
            {'\n  '}
            <span className="text-primary">&quot;spec&quot;</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-emerald-400">&quot;chara_card_v2&quot;</span>
            <span className="text-muted-foreground">,</span>
            {'\n  '}
            <span className="text-primary">&quot;data&quot;</span>
            <span className="text-muted-foreground">: {'{'}</span>
            {'\n    '}
            <span className="text-primary">&quot;name&quot;</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-emerald-400">&quot;Aria&quot;</span>
            <span className="text-muted-foreground">,</span>
            {'\n    '}
            <span className="text-primary">&quot;description&quot;</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-emerald-400">&quot;An ancient forest...&quot;</span>
            <span className="text-muted-foreground">,</span>
            {'\n    '}
            <span className="text-primary">&quot;character_book&quot;</span>
            <span className="text-muted-foreground">: {'{'}</span>
            {'\n      '}
            <span className="text-primary">&quot;entries&quot;</span>
            <span className="text-muted-foreground">: [...]</span>
            {'\n    '}
            <span className="text-muted-foreground">{'},'}</span>
            {'\n    '}
            <span className="text-primary">&quot;tags&quot;</span>
            <span className="text-muted-foreground">: [</span>
            <span className="text-emerald-400">&quot;fantasy&quot;</span>
            <span className="text-muted-foreground">]</span>
            {'\n  '}
            <span className="text-muted-foreground">{'}'}</span>
            {'\n'}
            <span className="text-muted-foreground/60">{'}'}</span>
          </code>
        </pre>
      </div>
    </div>
  )
}

/* ─────────────────────────── ANTI-FEATURES ─────────────────────────── */

function AntiFeatures() {
  return (
    <section className="relative py-32 px-6 border-t border-border bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] uppercase tracking-[0.18em] text-primary mb-4">
            Anti-features
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight max-w-3xl mx-auto">
            What we&apos;re committing{' '}
            <span className="font-serif italic text-muted-foreground">not</span> to do.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-2 max-w-3xl mx-auto">
          {[
            ['Silent content filtering', 'If we block something, we tell you exactly why.'],
            ['Waiting rooms', 'If capacity is constrained, we degrade honestly with a banner.'],
            ['Artificial slow mode', "Real rate limits exist and are visible. We don't manufacture friction."],
            ['Hiding what the AI sees', 'The full prompt is always inspectable.'],
            ['Treating adults like children', 'Adults in adult mode get adult content.'],
            ['Lorebook behind a paywall', 'Memory is the core feature. Free gets it.'],
            ['Character card lock-in', 'Your characters export in standard formats.'],
            ['Dismissing community feedback', 'Public roadmap. Public changelog.'],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-3 py-4 border-t border-border first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
              <div className="shrink-0 mt-0.5 size-5 rounded-full border border-destructive/30 bg-destructive/10 flex items-center justify-center">
                <span className="block w-2 h-px bg-destructive" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium leading-tight mb-1">{title}</div>
                <div className="text-[13px] text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── PRICING ─────────────────────────── */

function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] uppercase tracking-[0.18em] text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight max-w-3xl mx-auto mb-4">
            Three tiers.{' '}
            <span className="font-serif italic text-muted-foreground">No tricks.</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Free is genuinely usable — we don&apos;t degrade it to push upgrades.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <PriceCard
            tier="Free"
            price="$0"
            unit="forever"
            tagline="For getting started."
            features={[
              '100 messages / day',
              '20 lorebook entries',
              '3 personas',
              'Group chats up to 3 characters',
              'SFW mode',
              'Full import & export',
              'All memory features',
            ]}
            cta="Start free"
            href="/signup"
          />
          <PriceCard
            tier="Plus"
            price="$9"
            unit="per month"
            tagline="Adult mode + unlimited."
            highlighted
            features={[
              'Unlimited messages',
              'Unlimited lorebook',
              'Unlimited personas',
              'Group chats up to 8',
              '3 model choices',
              'Adult mode (age-verified)',
              'Priority queue',
            ]}
            cta="Get Plus"
            href="/signup?plan=plus"
          />
          <PriceCard
            tier="Pro"
            price="$19"
            unit="per month"
            tagline="Bring your own keys."
            features={[
              'Everything in Plus',
              'Bring-your-own-key',
              'OpenAI / Anthropic / OpenRouter',
              '256k max context window',
              'Early access features',
            ]}
            cta="Get Pro"
            href="/signup?plan=pro"
          />
        </div>
      </div>
    </section>
  )
}

function PriceCard({
  tier,
  price,
  unit,
  tagline,
  features,
  cta,
  href,
  highlighted,
}: {
  tier: string
  price: string
  unit: string
  tagline: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
}) {
  return (
    <div
      className={`relative rounded-2xl p-7 ${
        highlighted
          ? 'bg-card border border-primary/30 ring-1 ring-primary/20'
          : 'bg-card/40 border border-border'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">
          Most popular
        </div>
      )}
      <div className="mb-5">
        <div className="text-[13px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
          {tier}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-medium tracking-tighter">{price}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <p className="text-sm text-muted-foreground">{tagline}</p>
      </div>

      <Link
        href={href}
        className={`block text-center font-medium text-[14px] h-10 rounded-full transition-colors mb-7 flex items-center justify-center gap-1.5 ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:opacity-90'
            : 'bg-foreground text-background hover:bg-foreground/90'
        }`}
      >
        {cta}
        <ArrowRight className="size-3.5" strokeWidth={2.25} />
      </Link>

      <ul className="space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
            <Check
              className={`size-4 shrink-0 mt-0.5 ${highlighted ? 'text-primary' : 'text-foreground/60'}`}
              strokeWidth={2.25}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────── FINAL CTA ─────────────────────────── */

function FinalCta() {
  return (
    <section className="relative py-32 px-6 border-t border-border">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tighter leading-[1.05] mb-6">
          Stop fighting your tools.{' '}
          <span className="font-serif italic text-muted-foreground">
            Start writing.
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Free tier, no credit card, full memory features from day one.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 transition-colors h-12 px-7 rounded-full text-[15px] font-medium"
        >
          Create your account
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.25}
          />
        </Link>
        <p className="text-xs text-muted-foreground mt-5 font-mono">
          60-second onboarding · cancel anytime
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────── FOOTER ─────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="font-medium tracking-tight">Persona</span>
            </Link>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Character chat that actually remembers.
            </p>
          </div>
          <FooterCol
            label="Product"
            items={['Memory', 'Moderation', 'Characters', 'Pricing', 'Changelog']}
          />
          <FooterCol
            label="Resources"
            items={['Quickstart', 'Card spec', 'Lorebook spec', 'API', 'Roadmap']}
          />
          <FooterCol label="Company" items={['About', 'Blog', 'Contact', 'Status']} />
          <FooterCol label="Legal" items={['Terms', 'Privacy', 'Content policy', 'Security']} />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Persona. All rights reserved.</span>
          <div className="flex items-center gap-2 font-mono">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>All systems operational</span>
            <span className="text-border ml-2">·</span>
            <span className="ml-2">v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-[12px] font-medium mb-4">{label}</div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────── SHARED ─────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: React.ReactNode
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="text-[12px] uppercase tracking-[0.18em] text-primary mb-4">
        {eyebrow}
      </p>
      <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
        {title}
      </h2>
    </div>
  )
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 size-9 rounded-lg bg-card border border-border flex items-center justify-center text-foreground">
        {icon}
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <div className="text-[15px] font-medium mb-1.5">{title}</div>
        <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
