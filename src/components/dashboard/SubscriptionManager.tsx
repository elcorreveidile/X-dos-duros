'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Check, CreditCard, AlertCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const PLANS = [
  {
    id: 'basic',
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
    id: 'pro',
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

export function SubscriptionManager() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState('')

  const subscribe = async (planId: string) => {
    setLoading(planId)
    await new Promise((r) => setTimeout(r, 1000))
    setCurrentPlan(planId)
    setLoading('')
  }

  const cancel = async () => {
    setLoading('cancel')
    await new Promise((r) => setTimeout(r, 800))
    setCurrentPlan(null)
    setLoading('')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold uppercase tracking-tight">Suscripción</h2>
        <p className="text-muted text-sm mt-1">Gestiona tu plan de mantenimiento mensual</p>
      </div>

      {currentPlan && (
        <div className="border border-neon bg-neon/5 p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CreditCard size={18} className="text-neon" />
            <div>
              <div className="font-bold text-sm uppercase">
                {PLANS.find((p) => p.id === currentPlan)?.name}
              </div>
              <div className="text-muted text-xs mt-0.5">
                Próxima factura: {formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))} ·{' '}
                {formatCurrency(PLANS.find((p) => p.id === currentPlan)?.price ?? 0)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="neon">Activo</Badge>
            <Button
              variant="danger"
              size="sm"
              loading={loading === 'cancel'}
              onClick={cancel}
            >
              Cancelar
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
                  Activar plan
                </Button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-muted text-xs">
        Los pagos se procesan de forma segura mediante Stripe. Puedes cancelar en cualquier momento desde este panel.
      </p>
    </div>
  )
}
