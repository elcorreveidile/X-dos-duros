'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const PROJECT_TYPES = [
  { id: 'landing', label: 'Landing Page', base: 297 },
  { id: 'ecommerce', label: 'E-commerce básico', base: 497 },
  { id: 'ecommerce_adv', label: 'E-commerce avanzado', base: 1497 },
  { id: 'mvp', label: 'MVP Web App', base: 797 },
  { id: 'custom', label: 'App a medida', base: 1297 },
]

const ADDONS = [
  { id: 'seo', label: 'SEO básico', price: 97 },
  { id: 'analytics', label: 'Analytics', price: 47 },
  { id: 'multilang', label: 'Multidioma', price: 147 },
  { id: 'cms', label: 'Panel de contenido', price: 197 },
  { id: 'auth', label: 'Login / Registro', price: 147 },
  { id: 'payments', label: 'Pagos online', price: 197 },
]

const HOSTING = [
  { id: 'none', label: 'Sin mantenimiento', price: 0, features: [] },
  {
    id: 'basic',
    label: 'Básico — €29/mes',
    price: 29,
    features: ['Hosting & dominio', 'Actualizaciones de seguridad', 'Copias de seguridad semanales', 'Soporte por email'],
  },
  {
    id: 'pro',
    label: 'Pro — €49/mes',
    price: 49,
    features: ['Todo lo del Básico', 'Cambios de contenido ilimitados', 'Copias de seguridad diarias', 'Soporte prioritario 24h'],
  },
]

export function PricingCalculator() {
  const [projectType, setProjectType] = useState('landing')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [hosting, setHosting] = useState('none')

  const basePrice = PROJECT_TYPES.find((p) => p.id === projectType)?.base ?? 0
  const addonsPrice = selectedAddons.reduce((acc, id) => {
    return acc + (ADDONS.find((a) => a.id === id)?.price ?? 0)
  }, 0)
  const total = basePrice + addonsPrice

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const breakdown = [
    { label: PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? '', value: `€${basePrice}` },
    ...selectedAddons.map((id) => {
      const addon = ADDONS.find((a) => a.id === id)!
      return { label: addon.label, value: `€${addon.price}` }
    }),
  ]

  return (
    <section className="py-24 border-t border-border" id="precio">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
            — Calculadora de precio —
          </span>
          <h2 className="section-title">
            Precio transparente.
            <br />
            <span className="neon-text">Sin sorpresas.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: config */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted mb-3">Tipo de proyecto</h3>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-3 text-left text-sm border transition-all ${
                      projectType === type.id
                        ? 'border-neon text-neon bg-neon/5'
                        : 'border-border text-muted hover:border-foreground hover:text-foreground'
                    } ${type.id === 'ecommerce_adv' ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    {type.label}
                    <span className="block text-xs mt-1 font-mono">€{type.base}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted mb-3">Extras</h3>
              <div className="grid grid-cols-2 gap-2">
                {ADDONS.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 text-left text-sm border transition-all ${
                      selectedAddons.includes(addon.id)
                        ? 'border-neon text-neon bg-neon/5'
                        : 'border-border text-muted hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {addon.label}
                    <span className="block text-xs mt-1 font-mono">+€{addon.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted mb-3">Mantenimiento mensual</h3>
              <div className="grid grid-cols-3 gap-2">
                {HOSTING.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHosting(h.id)}
                    className={`p-3 text-left text-sm border transition-all ${
                      hosting === h.id
                        ? 'border-neon text-neon bg-neon/5'
                        : 'border-border text-muted hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
              {hosting !== 'none' && (
                <ul className="mt-3 space-y-1">
                  {HOSTING.find((h) => h.id === hosting)?.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted">
                      <span className="text-neon">✓</span> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right: summary */}
          <div className="border border-border bg-card p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted mb-6">Resumen</h3>
              <div className="space-y-3 mb-6">
                {breakdown.map((line, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted">{line.label}</span>
                    <span className="mono">{line.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-muted">Total proyecto</span>
                <span className="text-3xl font-black neon-text mono">€{total}</span>
              </div>

              {hosting !== 'none' && (
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-muted">Mantenimiento</span>
                  <span className="text-sm font-mono text-muted">
                    +€{HOSTING.find((h) => h.id === hosting)?.price}/mes
                  </span>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 border border-neon/30 bg-neon/5 px-4 py-3">
                <ShieldCheck size={16} className="text-neon flex-shrink-0 mt-0.5" />
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-bold text-neon">Garantía 15 días.</span>{' '}
                  Si no quedas satisfecho con el resultado, te devolvemos el dinero. Sin preguntas.
                </p>
              </div>

              <Link href={`/?projectType=${projectType}&addons=${selectedAddons.join(',')}&price=${total}#contacto`}>
                <Button variant="primary" className="w-full">
                  Solicitar este proyecto
                </Button>
              </Link>
              <p className="text-muted text-xs text-center">Entrega garantizada en 48h</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border border-neon/20 bg-neon/3 p-5 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">♻️</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-tight">¿Prefieres no pagar todo de golpe?</p>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Al contado (−10%), a plazos sin interés (4×), o con QPQ — la moneda circular del Realejo. Pagas con lo que sabes hacer.{' '}
              <Link href="/ecr" className="text-neon hover:underline">Más sobre el ECR y el QPQ →</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 border border-dashed border-border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-tight">¿Proyecto más complejo?</p>
            <p className="text-muted text-xs mt-1 max-w-sm">
              Tiendas con inventario avanzado, integraciones con terceros, portales de cliente… Cuéntanos y te damos presupuesto en 24h.
            </p>
          </div>
          <Link
            href="/#contacto"
            className="flex-shrink-0 px-5 py-2.5 border border-border text-xs uppercase tracking-widest font-bold text-muted hover:border-neon hover:text-neon transition-colors whitespace-nowrap"
          >
            Solicitar presupuesto
          </Link>
        </div>
      </div>
    </section>
  )
}
