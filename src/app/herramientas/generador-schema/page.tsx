import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { SchemaGenerator } from '@/components/tools/SchemaGenerator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Generador de Schema.org gratis — Por 2 Duros',
  description:
    'Genera JSON-LD para Schema.org con formulario. WebSite, Organization, Article, LocalBusiness y más.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/generador-schema',
  },
}

export default function GeneradorSchemaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Generador de<br />
              <span className="neon-text">Schema.org</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Genera datos estructurados JSON-LD para Schema.org con un formulario simple.
              WebSite, Organization, Article, LocalBusiness, Product y más.
              Mejora el SEO de tu web en Google.
            </p>
          </div>

          <SchemaGenerator />

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
