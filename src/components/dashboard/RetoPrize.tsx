'use client'

import { useState } from 'react'
import { Flame, Globe, Rocket, ShoppingBag, Loader2 } from 'lucide-react'

const PRODUCTS = [
  { key: 'landing', icon: Globe, label: 'Landing Page', basePrice: 297, delivery: '24h' },
  { key: 'mvp', icon: Rocket, label: 'MVP Web App', basePrice: 797, delivery: '48h' },
  { key: 'ecommerce', icon: ShoppingBag, label: 'E-commerce', basePrice: 497, delivery: '48h' },
] as const

interface Props {
  pct: number
  wins: number
  champion: boolean
}

export function RetoPrize({ pct, wins, champion }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function discountedPrice(base: number) {
    if (pct >= 100) return 0
    return Math.round(base * (1 - pct / 100))
  }

  async function handleClaim() {
    if (!selected) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reto-mundial/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selected }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al activar el descuento')
        return
      }
      if (data.stripeUrl) {
        window.location.href = data.stripeUrl
      } else {
        window.location.href = '/dashboard/briefing'
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const isFree = pct >= 100 || champion

  return (
    <div className="border border-orange-500/40 bg-orange-500/5 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Flame size={20} className="text-orange-400 flex-shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-widest text-orange-400 font-mono">Reto Mundial 2026</p>
          <p className="font-black uppercase tracking-tight">
            {isFree
              ? '🏆 ESPAÑA CAMPEONA — WEB GRATIS'
              : `Ahora mismo -${pct}% · sube con cada victoria`}
          </p>
          {wins > 0 && !isFree && (
            <p className="text-xs text-muted mt-0.5">{wins} {wins === 1 ? 'victoria' : 'victorias'} de España</p>
          )}
        </div>
      </div>

      <p className="text-muted text-sm">
        {isFree
          ? '¡España ha ganado el Mundial! Tu web es completamente gratis. Elige tu producto y empezamos.'
          : 'Elige el producto que quieres lanzar. El descuento crece con cada partido que gane España.'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
        {PRODUCTS.map((p) => {
          const Icon = p.icon
          const final = discountedPrice(p.basePrice)
          const isSelected = selected === p.key
          return (
            <button
              key={p.key}
              onClick={() => setSelected(p.key)}
              className={`bg-background p-5 text-left flex flex-col gap-3 transition-colors ${
                isSelected ? 'bg-orange-500/10 ring-1 ring-orange-400' : 'hover:bg-card'
              }`}
            >
              <Icon size={18} className={isSelected ? 'text-orange-400' : 'text-muted'} />
              <div>
                <p className="font-bold text-sm uppercase tracking-tight">{p.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-muted line-through text-xs">€{p.basePrice}</span>
                  {isFree ? (
                    <span className="text-neon font-black">GRATIS</span>
                  ) : (
                    <span className="font-black">€{final}</span>
                  )}
                </div>
              </div>
              <span className="text-orange-400 text-xs font-mono">{p.delivery}</span>
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-red-500 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
          {error}
        </p>
      )}

      <button
        onClick={handleClaim}
        disabled={!selected || loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          isFree ? 'Activar web gratis' : `Activar con -${pct}% de descuento`
        )}
      </button>
    </div>
  )
}
