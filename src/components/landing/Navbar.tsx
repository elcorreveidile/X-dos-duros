'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter uppercase">
              <span className="text-foreground">Por</span>
              <span className="neon-text"> 2</span>
              <span className="text-foreground"> Duros</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#servicios" className="text-muted hover:text-neon transition-colors text-sm uppercase tracking-wider">
              Servicios
            </Link>
            <Link href="/#precio" className="text-muted hover:text-neon transition-colors text-sm uppercase tracking-wider">
              Precio
            </Link>
            <Link href="/#proceso" className="text-muted hover:text-neon transition-colors text-sm uppercase tracking-wider">
              Proceso
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Acceder</Button>
            </Link>
            <Link href="/#contacto">
              <Button variant="primary" size="sm">Empezar Ya</Button>
            </Link>
          </div>

          <button className="md:hidden text-muted hover:text-neon" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link href="/#servicios" className="text-muted hover:text-neon text-sm uppercase tracking-wider" onClick={() => setOpen(false)}>
              Servicios
            </Link>
            <Link href="/#precio" className="text-muted hover:text-neon text-sm uppercase tracking-wider" onClick={() => setOpen(false)}>
              Precio
            </Link>
            <Link href="/#proceso" className="text-muted hover:text-neon text-sm uppercase tracking-wider" onClick={() => setOpen(false)}>
              Proceso
            </Link>
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">Acceder</Button>
            </Link>
            <Link href="/#contacto" onClick={() => setOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">Empezar Ya</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
