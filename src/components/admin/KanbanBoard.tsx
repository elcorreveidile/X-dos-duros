'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Play,
  ExternalLink,
  Clock,
  User,
  ChevronRight,
  MoreVertical,
  Link as LinkIcon,
} from 'lucide-react'
import type { Project, ProjectStatus, KanbanColumn } from '@/types'
import { getProjectStatusLabel, getTimeRemaining, formatDateTime } from '@/lib/utils'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function MiniTimer({ deadline }: { deadline: Date }) {
  const r = getTimeRemaining(deadline)
  if (r.expired) return <span className="text-neon text-xs mono">Entregado</span>
  const urgent = r.total < 1000 * 60 * 60 * 6
  return (
    <span className={`text-xs mono font-bold ${urgent ? 'text-yellow-400' : 'text-neon'}`}>
      {pad(r.hours)}:{pad(r.minutes)}:{pad(r.seconds)}
    </span>
  )
}

interface ProjectCardProps {
  project: Project
  onActivateTimer: (id: string) => void
  onSetDemoUrl: (id: string, url: string) => void
  onMoveStatus: (id: string, status: ProjectStatus) => void
}

function ProjectCard({ project, onActivateTimer, onSetDemoUrl, onMoveStatus }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [demoInput, setDemoInput] = useState(project.demoUrl ?? '')
  const [showDemoInput, setShowDemoInput] = useState(false)

  const nextStatus: Partial<Record<ProjectStatus, ProjectStatus>> = {
    LEAD: 'BRIEFING',
    BRIEFING: 'DEVELOPMENT',
    DEVELOPMENT: 'REVIEW',
    REVIEW: 'DELIVERED',
  }

  const next = nextStatus[project.status]

  return (
    <div className="border border-border bg-background p-4 space-y-3 hover:border-neon/40 transition-colors group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm uppercase tracking-tight truncate">{project.name}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-muted text-xs">
            <User size={10} />
            <span className="truncate">{project.client?.email ?? '—'}</span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-muted hover:text-foreground p-1 transition-colors"
          >
            <MoreVertical size={14} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-6 z-20 bg-card border border-border min-w-[160px] shadow-xl">
              {next && (
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-neon/10 hover:text-neon transition-colors text-left"
                  onClick={() => {
                    onMoveStatus(project.id, next)
                    setShowMenu(false)
                  }}
                >
                  <ChevronRight size={12} />
                  Mover a {getProjectStatusLabel(next)}
                </button>
              )}
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-neon/10 hover:text-neon transition-colors text-left"
                onClick={() => {
                  setShowDemoInput(!showDemoInput)
                  setShowMenu(false)
                }}
              >
                <LinkIcon size={12} />
                {project.demoUrl ? 'Cambiar URL demo' : 'Añadir URL demo'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Timer */}
      {project.timerDeadline && (
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-muted" />
          <MiniTimer deadline={new Date(project.timerDeadline)} />
        </div>
      )}

      {/* Demo URL */}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-neon text-xs hover:underline"
        >
          <ExternalLink size={10} />
          Ver demo
        </a>
      )}

      {/* Demo URL input */}
      {showDemoInput && (
        <div className="flex gap-2">
          <input
            className="input text-xs py-1.5 flex-1"
            placeholder="https://demo.proyecto.com"
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
          />
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              onSetDemoUrl(project.id, demoInput)
              setShowDemoInput(false)
            }}
          >
            OK
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-border">
        {project.status === 'BRIEFING' && !project.timerStartedAt && (
          <Button
            size="sm"
            variant="primary"
            className="flex-1 text-xs py-1.5"
            onClick={() => onActivateTimer(project.id)}
          >
            <Play size={10} className="mr-1" />
            Iniciar 48h
          </Button>
        )}
        {next && project.status !== 'BRIEFING' && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs py-1.5"
            onClick={() => onMoveStatus(project.id, next)}
          >
            <ChevronRight size={10} className="mr-1" />
            {getProjectStatusLabel(next)}
          </Button>
        )}
        <span className="text-muted text-xs ml-auto mono">€{project.price}</span>
      </div>
    </div>
  )
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Landing Panadería García',
    description: null,
    status: 'DEVELOPMENT',
    clientId: 'u1',
    client: { id: 'u1', name: 'Ana García', email: 'ana@panaderia.com', role: 'CLIENT', createdAt: new Date() },
    timerStartedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    timerDeadline: new Date(Date.now() + 1000 * 60 * 60 * 28),
    demoUrl: null,
    finalFiles: [],
    price: 299,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'p2',
    name: 'E-commerce Moda Sostenible',
    description: null,
    status: 'BRIEFING',
    clientId: 'u2',
    client: { id: 'u2', name: 'Carlos López', email: 'carlos@moda.es', role: 'CLIENT', createdAt: new Date() },
    timerStartedAt: null,
    timerDeadline: null,
    demoUrl: null,
    finalFiles: [],
    price: 599,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'p3',
    name: 'MVP SaaS Gestión Reservas',
    description: null,
    status: 'LEAD',
    clientId: 'u3',
    client: { id: 'u3', name: 'María Ruiz', email: 'maria@reservas.io', role: 'CLIENT', createdAt: new Date() },
    timerStartedAt: null,
    timerDeadline: null,
    demoUrl: null,
    finalFiles: [],
    price: 899,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'p4',
    name: 'Landing Consultoría HR',
    description: null,
    status: 'REVIEW',
    clientId: 'u4',
    client: { id: 'u4', name: 'Pedro Sanz', email: 'pedro@hr.com', role: 'CLIENT', createdAt: new Date() },
    timerStartedAt: new Date(Date.now() - 1000 * 60 * 60 * 46),
    timerDeadline: new Date(Date.now() + 1000 * 60 * 60 * 2),
    demoUrl: 'https://demo.hr-consulting.com',
    finalFiles: [],
    price: 349,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'p5',
    name: 'App Delivery Restaurante',
    description: null,
    status: 'DELIVERED',
    clientId: 'u5',
    client: { id: 'u5', name: 'Laura Vega', email: 'laura@restaurante.com', role: 'CLIENT', createdAt: new Date() },
    timerStartedAt: new Date(Date.now() - 1000 * 60 * 60 * 50),
    timerDeadline: new Date(Date.now() - 1000 * 60 * 60 * 2),
    demoUrl: 'https://demo.delivery-app.com',
    finalFiles: [],
    price: 799,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const COLUMNS: { id: ProjectStatus; label: string; color: string }[] = [
  { id: 'LEAD', label: 'Lead', color: 'text-muted' },
  { id: 'BRIEFING', label: 'Briefing', color: 'text-yellow-400' },
  { id: 'DEVELOPMENT', label: 'Desarrollo', color: 'text-blue-400' },
  { id: 'REVIEW', label: 'Revisión', color: 'text-purple-400' },
  { id: 'DELIVERED', label: 'Entregado', color: 'text-neon' },
]

export function KanbanBoard() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)

  const activateTimer = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'DEVELOPMENT',
              timerStartedAt: new Date(),
              timerDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000),
            }
          : p
      )
    )
  }

  const setDemoUrl = (id: string, url: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, demoUrl: url } : p)))
  }

  const moveStatus = (id: string, status: ProjectStatus) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
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
              {/* Column header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${colDef.color}`}>
                    {col.label}
                  </span>
                  <span className="text-muted text-xs mono">({col.projects.length})</span>
                </div>
                {col.id !== 'CANCELLED' && (
                  <div className={`w-2 h-2 rounded-full ${col.projects.length > 0 ? 'bg-current opacity-50' : 'bg-border'} ${colDef.color}`} />
                )}
              </div>

              {/* Cards */}
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
