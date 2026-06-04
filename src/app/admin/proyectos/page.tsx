import { prisma } from '@/lib/db'
import { KanbanBoard } from '@/components/admin/KanbanBoard'
import type { Project } from '@/types'

export default async function AdminProyectosPage() {
  const projects = await prisma.project.findMany({
    where: { status: { notIn: ['CANCELLED'] } },
    include: { client: { select: { id: true, name: true, email: true, role: true, createdAt: true } } },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Proyectos</h1>
        <p className="text-muted text-sm mt-1">Gestión completa de todos los proyectos</p>
      </div>
      <KanbanBoard initialProjects={projects as unknown as Project[]} />
    </div>
  )
}
