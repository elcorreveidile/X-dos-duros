import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ProcessSection } from '@/components/landing/ProcessSection'

export const metadata: Metadata = {
  title: 'Cómo funciona — Por 2 Duros',
  description:
    '4 pasos, 48 horas. Así funciona Por 2 Duros: solicitud, briefing, desarrollo y entrega. Sin reuniones eternas. Sin letra pequeña.',
  alternates: {
    canonical: 'https://por2duros.com/proceso',
  },
}

export default function ProcesoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <ProcessSection />
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <p className="text-muted text-sm">¿Listo para empezar?</p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Solicitar proyecto <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
