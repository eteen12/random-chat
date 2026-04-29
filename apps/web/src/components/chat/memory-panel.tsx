'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Pin,
  Trash2,
  Eye,
  Zap,
  BookOpen,
  Sparkles,
  History,
  Brain,
  PanelRightClose,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MemoryItem {
  id: string
  content: string
  meta?: string
}

interface MemoryPanelProps {
  alwaysOnLore: MemoryItem[]
  triggeredLore: MemoryItem[]
  pinned: MemoryItem[]
  extractedFacts: MemoryItem[]
  ragSnippets: MemoryItem[]
  recentMessageCount: number
  estimatedTokens: number
  maxTokens?: number
  onPin?: (item: MemoryItem) => void
  onDelete?: (id: string, type: string) => void
  onViewPrompt?: () => void
  onClose?: () => void
}

export function MemoryPanel({
  alwaysOnLore,
  triggeredLore,
  pinned,
  extractedFacts,
  ragSnippets,
  recentMessageCount,
  estimatedTokens,
  maxTokens = 8000,
  onPin,
  onDelete,
  onViewPrompt,
  onClose,
}: MemoryPanelProps) {
  const pct = Math.min(100, (estimatedTokens / maxTokens) * 100)

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="px-4 h-14 flex items-center justify-between border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="size-4 text-primary" strokeWidth={2} />
          <span className="text-[14px] font-medium">Memory</span>
          <span className="size-1.5 rounded-full bg-primary pulse-soft" />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onViewPrompt}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground bg-background hover:bg-secondary border border-border rounded-md px-2.5 h-7 transition-colors"
          >
            <Eye className="size-3" strokeWidth={2} />
            Inspect
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="size-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Close memory panel"
            >
              <PanelRightClose className="size-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Token meter */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
            Context
          </span>
          <span className="text-[12px] font-mono text-foreground tabular-nums">
            {estimatedTokens.toLocaleString()}
            <span className="text-muted-foreground"> / {maxTokens.toLocaleString()}</span>
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              pct < 70 ? 'bg-primary' : pct < 90 ? 'bg-amber-400' : 'bg-destructive'
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto custom-scroll">
        <Section
          icon={<Zap className="size-3.5 text-amber-400" strokeWidth={2} />}
          label="Always-on"
          items={alwaysOnLore}
          emptyText="No always-on entries"
          onPin={onPin}
          onDelete={(id) => onDelete?.(id, 'always_on')}
        />
        <Section
          icon={<Zap className="size-3.5 text-orange-400" strokeWidth={2} />}
          label="Triggered"
          items={triggeredLore}
          emptyText="No triggered entries"
          itemMeta={(item) => (item.meta ? `via "${item.meta}"` : undefined)}
          onPin={onPin}
          onDelete={(id) => onDelete?.(id, 'triggered')}
        />
        <Section
          icon={<Pin className="size-3.5 text-primary" strokeWidth={2} />}
          label="Pinned"
          items={pinned}
          emptyText="Pin a message to remember it forever"
          onDelete={(id) => onDelete?.(id, 'pinned')}
        />
        <Section
          icon={<Sparkles className="size-3.5 text-blue-400" strokeWidth={2} />}
          label="Extracted"
          items={extractedFacts}
          emptyText="Facts will appear after a few turns"
          onPin={onPin}
          onDelete={(id) => onDelete?.(id, 'fact')}
        />
        <Section
          icon={<History className="size-3.5 text-purple-400" strokeWidth={2} />}
          label="Recalled"
          items={ragSnippets}
          emptyText="No relevant history recalled"
          itemMeta={(item) => item.meta}
          onDelete={(id) => onDelete?.(id, 'rag')}
        />

        {/* Recent messages */}
        <div className="px-4 py-3 mt-1 border-t border-border">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-secondary/40">
            <BookOpen className="size-3.5 text-muted-foreground" strokeWidth={2} />
            <span className="text-[12px] text-muted-foreground">
              <span className="text-foreground font-medium">{recentMessageCount}</span>{' '}
              recent messages
            </span>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground/60">
              verbatim
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  icon,
  label,
  items,
  emptyText,
  itemMeta,
  onPin,
  onDelete,
}: {
  icon: React.ReactNode
  label: string
  items: MemoryItem[]
  emptyText: string
  itemMeta?: (item: MemoryItem) => string | undefined
  onPin?: (item: MemoryItem) => void
  onDelete?: (id: string) => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-4 h-9 hover:bg-accent/50 transition-colors group"
      >
        {icon}
        <span className="text-[12px] font-medium text-foreground/90 flex-1 text-left">
          {label}
        </span>
        <span
          className={cn(
            'text-[10px] font-mono px-1.5 py-0.5 rounded tabular-nums',
            items.length > 0
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'text-muted-foreground/40'
          )}
        >
          {items.length}
        </span>
        <ChevronDown
          className={cn(
            'size-3.5 text-muted-foreground transition-transform duration-150',
            !open && '-rotate-90'
          )}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="pb-2">
          {items.length === 0 ? (
            <p className="text-[12px] text-muted-foreground/50 px-4 py-2 italic">
              {emptyText}
            </p>
          ) : (
            <div className="space-y-px px-2">
              {items.map((item) => (
                <MemoryItemRow
                  key={item.id}
                  item={item}
                  meta={itemMeta?.(item)}
                  onPin={onPin ? () => onPin(item) : undefined}
                  onDelete={onDelete ? () => onDelete(item.id) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MemoryItemRow({
  item,
  meta,
  onPin,
  onDelete,
}: {
  item: MemoryItem
  meta?: string
  onPin?: () => void
  onDelete?: () => void
}) {
  return (
    <div className="group flex gap-2 rounded-md px-2 py-2 hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-foreground/90 leading-relaxed break-words">
          {item.content}
        </p>
        {meta && (
          <p className="text-[10px] text-muted-foreground/60 mt-0.5 font-mono">{meta}</p>
        )}
      </div>
      <div className="flex items-start gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {onPin && (
          <button
            onClick={onPin}
            className="size-6 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
            title="Pin"
          >
            <Pin className="size-3" strokeWidth={2} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="size-6 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
            title="Remove"
          >
            <Trash2 className="size-3" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  )
}
