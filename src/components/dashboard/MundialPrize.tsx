'use client'

import { useState } from 'react'
import { Trophy, Globe, Rocket, ShoppingBag, Loader2 } from 'lucide-react'

const PRODUCTS = [
  { key: 'landing', icon: Globe, label: 'Landing Page', delivery: '24h' },
  { key: 'mvp', icon: Rocket, label: 'MVP Web App', delivery: '48h' },
  { key: 'ecommerce', icon: ShoppingBag, label: 'E-commerce', delivery: '48h' },
] as const

interface Props {
  couponCode: string
  pct: number
}

export function MundialPrize({ couponCode, pct }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <div className="border border-neon/40 bg-neon/5 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Trophy size={20} className="text-neon flex-shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-widest text-neon font-mono">Premio Mundial 2026</p>
          <p className="font-black uppercase tracking-tight">
            {pct === 100 ? 'WEB GRATIS' : `${pct}% de descuento`}
          </p>
        </div>
      </div>

      <p className="text-muted text-sm">
        Elige el tipo de proyecto. Rellena el briefing y fijaremos el precio con tu descuento aplicado.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
        {PRODUCTS.map((p) => {
          const Icon = p.icon
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
                <p className="text-neon text-xs font-mono mt-1">{p.delivery}</p>
              </div>
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
          'Elegir y enviar briefing'
        )}
      </button>
    </div>
  )
}
