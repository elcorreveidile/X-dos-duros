import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { JsonLdValidator } from '@/components/tools/JsonLdValidator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Validador de JSON-LD gratis — Por 2 Duros',
  description:
    'Valida la sintaxis y estructura de tus datos estructurados Schema.org. Encuentra errores antes que Google.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/validador-jsonld',
  },
}

export default function ValidadorJsonLdPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Validador de<br />
              <span className="neon-text">JSON-LD</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Valida la sintaxis y estructura de tus datos estructurados Schema.org.
              Detecta errores y advertencias antes de que Google los encuentre.
            </p>
          </div>

          <JsonLdValidator />

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
