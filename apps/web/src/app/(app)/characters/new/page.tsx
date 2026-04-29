'use client'

import { useState, useRef } from 'react'
import {
  Upload,
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  Lock,
  X,
  FileJson,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'identity', label: 'Identity', desc: 'Name, avatar, description' },
  { id: 'personality', label: 'Personality', desc: 'How they speak and behave' },
  { id: 'context', label: 'Context', desc: 'First message and scenario' },
  { id: 'settings', label: 'Settings', desc: 'Visibility, tags, content rating' },
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
    console.warn('Card import: TODO wire up @persona/character-card', file.name)
  }

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="h-full overflow-y-auto custom-scroll">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary mb-3 font-medium">
            New character
          </p>
          <h1 className="text-3xl font-medium tracking-tight mb-2">
            Create a character
          </h1>
          <p className="text-sm text-muted-foreground">
            Build from scratch, or drop a Tavern card to import.
          </p>
        </div>

        {/* Card import zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleCardDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            'relative border border-dashed rounded-xl p-5 mb-10 cursor-pointer transition-all group',
            dragOver
              ? 'border-primary bg-primary/5 scale-[1.01]'
              : 'border-border hover:border-foreground/30 bg-card/40'
          )}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".png,.json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleCardFile(e.target.files[0])}
          />
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <FileJson className="size-5" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium">Import a Tavern v2 card</div>
              <div className="text-[12px] text-muted-foreground">
                Drop a PNG or JSON · Compatible with SillyTavern, Janitor, Chub
              </div>
            </div>
            <div className="text-[11px] font-mono text-muted-foreground bg-secondary border border-border rounded-md px-2 py-1">
              .png · .json
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-2 mb-6">
            {SECTIONS.map((s, i) => {
              const active = activeSection === s.id
              const idx = SECTIONS.findIndex((x) => x.id === activeSection)
              const completed = i < idx
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className="flex flex-col gap-1.5 text-left group"
                >
                  <div
                    className={cn(
                      'h-[3px] rounded-full transition-colors',
                      active || completed ? 'bg-primary' : 'bg-border'
                    )}
                  />
                  <div
                    className={cn(
                      'text-[12px] font-medium transition-colors',
                      active ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')} {s.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground/70 hidden sm:block">
                    {s.desc}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-7">
          {/* IDENTITY */}
          {activeSection === 'identity' && (
            <>
              <div className="flex gap-5">
                <div className="shrink-0">
                  <input
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => avatarRef.current?.click()}
                    className="size-20 rounded-xl border border-dashed border-border hover:border-foreground/40 bg-card/40 transition-all flex items-center justify-center group hover:bg-card"
                  >
                    {form.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.avatar_url}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Upload
                        className="size-5 text-muted-foreground group-hover:text-foreground transition-colors"
                        strokeWidth={1.5}
                      />
                    )}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center mt-2">
                    Avatar
                  </p>
                </div>

                <div className="flex-1">
                  <Field label="Name" required>
                    <input
                      type="text"
                      placeholder="Aria, Detective Kane, ..."
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="w-full bg-card border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 h-11 text-[14px] placeholder:text-muted-foreground/40 transition-all"
                    />
                  </Field>
                  <p className="text-[12px] text-muted-foreground mt-2">
                    Display name. Can be a name, title, or concept.
                  </p>
                </div>
              </div>

              <Field label="Description" required hint="Background, appearance, core traits. Markdown supported.">
                <textarea
                  placeholder="A centuries-old forest spirit with eyes like starlight..."
                  value={form.description_md}
                  onChange={(e) => update('description_md', e.target.value)}
                  rows={5}
                  className="w-full bg-card border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 py-3 text-[14px] placeholder:text-muted-foreground/40 transition-all resize-none leading-relaxed"
                />
                <CharCount value={form.description_md} max={10000} />
              </Field>
            </>
          )}

          {/* PERSONALITY */}
          {activeSection === 'personality' && (
            <>
              <Field
                label="System prompt"
                hint="Instructions to the model about how to behave. Not visible to the user."
              >
                <textarea
                  placeholder="You are Aria, an ancient forest spirit. Speak with warmth and mystery. Use nature metaphors..."
                  value={form.system_prompt_md}
                  onChange={(e) => update('system_prompt_md', e.target.value)}
                  rows={6}
                  className="w-full bg-card border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 py-3 text-[13px] font-mono placeholder:text-muted-foreground/40 transition-all resize-none leading-relaxed"
                />
                <CharCount value={form.system_prompt_md} max={10000} />
              </Field>

              <Field
                label="Example dialog"
                hint="Show the model how the character speaks. Use <START> to mark each exchange."
              >
                <textarea
                  placeholder={'<START>\n{{user}}: Hello.\n{{char}}: *A soft smile.* Well met, wanderer.'}
                  value={form.example_dialog_md}
                  onChange={(e) => update('example_dialog_md', e.target.value)}
                  rows={6}
                  className="w-full bg-card border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 py-3 text-[13px] font-mono placeholder:text-muted-foreground/40 transition-all resize-none leading-relaxed"
                />
              </Field>
            </>
          )}

          {/* CONTEXT */}
          {activeSection === 'context' && (
            <Field
              label="Greeting"
              required
              hint="The first message the character sends when a new chat begins."
            >
              <textarea
                placeholder="*The forest stirs as you approach. A figure materializes from the shadows...*"
                value={form.greeting_md}
                onChange={(e) => update('greeting_md', e.target.value)}
                rows={6}
                className="w-full bg-card border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none rounded-lg px-3.5 py-3 text-[14px] placeholder:text-muted-foreground/40 transition-all resize-none leading-relaxed"
              />
            </Field>
          )}

          {/* SETTINGS */}
          {activeSection === 'settings' && (
            <>
              <Field label="Visibility">
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      {
                        value: 'private',
                        icon: Lock,
                        label: 'Private',
                        desc: 'Only you',
                      },
                      {
                        value: 'unlisted',
                        icon: Eye,
                        label: 'Unlisted',
                        desc: 'Anyone with link',
                      },
                      {
                        value: 'public',
                        icon: Globe,
                        label: 'Public',
                        desc: 'On browse page',
                      },
                    ] as const
                  ).map(({ value, icon: Icon, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => update('visibility', value)}
                      className={cn(
                        'flex flex-col items-start gap-1.5 rounded-lg border px-4 py-3 text-left transition-all',
                        form.visibility === value
                          ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/15'
                          : 'border-border bg-card/40 hover:bg-card hover:border-foreground/20'
                      )}
                    >
                      <Icon className="size-4 text-foreground" strokeWidth={2} />
                      <span className="text-[13px] font-medium">{label}</span>
                      <span className="text-[11px] text-muted-foreground">{desc}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field
                label="Adult content"
                hint="Mark as intended for adult mode. SFW chats are unaffected."
              >
                <button
                  type="button"
                  onClick={() => update('nsfw', !form.nsfw)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    form.nsfw ? 'bg-primary' : 'bg-secondary border border-border'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block size-4 rounded-full bg-white shadow transition-transform',
                      form.nsfw ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
                {form.nsfw && (
                  <p className="text-[11px] text-amber-400 mt-2 flex items-center gap-1.5">
                    <Sparkles className="size-3" />
                    Visible only in adult mode chats. Age verification required.
                  </p>
                )}
              </Field>

              <Field
                label="Tags"
                hint="Up to 10. Press Enter or comma to add."
              >
                <div className="bg-card border border-border focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20 rounded-lg px-3 py-2.5 transition-all">
                  <div className="flex flex-wrap gap-1.5 mb-1.5 empty:hidden">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5"
                      >
                        {tag}
                        <button
                          onClick={() =>
                            update(
                              'tags',
                              form.tags.filter((t) => t !== tag)
                            )
                          }
                          className="hover:text-primary/60"
                        >
                          <X className="size-2.5" strokeWidth={2.5} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="fantasy, mystery, mentor…"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/40"
                  />
                </div>
              </Field>
            </>
          )}
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <button
            onClick={() => {
              const idx = SECTIONS.findIndex((s) => s.id === activeSection)
              const prev = SECTIONS[idx - 1]
              if (prev) setActiveSection(prev.id)
            }}
            disabled={activeSection === SECTIONS[0]?.id}
            className="text-[13px] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors flex items-center gap-1.5"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {activeSection !== SECTIONS[SECTIONS.length - 1]?.id ? (
              <button
                onClick={() => {
                  const idx = SECTIONS.findIndex((s) => s.id === activeSection)
                  const next = SECTIONS[idx + 1]
                  if (next) setActiveSection(next.id)
                }}
                className="text-[13px] bg-card border border-border hover:bg-secondary rounded-lg h-10 px-5 transition-colors flex items-center gap-1.5"
              >
                Next
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || saving}
                className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 rounded-lg h-10 px-5 text-[13px] font-medium transition-colors"
              >
                {saving ? (
                  <span className="size-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <>
                    Create character
                    <ArrowRight className="size-3.5" strokeWidth={2.25} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
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
    <div className="space-y-2">
      <label className="block text-[13px] font-medium">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[12px] text-muted-foreground leading-relaxed">{hint}</p>
      )}
    </div>
  )
}

function CharCount({ value, max }: { value: string; max: number }) {
  const pct = value.length / max
  return (
    <p
      className={cn(
        'text-[11px] text-right font-mono mt-1.5',
        pct > 0.9 ? 'text-amber-400' : 'text-muted-foreground/50'
      )}
    >
      {value.length.toLocaleString()} / {max.toLocaleString()}
    </p>
  )
}
