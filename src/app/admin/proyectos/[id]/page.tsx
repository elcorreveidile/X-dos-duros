export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { getProjectStatusLabel, getProjectStatusColor, formatCurrency } from '@/lib/utils'
import { ArrowLeft, ExternalLink, FileText, Palette, Globe, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { AdminTicketSystem } from '@/components/admin/AdminTicketSystem'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminProjectDetailPage({ params }: Props) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: { select: { name: true, email: true, createdAt: true } },
      briefing: true,
      payments: { orderBy: { createdAt: 'desc' } },
      tickets: { orderBy: { updatedAt: 'desc' }, include: { messages: { orderBy: { createdAt: 'asc' } } } },
    },
  })

  if (!project) notFound()

  const { briefing, client } = project

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/proyectos" className="text-muted hover:text-neon transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className={`badge border ${getProjectStatusColor(project.status)}`}>
              {getProjectStatusLabel(project.status)}
            </span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">{project.name}</h1>
          <p className="text-muted text-sm mt-1">
            <span className="mono">#{project.id.slice(0, 8)}</span> · {formatCurrency(project.price)}
          </p>
        </div>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline text-sm">
            <ExternalLink size={14} /> Demo
          </a>
        )}
      </div>

      {/* Client info */}
      <section className="border border-border p-5 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-muted flex items-center gap-2">
          <User size={12} /> Cliente
        </h2>
        <div>
          <p className="font-bold">{client.name ?? '—'}</p>
          <p className="text-muted text-sm mono">{client.email}</p>
        </div>
      </section>

      {/* Briefing */}
      {briefing ? (
        <section className="border border-neon/30 bg-neon/5 p-5 space-y-6">
          <h2 className="text-xs uppercase tracking-widest text-neon flex items-center gap-2">
            <FileText size={12} /> Briefing del cliente
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-1">Nombre del negocio</p>
              <p className="font-medium">{briefing.businessName}</p>
            </div>
            {briefing.deadline && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1 flex items-center gap-1">
                  <Calendar size={10} /> Fecha límite deseada
                </p>
                <p className="font-medium">{briefing.deadline}</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-1">Descripción del negocio</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{briefing.businessDescription}</p>
          </div>

          {briefing.targetAudience && (
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-1">Público objetivo</p>
              <p className="text-sm">{briefing.targetAudience}</p>
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-widest text-muted mb-1">Funcionalidades deseadas</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{briefing.desiredFeatures}</p>
          </div>

          {briefing.referenceUrls.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2 flex items-center gap-1">
                <Globe size={10} /> URLs de referencia
              </p>
              <ul className="space-y-1">
                {briefing.referenceUrls.map((url) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-neon hover:underline mono flex items-center gap-1">
                      <ExternalLink size={10} /> {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {briefing.brandColors.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2 flex items-center gap-1">
                <Palette size={10} /> Colores de marca
              </p>
              <div className="flex flex-wrap gap-3">
                {briefing.brandColors.map((color) => (
                  <div key={color} className="flex items-center gap-2 border border-border px-3 py-2">
                    <div className="w-5 h-5 rounded-sm border border-border/50" style={{ backgroundColor: color }} />
                    <span className="mono text-xs">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {briefing.logoUrl && (
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Logo</p>
              {briefing.logoUrl.startsWith('data:image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={briefing.logoUrl}
                  alt="Logo del cliente"
                  className="max-h-32 w-auto object-contain bg-white p-3 border border-border"
                />
              ) : (
                <a href={briefing.logoUrl} target="_blank" rel="noopener noreferrer"
                  className="text-neon hover:underline text-sm mono flex items-center gap-1">
                  <ExternalLink size={12} /> {briefing.logoUrl}
                </a>
              )}
            </div>
          )}

          {briefing.additionalNotes && (
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-1">Notas adicionales</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{briefing.additionalNotes}</p>
            </div>
          )}

          <p className="text-xs text-muted">
            Enviado el {new Date(briefing.submittedAt).toLocaleString('es-ES', {
              day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </section>
      ) : (
        <section className="border border-dashed border-border p-8 text-center">
          <FileText size={32} className="text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">El cliente aún no ha enviado el briefing.</p>
        </section>
      )}

      {/* Payments */}
      {project.payments.length > 0 && (
        <section className="border border-border p-5 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-muted">Pagos</h2>
          {project.payments.map((pay) => (
            <div key={pay.id} className="flex items-center justify-between text-sm">
              <span className="mono text-muted text-xs">{pay.stripePaymentId ?? pay.id.slice(0, 12)}</span>
              <span className={pay.status === 'PAID' ? 'text-neon font-bold' : 'text-muted'}>
                {formatCurrency(pay.amount)} · {pay.status}
              </span>
            </div>
          ))}
        </section>
      )}

<<<<<<< HEAD
      <AdminTicketSystem projectId={project.id} />
=======
      {/* Tickets */}
      {project.tickets.length > 0 && (
        <section className="border border-border p-5 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-muted flex items-center gap-2">
            <MessageSquare size={12} /> Mensajes recientes
          </h2>
          {project.tickets.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-sm">
              <span>{t.subject}</span>
              <span className="text-muted text-xs">{t.status}</span>
            </div>
          ))}
        </section>
      )}
>>>>>>> origin/main
    </div>
  )
}
