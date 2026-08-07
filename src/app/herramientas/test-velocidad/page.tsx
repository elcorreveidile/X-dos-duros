import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { SpeedTest } from '@/components/tools/SpeedTest'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Test de velocidad web gratis — Por 2 Duros',
  description:
    'Mide el tiempo de carga de cualquier URL. Herramienta gratuita para detectar problemas de rendimiento.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/test-velocidad',
  },
}

export default function TestVelocidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Test de<br />
              <span className="neon-text">velocidad</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Mide el tiempo de carga de cualquier URL. Un primer filtro rápido para
              detectar problemas de rendimiento antes de entrar en análisis más profundos.
            </p>
          </div>

          <SpeedTest />

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
