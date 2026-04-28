import { Globe, ShoppingBag, Smartphone, Rocket } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Landing Page',
    description:
      'Página de aterrizaje de alta conversión. Diseño personalizado, SEO básico, formulario de contacto y analítica.',
    from: 299,
    delivery: '24h',
    badge: 'Más popular',
  },
  {
    icon: Rocket,
    title: 'MVP Web App',
    description:
      'Producto mínimo viable funcional. Panel de usuario, autenticación, base de datos y lógica de negocio básica.',
    from: 799,
    delivery: '48h',
    badge: null,
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    description:
      'Tienda online completa con catálogo, carrito, checkout con Stripe y gestión de pedidos básica.',
    from: 599,
    delivery: '48h',
    badge: null,
  },
  {
    icon: Smartphone,
    title: 'App a Medida',
    description:
      'Desarrollo personalizado según tus requisitos. Presupuesto y plazo según briefing.',
    from: 999,
    delivery: 'Consultar',
    badge: 'Personalizado',
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
          — Qué hacemos —
        </span>
        <h2 className="section-title">
          Lo que necesitas,
          <br />
          <span className="neon-text">cuando lo necesitas.</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4 text-center">
          Desde una simple landing hasta una app completa. Entregas reales en 48 horas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {SERVICES.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className="bg-background p-8 flex flex-col gap-4 group hover:bg-card transition-colors duration-300"
            >
              {service.badge && (
                <span className="badge-neon self-start">{service.badge}</span>
              )}
              <div className="w-10 h-10 border border-border group-hover:border-neon flex items-center justify-center transition-colors duration-300">
                <Icon size={20} className="text-muted group-hover:text-neon transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed flex-1">{service.description}</p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <span className="text-muted text-xs">Desde </span>
                  <span className="text-foreground font-bold">€{service.from}</span>
                </div>
                <span className="text-neon text-xs mono font-bold">{service.delivery}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
