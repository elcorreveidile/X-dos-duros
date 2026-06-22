import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agencia Web en Málaga — Tu web lista en 48 horas | Por 2 Duros',
  description:
    'Agencia de desarrollo web en Málaga. Webs, landing pages, tiendas online y MVPs desde €299. Código a medida, sin plantillas, entrega en 48 horas garantizada.',
  keywords: ['agencia web Málaga', 'diseño web Málaga', 'desarrollo web Málaga', 'páginas web Málaga', 'crear web Málaga'],
  alternates: {
    canonical: 'https://por2duros.com/agencia-web-malaga',
  },
  openGraph: {
    title: 'Agencia Web en Málaga — Tu web lista en 48 horas',
    description: 'Desarrollo web profesional en Málaga. Desde €299, entrega en 48 horas, código a medida.',
    url: 'https://por2duros.com/agencia-web-malaga',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Por 2 Duros — Agencia Web Málaga',
  description: 'Agencia de desarrollo web en Málaga especializada en webs, landing pages, tiendas online y MVPs en 48 horas.',
  url: 'https://por2duros.com/agencia-web-malaga',
  areaServed: { '@type': 'City', name: 'Málaga' },
  priceRange: '€€',
  telephone: '',
  serviceType: ['Diseño web', 'Desarrollo web', 'Landing page', 'Tienda online', 'MVP'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Hacéis webs para negocios de Málaga?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Trabajamos con negocios de Málaga y toda la Costa del Sol. Trabajamos en remoto con la misma calidad que en persona: videollamada de briefing, prototipo en 24h y entrega en 48h.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una web en Málaga?',
      acceptedAnswer: { '@type': 'Answer', text: 'Una landing page desde €299, una web completa desde €499 y una tienda online desde €599. Pago único, sin cuotas mensuales obligatorias.' },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo tengo mi web lista?',
      acceptedAnswer: { '@type': 'Answer', text: '48 horas desde que confirmamos los requisitos. Para landing pages simples, en 24 horas.' },
    },
    {
      '@type': 'Question',
      name: '¿Usáis WordPress?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Desarrollamos en Next.js con código a medida — más rápido, más seguro y sin licencias que pagar. Tú eres dueño del código.' },
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

export default function AgenciaWebMalagaPage() {
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
              <span className="text-neon text-xs uppercase tracking-widest font-mono">Agencia Web · Málaga</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Tu web lista en{' '}
              <span className="neon-text">48 horas.</span>
              <br />
              Desde Málaga.
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Desarrollamos webs, landing pages, tiendas online y MVPs para negocios de Málaga y la Costa del Sol.
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
            <h2 className="section-title text-center mb-4">Servicios web en Málaga</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Todo lo que necesita tu negocio malagueño para tener presencia digital profesional.
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

        {/* Why us for Malaga */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-4">Por qué elegirnos para tu web en Málaga</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Málaga es una ciudad que crece rápido. Tu negocio necesita una web que esté a la altura.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Velocidad real', desc: 'Mientras otras agencias tardan semanas, nosotros entregamos en 48 horas. Porque cada día sin web es un día perdiendo clientes.' },
                { title: 'Código a medida', desc: 'Sin WordPress, sin Wix, sin plantillas genéricas. Tu web es única, más rápida y sin cuotas mensuales de licencia.' },
                { title: 'SEO desde el inicio', desc: 'Tu web llega optimizada para aparecer en Google desde el primer día. No es un extra — es parte del trabajo.' },
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
              ¿Tu negocio en Málaga necesita una web?
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
