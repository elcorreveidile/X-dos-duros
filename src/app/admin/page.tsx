export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { KanbanBoard } from '@/components/admin/KanbanBoard'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, Clock, Package, Users, Euro, Plus } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/types'

async function getStats() {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Use a batch transaction so all 5 queries share one connection
  const [activeProjects, inDev, deliveredThisMonth, activeClients, revenue] =
    await prisma.$transaction([
      prisma.project.count({ where: { status: { notIn: ['DELIVERED', 'CANCELLED'] } } }),
      prisma.project.count({ where: { status: 'DEVELOPMENT' } }),
      prisma.project.count({ where: { status: 'DELIVERED', updatedAt: { gte: startOfMonth } } }),
      prisma.user.count({ where: { role: 'CLIENT', projects: { some: {} } } }),
      prisma.payment.aggregate({ where: { status: 'PAID', paidAt: { gte: startOfMonth } }, _sum: { amount: true } }),
    ])

  return {
    activeProjects: activeProjects as number,
    inDev: inDev as number,
    deliveredThisMonth: deliveredThisMonth as number,
    activeClients: activeClients as number,
    revenue: ((revenue as { _sum: { amount: number | null } })._sum.amount) ?? 0,
  }
}

export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    where: { status: { notIn: ['CANCELLED'] } },
    include: { client: { select: { id: true, name: true, email: true, role: true, createdAt: true } } },
    orderBy: { updatedAt: 'desc' },
  })
  const stats = await getStats()

  const STATS = [
    { label: 'Proyectos activos', value: stats.activeProjects, icon: Package, unit: '' },
    { label: 'En desarrollo', value: stats.inDev, icon: Clock, unit: '' },
    { label: 'Entregados (mes)', value: stats.deliveredThisMonth, icon: TrendingUp, unit: '' },
    { label: 'Clientes activos', value: stats.activeClients, icon: Users, unit: '' },
    { label: 'Revenue (mes)', value: stats.revenue, icon: Euro, unit: 'currency' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Panel de control</h1>
          <p className="text-muted text-sm mt-1">Vista general de todos los proyectos</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
            <span className="text-neon text-xs mono">Sistema operativo</span>
          </div>
          <Link
            href="/admin/nuevo"
            className="flex items-center gap-2 px-4 py-2 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/90 transition-colors"
          >
            <Plus size={14} />
            Nuevo proyecto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-background p-5 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted mb-2">
                <Icon size={14} />
                <span className="text-xs uppercase tracking-wider">{stat.label}</span>
              </div>
              <span className="text-2xl font-black mono neon-text">
                {stat.unit === 'currency' ? formatCurrency(stat.value) : stat.value}
              </span>
            </div>
          )
        })}
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">
          Proyectos — Vista Kanban
        </h2>
        <KanbanBoard initialProjects={projects as unknown as Project[]} />
      </div>
    </div>
  )
}
