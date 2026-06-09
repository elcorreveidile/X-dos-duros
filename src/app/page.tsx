export const dynamic = 'force-dynamic'

import { NavbarWrapper } from '@/components/landing/NavbarWrapper'
import { Navbar } from '@/components/landing/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { PortfolioSection } from '@/components/landing/PortfolioSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { PricingCalculator } from '@/components/landing/PricingCalculator'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { CitiesSection } from '@/components/landing/CitiesSection'
import { ContactSection } from '@/components/landing/ContactSection'
import { Footer } from '@/components/landing/Footer'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<Navbar />}>
        <NavbarWrapper />
      </Suspense>
      <main>
        <HeroSection />
        <ServicesSection />
        <Suspense fallback={null}>
          <PortfolioSection />
        </Suspense>
        <TestimonialsSection />
        <PricingCalculator />
        <ProcessSection />
        <FaqSection />
        <CitiesSection />
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
