'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Kanban, Users, CreditCard, Settings, LogOut, Menu, X, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/proyectos', label: 'Proyectos', icon: Kanban },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/pagos', label: 'Pagos', icon: CreditCard },
  { href: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon },
  { href: '/admin/ajustes', label: 'Ajustes', icon: Settings },
]

export function AdminNav({ pendingMessages = 0 }: { pendingMessages?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-black tracking-tighter uppercase">
              <span className="text-foreground">Por</span>
              <span className="neon-text"> 2</span>
              <span className="text-foreground"> Duros</span>
            </Link>
            <span className="badge border border-neon text-neon text-xs">Admin</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              const badge = item.href === '/admin/proyectos' && pendingMessages > 0 ? pendingMessages : 0
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider transition-all',
                    active
                      ? 'text-neon border-b-2 border-neon'
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  <Icon size={14} />
                  {item.label}
                  {badge > 0 && (
                    <span className="bg-neon text-background text-xs font-black px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 text-muted hover:text-red-400 text-xs uppercase tracking-wider transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Salir</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-muted hover:text-neon transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              const badge = item.href === '/admin/proyectos' && pendingMessages > 0 ? pendingMessages : 0
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider transition-colors border-l-2',
                    active
                      ? 'text-neon border-neon bg-neon/5'
                      : 'text-muted hover:text-foreground border-transparent hover:border-border'
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                  {badge > 0 && (
                    <span className="bg-neon text-background text-xs font-black px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
