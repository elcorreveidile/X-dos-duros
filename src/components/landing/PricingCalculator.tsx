'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

const PROJECT_TYPES = [
  { id: 'landing', label: 'Landing Page', basePrice: 299 },
  { id: 'ecommerce', label: 'E-commerce', basePrice: 599 },
  { id: 'mvp', label: 'MVP Web App', basePrice: 799 },
  { id: 'custom', label: 'App a medida', basePrice: 999 },
]

const ADDONS = [
  { id: 'auth', label: 'Autenticación de usuarios', price: 150 },
  { id: 'cms', label: 'Panel CMS personalizado', price: 200 },
  { id: 'api', label: 'Integración API externa', price: 120 },
  { id: 'seo', label: 'SEO avanzado', price: 80 },
  { id: 'analytics', label: 'Analítica avanzada', price: 60 },
  { id: 'multilang', label: 'Multi-idioma', price: 150 },
  { id: 'payments', label: 'Pasarela de pago', price: 100 },
  { id: 'chat', label: 'Chat en tiempo real', price: 200 },
]

const HOSTING = [
  { id: 'none', label: 'No, ya tengo hosting', price: 0 },
  { id: 'basic', label: 'Mantenimiento básico', price: 29, period: '/mes' },
  { id: 'pro', label: 'Mantenimiento + hosting', price: 49, period: '/mes' },
]

export function PricingCalculator() {
  const [projectType, setProjectType] = useState('landing')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [hosting, setHosting] = useState('none')

  const base = PROJECT_TYPES.find((p) => p.id === projectType)?.basePrice ?? 0
  const addonsTotal = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0
  )
  const total = base + addonsTotal
  const monthlyFee = HOSTING.find((h) => h.id === hosting)?.price ?? 0

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  return (
    <section id="precio" className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
            — Calculadora de precio —
          </span>
          <h2 className="section-title">
            Sin sorpresas.
            <br />
            <span className="neon-text">Precio claro desde el día 1.</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-center">
            Configura tu proyecto y obtén un presupuesto al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configurator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Project type */}
            <div>
              <label className="label text-sm">1. ¿Qué necesitas?</label>
              <div className="grid grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-4 border text-left transition-all duration-200 ${
                      projectType === type.id
                        ? 'border-neon bg-neon/5 text-foreground'
                        : 'border-border text-muted hover:border-neon/50'
                    }`}
                  >
                    <div className="font-bold text-sm uppercase">{type.label}</div>
                    <div className="text-xs mt-1 text-muted">desde €{type.basePrice}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Addons */}
            <div>
              <label className="label text-sm">2. Extras opcionales</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((addon) => {
                  const selected = selectedAddons.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between px-4 py-3 border text-sm transition-all duration-200 ${
                        selected
                          ? 'border-neon bg-neon/5 text-foreground'
                          : 'border-border text-muted hover:border-neon/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
                            selected ? 'border-neon bg-neon' : 'border-border'
                          }`}
                        >
                          {selected && <Check size={10} className="text-background" />}
                        </span>
                        {addon.label}
                      </span>
                      <span className="font-mono text-xs">+€{addon.price}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Hosting */}
            <div>
              <label className="label text-sm">3. Mantenimiento mensual</label>
              <div className="flex flex-col gap-2">
                {HOSTING.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHosting(h.id)}
                    className={`flex items-center justify-between px-4 py-3 border text-sm transition-all duration-200 ${
                      hosting === h.id
                        ? 'border-neon bg-neon/5 text-foreground'
                        : 'border-border text-muted hover:border-neon/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          hosting === h.id ? 'border-neon' : 'border-border'
                        }`}
                      >
                        {hosting === h.id && (
                          <span className="w-2 h-2 rounded-full bg-neon" />
                        )}
                      </span>
                      {h.label}
                    </span>
                    <span className="font-mono text-xs">
                      {h.price === 0 ? 'Gratis' : `€${h.price}${h.period}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-neon bg-background p-6 flex flex-col gap-6">
              <div className="text-center">
                <div className="text-muted text-xs uppercase tracking-widest mb-2">
                  Tu presupuesto estimado
                </div>
                <div className="text-5xl font-black neon-text mono">{formatCurrency(total)}</div>
                <div className="text-muted text-xs mt-1">Pago único · Sin sorpresas</div>
              </div>

              {monthlyFee > 0 && (
                <div className="border-t border-border pt-4 text-center">
                  <div className="text-muted text-xs uppercase tracking-widest mb-1">
                    Mantenimiento mensual
                  </div>
                  <div className="text-2xl font-bold text-foreground mono">
                    {formatCurrency(monthlyFee)}<span className="text-muted text-sm">/mes</span>
                  </div>
                  <div className="text-muted text-xs mt-1">Primer mes gratuito</div>
                </div>
              )}

              <div className="border-t border-border pt-4 space-y-2">
                {[
                  { label: 'Base', value: formatCurrency(base) },
                  ...(addonsTotal > 0 ? [{ label: 'Extras', value: `+${formatCurrency(addonsTotal)}` }] : []),
                ].map((line) => (
                  <div key={line.label} className="flex justify-between text-sm">
                    <span className="text-muted">{line.label}</span>
                    <span className="mono">{line.value}</span>
                  </div>
                ))}
              </div>

              <Link href={`/?projectType=${projectType}&addons=${selectedAddons.join(',')}&price=${total}#contacto`}>
                <Button variant="primary" className="w-full">
                  Solicitar este proyecto
                </Button>
              </Link>

              <p className="text-muted text-xs text-center leading-relaxed">
                Presupuesto orientativo. Precio final confirmado tras el briefing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
