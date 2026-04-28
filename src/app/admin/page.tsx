import { StatsBar } from '@/components/admin/StatsBar'
import { KanbanBoard } from '@/components/admin/KanbanBoard'

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Panel de control</h1>
          <p className="text-muted text-sm mt-1">Vista general de todos los proyectos</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
          <span className="text-neon text-xs mono">Sistema operativo</span>
        </div>
      </div>

      <StatsBar />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
            Proyectos — Vista Kanban
          </h2>
        </div>
        <KanbanBoard />
      </div>
    </div>
  )
}
