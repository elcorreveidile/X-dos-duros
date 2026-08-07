import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { FontCalculator } from '@/components/tools/FontCalculator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calculadora de fuentes responsive gratis — Por 2 Duros',
  description:
    'Genera fórmulas clamp() para tipografía fluida. Herramienta gratuita para crear fuentes responsive sin media queries.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/calculadora-fuentes',
  },
}

export default function CalculadoraFuentesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Calculadora de fuentes<br />
              <span className="neon-text">responsive</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Genera fórmulas CSS clamp() para tipografía fluida que escala desde móvil
              hasta desktop sin saltos. Sin media queries, código limpio y moderno.
            </p>
          </div>

          <FontCalculator />

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
