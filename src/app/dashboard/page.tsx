import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProjectTimer } from '@/components/dashboard/ProjectTimer'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink, FileText, MessageSquare, Package, Inbox } from 'lucide-react'
import Link from 'next/link'
import { getProjectStatusLabel, getProjectStatusColor } from '@/lib/utils'
import type { ProjectStatus } from '@/types'

const STATUS_STEPS: { status: ProjectStatus; label: string }[] = [
  { status: 'LEAD', label: 'Solicitud recibida' },
  { status: 'BRIEFING', label: 'Briefing completado' },
  { status: 'DEVELOPMENT', label: 'En desarrollo' },
  { status: 'REVIEW', label: 'En revisión' },
  { status: 'DELIVERED', label: 'Entregado' },
]

const STATUS_ORDER: ProjectStatus[] = ['LEAD', 'BRIEFING', 'DEVELOPMENT', 'REVIEW', 'DELIVERED']

export default async function DashboardPage() {
  const session = await auth()

  const project = await prisma.project.findFirst({
    where: { clientId: session!.user!.id },
    orderBy: { createdAt: 'desc' },
  })

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
        <Inbox size={48} className="text-muted" />
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Sin proyectos activos</h1>
          <p className="text-muted text-sm mt-2 max-w-sm mx-auto">
            Cuando contrates un proyecto, aparecerá aquí y podrás seguir su progreso en tiempo real.
          </p>
        </div>
        <a
          href="/#contacto"
          className="px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/90 transition-colors"
        >
          Solicitar un proyecto
        </a>
      </div>
    )
  }

  const currentIndex = STATUS_ORDER.indexOf(project.status as ProjectStatus)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className={`badge border ${getProjectStatusColor(project.status)}`}>
              {getProjectStatusLabel(project.status)}
            </span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">{project.name}</h1>
          <p className="text-muted text-sm mt-1">
            Proyecto <span className="mono">#{project.id.slice(0, 8)}</span> · €{project.price}
          </p>
        </div>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline text-sm"
          >
            <ExternalLink size={14} />
            Ver demo
          </a>
        )}
      </div>

      <ProjectTimer
        deadline={project.timerDeadline}
        started={project.status === 'DEVELOPMENT' || project.status === 'REVIEW'}
      />

      {project.demoUrl ? (
        <div className="border border-neon bg-neon/5 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon mb-1">URL de demo lista</p>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-neon transition-colors font-mono text-sm"
            >
              {project.demoUrl}
            </a>
          </div>
          <ExternalLink size={16} className="text-neon flex-shrink-0" />
        </div>
      ) : (
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted mb-1">URL de demo</p>
          <p className="text-muted text-sm">Disponible cuando el proyecto entre en fase de revisión.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/dashboard/briefing', icon: FileText, title: 'Briefing', description: 'Envía textos, logos y referencias' },
          { href: '/dashboard/tickets', icon: MessageSquare, title: 'Mensajes', description: 'Habla directamente con el equipo' },
          { href: '/dashboard/suscripcion', icon: Package, title: 'Suscripción', description: 'Gestiona tu plan de mantenimiento' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="card-hover flex flex-col gap-2 p-5 border border-border group"
            >
              <Icon size={18} className="text-muted group-hover:text-neon transition-colors" />
              <h3 className="font-bold text-sm uppercase tracking-tight">{item.title}</h3>
              <p className="text-muted text-xs">{item.description}</p>
            </Link>
          )
        })}
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-4">Estado del proyecto</h2>
        <div className="relative">
          {STATUS_STEPS.map((step, i) => {
            const stepIndex = STATUS_ORDER.indexOf(step.status)
            const isDone = stepIndex < currentIndex
            const isActive = stepIndex === currentIndex
            return (
              <div key={step.status} className="flex items-start gap-4 pb-6 last:pb-0 relative">
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`absolute left-3 top-6 w-px h-full ${isDone ? 'bg-neon' : 'bg-border'}`} />
                )}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${
                  isDone ? 'border-neon bg-neon' : isActive ? 'border-neon bg-neon/20' : 'border-border bg-background'
                }`}>
                  {isDone && <span className="w-2 h-2 rounded-full bg-background" />}
                  {isActive && <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />}
                </div>
                <div className="pt-0.5">
                  <p className={`text-sm font-medium ${isDone || isActive ? 'text-foreground' : 'text-muted'}`}>
                    {step.label}
                  </p>
                  {isActive && <Badge variant="warning" className="mt-1">En curso</Badge>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
