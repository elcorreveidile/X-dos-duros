import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Agencia Web en Andalucía — Por 2 Duros',
  description:
    'Desarrollamos webs profesionales para negocios de toda Andalucía. Málaga, Sevilla, Granada, Córdoba, Cádiz, Almería, Huelva, Jaén, Marbella y Estepona. Entrega en 48h desde €299.',
  alternates: {
    canonical: 'https://por2duros.com/andalucia',
  },
}

const PROVINCIAS = [
  {
    provincia: 'Málaga',
    ciudades: [
      { name: 'Málaga', href: '/agencia-web-malaga' },
      { name: 'Marbella', href: '/agencia-web-marbella' },
      { name: 'Estepona', href: '/agencia-web-estepona' },
    ],
  },
  {
    provincia: 'Sevilla',
    ciudades: [
      { name: 'Sevilla', href: '/agencia-web-sevilla' },
    ],
  },
  {
    provincia: 'Granada',
    ciudades: [
      { name: 'Granada', href: '/agencia-web-granada' },
    ],
  },
  {
    provincia: 'Córdoba',
    ciudades: [
      { name: 'Córdoba', href: '/agencia-web-cordoba' },
    ],
  },
  {
    provincia: 'Cádiz',
    ciudades: [
      { name: 'Cádiz', href: '/agencia-web-cadiz' },
    ],
  },
  {
    provincia: 'Almería',
    ciudades: [
      { name: 'Almería', href: '/agencia-web-almeria' },
    ],
  },
  {
    provincia: 'Huelva',
    ciudades: [
      { name: 'Huelva', href: '/agencia-web-huelva' },
    ],
  },
  {
    provincia: 'Jaén',
    ciudades: [
      { name: 'Jaén', href: '/agencia-web-jaen' },
    ],
  },
]

export default function AndaluciaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">

          {/* Hero */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-neon" />
              <span className="text-xs uppercase tracking-widest text-neon font-mono">Presencia local en Andalucía</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none">
              Tu negocio andaluz,<br />
              <span className="text-neon">con web propia.</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-xl">
              Trabajamos con negocios de toda Andalucía — en remoto, sin desplazamientos y con la misma calidad que en persona.
              Webs a medida desde <strong className="text-foreground">€299</strong>, entregadas en 48 horas.
            </p>
          </div>

          {/* Provincias */}
          <div className="space-y-px bg-border">
            {PROVINCIAS.map((p) => (
              <div key={p.provincia} className="bg-background p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-32 flex-shrink-0">
                  <p className="text-xs uppercase tracking-widest text-muted font-mono">{p.provincia}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.ciudades.map((c) => (
                    <Link
                      key={c.name}
                      href={c.href}
                      className="inline-flex items-center gap-1.5 border border-border hover:border-neon hover:text-neon text-muted text-xs uppercase tracking-widest font-mono px-4 py-2 transition-colors"
                    >
                      {c.name} <ArrowRight size={10} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border border-neon/30 bg-neon/5 p-8 text-center space-y-4">
            <p className="font-black text-lg uppercase tracking-tight">¿Tu ciudad no está aquí?</p>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Da igual. Trabajamos con negocios de toda Andalucía y España. Cuéntanos tu proyecto.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Pedir presupuesto gratis <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
