'use client'

import { useState, useEffect } from 'react'
import { Flame, Globe, Rocket, ShoppingBag, Loader2, X } from 'lucide-react'

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
  const [dismissed, setDismissed] = useState(false)

  const isFree = pct >= 100 || champion

  useEffect(() => {
    if (localStorage.getItem('dismissed_reto_mundial') === '1') setDismissed(true)
  }, [])

  function handleDismiss() {
    localStorage.setItem('dismissed_reto_mundial', '1')
    setDismissed(true)
  }

  function discountedPrice(base: number) {
    if (isFree) return 0
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
      window.location.href = '/dashboard/briefing'
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (dismissed) return null

  return (
    <div className="border border-orange-500/40 bg-orange-500/5 p-6 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Flame size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-widest text-orange-400 font-mono">Reto Mundial 2026</p>
            <p className="font-black uppercase tracking-tight">
              {isFree ? '🏆 ESPAÑA CAMPEONA — WEB GRATIS' : `Ahora mismo -${pct}%`}
            </p>
            {!isFree && (
              <p className="text-xs text-muted mt-0.5">
                {wins > 0
                  ? `${wins} ${wins === 1 ? 'victoria' : 'victorias'} de España · el descuento sube con cada partido ganado`
                  : 'El descuento sube con cada victoria de España'}
              </p>
            )}
          </div>
          {!isFree && pct > 0 && (
            <span className="text-3xl font-black font-mono text-orange-400 flex-shrink-0">{pct}<span className="text-lg">%</span></span>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted hover:text-foreground transition-colors flex-shrink-0 p-1"
          title="Descartar oferta"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      {!isFree && (
        <div className="space-y-1">
          <div className="h-1.5 bg-border w-full">
            <div
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted font-mono">
            <span>0%</span>
            <span className="text-orange-400 font-bold">{pct}% actual</span>
            <span>100% gratis</span>
          </div>
        </div>
      )}

      <p className="text-muted text-sm">
        Elige el tipo de proyecto. Rellena el briefing y te enviaremos el enlace de pago con tu descuento aplicado.
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
                    <span className="font-black text-orange-400">€{final}</span>
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
          isFree ? 'Activar web gratis y enviar briefing' : 'Elegir y enviar briefing'
        )}
      </button>
    </div>
  )
}
