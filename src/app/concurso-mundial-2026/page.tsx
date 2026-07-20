import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Trophy, Globe, Rocket, ShoppingBag, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mundial 2026 — España campeona · Por 2 Duros',
  description:
    'El Mundial 2026 ha terminado. España campeona. 7 negocios se llevaron su web completa gratis gracias al Reto Mundial de Por 2 Duros y Espanias.',
  alternates: {
    canonical: 'https://por2duros.com/concurso-mundial-2026',
  },
}

const PRODUCTS = [
  { icon: Globe, label: 'Landing Page', price: 297, delivery: '24h' },
  { icon: Rocket, label: 'MVP Web App', price: 797, delivery: '48h' },
  { icon: ShoppingBag, label: 'E-commerce', price: 497, delivery: '48h' },
]

export default function ConcursoMundialPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero de cierre */}
        <section className="relative min-h-[70vh] flex items-center justify-center grid-bg overflow-hidden px-4 py-24">
          <div className="scanline absolute inset-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-neon/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8">
              <Trophy size={14} className="text-neon" />
              <span className="text-neon text-xs uppercase tracking-widest font-mono">
                Mundial 2026 · Cerrado
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              🇪🇸 España,<br />
              <span className="neon-text">campeona.</span>
            </h1>

            <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              El Reto Mundial 2026 ha terminado.{' '}
              <strong className="text-foreground">7 negocios se llevan su web completa gratis.</strong>{' '}
              Gracias a todos los que participasteis.
            </p>

            <Link
              href="/mundial"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Tengo un cupón — canjearlo
            </Link>
          </div>
        </section>

        {/* Productos — siguen disponibles */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">— Seguimos haciendo webs —</span>
            <h2 className="section-title">¿Quieres tu proyecto?</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              El concurso terminó, el estudio sigue. Pide presupuesto sin compromiso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {PRODUCTS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.label} className="bg-background p-8 flex flex-col gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center">
                    <Icon size={20} className="text-muted" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{p.label}</h3>
                  <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                    <span className="text-foreground font-bold">Desde €{p.price}</span>
                    <span className="text-neon text-xs mono font-bold">{p.delivery}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Garantías */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="border border-border p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              'Código propio, sin plantillas',
              'Garantía de devolución 15 días',
              'Entrega en 48 horas',
            ].map((g) => (
              <div key={g} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-neon flex-shrink-0" />
                <span className="text-sm font-medium">{g}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 px-4 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
            ¿Tu web para cuándo?
          </h2>
          <p className="text-muted mb-10 max-w-md mx-auto">
            Calculadora de precio transparente. Sin sorpresas. Entrega garantizada en 48h.
          </p>
          <Link href="/calculadora" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Ver precios
          </Link>
          <div className="mt-6">
            <Link href="/#contacto" className="text-muted text-sm hover:text-neon transition-colors">
              ¿Prefieres hablar primero? Pide presupuesto →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
