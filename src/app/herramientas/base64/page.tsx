import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Base64Converter } from '@/components/tools/Base64Converter'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Convertidor imagen a Base64 gratis — Por 2 Duros',
  description:
    'Convierte imágenes a Base64 para embedding en CSS y HTML. Herramienta gratuita para optimizar carga de iconos y small images.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/base64',
  },
}

export default function Base64Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Convertidor a<br />
              <span className="neon-text">Base64</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Convierte imágenes a Base64 para incrustarlas directamente en CSS y HTML.
              Ideal para iconos y pequeñas imágenes. Reduce peticiones HTTP.
            </p>
          </div>

          <Base64Converter />

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
