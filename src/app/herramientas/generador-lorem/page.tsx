import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { LoremIpsum } from '@/components/tools/LoremIpsum'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Generador de Lorem Ipsum español gratis — Por 2 Duros',
  description:
    'Genera texto placeholder en español y latín. Ideal para wireframing, maquetación y prototipado de diseño web.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/generador-lorem',
  },
}

export default function GeneradorLoremPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Generador de<br />
              <span className="neon-text">Lorem Ipsum</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Genera texto placeholder en español y latín para wireframing, maquetación
              y prototipado. Elige párrafos, frases o palabras, y obtén texto listo
              para copiar y pegar.
            </p>
          </div>

          <LoremIpsum />

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
