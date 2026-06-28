import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ServicesSection } from '@/components/landing/ServicesSection'

export const metadata: Metadata = {
  title: 'Servicios — Landing Pages, MVPs, E-commerce | Por 2 Duros',
  description:
    'Landing pages desde €299, e-commerce desde €599, MVPs desde €799 y apps a medida. Código propio, entrega en 48h, garantía de 15 días.',
  alternates: {
    canonical: 'https://por2duros.com/servicios',
  },
}

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <ServicesSection />
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
            <Link
              href="/calculadora"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Calcular precio <ArrowRight size={14} />
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted font-black text-xs uppercase tracking-widest hover:border-neon hover:text-neon transition-colors"
            >
              Pedir presupuesto
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
