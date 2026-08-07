import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { QrGenerator } from '@/components/tools/QrGenerator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Generador de código QR gratis — Por 2 Duros',
  description:
    'Crea códigos QR descargables desde cualquier URL. Sin límites, sin marcas de agua. Herramienta gratuita.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/generador-qr',
  },
}

export default function GeneradorQrPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Generador de<br />
              <span className="neon-text">código QR</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Crea códigos QR descargables desde cualquier URL o texto. Sin límites,
              sin marcas de agua, sin registro. Ideal para marketing offline y materiales impresos.
            </p>
          </div>

          <QrGenerator />

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
