import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agencia Web en Marbella — Tu web lista en 48 horas | Por 2 Duros',
  description:
    'Agencia de desarrollo web en Marbella. Webs, landing pages, tiendas online y MVPs desde €299. Código a medida, sin plantillas, entrega en 48 horas garantizada.',
  keywords: ['agencia web Marbella', 'diseño web Marbella', 'desarrollo web Marbella', 'páginas web Marbella', 'crear web Marbella'],
  alternates: {
    canonical: 'https://por2duros.com/agencia-web-marbella',
  },
  openGraph: {
    title: 'Agencia Web en Marbella — Tu web lista en 48 horas',
    description: 'Desarrollo web profesional en Marbella. Desde €299, entrega en 48 horas, código a medida.',
    url: 'https://por2duros.com/agencia-web-marbella',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Por 2 Duros — Agencia Web Marbella',
  description: 'Agencia de desarrollo web en Marbella especializada en webs, landing pages, tiendas online y MVPs en 48 horas.',
  url: 'https://por2duros.com/agencia-web-marbella',
  areaServed: { '@type': 'City', name: 'Marbella' },
  priceRange: '€€',
  serviceType: ['Diseño web', 'Desarrollo web', 'Landing page', 'Tienda online', 'MVP'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Hacéis webs para negocios de Marbella?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Trabajamos con negocios de Marbella y toda la Costa del Sol. Hoteles, restaurantes, inmobiliarias, tiendas, clínicas — cualquier sector. Trabajamos en remoto con la misma calidad que en persona: videollamada de briefing, prototipo en 24h y entrega en 48h.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una web en Marbella?',
      acceptedAnswer: { '@type': 'Answer', text: 'Una landing page desde €299, una web completa desde €499 y una tienda online desde €599. Pago único, sin cuotas mensuales obligatorias.' },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo tengo mi web lista?',
      acceptedAnswer: { '@type': 'Answer', text: '48 horas desde que confirmamos los requisitos. Para landing pages simples, en 24 horas.' },
    },
    {
      '@type': 'Question',
      name: '¿Hacéis webs en inglés para el mercado internacional de Marbella?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Desarrollamos webs multilingüe (español e inglés) para negocios de Marbella que atienden a clientela internacional. El contenido en inglés lo redactamos nosotros o lo adaptas tú.' },
    },
  ],
}

const SERVICES = [
  { name: 'Landing Page', price: 'desde €299', time: '24 horas', href: '/landing-page' },
  { name: 'Página Web Corporativa', price: 'desde €499', time: '48 horas', href: '/#servicios' },
  { name: 'Tienda Online', price: 'desde €599', time: '48 horas', href: '/ecommerce' },
  { name: 'MVP Web App', price: 'desde €799', time: '48 horas', href: '/mvp' },
]

const INCLUDES = [
  'Diseño 100% personalizado, sin plantillas',
  'Responsive: móvil, tablet y escritorio',
  'SEO técnico incluido desde el primer día',
  'Código a medida: Next.js + Tailwind CSS',
  'Cumplimiento RGPD y normativa de cookies',
  'Formulario de contacto funcional',
  'Despliegue y dominio incluidos',
  'Código en tu repositorio — tuyo al 100%',
]

export default function AgenciaWebMarbellaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 grid-bg overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8">
              <MapPin size={14} className="text-neon" />
              <span className="text-neon text-xs uppercase tracking-widest font-mono">Agencia Web · Marbella</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Tu web lista en{' '}
              <span className="neon-text">48 horas.</span>
              <br />
              Desde Marbella.
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Desarrollamos webs, landing pages, tiendas online y MVPs para negocios de Marbella y la Costa del Sol.
              Código a medida, sin plantillas, sin suscripciones. Pago único desde{' '}
              <strong className="text-foreground">€299</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
                Pedir presupuesto gratis <ArrowRight size={16} />
              </Link>
              <Link href="/#precio" className="btn-outline inline-flex items-center gap-2">
                Ver precios
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-4">Servicios web en Marbella</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Desde la Golden Mile hasta Puerto Banús — webs profesionales para negocios de alto nivel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((s) => (
                <Link key={s.name} href={s.href} className="card-hover group p-6 flex flex-col">
                  <div className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-neon transition-colors">{s.name}</div>
                  <div className="text-neon font-mono text-sm mb-1">{s.price}</div>
                  <div className="text-muted text-xs mt-auto pt-3 border-t border-border">{s.time}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Includes */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-4">Qué incluye cada proyecto</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Sin sorpresas. Sin extras que deberían estar incluidos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INCLUDES.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-neon mt-0.5 shrink-0" />
                  <span className="text-muted text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-4">Por qué elegirnos para tu web en Marbella</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Marbella tiene un estándar alto. Tu web también debería tenerlo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Velocidad real', desc: 'Mientras otras agencias tardan semanas, nosotros entregamos en 48 horas. Porque cada día sin web es un día perdiendo clientes.' },
                { title: 'Código a medida', desc: 'Sin WordPress, sin Wix, sin plantillas genéricas. Tu web es única, más rápida y sin cuotas mensuales de licencia.' },
                { title: 'Multilingüe', desc: 'Desarrollamos webs en español e inglés para negocios de Marbella que atienden a clientela internacional. Un mercado, dos idiomas.' },
              ].map((item) => (
                <div key={item.title} className="card">
                  <h3 className="font-black uppercase tracking-tight text-sm neon-text mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-12">Preguntas frecuentes</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq) => (
                <div key={faq.name} className="border-b border-border pb-6">
                  <h3 className="font-bold text-sm uppercase tracking-tight mb-2">{faq.name}</h3>
                  <p className="text-muted text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
              ¿Tu negocio en Marbella necesita una web?
            </h2>
            <p className="text-muted mb-8">Cuéntanos tu proyecto y te respondemos con un presupuesto en menos de 2 horas.</p>
            <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
              Pedir presupuesto gratis <ArrowRight size={16} />
            </Link>
            <p className="text-muted text-xs mt-4">Sin compromiso · Respuesta en menos de 2 horas</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
