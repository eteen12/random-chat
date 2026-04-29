'use client'

import { useState, useRef } from 'react'
import { Upload, ArrowRight, Eye, EyeOff, Globe, Lock, Tag, X, FileJson } from 'lucide-react'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'identity', label: 'Identity' },
  { id: 'personality', label: 'Personality' },
  { id: 'context', label: 'Context' },
  { id: 'settings', label: 'Settings' },
]

export default function NewCharacterPage() {
  const [activeSection, setActiveSection] = useState('identity')
  const [form, setForm] = useState({
    name: '',
    description_md: '',
    system_prompt_md: '',
    greeting_md: '',
    example_dialog_md: '',
    visibility: 'private' as 'private' | 'unlisted' | 'public',
    nsfw: false,
    tags: [] as string[],
    avatar_url: null as string | null,
  })
  const [tagInput, setTagInput] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const avatarRef = useRef<HTMLInputElement>(null)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function addTag(e: React.KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
      if (!form.tags.includes(tag) && form.tags.length < 10) {
        update('tags', [...form.tags, tag])
      }
      setTagInput('')
    }
  }

  function handleCardDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleCardFile(file)
  }

  function handleCardFile(file: File) {
    // TODO: parse Tavern v2 PNG or JSON and populate form
    console.warn('Card import: TODO wire up @persona/character-card', file.name)
  }

  async function handleSave() {
    setSaving(true)
    // TODO: POST to /api/characters
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="h-full overflow-y-auto custom-scroll">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-bold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              New character
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a character from scratch or import a Tavern card.
            </p>
          </div>

          {/* Card import */}
          <div>
            <input
              ref={fileRef}
              type="file"
              accept=".png,.json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleCardFile(e.target.files[0])}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 text-sm bg-surface hover:bg-surface-elevated border border-border rounded-md px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileJson className="w-4 h-4" />
              Import card
            </button>
          </div>
        </div>

        {/* Card import drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleCardDrop}
          className={cn(
            'border-2 border-dashed rounded-xl px-6 py-5 mb-8 text-center transition-colors cursor-pointer',
            dragOver
              ? 'border-primary/60 bg-primary/5'
              : 'border-border hover:border-border/60 bg-surface/30 hover:bg-surface/50'
          )}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Drop a Tavern v2 PNG or JSON here to import
          </p>
          <p className="text-xs text-muted-foreground/50 mt-1">
            Supports .png (embedded card) and .json (raw card data)
          </p>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 mb-6 bg-surface rounded-lg p-1 w-fit">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                activeSection === s.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {/* IDENTITY */}
          {activeSection === 'identity' && (
            <>
              {/* Avatar + Name row */}
              <div className="flex gap-5 items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <input ref={avatarRef} type="file" accept="image/*" className="hidden" />
                  <button
                    onClick={() => avatarRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-surface transition-colors flex items-center justify-center group"
                  >
                    {form.avatar_url ? (
                      <img
                        src={form.avatar_url}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center mt-1">Avatar</p>
                </div>

                {/* Name */}
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Character name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <p className="text-xs text-muted-foreground/50">
                    What users will see. Can be a name, title, or concept.
                  </p>
                </div>
              </div>

              {/* Description */}
              <FormField
                label="Description"
                hint="Who is this character? Their appearance, background, core traits. Supports markdown."
                required
              >
                <textarea
                  placeholder="A centuries-old forest spirit with eyes like starlight..."
                  value={form.description_md}
                  onChange={(e) => update('description_md', e.target.value)}
                  rows={5}
                  className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
                <CharCount value={form.description_md} max={10000} />
              </FormField>
            </>
          )}

          {/* PERSONALITY */}
          {activeSection === 'personality' && (
            <>
              <FormField
                label="System prompt"
                hint="Instructions for how the character should behave. Written to the model, not to the user."
              >
                <textarea
                  placeholder="You are Aria, an ancient forest spirit. Speak with warmth and mystery. Use nature metaphors..."
                  value={form.system_prompt_md}
                  onChange={(e) => update('system_prompt_md', e.target.value)}
                  rows={6}
                  className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none font-mono text-[13px]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
                <CharCount value={form.system_prompt_md} max={10000} />
              </FormField>

              <FormField
                label="Example dialog"
                hint="Show the model how the character speaks. Use <START> to mark each exchange."
              >
                <textarea
                  placeholder={'<START>\n{{user}}: Hello.\n{{char}}: *A soft smile.* Well met, wanderer.'}
                  value={form.example_dialog_md}
                  onChange={(e) => update('example_dialog_md', e.target.value)}
                  rows={6}
                  className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none font-mono text-[13px]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </FormField>
            </>
          )}

          {/* CONTEXT */}
          {activeSection === 'context' && (
            <FormField
              label="Greeting"
              hint="The first message the character sends when a new chat begins."
              required
            >
              <textarea
                placeholder="*The forest stirs as you approach. A figure materializes from the shadows...*"
                value={form.greeting_md}
                onChange={(e) => update('greeting_md', e.target.value)}
                rows={5}
                className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
              />
            </FormField>
          )}

          {/* SETTINGS */}
          {activeSection === 'settings' && (
            <>
              {/* Visibility */}
              <FormField label="Visibility" hint="Who can find and use this character.">
                <div className="flex gap-2">
                  {([
                    { value: 'private', icon: Lock, label: 'Private', desc: 'Only you' },
                    { value: 'unlisted', icon: Eye, label: 'Unlisted', desc: 'Anyone with link' },
                    { value: 'public', icon: Globe, label: 'Public', desc: 'Browse page' },
                  ] as const).map(({ value, icon: Icon, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => update('visibility', value)}
                      className={cn(
                        'flex-1 flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-center transition-colors',
                        form.visibility === value
                          ? 'border-primary/50 bg-primary/8 text-foreground'
                          : 'border-border bg-surface text-muted-foreground hover:border-border/60 hover:text-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{label}</span>
                      <span className="text-[10px] opacity-70">{desc}</span>
                    </button>
                  ))}
                </div>
              </FormField>

              {/* NSFW toggle */}
              <FormField
                label="Adult content"
                hint="Mark this character as intended for adult mode. Does not affect SFW chats."
              >
                <button
                  type="button"
                  onClick={() => update('nsfw', !form.nsfw)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    form.nsfw ? 'bg-primary' : 'bg-border'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                      form.nsfw ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
                {form.nsfw && (
                  <p className="text-xs text-yellow-400/80 mt-2">
                    Only visible in adult mode chats. Age verification required.
                  </p>
                )}
              </FormField>

              {/* Tags */}
              <FormField
                label="Tags"
                hint="Up to 10 tags. Press Enter or comma to add."
              >
                <div className="bg-input border border-border rounded-md px-3 py-2 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                        <button onClick={() => update('tags', form.tags.filter((t) => t !== tag))}>
                          <X className="w-2.5 h-2.5 hover:text-primary/60" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="e.g. fantasy, mystery, mentor…"
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                  />
                </div>
              </FormField>
            </>
          )}
        </div>

        {/* Section nav + save */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex gap-1.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  activeSection === s.id ? 'bg-primary' : 'bg-border hover:bg-border/60'
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {activeSection !== SECTIONS[SECTIONS.length - 1]?.id && (
              <button
                onClick={() => {
                  const idx = SECTIONS.findIndex((s) => s.id === activeSection)
                  const next = SECTIONS[idx + 1]
                  if (next) setActiveSection(next.id)
                }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!form.name.trim() || saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create character'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground/60 leading-relaxed">{hint}</p>}
    </div>
  )
}

function CharCount({ value, max }: { value: string; max: number }) {
  const pct = value.length / max
  return (
    <p
      className={cn(
        'text-xs text-right mt-1',
        pct > 0.9 ? 'text-yellow-400' : 'text-muted-foreground/40'
      )}
    >
      {value.length.toLocaleString()} / {max.toLocaleString()}
    </p>
  )
}
