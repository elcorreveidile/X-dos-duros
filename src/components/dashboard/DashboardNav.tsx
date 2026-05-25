'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, MessageSquare, CreditCard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Mi Proyecto', icon: LayoutDashboard },
  { href: '/dashboard/briefing', label: 'Briefing', icon: FileText },
  { href: '/dashboard/tickets', label: 'Mensajes', icon: MessageSquare },
  { href: '/dashboard/suscripcion', label: 'Suscripción', icon: CreditCard },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-black tracking-tighter uppercase">
            <span className="text-foreground">Por</span>
            <span className="neon-text"> 2</span>
            <span className="text-foreground"> Duros</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200',
                    active
                      ? 'text-neon border-b-2 border-neon'
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-muted hover:text-red-400 text-xs uppercase tracking-wider transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Salir</span>
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all',
                  active ? 'text-neon border border-neon' : 'text-muted border border-transparent'
                )}
              >
                <Icon size={12} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
