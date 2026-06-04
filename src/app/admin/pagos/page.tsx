export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDateTime } from '@/lib/utils'

function statusVariant(status: string): 'neon' | 'outline' | 'error' | 'warning' {
  const map: Record<string, 'neon' | 'outline' | 'error' | 'warning'> = {
    PAID: 'neon', PENDING: 'warning', FAILED: 'error', REFUNDED: 'outline',
  }
  return map[status] ?? 'outline'
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    PAID: 'Pagado', PENDING: 'Pendiente', FAILED: 'Fallido', REFUNDED: 'Reembolsado',
  }
  return labels[status] ?? status
}

export default async function AdminPagosPage() {
  const payments = await prisma.payment.findMany({
    include: {
      project: {
        select: { name: true, client: { select: { name: true, email: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const total = payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Pagos</h1>
          <p className="text-muted text-sm mt-1">Historial de transacciones</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-muted mb-1">Total cobrado</div>
          <div className="text-2xl font-black mono neon-text">{formatCurrency(total)}</div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">No hay pagos registrados aún.</p>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                {['ID', 'Proyecto', 'Cliente', 'Importe', 'Estado', 'Fecha'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr
                  key={payment.id}
                  className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
                >
                  <td className="px-4 py-3 mono text-xs text-muted">{payment.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3 font-medium text-xs">{payment.project.name}</td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {payment.project.client?.name ?? payment.project.client?.email ?? '—'}
                  </td>
                  <td className="px-4 py-3 mono font-bold">{formatCurrency(payment.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(payment.status)}>{statusLabel(payment.status)}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {payment.paidAt ? formatDateTime(payment.paidAt) : '—'}
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
