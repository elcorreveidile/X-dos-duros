import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { LinkChecker } from '@/components/tools/LinkChecker'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Comprobador de enlaces rotos gratis — Por 2 Duros',
  description:
    'Analiza una página y detecta enlaces rotos (404). Herramienta gratuita para mantenimiento SEO y corrección de links.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/comprobar-enlaces',
  },
}

export default function ComprobarEnlacesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Comprobar<br />
              <span className="neon-text">enlaces rotos</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Analiza una página y detecta enlaces que devuelven errores (404, 500, etc.).
              Mantén tu sitio libre de links rotos para mejorar el SEO y la experiencia de usuario.
            </p>
          </div>

          <LinkChecker />

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
