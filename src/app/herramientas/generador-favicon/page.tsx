import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { FaviconGenerator } from '@/components/tools/FaviconGenerator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Generador de favicon gratis — Por 2 Duros',
  description:
    'Genera favicon.ico, PNG y SVG desde tu imagen. Herramienta gratuita para crear favicon listos para usar en tu web.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/generador-favicon',
  },
}

export default function GeneradorFaviconPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Generador de<br />
              <span className="neon-text">favicon</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Sube una imagen y genera todos los formatos de favicon que necesitas:
              .ico, PNG (16x16, 32x32, 180x180) y SVG. Incluye el código HTML para
              implementarlo en tu web.
            </p>
          </div>

          <FaviconGenerator />

          <Link
            href="/herramientas"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-neon transition-colors uppercase tracking-wider"
          >
            ← Volver a herramientas
          </Link>

        </div>
      </main>
      <Footer />
    </>
  )
}
