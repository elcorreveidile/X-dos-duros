export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { ClientsTable } from '@/components/admin/ClientsTable'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminClientesPage() {
  const rawClients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    include: {
      projects: {
        select: {
          id: true,
          price: true,
          payments: { where: { status: 'PAID' }, select: { amount: true } },
        },
      },
      subscriptions: { where: { status: 'ACTIVE' }, select: { id: true, price: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const clients = rawClients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    createdAt: c.createdAt.toISOString(),
    projectCount: c.projects.length,
    totalSpent: c.projects.reduce(
      (s, p) => s + p.payments.reduce((ps, pay) => ps + pay.amount, 0),
      0
    ),
    hasSubscription: c.subscriptions.length > 0,
    subscriptionPrice: c.subscriptions[0]?.price ?? null,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Clientes</h1>
          <p className="text-muted text-sm mt-1">{clients.length} clientes registrados</p>
        </div>
        <Link
          href="/admin/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/90 transition-colors"
        >
          <Plus size={14} />
          Nuevo cliente
        </Link>
      </div>
      <ClientsTable initialClients={clients} />
    </div>
  )
}
