import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ReadabilityCalculator } from '@/components/tools/ReadabilityCalculator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calculadora de lectura gratis — Por 2 Duros',
  description:
    'Analiza la legibilidad de tu texto con el índice Flesch Reading Ease. Herramienta gratuita para redactores y creadores de contenido.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/calculadora-lectura',
  },
}

export default function CalculadoraLecturaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Calculadora de<br />
              <span className="neon-text">lectura</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Analiza la legibilidad de tu texto con el índice Flesch Reading Ease.
              Calcula nivel de lectura, grado educativo y dificultat para optimizar
              tu contenido para tu audiencia.
            </p>
          </div>

          <ReadabilityCalculator />

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
