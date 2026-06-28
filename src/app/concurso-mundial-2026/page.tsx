import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Trophy, Globe, Rocket, ShoppingBag, ExternalLink, CheckCircle, Flame } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mundial 2026 — Gana tu web gratis con Espanias · Por 2 Duros',
  description:
    'Participa en el Mundial 2026 de Espanias y gana tu web gratis o con hasta un 100% de descuento. Landing pages, MVPs y tiendas online desarrolladas por Por 2 Duros.',
  alternates: {
    canonical: 'https://por2duros.com/concurso-mundial-2026',
  },
  openGraph: {
    title: 'Mundial 2026 — Gana tu web gratis',
    description:
      'Participa en el Mundial 2026 de Espanias y gana descuentos de hasta el 100% en tu proyecto web con Por 2 Duros.',
    url: 'https://por2duros.com/concurso-mundial-2026',
  },
}

const PRIZES = [
  { pct: 100, label: 'WEB GRATIS', desc: 'El premio gordo. Tu web completamente gratis.', highlight: true },
  { pct: 80, label: '80% descuento', desc: 'Casi gratis. Pagas solo el 20% del precio final.', highlight: false },
  { pct: 20, label: '20% descuento', desc: 'Un descuento sólido en tu proyecto web.', highlight: false },
  { pct: 15, label: '15% descuento', desc: 'Ahorra en tu landing, MVP o tienda.', highlight: false },
  { pct: 10, label: '10% descuento', desc: 'Descuento directo sin condiciones.', highlight: false },
]

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
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center grid-bg overflow-hidden px-4 py-24">
          <div className="scanline absolute inset-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-neon/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8">
              <Trophy size={14} className="text-neon" />
              <span className="text-neon text-xs uppercase tracking-widest font-mono">
                Mundial 2026 · Espanias × Por 2 Duros
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Juega.
              <br />
              <span className="neon-text">Gana tu web.</span>
            </h1>

            <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Participa en el <strong className="text-foreground">Mundial 2026 de Espanias</strong> y
              gana premios en webs reales: desde un 10% de descuento hasta una{' '}
              <strong className="text-foreground">web completamente gratis</strong>.
            </p>

            <a
              href="https://www.espanias.com/mundial"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Participar en Espanias
              <ExternalLink size={16} />
            </a>
          </div>
        </section>

        {/* Premios */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">— Premios —</span>
            <h2 className="section-title">Lo que puedes ganar</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border">
            {PRIZES.map((prize) => (
              <div
                key={prize.pct}
                className={`p-6 flex flex-col gap-3 ${
                  prize.highlight ? 'bg-neon/10' : 'bg-background'
                }`}
              >
                {prize.highlight && (
                  <span className="badge-neon self-start">Premio gordo</span>
                )}
                <div className={`text-2xl font-black uppercase tracking-tight ${prize.highlight ? 'neon-text' : ''}`}>
                  {prize.label}
                </div>
                <p className="text-muted text-sm leading-relaxed">{prize.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Productos */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">— Aplica a —</span>
            <h2 className="section-title">Elige tu proyecto</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              El descuento se aplica sobre cualquiera de estos productos.
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

        {/* Cómo funciona */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">— Pasos —</span>
            <h2 className="section-title">Cómo funciona</h2>
          </div>

          <div className="space-y-6">
            {[
              { n: '01', title: 'Participa en Espanias', desc: 'Entra en el Mundial 2026 en espanias.com y juega. Los mejores resultados ganan premios en webs.' },
              { n: '02', title: 'Recibe tu cupón', desc: 'Si ganas, Espanias te envía un enlace personalizado con tu descuento firmado y verificado.' },
              { n: '03', title: 'Elige tu producto', desc: 'Entra en por2duros.com/mundial con tu cupón, elige Landing Page, MVP o E-commerce y aplica el descuento.' },
              { n: '04', title: 'Tu web en 48 horas', desc: 'Completas el briefing y nosotros ponemos manos a la obra. Entrega garantizada en 48h.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-6 items-start border border-border p-6">
                <span className="text-neon font-mono font-black text-2xl flex-shrink-0">{step.n}</span>
                <div>
                  <h3 className="font-bold uppercase tracking-tight mb-1">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
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

        {/* Reto Mundial — mecánica complementaria */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="border border-orange-500/40 bg-orange-500/5 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-16 h-16 border-2 border-orange-500 flex items-center justify-center">
              <Flame size={28} className="text-orange-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-orange-400 text-xs uppercase tracking-widest font-mono mb-2 block">Mecánica alternativa</span>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Reto Mundial: descuento dinámico</h2>
              <p className="text-muted text-sm leading-relaxed">
                ¿No participas en Espanias? Sin problema. Con el <strong className="text-foreground">Reto Mundial</strong> tu
                descuento en Por 2 Duros crece automáticamente con cada victoria de España —{' '}
                sin rasca, sin cupón fijo. Si España gana el Mundial, tu web es gratis.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/reto-mundial"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 border border-orange-500 text-orange-400 hover:bg-orange-500/10 transition-colors whitespace-nowrap text-sm uppercase tracking-widest"
              >
                <Flame size={14} />
                Ver el Reto
              </Link>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 px-4 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
            ¿A qué esperas?
          </h2>
          <p className="text-muted mb-10 max-w-md mx-auto">
            El Mundial 2026 ya está en marcha. Entra, juega y gana tu proyecto web.
          </p>
          <a
            href="https://www.espanias.com/mundial"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Ir a Espanias
            <ExternalLink size={16} />
          </a>
          <div className="mt-6">
            <Link href="/#contacto" className="text-muted text-sm hover:text-neon transition-colors">
              ¿Prefieres contratar directamente? Pide presupuesto →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
