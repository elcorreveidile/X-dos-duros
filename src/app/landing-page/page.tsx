import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, Clock, Code, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Landing Page profesional en 24 horas desde €299 — Por 2 Duros',
  description:
    'Diseñamos y desarrollamos tu landing page de alta conversión en 24 horas. Código a medida, SEO incluido, sin plantillas. Desde €299. Entrega garantizada.',
  keywords: ['landing page', 'landing page barata', 'landing page profesional', 'landing page rápida', 'diseño web 24 horas'],
  openGraph: {
    title: 'Landing Page profesional en 24 horas desde €299',
    description: 'Diseño personalizado, SEO incluido, código a medida. Entrega en 24 horas.',
    url: 'https://por2duros.com/landing-page',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const INCLUDES = [
  'Diseño 100% personalizado (sin plantillas)',
  'Responsive — móvil, tablet y escritorio',
  'SEO básico: metadatos, sitemap y robots',
  'Formulario de contacto funcional',
  'Integración con Google Analytics / Plausible',
  'Certificado SSL y despliegue incluidos',
  'Código a medida: Next.js + Tailwind CSS',
  'Cumplimiento RGPD y normativa de cookies',
]

const FAQS = [
  {
    q: '¿Realmente entregáis en 24 horas?',
    a: 'Sí. El contador de 24 horas arranca en el momento en que confirmamos los requisitos y materiales (logo, textos, colores). Sin brief completo, el reloj no empieza.',
  },
  {
    q: '¿Puedo pedir cambios después?',
    a: 'Incluimos una ronda de revisiones antes de la entrega final. Cambios posteriores se presupuestan por separado o con el plan de mantenimiento mensual.',
  },
  {
    q: '¿Qué necesito tener preparado?',
    a: 'Logo en SVG o PNG, textos principales (o nos dices el negocio y los redactamos nosotros), paleta de colores si la tienes, y referencias de webs que te gusten.',
  },
  {
    q: '¿Usáis WordPress o Wix?',
    a: 'No. Desarrollamos en Next.js con código propio — más rápido, más seguro y sin licencias que pagar cada mes. Tú eres dueño del código al 100%.',
  },
]

export default function LandingPageService() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="grid-bg py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-6 block">
            — Landing Page —
          </span>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Tu landing page lista{' '}
            <span className="neon-text">en 24 horas.</span>
          </h1>
          <p className="section-subtitle mx-auto mb-4">
            Diseño profesional, código a medida y SEO incluido. Sin plantillas, sin atajos.
            Desde <strong className="text-white">€299</strong> con entrega garantizada.
          </p>
          <p className="text-sm text-muted mb-10">
            Código 100% propio · Cumple con el RGPD y la normativa de cookies · Tú eres dueño del código
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contacto"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Pedir mi landing page <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="border border-border px-6 py-3 text-sm uppercase tracking-widest hover:border-neon/40 transition-colors"
            >
              Ver todos los servicios
            </Link>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-24 border-t border-border px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
              — Sin sorpresas —
            </span>
            <h2 className="section-title">
              Todo lo que incluye{' '}
              <span className="neon-text">el precio.</span>
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3 border border-border p-4 bg-card">
                <CheckCircle size={18} className="text-neon mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Proceso */}
        <section className="py-24 border-t border-border bg-card px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
                — Cómo funciona —
              </span>
              <h2 className="section-title">
                De cero a publicada{' '}
                <span className="neon-text">en 3 pasos.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { icon: Zap, step: '01', title: 'Brief en 10 min', body: 'Rellenas un formulario rápido con tu negocio, objetivo y materiales. Cuanto más claro, más rápido empezamos.' },
                { icon: Code, step: '02', title: 'Desarrollamos', body: 'Nuestro equipo arranca el desarrollo al confirmar el pago. El contador de 24 horas empieza ahora.' },
                { icon: Clock, step: '03', title: 'Entrega y revisión', body: 'Te enviamos la web en staging. Una ronda de cambios incluida. Publicamos cuando das el OK.' },
              ].map(({ icon: Icon, step, title, body }) => (
                <div key={step} className="bg-background p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-neon font-mono text-xs">{step}</span>
                    <Icon size={20} className="text-neon" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-border px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
              — Preguntas frecuentes —
            </span>
            <h2 className="section-title">
              Lo que todo el mundo{' '}
              <span className="neon-text">pregunta.</span>
            </h2>
          </div>
          <div className="divide-y divide-border">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-6">
                <h3 className="font-bold mb-2">{q}</h3>
                <p className="text-muted text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 border-t border-border bg-card px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">
            ¿Listo para tener{' '}
            <span className="neon-text">tu landing?</span>
          </h2>
          <p className="section-subtitle mx-auto mb-10">
            Desde €299. Entrega en 24 horas. Sin plantillas ni sorpresas.
          </p>
          <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
            Empezar ahora <ArrowRight size={16} />
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
