'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { useState } from 'react'

export function PaymentNotice() {
  const params = useSearchParams()
  const status = params.get('payment')
  const [dismissed, setDismissed] = useState(false)

  if (!status || dismissed) return null

  if (status === 'success') {
    return (
      <div className="flex items-start justify-between gap-4 border border-neon bg-neon/10 p-4">
        <div className="flex items-center gap-3">
          <CheckCircle size={18} className="text-neon shrink-0" />
          <div>
            <p className="text-sm font-bold text-neon">¡Pago completado!</p>
            <p className="text-xs text-muted mt-0.5">Hemos recibido tu pago. Te enviaremos confirmación por email.</p>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-muted hover:text-foreground shrink-0">
          <X size={14} />
        </button>
      </div>
    )
  }

  if (status === 'cancelled') {
    return (
      <div className="flex items-start justify-between gap-4 border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <XCircle size={18} className="text-muted shrink-0" />
          <p className="text-sm text-muted">Pago cancelado. Puedes intentarlo de nuevo cuando quieras.</p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-muted hover:text-foreground shrink-0">
          <X size={14} />
        </button>
      </div>
    )
  }

  return null
}
