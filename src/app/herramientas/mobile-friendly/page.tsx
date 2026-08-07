import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { MobileFriendly } from '@/components/tools/MobileFriendly'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Comprobar mobile-friendly gratis — Por 2 Duros',
  description:
    'Vea cómo se ve su web en móvil vs escritorio. Herramienta gratuita para comprobar la responsividad de su diseño.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/mobile-friendly',
  },
}

export default function MobileFriendlyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Comprobar<br />
              <span className="neon-text">mobile-friendly</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Comprueba cómo se ve cualquier web en móvil vs escritorio. Simula la vista
              en iPhone SE para detectar problemas de responsividad antes que tus usuarios.
            </p>
          </div>

          <MobileFriendly />

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
