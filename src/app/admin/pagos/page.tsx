export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { PaymentsTable } from '@/components/admin/PaymentsTable'

export default async function AdminPagosPage() {
  const rawPayments = await prisma.payment.findMany({
    include: {
      project: {
        select: { name: true, client: { select: { name: true, email: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const payments = rawPayments.map((p) => ({
    id: p.id,
    amount: p.amount,
    status: p.status as 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED',
    paidAt: p.paidAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    projectName: p.project.name,
    clientName: p.project.client?.name ?? p.project.client?.email ?? '—',
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Pagos</h1>
        <p className="text-muted text-sm mt-1">Historial de transacciones</p>
      </div>
      <PaymentsTable initialPayments={payments} />
    </div>
  )
}
