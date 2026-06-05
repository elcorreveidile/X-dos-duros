'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Search } from 'lucide-react'
import type { ProjectStatus } from '@/types'

type ProjectRow = {
  id: string
  name: string
  status: ProjectStatus
  price: number
  clientName: string
  clientEmail: string
  timerDeadline: string | null
  createdAt: string
}

function formatCurrencyClient(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatDateClient(s: string) {
  return new Date(s).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  LEAD: 'Lead', BRIEFING: 'Briefing', DEVELOPMENT: 'Desarrollo',
  REVIEW: 'Revisión', DELIVERED: 'Entregado', CANCELLED: 'Cancelado',
}

const STATUS_VARIANTS: Record<ProjectStatus, 'neon' | 'outline' | 'error' | 'warning'> = {
  LEAD: 'outline', BRIEFING: 'warning', DEVELOPMENT: 'outline',
  REVIEW: 'warning', DELIVERED: 'neon', CANCELLED: 'error',
}

const ALL_STATUSES: (ProjectStatus | 'ALL')[] = [
  'ALL', 'LEAD', 'BRIEFING', 'DEVELOPMENT', 'REVIEW', 'DELIVERED', 'CANCELLED',
]

export function ProjectsTable({ initialProjects }: { initialProjects: ProjectRow[] }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL')

  const filtered = initialProjects.filter((p) => {
    const q = search.toLowerCase()
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.clientName.toLowerCase().includes(q) ||
      p.clientEmail.toLowerCase().includes(q)
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="input pl-8 text-sm"
            placeholder="Buscar proyecto o cliente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-colors ${
                statusFilter === s
                  ? 'border-neon text-neon bg-neon/10'
                  : 'border-border text-muted hover:border-neon/40 hover:text-foreground'
              }`}
            >
              {s === 'ALL' ? 'Todos' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="text-muted text-xs mono">{filtered.length} proyecto{filtered.length !== 1 ? 's' : ''}</div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">Sin proyectos en esta categoría.</p>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                {['Proyecto', 'Cliente', 'Estado', 'Precio', 'Deadline', 'Creado'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((project, i) => (
                <tr
                  key={project.id}
                  className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
                >
                  <td className="px-4 py-3 font-medium">{project.name}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs">{project.clientName || '—'}</div>
                    <div className="text-xs text-muted mono">{project.clientEmail}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANTS[project.status]}>{STATUS_LABELS[project.status]}</Badge>
                  </td>
                  <td className="px-4 py-3 mono font-bold neon-text">{formatCurrencyClient(project.price)}</td>
                  <td className="px-4 py-3 text-muted text-xs mono">
                    {project.timerDeadline ? formatDateClient(project.timerDeadline) : '—'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{formatDateClient(project.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
