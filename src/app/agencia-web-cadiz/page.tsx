import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agencia Web en Cádiz — Tu web lista en 48 horas | Por 2 Duros',
  description:
    'Agencia de desarrollo web en Cádiz. Webs para negocios locales, peñas y agrupaciones del Carnaval, tiendas online y landing pages desde €299. Entrega en 48 horas.',
  keywords: ['agencia web Cádiz', 'diseño web Cádiz', 'desarrollo web Cádiz', 'páginas web Cádiz', 'web carnaval Cádiz', 'web peña carnaval'],
  alternates: {
    canonical: 'https://por2duros.com/agencia-web-cadiz',
  },
  openGraph: {
    title: 'Agencia Web en Cádiz — Tu web lista en 48 horas',
    description: 'Desarrollo web profesional en Cádiz. Webs para negocios y Carnaval. Desde €299, entrega en 48 horas.',
    url: 'https://por2duros.com/agencia-web-cadiz',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Por 2 Duros — Agencia Web Cádiz',
  description: 'Agencia de desarrollo web en Cádiz especializada en webs para negocios locales, peñas de Carnaval, tiendas online y MVPs en 48 horas.',
  url: 'https://por2duros.com/agencia-web-cadiz',
  areaServed: { '@type': 'City', name: 'Cádiz' },
  priceRange: '€€',
  serviceType: ['Diseño web', 'Desarrollo web', 'Landing page', 'Tienda online', 'Web Carnaval'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Hacéis webs para peñas y agrupaciones del Carnaval de Cádiz?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Desarrollamos webs específicas para peñas, comparsas, chirigotas y agrupaciones del Carnaval: venta de entradas, galería de actuaciones, letra de coplas, noticias y redes sociales integradas. En 48 horas tienes tu web lista antes del próximo ensayo.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una web para el Carnaval de Cádiz?',
      acceptedAnswer: { '@type': 'Answer', text: 'Una landing page para agrupación o peña desde €299. Incluye diseño personalizado con los colores de tu agrupación, galería de fotos, vídeos de actuaciones y formulario de contacto. Pago único, sin cuotas.' },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo tengo mi web lista?',
      acceptedAnswer: { '@type': 'Answer', text: '48 horas desde que confirmamos los requisitos. Para una landing page simple de agrupación, en 24 horas.' },
    },
    {
      '@type': 'Question',
      name: '¿Hacéis webs para negocios de Cádiz además del Carnaval?',
      acceptedAnswer: { '@type': 'Answer', text: 'Por supuesto. Bodegas, restaurantes, hoteles, comercios, profesionales independientes — cualquier negocio gaditano que necesite presencia digital profesional.' },
    },
  ],
}

const SERVICES = [
  { name: 'Landing Page', price: 'desde €299', time: '24 horas', href: '/landing-page' },
  { name: 'Web para Carnaval', price: 'desde €299', time: '48 horas', href: '/#contacto' },
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

const CARNAVAL_INCLUDES = [
  'Diseño con los colores y estética de tu agrupación',
  'Galería de fotos y vídeos de actuaciones',
  'Letra de coplas y repertorio',
  'Calendario de actuaciones y ensayos',
  'Integración con redes sociales',
  'Formulario para socios o seguidores',
]

export default function AgenciaWebCadizPage() {
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
              <span className="text-neon text-xs uppercase tracking-widest font-mono">Agencia Web · Cádiz</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Tu web lista en{' '}
              <span className="neon-text">48 horas.</span>
              <br />
              Desde Cádiz.
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Webs para negocios gaditanos y para agrupaciones del Carnaval de Cádiz.
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

        {/* Carnaval highlight */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="neon-border p-8 md:p-12">
              <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">— Especial Carnaval —</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Webs para peñas y agrupaciones del Carnaval de Cádiz
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Tu agrupación merece una web tan buena como sus coplas. Diseñamos páginas únicas para comparsas,
                chirigotas, cuartetos y peñas — con los colores de tu agrupación, galería de actuaciones,
                calendario y todo lo que necesitas para conectar con tus seguidores.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {CARNAVAL_INCLUDES.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-neon mt-0.5 shrink-0" />
                    <span className="text-muted text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
                Quiero web para mi agrupación <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-4">Todos nuestros servicios web en Cádiz</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Para negocios, profesionales y agrupaciones de toda la provincia.
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
            <p className="section-subtitle text-center mx-auto mb-12">Sin sorpresas. Sin extras que deberían estar incluidos.</p>
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

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
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
              ¿Tu negocio o agrupación en Cádiz necesita una web?
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
