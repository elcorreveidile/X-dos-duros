export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { ProjectsTable } from '@/components/admin/ProjectsTable'
import type { ProjectStatus } from '@/types'

export default async function AdminProyectosPage() {
  const rawProjects = await prisma.project.findMany({
    include: {
      client: { select: { name: true, email: true } },
      tickets: {
        where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
        select: {
          messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { isAdmin: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const projects = rawProjects.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status as ProjectStatus,
    price: p.price,
    clientName: p.client?.name ?? '',
    clientEmail: p.client?.email ?? '',
    timerDeadline: p.timerDeadline?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    unreadMessages: p.tickets.filter((t) => t.messages[0]?.isAdmin === false).length,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Proyectos</h1>
        <p className="text-muted text-sm mt-1">Todos los proyectos — {projects.length} en total</p>
      </div>
      <ProjectsTable initialProjects={projects} />
    </div>
  )
}
