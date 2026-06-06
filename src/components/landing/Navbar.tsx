'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const LAUNCH_TOTAL = 20

export function Navbar({ remainingSlots }: { remainingSlots?: number }) {
  const [open, setOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const showBanner =
    !bannerDismissed &&
    remainingSlots !== undefined &&
    remainingSlots > 0

  const dismiss = () => setBannerDismissed(true)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      {showBanner && (
        <div className="bg-neon text-background text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center justify-center gap-3 relative">
          <Tag size={12} />
          <span>
            Oferta de lanzamiento — 20% dto. en tu primera factura.{' '}
            Código{' '}
            <strong className="bg-background/20 px-1.5 py-0.5 rounded font-mono tracking-wider">
              LAUNCH20
            </strong>
            {' '}·{' '}
            <span className="opacity-80">
              Quedan <strong>{remainingSlots}</strong> de {LAUNCH_TOTAL} plazas.
            </span>{' '}
            <Link
              href="/#contacto"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Solicitar ahora →
            </Link>
          </span>
          <button
            onClick={dismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Cerrar"
          >
            <X size={14} />
          </button>
        </div>
      )}

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
              Calculadora
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
              Calculadora
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
