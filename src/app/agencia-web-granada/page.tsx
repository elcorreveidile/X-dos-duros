import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, MapPin, RefreshCw } from 'lucide-react'
import SelloECR from '@/components/marca/SelloECR'

export const metadata: Metadata = {
  title: 'Agencia Web en Granada — 3 millones de turistas te buscan | Por 2 Duros',
  description:
    'Agencia web en Granada. La ciudad más buscada de Andalucía necesita negocios con web. Webs, landing pages y tiendas online desde €299. Código a medida, entrega en 48 horas.',
  keywords: ['agencia web Granada', 'diseño web Granada', 'desarrollo web Granada', 'páginas web Granada', 'crear web Granada', 'web Albaicín', 'web negocio Granada'],
  alternates: {
    canonical: 'https://por2duros.com/agencia-web-granada',
  },
  openGraph: {
    title: 'Agencia Web en Granada — 3 millones de turistas te buscan',
    description: 'La ciudad más visitada de Andalucía merece negocios con presencia digital. Webs desde €299, entrega en 48 horas, código a medida.',
    url: 'https://por2duros.com/agencia-web-granada',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Por 2 Duros — Agencia Web Granada',
  description: 'Agencia de desarrollo web en Granada especializada en webs, landing pages, tiendas online y MVPs en 48 horas.',
  url: 'https://por2duros.com/agencia-web-granada',
  areaServed: { '@type': 'City', name: 'Granada' },
  priceRange: '€€',
  serviceType: ['Diseño web', 'Desarrollo web', 'Landing page', 'Tienda online', 'MVP'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Hacéis webs para negocios de Granada?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Trabajamos con negocios de Granada y toda la provincia — bares, restaurantes, tiendas, hoteles, servicios profesionales, startups. Trabajamos en remoto con la misma calidad que en persona: videollamada de briefing, prototipo en 24h y entrega en 48h.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una web en Granada?',
      acceptedAnswer: { '@type': 'Answer', text: 'Una landing page desde €299, una web completa desde €499 y una tienda online desde €599. Pago único, sin cuotas mensuales obligatorias. Sin sorpresas.' },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo tengo mi web lista?',
      acceptedAnswer: { '@type': 'Answer', text: '48 horas desde que confirmamos los requisitos. Para landing pages simples, en 24 horas. Somos de los pocos que cumplen lo que prometen.' },
    },
    {
      '@type': 'Question',
      name: '¿Usáis WordPress?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Desarrollamos en Next.js con código a medida — más rápido, más seguro y sin licencias que pagar. Google lo nota. Tú eres dueño del código al 100%.' },
    },
    {
      '@type': 'Question',
      name: '¿Mi web puede aparecer cuando busquen en inglés o alemán?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Podemos incluir versiones en inglés y otros idiomas si tu negocio recibe turismo internacional. En Granada, con 3 millones de visitantes al año, suele ser una inversión que se nota.' },
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

export default function AgenciaWebGranadaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-end px-4 sm:px-6 lg:px-8 overflow-hidden">
          <Image
            src="/images/granada/granada-alhambra-noche.webp"
            alt="La Alhambra iluminada de noche, Granada"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="relative max-w-4xl mx-auto text-center w-full pb-20 pt-32">
            <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8">
              <MapPin size={14} className="text-neon" />
              <span className="text-neon text-xs uppercase tracking-widest font-mono">Granada · Andalucía</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              3 millones de turistas{' '}
              <span className="neon-text">buscan Granada.</span>
              <br />
              ¿Apareces tú?
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Granada es una de las ciudades más buscadas de España. Turistas de medio mundo, 60.000 estudiantes
              y una ciudad que vive hacia adentro — pero que Google ve desde fuera.
              Tu negocio merece estar ahí cuando te busquen.
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
            <h2 className="section-title text-center mb-4">Servicios web en Granada</h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Para el bar de tapas del centro, la tienda del Albaicín, el hotel cerca de la Alhambra y la startup del PTS.
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
              Granada vive hacia adentro.{' '}
              <span className="neon-text">Google la ve desde fuera.</span>
            </h2>
            <p className="section-subtitle text-center mx-auto mb-12">
              Los granadinos no necesitan Google para encontrar su bar de toda la vida. Pero los tres millones de turistas que llegan a ver la Alhambra, sí.
              Y los 60.000 estudiantes que buscan piso, academia o dentista, también.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="neon-border p-8">
                <h3 className="font-black uppercase tracking-tight text-sm neon-text mb-4">El turismo que pasa por delante de tu puerta</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Granada recibe más de 3 millones de visitantes al año — y casi todos buscan en Google antes de decidir dónde comer,
                  dónde dormir o qué hacer. Un restaurante en la Carrera del Darro sin web visible en Google
                  está dejando pasar a cientos de clientes potenciales cada semana.
                  El escaparate más rentable de Granada no es el de la calle Real. Es Google.
                </p>
              </div>
              <div className="neon-border p-8">
                <h3 className="font-black uppercase tracking-tight text-sm neon-text mb-4">Una ciudad que no siempre se vende bien</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Granada tiene una contradicción bonita: es una de las ciudades más bellas del mundo
                  y al mismo tiempo una de las que peor se promociona digitalmente.
                  Los negocios de toda la vida sobreviven por el boca a boca, pero el boca a boca de 2025
                  pasa por Google, por Instagram y por tu web. La calidad del producto ya la tienes.
                  El escaparate digital es lo que falta.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'El turista que busca', desc: 'Alguien en Frankfurt busca "restaurante con tapas Granada" el día antes de llegar. Si tu web no aparece, tu competencia se lleva esa mesa.' },
                { title: 'El estudiante que llega', desc: '60.000 universitarios buscan todo online: piso, dentista, academia, ropa, ocio. Un negocio local bien posicionado tiene ese mercado a su alcance.' },
                { title: 'El granadino que confía', desc: 'El cliente local lleva la barra muy alta. Si tu web transmite la misma calidad que tu producto, la confianza llega sola — y ya no se va.' },
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

        {/* ECR */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <RefreshCw size={18} className="text-neon" />
                  <span className="text-xs uppercase tracking-widest font-mono text-muted">Economía Circular Granada</span>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                  Paga tu web<br />
                  <span className="neon-text">con lo que haces.</span>
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  Si tienes un negocio en el Realejo, el Albaicín, el Zaidín, el Sacromonte o el Centro,
                  puedes pagar parte de tu web con <strong className="text-foreground">bonos QPQ</strong>{' '}
                  de tu propio negocio. 1 QPQ = 30 €. Al portador, sin caducidad.
                </p>
                <div className="space-y-3 text-sm">
                  {[
                    { icon: '💶', label: 'Al contado', detail: '−10% sobre el precio normal' },
                    { icon: '🗓️', label: 'A plazos sin interés', detail: '4 cuotas iguales' },
                    { icon: '♻️', label: 'Con QPQ', detail: 'Pagas parte con tu propio producto' },
                  ].map((m) => (
                    <div key={m.label} className="flex items-start gap-3 border border-border bg-card p-3">
                      <span className="text-xl flex-shrink-0">{m.icon}</span>
                      <div>
                        <p className="font-bold text-xs uppercase tracking-tight">{m.label}</p>
                        <p className="text-muted text-xs">{m.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/agencia-web-granada/ecr" className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors">
                    ECR Granada →
                  </Link>
                  <Link href="/agencia-web-granada/ecr" className="inline-flex items-center gap-2 px-5 py-2.5 border border-neon/40 text-neon font-black text-xs uppercase tracking-widest hover:border-neon transition-colors">
                    Qué es el ECR
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <SelloECR size={200} color="currentColor" className="text-foreground opacity-80" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
              Granada merece negocios con presencia digital a la altura.
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
