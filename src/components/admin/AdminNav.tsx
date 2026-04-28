'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Kanban, Users, CreditCard, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/proyectos', label: 'Proyectos', icon: Kanban },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/pagos', label: 'Pagos', icon: CreditCard },
  { href: '/admin/ajustes', label: 'Ajustes', icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()

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

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
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
                </Link>
              )
            })}
          </nav>

          <button className="flex items-center gap-2 text-muted hover:text-red-400 text-xs uppercase tracking-wider transition-colors">
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
