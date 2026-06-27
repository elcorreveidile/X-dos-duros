'use client'

import { useState } from 'react'
import { Globe, Rocket, ShoppingBag, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

const PRODUCTS = [
  {
    key: 'landing' as const,
    icon: Globe,
    label: 'Landing Page',
    basePrice: 297,
    desc: 'Página de aterrizaje de alta conversión, SEO básico y formulario de contacto.',
    delivery: '24h',
  },
  {
    key: 'mvp' as const,
    icon: Rocket,
    label: 'MVP Web App',
    basePrice: 797,
    desc: 'Producto mínimo viable con panel de usuario, auth, base de datos y lógica de negocio.',
    delivery: '48h',
  },
  {
    key: 'ecommerce' as const,
    icon: ShoppingBag,
    label: 'E-commerce',
    basePrice: 497,
    desc: 'Tienda online con catálogo, carrito, checkout con Stripe y gestión de pedidos.',
    delivery: '48h',
  },
]

interface Props {
  code: string
  pct: number
  sig: string
}

export default function MundialClient({ code, pct, sig }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function discountedPrice(base: number) {
    return Math.round(base * (1 - pct / 100))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/mundial/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, pct: String(pct), sig, product: selected, name, email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al canjear el cupón')
        return
      }
      if (data.type === 'free') {
        setDone(true)
      } else {
        window.location.href = data.stripeUrl
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle size={64} className="text-neon mx-auto mb-6" />
          <h1 className="text-4xl font-black uppercase tracking-tighter neon-text mb-4">
            ¡Listo!
          </h1>
          <p className="text-muted mb-2">Tu web está en camino.</p>
          <p className="text-muted text-sm">
            Te hemos enviado un acceso mágico a <span className="text-foreground font-mono">{email}</span>.
            Úsalo para entrar a tu panel y completar el briefing.
          </p>
          <p className="text-muted/60 text-xs mt-6">Revisa también tu carpeta de spam.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid-bg px-4 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8">
            <span className="text-neon text-xs uppercase tracking-widest font-mono">
              Cupón Mundial validado
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            {pct === 100 ? (
              <>
                Tu web,{' '}
                <span className="neon-text">GRATIS.</span>
              </>
            ) : (
              <>
                {pct}% de
                <br />
                <span className="neon-text">descuento.</span>
              </>
            )}
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            {pct === 100
              ? 'Has ganado una web completamente gratis. Elige tu producto y empieza ahora.'
              : `Has ganado un ${pct}% de descuento. Elige tu producto y paga solo lo que queda.`}
          </p>
        </div>

        {/* Product selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-12">
          {PRODUCTS.map((p) => {
            const Icon = p.icon
            const final = discountedPrice(p.basePrice)
            const isSelected = selected === p.key
            return (
              <button
                key={p.key}
                onClick={() => setSelected(p.key)}
                className={`bg-background p-8 flex flex-col gap-4 text-left transition-colors duration-200 ${
                  isSelected ? 'bg-neon/10 border border-neon' : 'hover:bg-card'
                }`}
              >
                <div className={`w-10 h-10 border flex items-center justify-center transition-colors ${isSelected ? 'border-neon' : 'border-border'}`}>
                  <Icon size={20} className={isSelected ? 'text-neon' : 'text-muted'} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{p.label}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{p.desc}</p>
                <div className="border-t border-border pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-muted line-through text-sm">€{p.basePrice}</span>
                    {pct === 100 ? (
                      <span className="text-neon font-black text-2xl">GRATIS</span>
                    ) : (
                      <span className="text-foreground font-black text-2xl">€{final}</span>
                    )}
                  </div>
                  <span className="text-neon text-xs font-mono mt-1 block">{p.delivery}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Form */}
        {selected && (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-tight text-center mb-6">
              Tus datos para empezar
            </h2>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-2">Nombre</label>
              <input
                type="text"
                required
                minLength={2}
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  {pct === 100 ? 'Canjear mi web gratis' : 'Ir al pago'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            <p className="text-muted/60 text-xs text-center">
              Sin permanencia. Garantía de devolución de 15 días.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
