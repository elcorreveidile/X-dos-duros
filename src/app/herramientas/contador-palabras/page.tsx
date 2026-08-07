import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { WordCounter } from '@/components/tools/WordCounter'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contador de palabras gratis — Por 2 Duros',
  description:
    'Cuenta palabras, caracteres, frases, párrafos y tiempo de lectura estimado. Herramienta gratuita online para redactores SEO y creadores de contenido.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/contador-palabras',
  },
}

export default function ContadorPalabrasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Contador de<br />
              <span className="neon-text">palabras</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Cuenta palabras, caracteres, frases, párrafos y estima el tiempo de lectura.
              Ideal para redactores SEO, creadores de contenido y escritores.
            </p>
          </div>

          <WordCounter />

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
