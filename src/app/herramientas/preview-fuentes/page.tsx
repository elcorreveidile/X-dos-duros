import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { FontPreview } from '@/components/tools/FontPreview'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Preview de fuentes web gratis — Por 2 Duros',
  description:
    'Compara Google Fonts en tu texto. Previsualiza Inter, Roboto, Open Sans y más con tu contenido.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/preview-fuentes',
  },
}

export default function PreviewFuentesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Preview de<br />
              <span className="neon-text">fuentes web</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Compara Google Fonts directamente en tu texto. Previsualiza Inter, Roboto,
              Open Sans, Montserrat y más con tu propio contenido antes de elegir.
            </p>
          </div>

          <FontPreview />

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
