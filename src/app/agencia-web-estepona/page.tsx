import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agencia Web en Estepona — De Estepona para Estepona | Por 2 Duros',
  description:
    'Agencia web en Estepona con raíces locales. Webs, landing pages, tiendas online y MVPs desde €299. Código a medida, sin plantillas, entrega en 48 horas. Alguien que conoce el pueblo de verdad.',
  keywords: ['agencia web Estepona', 'diseño web Estepona', 'desarrollo web Estepona', 'páginas web Estepona', 'crear web Estepona'],
  openGraph: {
    title: 'Agencia Web en Estepona — De Estepona para Estepona',
    description: 'Desarrollo web profesional en Estepona. Desde €299, entrega en 48 horas, código a medida. De alguien que conoce el pueblo de verdad.',
    url: 'https://por2duros.com/agencia-web-estepona',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Por 2 Duros — Agencia Web Estepona',
  description: 'Agencia de desarrollo web en Estepona especializada en webs, landing pages, tiendas online y MVPs en 48 horas.',
  url: 'https://por2duros.com/agencia-web-estepona',
  areaServed: { '@type': 'City', name: 'Estepona' },
  priceRange: '€€',
  serviceType: ['Diseño web', 'Desarrollo web', 'Landing page', 'Tienda online', 'MVP'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Hacéis webs para negocios de Estepona?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Trabajamos con negocios de Estepona y toda la Costa del Sol occidental. Trabajamos en remoto con la misma calidad que en persona: videollamada de briefing, prototipo en 24h y entrega en 48h.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una web en Estepona?',
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

export default function AgenciaWebEsteponaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-end px-4 sm:px-6 lg:px-8 overflow-hidden">
          <Image
            src="/images/estepona/estepona-casco-noche.webp"
            alt="Casco antiguo de Estepona de noche con la torre de la iglesia"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="relative max-w-4xl mx-auto text-center w-full pb-20 pt-32">
            <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8">
              <MapPin size={14} className="text-neon" />
              <span className="text-neon text-xs uppercase tracking-widest font-mono">De Estepona · Para Estepona</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Tu web lista en{' '}
              <span className="neon-text">48 horas.</span>
              <br />
              Por alguien de aquí.
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Hay muchas agencias que te hacen una web para Estepona sin haber pisado el pueblo.
              Nosotros somos de aquí. Conocemos el paseo, el casco antiguo, la gente de toda la vida —
              y sabemos lo que necesita un negocio local para destacar de verdad.
              Desde <strong className="text-foreground">€299</strong>, entrega en 48 horas.
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
            <h2 className="section-title text-center mb-4">Servicios web en Estepona</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Todo lo que necesita tu negocio en la Costa del Sol para tener presencia digital profesional.
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

        {/* Local identity */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-4">
              Estepona no es solo{' '}
              <span className="neon-text">la Costa del Sol.</span>
            </h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Hay un Estepona que los turistas no ven. El de las calles del casco antiguo, los negocios de toda la vida, las plazas con flores en verano y el paseo cuando todavía no ha llegado nadie.
              Ese es el Estepona que conocemos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="neon-border p-8">
                <h3 className="font-black uppercase tracking-tight text-sm neon-text mb-4">El problema con las agencias de fuera</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Una agencia de Madrid o Barcelona puede hacerte una web para Estepona. Pero no saben que aquí conviven tres públicos distintos: el vecino de toda la vida, el residente extranjero y el turista de paso. Cada negocio local tiene que saber a cuál de los tres hablarle — y cómo.
                  Eso no se aprende en un briefing de media hora.
                </p>
              </div>
              <div className="neon-border p-8">
                <h3 className="font-black uppercase tracking-tight text-sm neon-text mb-4">Lo que cambia cuando eres de aquí</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Sabemos que el cliente de un restaurante del casco antiguo no es el mismo que el de un chiringuito en la playa de la Rada. Que una inmobiliaria en Estepona habla con compradores de seis países distintos. Que hay negocios que llevan décadas aquí y otros que acaban de abrir. Cada web tiene que hablarle a su gente.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Velocidad real', desc: 'Entregamos en 48 horas. Porque cada día sin web es un día perdiendo clientes frente a quien ya aparece en Google.' },
                { title: 'Código a medida', desc: 'Sin WordPress, sin plantillas genéricas. Tu web es única, más rápida y sin cuotas mensuales de licencia.' },
                { title: 'SEO local', desc: 'Tu web llega optimizada para aparecer cuando alguien busca tu tipo de negocio en Estepona. No es un extra — es parte del trabajo.' },
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
              Tu negocio en Estepona merece una web hecha por alguien de aquí.
            </h2>
            <p className="text-muted mb-8">Cuéntanos tu proyecto. Te respondemos con un presupuesto en menos de 2 horas — sin rodeos, sin comerciales, sin letra pequeña.</p>
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
