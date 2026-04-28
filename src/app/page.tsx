import { Navbar } from '@/components/landing/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { PricingCalculator } from '@/components/landing/PricingCalculator'
import { ProcessSection } from '@/components/landing/ProcessSection'
import { ContactSection } from '@/components/landing/ContactSection'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingCalculator />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
