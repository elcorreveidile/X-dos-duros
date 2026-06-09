import Link from 'next/link'
import { MapPin } from 'lucide-react'

const CITIES = [
  { name: 'Málaga', href: '/agencia-web-malaga' },
  { name: 'Sevilla', href: '/agencia-web-sevilla' },
  { name: 'Granada', href: '/agencia-web-granada' },
  { name: 'Córdoba', href: '/agencia-web-cordoba' },
  { name: 'Cádiz', href: '/agencia-web-cadiz' },
  { name: 'Almería', href: '/agencia-web-almeria' },
  { name: 'Huelva', href: '/agencia-web-huelva' },
  { name: 'Jaén', href: '/agencia-web-jaen' },
  { name: 'Marbella', href: '/agencia-web-marbella' },
  { name: 'Estepona', href: '/agencia-web-estepona' },
]

export function CitiesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <MapPin size={14} className="text-neon" />
          <span className="text-neon text-xs uppercase tracking-widest font-mono">
            Presencia local en Andalucía
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {CITIES.map((city) => (
            <Link
              key={city.name}
              href={city.href}
              className="border border-border hover:border-neon/60 hover:text-neon text-muted text-xs uppercase tracking-widest font-mono px-4 py-2 transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
