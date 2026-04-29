'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, Search, MessageSquare, Users, User2, Compass, Settings, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/chat', label: 'Chats', icon: MessageSquare, kbd: 'C' },
  { href: '/characters', label: 'Characters', icon: Users, kbd: 'H' },
  { href: '/personas', label: 'Personas', icon: User2, kbd: 'P' },
  { href: '/browse', label: 'Browse', icon: Compass, kbd: 'B' },
]

const recentChats = [
  { id: '1', char: 'Aria', title: 'Mystery forest arc', last: '2m', live: true },
  { id: '2', char: 'Detective Kane', title: 'Noir interrogation', last: '1h' },
  { id: '3', char: 'The Wanderer', title: 'Crossing the salt flats', last: 'Yesterday' },
  { id: '4', char: 'Sera', title: 'Cyberpunk heist', last: '3d' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="px-4 h-14 flex items-center gap-2.5 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-medium tracking-tight text-[14px]">Persona</span>
        </Link>
      </div>

      <div className="px-3 py-3 space-y-1.5">
        {/* Search */}
        <button className="w-full flex items-center gap-2 px-2.5 h-8 rounded-md border border-sidebar-border bg-card/40 hover:bg-card transition-colors group">
          <Search className="size-3.5 text-muted-foreground" strokeWidth={2} />
          <span className="text-[13px] text-muted-foreground flex-1 text-left">Search</span>
          <kbd className="text-[10px] text-muted-foreground/60 bg-background border border-sidebar-border rounded px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* New chat */}
        <Link
          href="/chat/new"
          className="flex items-center gap-2 px-2.5 h-8 rounded-md bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors text-primary"
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
          <span className="text-[13px] font-medium">New chat</span>
          <kbd className="text-[10px] bg-background/60 border border-primary/20 rounded px-1.5 py-0.5 font-mono ml-auto">
            ⌘N
          </kbd>
        </Link>
      </div>

      {/* Primary nav */}
      <div className="px-3 pb-3">
        <SectionLabel>Workspace</SectionLabel>
        <nav className="space-y-px">
          {navItems.map(({ href, label, icon: Icon, kbd }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 h-8 rounded-md transition-colors group',
                  active
                    ? 'bg-sidebar-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                )}
              >
                <Icon className="size-3.5 shrink-0" strokeWidth={2} />
                <span className="text-[13px] flex-1">{label}</span>
                <kbd className="text-[10px] text-muted-foreground/40 group-hover:text-muted-foreground/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  G {kbd}
                </kbd>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Recent chats */}
      <div className="flex-1 overflow-y-auto custom-scroll px-3 pb-3 min-h-0 border-t border-sidebar-border pt-3">
        <SectionLabel count={recentChats.length}>Recent</SectionLabel>
        <div className="space-y-px">
          {recentChats.map((chat) => {
            const active = pathname === `/chat/${chat.id}`
            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  'flex flex-col px-2.5 py-2 rounded-md transition-colors group',
                  active
                    ? 'bg-sidebar-accent'
                    : 'hover:bg-sidebar-accent'
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {chat.live && (
                      <span className="size-1.5 rounded-full bg-primary shrink-0 pulse-soft" />
                    )}
                    <span
                      className={cn(
                        'text-[13px] font-medium truncate',
                        active ? 'text-foreground' : 'text-foreground/90'
                      )}
                    >
                      {chat.char}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 shrink-0 font-mono">
                    {chat.last}
                  </span>
                </div>
                <span className="text-[12px] text-muted-foreground truncate">
                  {chat.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom: settings + user card */}
      <div className="border-t border-sidebar-border p-3 space-y-2.5">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-2.5 h-8 rounded-md hover:bg-sidebar-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <Settings className="size-3.5" strokeWidth={2} />
          <span className="text-[13px] flex-1">Settings</span>
          <kbd className="text-[10px] text-muted-foreground/40 font-mono">⌘,</kbd>
        </Link>

        <div className="rounded-lg border border-sidebar-border bg-card/40 overflow-hidden">
          <div className="flex items-center gap-2.5 p-3">
            <div className="size-7 bg-primary/15 border border-primary/30 rounded-md flex items-center justify-center text-[12px] font-medium text-primary">
              E
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-foreground truncate leading-tight">
                ethan@persona.app
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                <span className="bg-secondary text-foreground/80 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
                  Free
                </span>
                <span>34 / 100 today</span>
              </div>
            </div>
          </div>
          <Link
            href="#pricing"
            className="block w-full text-center text-[11px] font-medium py-1.5 bg-primary/10 hover:bg-primary hover:text-primary-foreground border-t border-primary/20 transition-colors text-primary flex items-center justify-center gap-1"
          >
            <Sparkles className="size-3" />
            Upgrade to Plus
          </Link>
        </div>
      </div>
    </aside>
  )
}

function SectionLabel({
  children,
  count,
}: {
  children: React.ReactNode
  count?: number
}) {
  return (
    <div className="flex items-center justify-between px-2.5 mb-1.5 mt-1">
      <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium">
        {children}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-muted-foreground/40 font-mono">
          {count}
        </span>
      )}
    </div>
  )
}

function Logo() {
  return (
    <div className="relative size-5 flex items-center justify-center shrink-0">
      <div className="absolute inset-0 bg-primary rounded-[5px]" />
      <div className="absolute inset-[2px] bg-sidebar rounded-[3px]" />
      <div className="absolute inset-[5px] bg-primary rounded-sm" />
    </div>
  )
}
