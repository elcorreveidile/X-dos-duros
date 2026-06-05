'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle } from 'lucide-react'

type PaymentStatus = 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED'

type PaymentRow = {
  id: string
  amount: number
  status: PaymentStatus
  paidAt: string | null
  createdAt: string
  projectName: string
  clientName: string
}

function formatCurrencyClient(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatDateTimeClient(s: string) {
  return new Date(s).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

const STATUS_LABELS: Record<PaymentStatus, string> = {
  PAID: 'Pagado', PENDING: 'Pendiente', FAILED: 'Fallido', REFUNDED: 'Reembolsado',
}

const STATUS_VARIANTS: Record<PaymentStatus, 'neon' | 'outline' | 'error' | 'warning'> = {
  PAID: 'neon', PENDING: 'warning', FAILED: 'error', REFUNDED: 'outline',
}

const FILTERS: { value: PaymentStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Todos' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'PAID', label: 'Pagado' },
  { value: 'FAILED', label: 'Fallido' },
  { value: 'REFUNDED', label: 'Reembolsado' },
]

export function PaymentsTable({ initialPayments }: { initialPayments: PaymentRow[] }) {
  const [payments, setPayments] = useState(initialPayments)
  const [filter, setFilter] = useState<PaymentStatus | 'ALL'>('ALL')
  const [busyId, setBusyId] = useState<string | null>(null)

  const filtered = filter === 'ALL' ? payments : payments.filter((p) => p.status === filter)
  const totalPaid = payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0)

  const markAsPaid = async (id: string) => {
    setBusyId(id)
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PAID' }),
      })
      if (!res.ok) throw new Error('Error')
      const updated = await res.json()
      setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'PAID', paidAt: updated.paidAt } : p)))
    } catch {
      alert('No se pudo actualizar el pago.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-colors ${
                filter === f.value
                  ? 'border-neon text-neon bg-neon/10'
                  : 'border-border text-muted hover:border-neon/40 hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="text-right">
          <div className="text-xs text-muted uppercase tracking-widest">Total cobrado</div>
          <div className="font-black mono neon-text">{formatCurrencyClient(totalPaid)}</div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">No hay pagos en esta categoría.</p>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                {['ID', 'Proyecto', 'Cliente', 'Importe', 'Estado', 'Fecha', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment, i) => (
                <tr
                  key={payment.id}
                  className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
                >
                  <td className="px-4 py-3 mono text-xs text-muted">{payment.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3 font-medium text-xs">{payment.projectName}</td>
                  <td className="px-4 py-3 text-muted text-xs">{payment.clientName}</td>
                  <td className="px-4 py-3 mono font-bold">{formatCurrencyClient(payment.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANTS[payment.status]}>{STATUS_LABELS[payment.status]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {payment.paidAt ? formatDateTimeClient(payment.paidAt) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {(payment.status === 'PENDING' || payment.status === 'FAILED') && (
                      <button
                        disabled={busyId === payment.id}
                        onClick={() => markAsPaid(payment.id)}
                        className="flex items-center gap-1 text-xs text-muted hover:text-neon transition-colors disabled:opacity-40"
                        title="Marcar como pagado"
                      >
                        <CheckCircle size={14} />
                        <span>Cobrado</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
