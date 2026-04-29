import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Persona — The character chat platform that actually remembers',
  description:
    'Chat with AI characters that remember. Real lorebooks, pinned memories, transparent context. No silent filters.',
  openGraph: {
    title: 'Persona',
    description: 'The character chat platform that actually remembers.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}
