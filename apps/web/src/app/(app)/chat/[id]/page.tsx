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
} from 'lucide-react'
import { MemoryPanel } from '@/components/chat/memory-panel'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  role: 'user' | 'character' | 'system'
  content: string
  character: string
}

// Mock data — will be replaced with real Supabase queries
const MOCK_CHARACTER = {
  name: 'Aria',
  description: 'A forest spirit with ancient wisdom',
  avatar: null as string | null,
  modelSlug: 'deepseek/deepseek-chat',
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'character',
    content:
      "*The ancient forest stirs as you step beneath the canopy. A figure materializes from the shadows — eyes like starlight, movements like flowing water.* \n\nYou've found me, wanderer. Few do, without being called. What brings you to the Thornwood on this moonless night?",
    character: 'Aria',
  },
  {
    id: '2',
    role: 'user',
    content: "I've been searching for weeks. They say you know where the last Ember Stone is hidden.",
    character: '',
  },
  {
    id: '3',
    role: 'character',
    content:
      "*A soft laugh, like wind through leaves.* \n\nThe Ember Stone. Yes, I know it. I've guarded its secret since before your grandfather's grandfather drew first breath.\n\nBut knowledge like that has a price, Elara. Not gold — I have no use for gold. Something more... personal.",
    character: 'Aria',
  },
]

const MOCK_MEMORY = {
  alwaysOnLore: [
    { id: '1', content: 'The Thornwood is an ancient forest bordering the Kingdom of Vael.' },
    { id: '2', content: 'Aria is a forest spirit who has lived for over 2,000 years.' },
  ],
  triggeredLore: [
    { id: '3', content: 'The Ember Stone is a legendary artifact capable of restarting a dead star.', meta: 'Ember Stone' },
  ],
  pinned: [
    { id: '4', content: "User's character name is Elara" },
    { id: '5', content: "Elara has been searching for the Ember Stone for three weeks" },
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

    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content, character: '' }])
    setStreaming(true)

    // Simulate streaming response
    let response = ''
    const fullResponse =
      "*Aria's expression shifts — something ancient and knowing passes across her face.*\n\nA price, yes. You must answer me truly: what will you do with the Stone once you have it?\n\n*She steps closer, close enough that you can see the faint luminescence beneath her skin, like moonlight trapped in glass.*\n\nI have seen a hundred seekers. Most lied. Two told the truth. I helped those two."

    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'character', content: '', character: 'Aria' },
    ])

    for (const char of fullResponse) {
      await new Promise((r) => setTimeout(r, 15))
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
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              {MOCK_CHARACTER.name[0]}
            </div>
            <div>
              <div className="text-sm font-medium leading-tight">{MOCK_CHARACTER.name}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                {MOCK_CHARACTER.description}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Model badge */}
            <div className="flex items-center gap-1.5 bg-surface border border-border rounded-md px-2 py-1">
              <Cpu className="w-3 h-3 text-muted-foreground" />
              <span
                className="text-[10px] text-muted-foreground font-mono"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {MOCK_CHARACTER.modelSlug.split('/')[1]}
              </span>
            </div>

            {/* What can AI see */}
            <button
              onClick={() => setShowPromptModal(true)}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground bg-surface hover:bg-surface-elevated border border-border rounded-md px-2.5 py-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:block">What can AI see?</span>
            </button>

            {/* Toggle memory panel */}
            <button
              onClick={() => setMemoryOpen(!memoryOpen)}
              className={cn(
                'p-1.5 rounded-md border transition-colors',
                memoryOpen
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'bg-surface border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <PanelRight className="w-4 h-4" />
            </button>

            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scroll px-5 py-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {streaming && (
            <div className="flex items-center gap-2 text-muted-foreground/50">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
              </div>
              <span className="text-xs">{MOCK_CHARACTER.name} is writing…</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 px-5 py-4 border-t border-border bg-background">
          <div className="flex items-end gap-3 bg-card border border-border rounded-xl px-4 py-3 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
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
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none leading-relaxed max-h-48 custom-scroll"
            />
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {/* regenerate */}}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                title="Regenerate last response"
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                className="p-1.5 rounded-md bg-primary hover:bg-primary/90 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 px-1">
            <span className="text-[10px] text-muted-foreground/40">
              Enter to send · Shift+Enter for newline
            </span>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
              SFW mode
            </div>
          </div>
        </div>
      </div>

      {/* Memory panel */}
      {memoryOpen && (
        <div className="w-72 shrink-0 h-full">
          <MemoryPanel
            {...MOCK_MEMORY}
            onViewPrompt={() => setShowPromptModal(true)}
          />
        </div>
      )}

      {/* Prompt inspector modal */}
      {showPromptModal && (
        <PromptModal onClose={() => setShowPromptModal(false)} character={MOCK_CHARACTER} />
      )}
    </div>
  )
}

function MessageBubble({
  message,
}: {
  message: { id: string; role: 'user' | 'character' | 'system'; content: string; character: string }
}) {
  const [hovered, setHovered] = useState(false)
  const isUser = message.role === 'user'

  return (
    <div
      className={cn('group flex gap-3', isUser && 'flex-row-reverse')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary shrink-0 mt-0.5">
          {message.character[0] ?? 'A'}
        </div>
      )}

      <div className={cn('max-w-[80%] space-y-1', isUser && 'items-end flex flex-col')}>
        {!isUser && (
          <span className="text-[11px] font-medium text-muted-foreground px-0.5">
            {message.character}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            'rounded-xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-primary/12 text-foreground rounded-tr-sm border border-primary/15'
              : 'bg-card border border-border rounded-tl-sm'
          )}
        >
          <MessageContent content={message.content} />
        </div>

        {/* Action bar on hover */}
        <div
          className={cn(
            'flex items-center gap-0.5 transition-opacity duration-100 px-1',
            hovered ? 'opacity-100' : 'opacity-0',
            isUser ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {[
            { icon: RefreshCcw, label: 'Regenerate' },
            { icon: Pencil, label: 'Edit' },
            { icon: GitBranch, label: 'Branch' },
            { icon: Copy, label: 'Copy' },
            { icon: Pin, label: 'Pin to memory' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              className="p-1 rounded text-muted-foreground/50 hover:text-muted-foreground hover:bg-surface transition-colors"
            >
              <Icon className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Render message content: *text* → italic, **text** → bold
function MessageContent({ content }: { content: string }) {
  // Simple inline markdown for italic (actions) and bold
  const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <span className="prose-chat whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i} className="text-muted-foreground italic">{part.slice(1, -1)}</em>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)' }}>
              What the AI currently sees
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
              ~2,840 tokens
            </span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scroll p-5">
          <div className="flex items-start gap-2 text-xs text-yellow-400 bg-yellow-400/8 border border-yellow-400/20 rounded-lg px-3 py-2 mb-4">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            API keys and private credentials are never shown here.
          </div>
          <pre
            className="text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap break-words font-mono"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {promptPreview}
          </pre>
        </div>
      </div>
    </div>
  )
}
