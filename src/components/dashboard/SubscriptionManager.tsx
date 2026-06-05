'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Check, CreditCard, AlertCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const PLANS = [
  {
    id: 'basic' as const,
    name: 'Mantenimiento Básico',
    price: 29,
    features: [
      'Actualizaciones de seguridad',
      'Backups semanales',
      'Monitorización uptime',
      'Soporte por email (72h)',
    ],
  },
  {
    id: 'pro' as const,
    name: 'Pro (Hosting incluido)',
    price: 49,
    features: [
      'Todo lo del plan Básico',
      'Hosting incluido (hasta 10GB)',
      'Dominio gratis primer año',
      'SSL incluido',
      'Soporte prioritario (24h)',
      '1h de cambios/mes incluida',
    ],
    recommended: true,
  },
]

interface InitialSubscription {
  plan: 'basic' | 'pro'
  price: number
  currentPeriodEnd: string | null
}

interface Props {
  initialSubscription: InitialSubscription | null
}

export function SubscriptionManager({ initialSubscription }: Props) {
  const [currentPlan] = useState<string | null>(initialSubscription?.plan ?? null)
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  const subscribe = async (planId: string) => {
    setLoading(planId)
    setError('')
    try {
      const res = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error ?? 'Error al procesar')
    } finally {
      setLoading('')
    }
  }

  const openPortal = async () => {
    setLoading('portal')
    setError('')
    try {
      const res = await fetch('/api/subscriptions/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error ?? 'Error al abrir el portal')
    } finally {
      setLoading('')
    }
  }

  const activePlan = PLANS.find((p) => p.id === currentPlan)
  const nextBilling = initialSubscription?.currentPeriodEnd
    ? formatDate(initialSubscription.currentPeriodEnd)
    : null

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold uppercase tracking-tight">Suscripción</h2>
        <p className="text-muted text-sm mt-1">Gestiona tu plan de mantenimiento mensual</p>
      </div>

      {error && (
        <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-sm">{error}</div>
      )}

      {activePlan && (
        <div className="border border-neon bg-neon/5 p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CreditCard size={18} className="text-neon" />
            <div>
              <div className="font-bold text-sm uppercase">{activePlan.name}</div>
              <div className="text-muted text-xs mt-0.5">
                {nextBilling ? `Próxima factura: ${nextBilling} · ` : ''}
                {formatCurrency(activePlan.price)}/mes
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="neon">Activo</Badge>
            <Button
              variant="outline"
              size="sm"
              loading={loading === 'portal'}
              onClick={openPortal}
            >
              Gestionar / Cancelar
            </Button>
          </div>
        </div>
      )}

      {!currentPlan && (
        <div className="border border-yellow-400/40 bg-yellow-400/5 p-4 flex items-center gap-3">
          <AlertCircle size={16} className="text-yellow-400 flex-shrink-0" />
          <p className="text-sm text-muted">
            <span className="text-foreground font-medium">Primer mes gratis.</span>{' '}
            Activa un plan antes de que expire el período gratuito para no perder el servicio.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLANS.map((plan) => {
          const isActive = currentPlan === plan.id

          return (
            <div
              key={plan.id}
              className={`border p-6 flex flex-col gap-4 relative ${
                plan.recommended
                  ? 'border-neon bg-neon/5'
                  : isActive
                  ? 'border-neon'
                  : 'border-border'
              }`}
            >
              {plan.recommended && !isActive && (
                <span className="badge-neon absolute -top-3 left-4">Recomendado</span>
              )}

              <div>
                <h3 className="font-bold uppercase tracking-tight">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-black mono">{formatCurrency(plan.price)}</span>
                  <span className="text-muted text-sm">/mes</span>
                </div>
              </div>

              <ul className="space-y-2 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                    <Check size={12} className="text-neon flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {isActive ? (
                <Button variant="ghost" size="sm" disabled className="w-full">
                  Plan actual
                </Button>
              ) : (
                <Button
                  variant={plan.recommended ? 'primary' : 'outline'}
                  size="sm"
                  className="w-full"
                  loading={loading === plan.id}
                  onClick={() => subscribe(plan.id)}
                >
                  {currentPlan ? 'Cambiar a este plan' : 'Activar plan'}
                </Button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-muted text-xs">
        Los pagos se procesan de forma segura mediante Stripe. Puedes cancelar en cualquier momento desde el portal de facturación.
      </p>
    </div>
  )
}
