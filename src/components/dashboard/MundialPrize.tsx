'use client'

import { useState, useEffect } from 'react'
import { Trophy, Globe, Rocket, ShoppingBag, Loader2, X } from 'lucide-react'

const PRODUCTS = [
  { key: 'landing', icon: Globe, label: 'Landing Page', basePrice: 297, delivery: '24h' },
  { key: 'mvp', icon: Rocket, label: 'MVP Web App', basePrice: 797, delivery: '48h' },
  { key: 'ecommerce', icon: ShoppingBag, label: 'E-commerce', basePrice: 497, delivery: '48h' },
] as const

interface Props {
  couponCode: string
  pct: number
}

export function MundialPrize({ couponCode, pct }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dismissed, setDismissed] = useState(false)

  const storageKey = `dismissed_mundial_${couponCode}`

  useEffect(() => {
    if (localStorage.getItem(storageKey) === '1') setDismissed(true)
  }, [storageKey])

  function handleDismiss() {
    localStorage.setItem(storageKey, '1')
    setDismissed(true)
  }

  function discountedPrice(base: number) {
    if (pct >= 100) return 0
    return Math.round(base * (1 - pct / 100))
  }

  async function handleClaim() {
    if (!selected) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/mundial/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode, product: selected }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al activar el premio')
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
    <div className="border border-neon/40 bg-neon/5 p-6 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-neon flex-shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-widest text-neon font-mono">Premio Mundial 2026</p>
            <p className="font-black uppercase tracking-tight">
              {pct === 100 ? 'WEB GRATIS' : `${pct}% de descuento`}
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted hover:text-foreground transition-colors flex-shrink-0 p-1"
          title="Descartar oferta"
        >
          <X size={16} />
        </button>
      </div>

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
                isSelected ? 'bg-neon/10 ring-1 ring-neon' : 'hover:bg-card'
              }`}
            >
              <Icon size={18} className={isSelected ? 'text-neon' : 'text-muted'} />
              <div>
                <p className="font-bold text-sm uppercase tracking-tight">{p.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-muted line-through text-xs">€{p.basePrice}</span>
                  {pct >= 100 ? (
                    <span className="text-neon font-black">GRATIS</span>
                  ) : (
                    <span className="font-black">€{final}</span>
                  )}
                </div>
              </div>
              <span className="text-neon text-xs font-mono">{p.delivery}</span>
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
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          pct >= 100 ? 'Activar web gratis y enviar briefing' : 'Elegir y enviar briefing'
        )}
      </button>
    </div>
  )
}
