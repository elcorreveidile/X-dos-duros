import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, Clock, Code, Zap } from 'lucide-react'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Qué es exactamente un MVP?', acceptedAnswer: { '@type': 'Answer', text: 'Un Producto Mínimo Viable es la versión más pequeña de tu idea que ya funciona de verdad y que puedes poner en manos de usuarios reales para validar si el mercado lo necesita — antes de invertir meses en desarrollo.' } },
    { '@type': 'Question', name: '¿El MVP incluye pagos?', acceptedAnswer: { '@type': 'Answer', text: 'La integración con Stripe (pagos únicos o suscripciones) se puede añadir al MVP por un coste adicional. Cuéntanos tu caso en el brief y lo presupuestamos.' } },
    { '@type': 'Question', name: '¿Entregáis el código fuente?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, siempre. El repositorio es tuyo. Puedes seguir desarrollando con tu propio equipo o contratarnos para iteraciones posteriores.' } },
    { '@type': 'Question', name: '¿Podéis escalar el MVP después?', acceptedAnswer: { '@type': 'Answer', text: 'El stack que usamos (Next.js, Supabase, Vercel) escala desde 0 hasta millones de usuarios sin cambiar de tecnología. Te dejamos una base sólida desde el día 1.' } },
  ],
}

export const metadata: Metadata = {
  title: 'MVP Web App en 48 horas desde €799 — Por 2 Duros',
  description:
    'Lanza tu producto mínimo viable en 48 horas. Autenticación, base de datos, panel de usuario y lógica de negocio. Código a medida, sin plantillas. Desde €799.',
  keywords: ['MVP', 'producto mínimo viable', 'MVP web app', 'desarrollar MVP', 'MVP barato', 'MVP 48 horas', 'startup MVP'],
  openGraph: {
    title: 'MVP Web App en 48 horas desde €799',
    description: 'Lanza tu startup con un MVP funcional en 48 horas. Autenticación, base de datos y lógica de negocio incluidos.',
    url: 'https://por2duros.com/mvp',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const INCLUDES = [
  'Autenticación de usuarios (email / Google)',
  'Base de datos PostgreSQL con Prisma ORM',
  'Panel de usuario con rutas protegidas',
  'Lógica de negocio básica según tu caso',
  'API REST o Server Actions (Next.js)',
  'Diseño funcional y responsivo',
  'Código a medida: Next.js + Supabase',
  'Cumplimiento RGPD y normativa de cookies',
]

const FAQS = [
  {
    q: '¿Qué es exactamente un MVP?',
    a: 'Un Producto Mínimo Viable es la versión más pequeña de tu idea que ya funciona de verdad y que puedes poner en manos de usuarios reales para validar si el mercado lo necesita — antes de invertir meses en desarrollo.',
  },
  {
    q: '¿El MVP incluye pagos?',
    a: 'La integración con Stripe (pagos únicos o suscripciones) se puede añadir al MVP por un coste adicional. Cuéntanos tu caso en el brief y lo presupuestamos.',
  },
  {
    q: '¿Entregáis el código fuente?',
    a: 'Sí, siempre. El repositorio es tuyo. Puedes seguir desarrollando con tu propio equipo o contratarnos para iteraciones posteriores.',
  },
  {
    q: '¿Podéis escalar el MVP después?',
    a: 'El stack que usamos (Next.js, Supabase, Vercel) escala desde 0 hasta millones de usuarios sin cambiar de tecnología. Te dejamos una base sólida desde el día 1.',
  },
]

export default function MvpService() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="pt-16">

        {/* Hero */}
        <section className="grid-bg py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-6 block">
            — MVP Web App —
          </span>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Tu MVP listo{' '}
            <span className="neon-text">en 48 horas.</span>
          </h1>
          <p className="section-subtitle mx-auto mb-4">
            Valida tu idea con un producto real y funcional antes de que la competencia se mueva.
            Desde <strong className="text-white">€799</strong> con entrega garantizada.
          </p>
          <p className="text-sm text-muted mb-10">
            Código 100% propio · Stack moderno y escalable · Tú eres dueño del código
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contacto"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Pedir mi MVP <ArrowRight size={16} />
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
                De idea a producto{' '}
                <span className="neon-text">en 3 pasos.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { icon: Zap, step: '01', title: 'Brief técnico', body: 'Defines el flujo principal: qué hace el usuario, qué datos maneja y cuál es el objetivo central del producto.' },
                { icon: Code, step: '02', title: 'Desarrollo', body: 'Construimos el MVP sobre Next.js y Supabase. Sin atajos: código limpio, base de datos real, autenticación segura.' },
                { icon: Clock, step: '03', title: 'Entrega en 48 h', body: 'Te entregamos URL en staging + acceso al repositorio. Revisamos juntos y publicamos cuando das el OK.' },
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

        {/* Otros servicios */}
        <section className="py-16 border-t border-border px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <p className="text-center text-muted text-sm mb-8 uppercase tracking-widest font-mono">— También hacemos —</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/landing-page" className="border border-border p-6 hover:border-neon/40 transition-colors group">
              <p className="text-xs text-neon uppercase tracking-widest font-mono mb-2">Landing Page</p>
              <p className="font-bold uppercase">Página de alta conversión</p>
              <p className="text-muted text-sm mt-1">Desde €299 · 24 horas</p>
            </Link>
            <Link href="/ecommerce" className="border border-border p-6 hover:border-neon/40 transition-colors group">
              <p className="text-xs text-neon uppercase tracking-widest font-mono mb-2">E-commerce</p>
              <p className="font-bold uppercase">Tienda online completa</p>
              <p className="text-muted text-sm mt-1">Desde €599 · 48 horas</p>
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 border-t border-border bg-card px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">
            ¿Listo para lanzar{' '}
            <span className="neon-text">tu idea?</span>
          </h2>
          <p className="section-subtitle mx-auto mb-10">
            Desde €799. Entrega en 48 horas. Stack escalable desde el día 1.
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
