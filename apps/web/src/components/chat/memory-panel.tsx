'use client'

import { useState } from 'react'
import { ChevronRight, Pin, Trash2, Eye, Zap, BookOpen, Sparkles, History, Brain } from 'lucide-react'
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
  onPin?: (item: MemoryItem) => void
  onDelete?: (id: string, type: string) => void
  onViewPrompt?: () => void
}

export function MemoryPanel({
  alwaysOnLore,
  triggeredLore,
  pinned,
  extractedFacts,
  ragSnippets,
  recentMessageCount,
  estimatedTokens,
  onPin,
  onDelete,
  onViewPrompt,
}: MemoryPanelProps) {
  return (
    <div className="h-full flex flex-col bg-sidebar border-l border-sidebar-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Memory
          </span>
        </div>
        <button
          onClick={onViewPrompt}
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground bg-surface hover:bg-surface-elevated border border-border rounded-md px-2 py-1 transition-colors font-mono"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Eye className="w-3 h-3" />
          View prompt
        </button>
      </div>

      {/* Token meter */}
      <div className="px-4 py-2 border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-mono">
            Context usage
          </span>
          <span
            className="text-[11px] text-muted-foreground font-mono"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ~{estimatedTokens.toLocaleString()} tokens
          </span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/70 rounded-full transition-all"
            style={{ width: `${Math.min(100, (estimatedTokens / 8000) * 100)}%` }}
          />
        </div>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto custom-scroll py-1">
        <Section
          icon={<Zap className="w-3.5 h-3.5 text-yellow-400" />}
          label="Always-on lore"
          items={alwaysOnLore}
          emptyText="No always-on lorebook entries"
          onPin={onPin}
          onDelete={(id) => onDelete?.(id, 'always_on')}
          accentColor="yellow"
        />
        <Section
          icon={<Zap className="w-3.5 h-3.5 text-orange-400" />}
          label="Triggered lore"
          items={triggeredLore}
          emptyText="No triggered entries"
          itemMeta={(item) => item.meta ? `via "${item.meta}"` : undefined}
          onPin={onPin}
          onDelete={(id) => onDelete?.(id, 'triggered')}
          accentColor="orange"
        />
        <Section
          icon={<Pin className="w-3.5 h-3.5 text-green-400" />}
          label="Pinned"
          items={pinned}
          emptyText="Pin a message to always remember it"
          onDelete={(id) => onDelete?.(id, 'pinned')}
          accentColor="green"
        />
        <Section
          icon={<Sparkles className="w-3.5 h-3.5 text-blue-400" />}
          label="Extracted facts"
          items={extractedFacts}
          emptyText="Facts will appear after a few turns"
          onPin={onPin}
          onDelete={(id) => onDelete?.(id, 'fact')}
          accentColor="blue"
        />
        <Section
          icon={<History className="w-3.5 h-3.5 text-purple-400" />}
          label="Recalled history"
          items={ragSnippets}
          emptyText="No relevant history recalled"
          itemMeta={(item) => item.meta}
          onDelete={(id) => onDelete?.(id, 'rag')}
          accentColor="purple"
        />

        {/* Recent messages count */}
        <div className="px-4 py-2 mt-1">
          <div className="flex items-center gap-2 px-2 py-2 rounded-md bg-surface/50">
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            <span
              className="text-[11px] text-muted-foreground font-mono"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {recentMessageCount} recent messages verbatim
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
  accentColor,
}: {
  icon: React.ReactNode
  label: string
  items: MemoryItem[]
  emptyText: string
  itemMeta?: (item: MemoryItem) => string | undefined
  onPin?: (item: MemoryItem) => void
  onDelete?: (id: string) => void
  accentColor: string
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="px-3 py-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors group"
      >
        <ChevronRight
          className={cn(
            'w-3 h-3 text-muted-foreground/50 shrink-0 transition-transform duration-150',
            open && 'rotate-90'
          )}
        />
        {icon}
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex-1 text-left">
          {label}
        </span>
        <span
          className={cn(
            'text-[10px] rounded-full px-1.5 py-0.5 font-mono',
            items.length > 0 ? 'text-foreground bg-border' : 'text-muted-foreground/50'
          )}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {items.length}
        </span>
      </button>

      {open && (
        <div className="mt-1 space-y-1 mb-1">
          {items.length === 0 ? (
            <p
              className="text-[11px] text-muted-foreground/40 px-3 py-1.5 italic font-mono"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {emptyText}
            </p>
          ) : (
            items.map((item) => (
              <MemoryItemRow
                key={item.id}
                item={item}
                meta={itemMeta?.(item)}
                onPin={onPin ? () => onPin(item) : undefined}
                onDelete={onDelete ? () => onDelete(item.id) : undefined}
              />
            ))
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
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group flex gap-2 rounded-md px-2 py-2 hover:bg-sidebar-accent transition-colors cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <p
          className="text-[11px] text-foreground/80 leading-relaxed break-words font-mono"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {item.content}
        </p>
        {meta && (
          <p
            className="text-[10px] text-muted-foreground/50 mt-0.5 font-mono"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {meta}
          </p>
        )}
      </div>
      <div
        className={cn(
          'flex items-start gap-0.5 shrink-0 transition-opacity',
          hovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        {onPin && (
          <button
            onClick={onPin}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
            title="Pin this memory"
          >
            <Pin className="w-3 h-3" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Remove"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  )
}
