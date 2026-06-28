import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { PricingCalculator } from '@/components/landing/PricingCalculator'
import { ECRSection } from '@/components/landing/ECRSection'

export const metadata: Metadata = {
  title: 'Calculadora de precios — Por 2 Duros',
  description:
    'Calcula el precio exacto de tu proyecto web: landing page, e-commerce, MVP o app a medida. Sin sorpresas. Entrega garantizada en 48h.',
  alternates: {
    canonical: 'https://por2duros.com/calculadora',
  },
}

export default function CalculadoraPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <PricingCalculator />
        <ECRSection />
      </main>
      <Footer />
    </>
  )
}
