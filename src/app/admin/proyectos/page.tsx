import { KanbanBoard } from '@/components/admin/KanbanBoard'

export default function AdminProyectosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Proyectos</h1>
        <p className="text-muted text-sm mt-1">Gestión completa de todos los proyectos</p>
      </div>
      <KanbanBoard />
    </div>
  )
}
