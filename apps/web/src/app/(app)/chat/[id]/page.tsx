'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  RefreshCcw,
  MoreHorizontal,
  Pin,
  Copy,
  Pencil,
  GitBranch,
  Eye,
  PanelRight,
  Cpu,
  AlertCircle,
  ArrowUp,
} from 'lucide-react'
import { MemoryPanel } from '@/components/chat/memory-panel'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  role: 'user' | 'character' | 'system'
  content: string
  character: string
}

const MOCK_CHARACTER = {
  name: 'Aria',
  description: 'A forest spirit with ancient wisdom',
  modelSlug: 'deepseek/deepseek-chat',
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'character',
    content:
      "*The ancient forest stirs as you step beneath the canopy. A figure materializes from the shadows — eyes like starlight, movements like flowing water.*\n\nYou've found me, wanderer. Few do, without being called. What brings you to the Thornwood on this moonless night?",
    character: 'Aria',
  },
  {
    id: '2',
    role: 'user',
    content:
      "I've been searching for weeks. They say you know where the last Ember Stone is hidden.",
    character: '',
  },
  {
    id: '3',
    role: 'character',
    content:
      "*A soft laugh, like wind through leaves.*\n\nThe Ember Stone. Yes, I know it. I've guarded its secret since before your grandfather's grandfather drew first breath.\n\nBut knowledge like that has a price, Elara. Not gold — I have no use for gold. Something more... personal.",
    character: 'Aria',
  },
]

const MOCK_MEMORY = {
  alwaysOnLore: [
    { id: '1', content: 'The Thornwood is an ancient forest bordering the Kingdom of Vael.' },
    { id: '2', content: 'Aria is a forest spirit who has lived for over 2,000 years.' },
  ],
  triggeredLore: [
    {
      id: '3',
      content: 'The Ember Stone is a legendary artifact capable of restarting a dead star.',
      meta: 'Ember Stone',
    },
  ],
  pinned: [
    { id: '4', content: "User's character name is Elara" },
    { id: '5', content: 'Elara has been searching for the Ember Stone for three weeks' },
  ],
  extractedFacts: [
    { id: '6', content: 'Aria recognized Elara without being told her name' },
    { id: '7', content: 'The meeting takes place on a moonless night' },
  ],
  ragSnippets: [] as { id: string; content: string; meta?: string }[],
  recentMessageCount: 3,
  estimatedTokens: 2840,
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES)
  const [memoryOpen, setMemoryOpen] = useState(true)
  const [streaming, setStreaming] = useState(false)
  const [showPromptModal, setShowPromptModal] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  async function sendMessage() {
    if (!input.trim() || streaming) return
    const content = input.trim()
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content, character: '' },
    ])
    setStreaming(true)

    let response = ''
    const fullResponse =
      "*Aria's expression shifts — something ancient and knowing passes across her face.*\n\nA price, yes. You must answer me truly: what will you do with the Stone once you have it?\n\n*She steps closer, close enough that you can see the faint luminescence beneath her skin, like moonlight trapped in glass.*\n\nI have seen a hundred seekers. Most lied. Two told the truth. I helped those two."

    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'character', content: '', character: 'Aria' },
    ])

    for (const char of fullResponse) {
      await new Promise((r) => setTimeout(r, 12))
      response += char
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (!last || last.role !== 'character') return prev
        return [...prev.slice(0, -1), { ...last, content: response }]
      })
    }
    setStreaming(false)
  }

  return (
    <div className="flex h-full">
      {/* Chat column */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="px-6 h-14 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 flex items-center justify-center text-[14px] font-medium text-primary">
              {MOCK_CHARACTER.name[0]}
            </div>
            <div>
              <div className="text-[14px] font-medium leading-tight">{MOCK_CHARACTER.name}</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                {MOCK_CHARACTER.description}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Model badge */}
            <div className="flex items-center gap-1.5 bg-secondary/60 border border-border rounded-md px-2.5 h-7 hover:bg-secondary transition-colors cursor-pointer">
              <Cpu className="size-3 text-muted-foreground" strokeWidth={2} />
              <span className="text-[11px] font-mono text-foreground/80">
                {MOCK_CHARACTER.modelSlug.split('/')[1]}
              </span>
            </div>

            {/* What can AI see */}
            <button
              onClick={() => setShowPromptModal(true)}
              className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border rounded-md px-3 h-7 transition-colors"
            >
              <Eye className="size-3.5" strokeWidth={2} />
              <span className="hidden sm:block">Inspect</span>
            </button>

            {/* Toggle memory */}
            <button
              onClick={() => setMemoryOpen(!memoryOpen)}
              className={cn(
                'size-7 rounded-md border transition-colors flex items-center justify-center',
                memoryOpen
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'bg-secondary/60 border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
              title="Toggle memory panel"
            >
              <PanelRight className="size-3.5" strokeWidth={2} />
            </button>

            <button className="size-7 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center">
              <MoreHorizontal className="size-4" strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scroll">
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-7">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {streaming && (
              <div className="flex items-center gap-2.5 text-muted-foreground pl-10">
                <div className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:0ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
                </div>
                <span className="text-[12px]">{MOCK_CHARACTER.name} is writing</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="shrink-0 px-6 py-5 border-t border-border bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3 bg-card border border-border rounded-2xl px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  autoResize()
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder={`Message ${MOCK_CHARACTER.name}…`}
                rows={1}
                className="flex-1 resize-none bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none leading-relaxed max-h-48 custom-scroll py-1.5"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center"
                  title="Regenerate last response"
                >
                  <RefreshCcw className="size-3.5" strokeWidth={2} />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || streaming}
                  className="size-8 rounded-lg bg-primary hover:opacity-90 disabled:opacity-30 text-primary-foreground transition-all flex items-center justify-center"
                >
                  <ArrowUp className="size-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="text-[11px] text-muted-foreground">
                <kbd className="font-mono text-[10px] bg-secondary border border-border rounded px-1 py-0.5 mr-1">Enter</kbd>
                to send
                <kbd className="font-mono text-[10px] bg-secondary border border-border rounded px-1 py-0.5 mx-1 ml-2">⇧ Enter</kbd>
                for newline
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                SFW mode
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory panel */}
      {memoryOpen && (
        <div className="w-80 shrink-0 h-full border-l border-border">
          <MemoryPanel
            {...MOCK_MEMORY}
            onViewPrompt={() => setShowPromptModal(true)}
            onClose={() => setMemoryOpen(false)}
          />
        </div>
      )}

      {/* Prompt modal */}
      {showPromptModal && (
        <PromptModal
          onClose={() => setShowPromptModal(false)}
          character={MOCK_CHARACTER}
        />
      )}
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const [hovered, setHovered] = useState(false)
  const isUser = message.role === 'user'

  return (
    <div
      className={cn('group flex gap-3', isUser && 'flex-row-reverse')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isUser && (
        <div className="size-7 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 flex items-center justify-center text-[12px] font-medium text-primary shrink-0 mt-0.5">
          {message.character[0] ?? 'A'}
        </div>
      )}

      <div className={cn('max-w-[80%] flex flex-col', isUser && 'items-end')}>
        {!isUser && (
          <span className="text-[11px] font-medium text-muted-foreground mb-1.5 px-1">
            {message.character}
          </span>
        )}

        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-[14px] leading-relaxed',
            isUser
              ? 'bg-foreground text-background rounded-tr-md'
              : 'bg-card border border-border rounded-tl-md'
          )}
        >
          <MessageContent content={message.content} />
        </div>

        {/* Action bar */}
        <div
          className={cn(
            'flex items-center gap-0.5 transition-opacity duration-100 mt-1.5',
            hovered ? 'opacity-100' : 'opacity-0',
            isUser ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {[
            { icon: RefreshCcw, label: 'Regenerate' },
            { icon: Pencil, label: 'Edit' },
            { icon: GitBranch, label: 'Branch' },
            { icon: Copy, label: 'Copy' },
            { icon: Pin, label: 'Pin' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              className="size-6 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center"
            >
              <Icon className="size-3" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MessageContent({ content }: { content: string }) {
  const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <span className="prose-chat whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i} className="text-muted-foreground italic">
              {part.slice(1, -1)}
            </em>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function PromptModal({
  onClose,
  character,
}: {
  onClose: () => void
  character: typeof MOCK_CHARACTER
}) {
  const promptPreview = `[SYSTEM]
Content rules (SFW mode): Keep content PG-13. No explicit sexual content.

## Character
You are ${character.name}.
A forest spirit with ancient wisdom and a connection to nature...

## User
You are talking to: Elara

## World Info (always active)
The Thornwood is an ancient forest bordering the Kingdom of Vael.
Aria is a forest spirit who has lived for over 2,000 years.

## World Info (context-triggered)
[triggered by: Ember Stone]
The Ember Stone is a legendary artifact capable of restarting a dead star.

## Pinned Memories
- User's character name is Elara
- Elara has been searching for the Ember Stone for three weeks

## Extracted Facts
- Aria recognized Elara without being told her name
- The meeting takes place on a moonless night

[CONVERSATION]
... (3 recent messages verbatim)

[USER]
<new message here>`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 h-12 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="size-4 text-primary" strokeWidth={2} />
            <span className="text-[14px] font-medium">Prompt inspector</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
              ~2,840 tokens
            </span>
            <button
              onClick={onClose}
              className="size-7 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scroll p-5">
          <div className="flex items-start gap-2 text-[12px] text-amber-400 bg-amber-400/8 border border-amber-400/20 rounded-lg px-3 py-2.5 mb-4">
            <AlertCircle className="size-4 shrink-0 mt-0.5" strokeWidth={2} />
            <span>API keys and private credentials are never shown here.</span>
          </div>
          <pre className="text-[12px] text-muted-foreground leading-relaxed whitespace-pre-wrap break-words font-mono">
            {promptPreview}
          </pre>
        </div>
      </div>
    </div>
  )
}
