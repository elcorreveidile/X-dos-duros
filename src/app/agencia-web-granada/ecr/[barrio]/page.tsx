import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import SelloECR from '@/components/marca/SelloECR'
import SimboloQPQ from '@/components/marca/SimboloQPQ'

const BARRIOS = [
  {
    slug: 'realejo',
    codigo: 'ECR',
    barrio: 'REALEJO',
    nombre: 'El Realejo',
    desc: 'El barrio judío de Granada, a los pies de la Alhambra.',
    detalle: 'El Realejo es el corazón histórico de la Economía Circular. Negocios de artesanía, hostelería y cultura que llevan la red QPQ desde el principio.',
  },
  {
    slug: 'albaicin',
    codigo: 'ECA',
    barrio: 'ALBAICÍN',
    nombre: 'El Albaicín',
    desc: 'Patrimonio de la Humanidad, con 3 millones de visitas anuales.',
    detalle: 'El Albaicín concentra tiendas de artesanía, tetererías, casas rurales y restaurantes que reciben visitantes de todo el mundo. La red QPQ conecta a sus negocios con el tejido local.',
  },
  {
    slug: 'zaidin',
    codigo: 'ECZ',
    barrio: 'ZAIDÍN',
    nombre: 'El Zaidín',
    desc: 'El barrio más poblado de Granada, con una economía de proximidad fuerte.',
    detalle: 'El Zaidín tiene la densidad comercial más alta de Granada: mercados, clínicas, talleres y comercio de barrio. Una red QPQ aquí tiene impacto inmediato y directo.',
  },
  {
    slug: 'sacromonte',
    codigo: 'ECS',
    barrio: 'SACROMONTE',
    nombre: 'El Sacromonte',
    desc: 'El barrio del flamenco y las cuevas. Cultura e historia viva.',
    detalle: 'El Sacromonte vive del turismo cultural y del flamenco. Cuevas, tablaos, artistas y negocios únicos que necesitan presencia digital con identidad propia.',
  },
  {
    slug: 'centro',
    codigo: 'ECC',
    barrio: 'CENTRO',
    nombre: 'El Centro',
    desc: 'Calle Real, Gran Vía, Reyes Católicos. El corazón comercial de Granada.',
    detalle: 'El Centro de Granada agrupa el comercio histórico de la ciudad: librerías, joyerías, moda, restauración y servicios. La red QPQ aquí facilita la colaboración entre negocios de toda la vida.',
  },
  {
    slug: 'chana',
    codigo: 'ECCH',
    barrio: 'LA CHANA',
    nombre: 'La Chana',
    desc: 'Barrio obrero al noroeste de Granada, con fuerte tejido comercial de proximidad.',
    detalle: 'La Chana tiene una identidad de barrio muy marcada y un comercio de proximidad fiel. La red QPQ aquí refuerza la economía local y la colaboración entre vecinos.',
  },
]

export function generateStaticParams() {
  return BARRIOS.map((b) => ({ barrio: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ barrio: string }> }): Promise<Metadata> {
  const { barrio: slug } = await params
  const b = BARRIOS.find((b) => b.slug === slug)
  if (!b) return {}
  return {
    title: `${b.codigo} ${b.nombre} — Economía Circular Granada | Por 2 Duros`,
    description: `Paga tu web en ${b.nombre} con QPQ: la moneda circular de tu barrio. ${b.desc} 1 QPQ = 30 €. Sin caducidad.`,
    alternates: {
      canonical: `https://por2duros.com/agencia-web-granada/ecr/${b.slug}`,
    },
  }
}

export default async function ECRBarrioPage({ params }: { params: Promise<{ barrio: string }> }) {
  const { barrio: slug } = await params
  const b = BARRIOS.find((b) => b.slug === slug)
  if (!b) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-2xl mx-auto px-6 py-24 space-y-16">

          {/* Breadcrumb */}
          <Link
            href="/agencia-web-granada/ecr"
            className="inline-flex items-center gap-2 text-muted text-xs uppercase tracking-widest hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> ECR Granada
          </Link>

          {/* Hero */}
          <div className="space-y-8">
            <div className="flex items-center gap-6 flex-wrap">
              <SelloECR
                size={96}
                codigo={b.codigo}
                barrio={b.barrio}
                color="currentColor"
                className="text-foreground flex-shrink-0"
              />
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-muted">
                  Economía Circular · {b.nombre}
                </p>
                <p className="text-xs font-mono text-neon mt-1">{b.codigo}</p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mt-2">
                  {b.nombre},<br />
                  <span className="text-neon">en red.</span>
                </h1>
              </div>
            </div>
            <p className="text-muted text-lg leading-relaxed">
              {b.detalle}
            </p>
          </div>

          {/* QPQ */}
          <div className="flex items-start gap-5">
            <SimboloQPQ size={60} color="currentColor" className="text-neon flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-muted">El QPQ de {b.nombre}</h2>
              <p className="font-black text-lg uppercase tracking-tight">
                Paga tu web con lo que sabes hacer
              </p>
              <p className="text-muted leading-relaxed text-sm">
                Un bono de tu negocio que vale <strong className="text-foreground">30 €</strong>,
                al portador y sin caducidad. Pagas parte de tu web con QPQ y esos bonos vuelven
                a circular por {b.nombre} y el resto de la red.
              </p>
              <div className="border border-border bg-card p-4 text-xs font-mono space-y-1">
                <p><span className="text-muted">CÓDIGO:</span> <span className="text-neon">{b.codigo}</span></p>
                <p><span className="text-muted">BARRIO:</span> <span className="text-foreground uppercase">{b.barrio}</span></p>
                <p><span className="text-muted">1 QPQ =</span> <span className="text-foreground">30 €</span></p>
                <p><span className="text-muted">CADUCIDAD:</span> <span className="text-foreground">Sin caducidad</span></p>
              </div>
            </div>
          </div>

          {/* Formas de pago */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-muted">Formas de pago</h2>
            <div className="border border-border divide-y divide-border">
              <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-sm">Contado</span>
                <span className="text-neon font-black font-mono">−10%</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-sm">A plazos</span>
                <span className="text-neon font-black font-mono">4× sin interés</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-sm">QPQ</span>
                <span className="text-neon font-black font-mono">300 € + bonos</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="border border-neon/30 bg-neon/5 p-8 text-center space-y-4">
            <p className="font-black text-xl uppercase tracking-tight">
              ¿Tu negocio está en {b.nombre}?
            </p>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Cuéntanos qué hace tu negocio y te decimos cuántos QPQ puedes ofrecer
              y qué web te corresponde.
            </p>
            <Link
              href="/#precio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Ver precios <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
