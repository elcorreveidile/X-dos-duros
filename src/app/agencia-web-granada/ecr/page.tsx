import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import SelloECR from '@/components/marca/SelloECR'
import SimboloQPQ from '@/components/marca/SimboloQPQ'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Economía Circular Granada — Web con QPQ | Por 2 Duros',
  description:
    'Si tienes un negocio en el Realejo, Albaicín, Zaidín o Sacromonte, paga tu web con QPQ: la moneda circular de tu barrio. 1 QPQ = 30 €. Sin caducidad.',
  alternates: {
    canonical: 'https://por2duros.com/agencia-web-granada/ecr',
  },
}

const BARRIOS = [
  { codigo: 'ECR', barrio: 'REALEJO', nombre: 'El Realejo', slug: 'realejo', desc: 'El barrio judío de Granada, a los pies de la Alhambra.' },
  { codigo: 'ECA', barrio: 'ALBAICÍN', nombre: 'El Albaicín', slug: 'albaicin', desc: 'Patrimonio de la Humanidad, con 3 millones de visitas anuales.' },
  { codigo: 'ECZ', barrio: 'ZAIDÍN', nombre: 'El Zaidín', slug: 'zaidin', desc: 'El barrio más poblado de Granada, con una economía de proximidad fuerte.' },
  { codigo: 'ECS', barrio: 'SACROMONTE', nombre: 'El Sacromonte', slug: 'sacromonte', desc: 'El barrio del flamenco y las cuevas. Cultura e historia viva.' },
  { codigo: 'ECC', barrio: 'CENTRO', nombre: 'El Centro', slug: 'centro', desc: 'Calle Real, Gran Vía, Reyes Católicos. El corazón comercial de Granada.' },
  { codigo: 'ECCH', barrio: 'LA CHANA', nombre: 'La Chana', slug: 'chana', desc: 'Barrio obrero al noroeste de Granada, con fuerte tejido comercial de proximidad.' },
]

const PAYMENT_ROWS = [
  { forma: 'Contado (pago único)', coste: '−10%', detalle: 'Descuento sobre el precio normal' },
  { forma: 'A plazos (sin interés)', coste: '4 × cuotas', detalle: 'Precio normal fraccionado, sin intereses' },
  { forma: 'QPQ (moneda circular)', coste: '300 € + QPQ', detalle: 'Pagas el resto con bonos de tu negocio (1 QPQ = 30 €)' },
]

export default function ECRGranadaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-2xl mx-auto px-6 py-24 space-y-16">

          {/* Breadcrumb */}
          <Link
            href="/agencia-web-granada"
            className="inline-flex items-center gap-2 text-muted text-xs uppercase tracking-widest hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Agencia web Granada
          </Link>

          {/* Hero */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <SelloECR size={72} color="currentColor" className="text-foreground" />
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-muted">
                  Economía Circular · Granada
                </p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mt-1">
                  Tu web,<br />
                  <span className="text-neon">pagada con tu oficio.</span>
                </h1>
              </div>
            </div>
            <p className="text-muted text-lg leading-relaxed">
              Si tienes un negocio en Granada — en el Realejo, el Albaicín, el Zaidín, el Sacromonte
              o el Centro — puedes pagar parte de tu web con{' '}
              <strong className="text-foreground">bonos QPQ</strong> de tu propio negocio.
              El QPQ es la moneda circular de tu barrio: un bono de 30 € que no caduca y que circula
              entre los negocios de la red.
            </p>
          </div>

          {/* Payment methods */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-muted">Formas de pago</h2>
            <div className="border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-mono">Forma</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-widest text-muted font-mono">Coste</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-mono hidden sm:table-cell">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT_ROWS.map((row) => (
                    <tr key={row.forma} className="border-b border-border last:border-0">
                      <td className="px-4 py-4 font-bold text-sm">{row.forma}</td>
                      <td className="px-4 py-4 text-right font-black font-mono text-neon whitespace-nowrap">{row.coste}</td>
                      <td className="px-4 py-4 text-muted text-xs hidden sm:table-cell">{row.detalle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QPQ */}
          <div className="flex items-start gap-5">
            <SimboloQPQ size={60} color="currentColor" className="text-neon flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-muted">¿Qué es el QPQ?</h2>
              <p className="font-black text-lg uppercase tracking-tight">La moneda de tu barrio</p>
              <p className="text-muted leading-relaxed text-sm">
                Un bono de tu negocio que vale <strong className="text-foreground">30 €</strong>,
                al portador y sin caducidad. Pagas parte de tu web con ellos y esos bonos vuelven a tu
                barrio: los usamos en tu negocio o en otros de la red. Trueque justo, del siglo XXI.
              </p>
            </div>
          </div>

          {/* Barrios */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-muted">Barrios adheridos al ECR en Granada</h2>
            <p className="text-muted text-sm">
              Cada barrio tiene su propio código y su red. Aquí los barrios de Granada
              que ya forman parte del sistema — o que están en proceso de incorporarse.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {BARRIOS.map((b) => (
                <Link
                  key={b.codigo}
                  href={`/agencia-web-granada/ecr/${b.slug}`}
                  className="bg-background p-5 flex gap-4 items-start hover:bg-card transition-colors group"
                >
                  <SelloECR
                    size={52}
                    codigo={b.codigo}
                    barrio={b.barrio}
                    color="currentColor"
                    className="text-foreground flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-sm uppercase tracking-tight group-hover:text-neon transition-colors">{b.nombre}</p>
                    <p className="text-xs font-mono text-neon">{b.codigo}</p>
                    <p className="text-muted text-xs mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Directorio */}
          <div className="border border-border bg-card p-6 space-y-3 text-sm">
            <p className="font-black text-xs uppercase tracking-widest">Directorio ECR en espanias.com</p>
            <p className="text-muted">
              Los negocios de Granada adheridos al ECR aparecen en el catálogo de{' '}
              <a
                href="https://espanias.com/ecr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:underline"
              >
                espanias.com/ecr
              </a>
              . Tu web lucirá el sello ECR de tu barrio.
            </p>
          </div>

          {/* CTA */}
          <div className="border border-neon/30 bg-neon/5 p-8 text-center space-y-4">
            <p className="font-black text-xl uppercase tracking-tight">
              ¿Tienes un negocio en Granada?
            </p>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Cuéntanos de qué barrio eres y qué hace tu negocio. Te decimos qué QPQ puedes ofrecer
              y cuántos necesitas para tu web.
            </p>
            <Link
              href="/#precio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Ver precios y formas de pago
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
