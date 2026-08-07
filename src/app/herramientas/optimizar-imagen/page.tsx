import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ImageOptimizer } from './ImageOptimizer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Optimizar imagen para web — Herramienta gratuita · Por 2 Duros',
  description:
    'Convierte y comprime tus imágenes a WebP, JPEG o PNG directamente en el navegador. Sin subir archivos a ningún servidor. Gratis, rápido y sin límites.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas/optimizar-imagen',
  },
  openGraph: {
    title: 'Optimizar imagen para web — Gratis',
    description: 'Comprime y convierte tus imágenes a WebP sin subir nada a ningún servidor. 100% en tu navegador.',
    url: 'https://por2duros.com/herramientas/optimizar-imagen',
  },
}

export default function OptimizarImagenPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <Link
            href="/herramientas"
            className="inline-flex items-center gap-2 text-muted text-xs uppercase tracking-widest hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Herramientas
          </Link>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Herramienta gratuita</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Optimizar imagen<br />
              <span className="neon-text">para web</span>
            </h1>
            <p className="text-muted text-sm leading-relaxed max-w-xl">
              Convierte a <strong className="text-foreground">WebP</strong>, ajusta la calidad y reduce el tamaño.
              Sin registros, sin límites, sin subir nada a ningún servidor —
              todo ocurre en tu navegador.
            </p>
          </div>

          <ImageOptimizer />

          <div className="border-t border-border pt-10 space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-muted">¿Por qué importa el formato de imagen?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border text-sm">
              {[
                {
                  title: 'WebP',
                  desc: 'El formato moderno. Hasta un 30% más ligero que JPEG con la misma calidad visual. Compatible con todos los navegadores actuales.',
                  rec: 'Recomendado para fotos en web',
                },
                {
                  title: 'JPEG',
                  desc: 'El clásico. Buena compresión con pérdida, ideal para fotografías. No soporta transparencia.',
                  rec: 'Para compatibilidad máxima',
                },
                {
                  title: 'PNG',
                  desc: 'Compresión sin pérdida. Ideal para logos, iconos y capturas con texto. Soporta transparencia.',
                  rec: 'Para gráficos y transparencias',
                },
              ].map((f) => (
                <div key={f.title} className="bg-background p-5 space-y-2">
                  <p className="font-black text-xs uppercase tracking-widest">{f.title}</p>
                  <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
                  <p className="text-neon text-xs font-mono">{f.rec}</p>
                </div>
              ))}
            </div>

            <div className="border border-border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-tight">¿Necesitas una web que cargue rápido?</p>
                <p className="text-xs text-muted mt-1">
                  La optimización de imágenes es solo uno de los factores. Construimos webs ligeras, con código propio y entrega en 48h.
                </p>
              </div>
              <Link
                href="/calculadora"
                className="flex-shrink-0 px-5 py-2.5 border border-border text-xs uppercase tracking-widest font-bold text-muted hover:border-neon hover:text-neon transition-colors whitespace-nowrap"
              >
                Ver precios →
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
