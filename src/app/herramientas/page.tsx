import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { HerramientasCategories } from './HerramientasCategories'

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para web — Por 2 Duros',
  description:
    'Herramientas online gratuitas para optimizar tu presencia web: compresión de imágenes, conversión a WebP, generador de gradientes y más. Sin registros, sin límites.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas',
  },
}

export default function HerramientasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Gratuitas · Sin registro</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Herramientas<br />
              <span className="neon-text">para tu web</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Pequeñas utilidades que usamos a diario. Las compartimos gratis porque creemos en hacer
              la web más rápida para todos.
            </p>
          </div>

          <HerramientasCategories />

        </div>
      </main>
      <Footer />
    </>
  )
}
