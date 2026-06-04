'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Play, ExternalLink, Clock, User, ChevronRight, MoreVertical, Link as LinkIcon } from 'lucide-react'
import type { Project, ProjectStatus, KanbanColumn } from '@/types'
import { getProjectStatusLabel, getTimeRemaining } from '@/lib/utils'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function MiniTimer({ deadline }: { deadline: Date }) {
  const r = getTimeRemaining(deadline)
  if (r.expired) return <span className="text-neon text-xs mono">Expirado</span>
  const urgent = r.total < 1000 * 60 * 60 * 6
  return (
    <span className={`text-xs mono font-bold ${urgent ? 'text-yellow-400' : 'text-neon'}`}>
      {pad(r.hours)}:{pad(r.minutes)}:{pad(r.seconds)}
    </span>
  )
}

interface ProjectCardProps {
  project: Project
  onActivateTimer: (id: string) => Promise<void>
  onSetDemoUrl: (id: string, url: string) => Promise<void>
  onMoveStatus: (id: string, status: ProjectStatus) => Promise<void>
}

function ProjectCard({ project, onActivateTimer, onSetDemoUrl, onMoveStatus }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [demoInput, setDemoInput] = useState(project.demoUrl ?? '')
  const [showDemoInput, setShowDemoInput] = useState(false)
  const [busy, setBusy] = useState(false)

  const nextStatus: Partial<Record<ProjectStatus, ProjectStatus>> = {
    LEAD: 'BRIEFING',
    BRIEFING: 'DEVELOPMENT',
    DEVELOPMENT: 'REVIEW',
    REVIEW: 'DELIVERED',
  }
  const next = nextStatus[project.status]

  const handle = async (fn: () => Promise<void>) => {
    setBusy(true)
    try { await fn() } finally { setBusy(false) }
  }

  return (
    <div className="border border-border bg-background p-4 space-y-3 hover:border-neon/40 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm uppercase tracking-tight truncate">{project.name}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-muted text-xs">
            <User size={10} />
            <span className="truncate">{project.client?.name ?? project.client?.email ?? '—'}</span>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-muted hover:text-foreground p-1">
            <MoreVertical size={14} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-6 z-20 bg-card border border-border min-w-[160px] shadow-xl">
              {next && (
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-neon/10 hover:text-neon transition-colors text-left"
                  onClick={() => { handle(() => onMoveStatus(project.id, next)); setShowMenu(false) }}
                >
                  <ChevronRight size={12} />
                  Mover a {getProjectStatusLabel(next)}
                </button>
              )}
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-neon/10 hover:text-neon transition-colors text-left"
                onClick={() => { setShowDemoInput(!showDemoInput); setShowMenu(false) }}
              >
                <LinkIcon size={12} />
                {project.demoUrl ? 'Cambiar URL demo' : 'Añadir URL demo'}
              </button>
            </div>
          )}
        </div>
      </div>

      {project.timerDeadline && (
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-muted" />
          <MiniTimer deadline={new Date(project.timerDeadline)} />
        </div>
      )}

      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-neon text-xs hover:underline">
          <ExternalLink size={10} />
          <span>Ver demo</span>
        </a>
      )}

      {showDemoInput && (
        <div className="flex gap-2">
          <input
            className="input text-xs py-1.5 flex-1"
            placeholder="https://demo.proyecto.com"
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
          />
          <Button size="sm" variant="primary"
            onClick={() => { handle(() => onSetDemoUrl(project.id, demoInput)); setShowDemoInput(false) }}>
            OK
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-border">
        {project.status === 'DEVELOPMENT' && !project.timerStartedAt && (
          <Button size="sm" variant="primary" className="flex-1 text-xs py-1.5" loading={busy}
            onClick={() => handle(() => onActivateTimer(project.id))}>
            <Play size={10} className="mr-1" />
            Iniciar 48h
          </Button>
        )}
        {next && !(project.status === 'DEVELOPMENT' && !project.timerStartedAt) && (
          <Button size="sm" variant="outline" className="flex-1 text-xs py-1.5" loading={busy}
            onClick={() => handle(() => onMoveStatus(project.id, next))}>
            <ChevronRight size={10} className="mr-1" />
            {getProjectStatusLabel(next)}
          </Button>
        )}
        <span className="text-muted text-xs ml-auto mono">€{project.price}</span>
      </div>
    </div>
  )
}

const COLUMNS: { id: ProjectStatus; label: string; color: string }[] = [
  { id: 'LEAD', label: 'Lead', color: 'text-muted' },
  { id: 'BRIEFING', label: 'Briefing', color: 'text-yellow-400' },
  { id: 'DEVELOPMENT', label: 'Desarrollo', color: 'text-blue-400' },
  { id: 'REVIEW', label: 'Revisión', color: 'text-purple-400' },
  { id: 'DELIVERED', label: 'Entregado', color: 'text-neon' },
]

async function patchProject(id: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar')
  return res.json() as Promise<Project>
}

export function KanbanBoard({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const activateTimer = async (id: string) => {
    const updated = await patchProject(id, { startTimer: true })
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)))
  }

  const setDemoUrl = async (id: string, url: string) => {
    const updated = await patchProject(id, { demoUrl: url })
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)))
  }

  const moveStatus = async (id: string, status: ProjectStatus) => {
    // optimistic update
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
    try {
      await patchProject(id, { status })
    } catch {
      // rollback on error
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p } : p)))
    }
  }

  const columns: KanbanColumn[] = COLUMNS.map((col) => ({
    id: col.id,
    label: col.label,
    projects: projects.filter((p) => p.status === col.id),
  }))

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {columns.map((col, i) => {
          const colDef = COLUMNS[i]
          return (
            <div key={col.id} className="w-72 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${colDef.color}`}>
                    {col.label}
                  </span>
                  <span className="text-muted text-xs mono">({col.projects.length})</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${col.projects.length > 0 ? 'bg-current opacity-50' : 'bg-border'} ${colDef.color}`} />
              </div>
              <div className="flex flex-col gap-3 min-h-[100px]">
                {col.projects.length === 0 ? (
                  <div className="border border-dashed border-border p-4 text-center text-muted text-xs">
                    Sin proyectos
                  </div>
                ) : (
                  col.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onActivateTimer={activateTimer}
                      onSetDemoUrl={setDemoUrl}
                      onMoveStatus={moveStatus}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
