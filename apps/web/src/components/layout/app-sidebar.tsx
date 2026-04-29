'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  MessageSquare,
  Users,
  User2,
  Compass,
  Settings,
  Plus,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/chat', label: 'Chats', icon: MessageSquare },
  { href: '/characters', label: 'Characters', icon: Users },
  { href: '/personas', label: 'Personas', icon: User2 },
  { href: '/browse', label: 'Browse', icon: Compass },
]

// Mock recent chats — will be replaced with real data
const recentChats = [
  { id: '1', title: 'Aria — mystery forest arc', char: 'Aria', last: '2m ago' },
  { id: '2', title: 'Detective Kane', char: 'Kane', last: '1h ago' },
  { id: '3', title: 'The Wanderer', char: 'Rowan', last: 'yesterday' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 h-screen sticky top-0 flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span
          className="text-base font-semibold tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Persona
        </span>
      </div>

      {/* New chat button */}
      <div className="px-3 py-3 border-b border-sidebar-border">
        <Link
          href="/chat/new"
          className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md px-2 py-2 transition-colors group"
        >
          <Plus className="w-4 h-4" />
          <span>New chat</span>
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="px-3 py-3 border-b border-sidebar-border space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
                  : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Recent chats */}
      <div className="flex-1 overflow-y-auto custom-scroll py-3">
        <div className="px-4 mb-2">
          <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
            Recent
          </span>
        </div>
        <div className="px-3 space-y-0.5">
          {recentChats.map((chat) => {
            const active = pathname === `/chat/${chat.id}`
            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  'flex flex-col rounded-md px-2 py-2 transition-colors group',
                  active
                    ? 'bg-sidebar-accent text-sidebar-foreground'
                    : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <span className="text-xs font-medium truncate">{chat.char}</span>
                <span className="text-[11px] text-muted-foreground/70 truncate leading-tight">
                  {chat.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom: settings + user */}
      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
            pathname.startsWith('/settings')
              ? 'bg-sidebar-accent text-sidebar-foreground'
              : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent'
          )}
        >
          <Settings className="w-4 h-4 shrink-0" />
          Settings
        </Link>

        <button className="flex items-center gap-2.5 w-full rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
            E
          </div>
          <span className="truncate text-xs">Free plan</span>
          <ChevronRight className="w-3 h-3 ml-auto shrink-0" />
        </button>
      </div>
    </aside>
  )
}
