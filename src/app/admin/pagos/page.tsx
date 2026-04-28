import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDateTime } from '@/lib/utils'

const MOCK_PAYMENTS = [
  { id: 'pay_1', project: 'Landing Panadería García', client: 'Ana García', amount: 299, status: 'PAID', paidAt: new Date(Date.now() - 1000 * 60 * 60 * 22) },
  { id: 'pay_2', project: 'E-commerce Moda Sostenible', client: 'Carlos López', amount: 599, status: 'PENDING', paidAt: null },
  { id: 'pay_3', project: 'MVP SaaS Reservas', client: 'María Ruiz', amount: 899, status: 'PAID', paidAt: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  { id: 'pay_4', project: 'Landing Consultoría HR', client: 'Pedro Sanz', amount: 349, status: 'PAID', paidAt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
  { id: 'pay_5', project: 'App Delivery Restaurante', client: 'Laura Vega', amount: 799, status: 'PAID', paidAt: new Date(Date.now() - 1000 * 60 * 60 * 52) },
  { id: 'sub_1', project: 'Suscripción Pro — Ruiz', client: 'María Ruiz', amount: 49, status: 'PAID', paidAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 'sub_2', project: 'Suscripción Pro — Vega', client: 'Laura Vega', amount: 49, status: 'PAID', paidAt: new Date(Date.now() - 1000 * 60 * 60 * 72) },
]

function statusVariant(status: string): 'neon' | 'outline' | 'error' | 'warning' {
  const map: Record<string, 'neon' | 'outline' | 'error' | 'warning'> = {
    PAID: 'neon',
    PENDING: 'warning',
    FAILED: 'error',
    REFUNDED: 'outline',
  }
  return map[status] ?? 'outline'
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    PAID: 'Pagado',
    PENDING: 'Pendiente',
    FAILED: 'Fallido',
    REFUNDED: 'Reembolsado',
  }
  return labels[status] ?? status
}

export default function AdminPagosPage() {
  const total = MOCK_PAYMENTS.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0)

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
            {MOCK_PAYMENTS.map((payment, i) => (
              <tr
                key={payment.id}
                className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
              >
                <td className="px-4 py-3 mono text-xs text-muted">{payment.id}</td>
                <td className="px-4 py-3 font-medium text-xs">{payment.project}</td>
                <td className="px-4 py-3 text-muted text-xs">{payment.client}</td>
                <td className="px-4 py-3 mono font-bold">{formatCurrency(payment.amount)}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(payment.status)}>
                    {statusLabel(payment.status)}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted text-xs">
                  {payment.paidAt ? formatDateTime(payment.paidAt) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
