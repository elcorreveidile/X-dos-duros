import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { LaunchChecklist } from '@/components/tools/LaunchChecklist'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Checklist de launch de sitio web gratis — Por 2 Duros',
  description:
    'Lista de verificación para el lanzamiento de sitios web. SEO, performance, contenido y más. Herramienta gratuita.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/checklist-launch',
  },
}

export default function ChecklistLaunchPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Checklist de<br />
              <span className="neon-text">launch</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Lista de verificación completa para el lanzamiento de sitios web. SEO básico,
              performance, contenido, social media y testing. Guarda tu progreso y
              asegúrate de no olvidar nada.
            </p>
          </div>

          <LaunchChecklist />

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
