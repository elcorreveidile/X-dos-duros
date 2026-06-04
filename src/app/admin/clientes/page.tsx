export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminClientesPage() {
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    include: {
      projects: { select: { id: true, price: true } },
      subscriptions: { where: { status: 'ACTIVE' }, select: { id: true, price: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

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

      {clients.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">No hay clientes aún.</p>
          <Link href="/admin/nuevo" className="text-neon text-xs hover:underline mt-2 inline-block">
            Crear el primero →
          </Link>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                {['Cliente', 'Email', 'Proyectos', 'Total gastado', 'Suscripción', 'Alta'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => {
                const totalSpent = client.projects.reduce((s, p) => s + p.price, 0)
                const hasSubscription = client.subscriptions.length > 0
                return (
                  <tr
                    key={client.id}
                    className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
                  >
                    <td className="px-4 py-3 font-medium">{client.name ?? '—'}</td>
                    <td className="px-4 py-3 text-muted mono text-xs">{client.email}</td>
                    <td className="px-4 py-3 mono">{client.projects.length}</td>
                    <td className="px-4 py-3 mono font-bold neon-text">{formatCurrency(totalSpent)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={hasSubscription ? 'neon' : 'outline'}>
                        {hasSubscription ? `€${client.subscriptions[0].price}/mes` : 'Sin plan'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{formatDate(client.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
