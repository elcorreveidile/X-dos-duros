export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { ProjectTimer } from '@/components/dashboard/ProjectTimer'
import { PayButton } from '@/components/dashboard/PayButton'
import { FreeConfirmBlock } from '@/components/dashboard/FreeConfirmBlock'
import { PaymentNotice } from '@/components/dashboard/PaymentNotice'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink, FileText, MessageSquare, Package, Inbox, CreditCard, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getProjectStatusLabel, getProjectStatusColor, formatCurrency } from '@/lib/utils'
import type { ProjectStatus } from '@/types'
import { Suspense } from 'react'
import { MundialPrize } from '@/components/dashboard/MundialPrize'

const STATUS_STEPS: { status: ProjectStatus; label: string }[] = [
  { status: 'LEAD', label: 'Solicitud recibida' },
  { status: 'BRIEFING', label: 'Briefing completado' },
  { status: 'DEVELOPMENT', label: 'En desarrollo' },
  { status: 'REVIEW', label: 'En revisión' },
  { status: 'DELIVERED', label: 'Entregado' },
]

const STATUS_ORDER: ProjectStatus[] = ['LEAD', 'BRIEFING', 'DEVELOPMENT', 'REVIEW', 'DELIVERED']

const PAYMENT_STATUSES: ProjectStatus[] = ['BRIEFING', 'DEVELOPMENT', 'REVIEW', 'DELIVERED']

interface Props {
  searchParams: Promise<{ payment?: string; session_id?: string }>
}

export default async function DashboardPage({ searchParams }: Props) {
  const session = await auth()

  // Verify payment with Stripe directly on success redirect (before webhook arrives)
  const { payment, session_id } = await searchParams
  if (payment === 'success' && session_id) {
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(session_id)
      if (
        (stripeSession.payment_status === 'paid' || stripeSession.payment_status === 'no_payment_required') &&
        stripeSession.metadata?.projectId
      ) {
        const paymentIntentId =
          typeof stripeSession.payment_intent === 'string'
            ? stripeSession.payment_intent
            : (stripeSession.payment_intent as { id?: string } | null)?.id ?? null
        const uniqueId = paymentIntentId ?? `session_${session_id}`
        await prisma.payment.upsert({
          where: { stripePaymentId: uniqueId },
          create: {
            projectId: stripeSession.metadata.projectId,
            amount: (stripeSession.amount_total ?? 0) / 100,
            status: 'PAID',
            stripePaymentId: uniqueId,
            paidAt: new Date(),
          },
          update: { status: 'PAID' },
        })
      }
    } catch {}
  }

  // Check for pending Mundial prize
  const mundialCoupon = await prisma.mundialCoupon.findFirst({
    where: { userId: session!.user!.id, redeemedAt: null },
    orderBy: { createdAt: 'desc' },
  })

  const project = await prisma.project.findFirst({
    where: { clientId: session!.user!.id },
    orderBy: { createdAt: 'desc' },
    include: {
      payments: { where: { status: 'PAID' }, select: { id: true } },
      tickets: {
        where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
        select: {
          id: true,
          messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { isAdmin: true } },
        },
      },
    },
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

  const isPaid = project.payments.length > 0
  // Tickets where the last message is from admin (client hasn't replied yet)
  const unreadCount = project.tickets.filter(
    (t) => t.messages[0]?.isAdmin === true
  ).length
  const needsConfirmation = !isPaid && PAYMENT_STATUSES.includes(project.status as ProjectStatus)
  const showPayButton = project.price > 0 && needsConfirmation
  const showFreeConfirm = project.price === 0 && needsConfirmation
  const currentIndex = STATUS_ORDER.indexOf(project.status as ProjectStatus)

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <PaymentNotice />
      </Suspense>

      {mundialCoupon && (
        <MundialPrize couponCode={mundialCoupon.code} pct={mundialCoupon.pct} />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className={`badge border ${getProjectStatusColor(project.status)}`}>
              {getProjectStatusLabel(project.status)}
            </span>
            {isPaid && (
              <span className="badge border border-neon text-neon flex items-center gap-1">
                <CreditCard size={10} />
                Pagado
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">{project.name}</h1>
          <p className="text-muted text-sm mt-1">
            Proyecto <span className="mono">#{project.id.slice(0, 8)}</span> · {formatCurrency(project.price)}
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

      {project.status === 'LEAD' && (
        <div className="border border-yellow-400/40 bg-yellow-400/5 p-5 flex items-start gap-4">
          <FileText size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground uppercase tracking-tight">Paso siguiente: rellena el briefing</p>
            <p className="text-muted text-sm mt-1">
              Para que podamos empezar a trabajar, necesitamos los detalles de tu proyecto: textos, logos, referencias y cualquier material relevante.
            </p>
            <Link href="/dashboard/briefing" className="inline-flex items-center gap-2 mt-3 text-yellow-400 text-xs font-bold uppercase tracking-widest hover:underline">
              Ir al briefing <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {showPayButton && (
        <div className="border border-neon/40 bg-neon/5 p-5 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon font-bold">Pago pendiente</p>
            <p className="text-muted text-sm mt-1">
              Confirma tu proyecto completando el pago de {formatCurrency(project.price)}.
              El pago se procesa de forma segura mediante Stripe.
            </p>
          </div>
          <PayButton projectId={project.id} amount={project.price} />
        </div>
      )}

      {showFreeConfirm && (
        <FreeConfirmBlock projectId={project.id} />
      )}

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
          { href: '/dashboard/briefing', icon: FileText, title: 'Briefing', description: 'Envía textos, logos y referencias', badge: 0 },
          { href: '/dashboard/tickets', icon: MessageSquare, title: 'Mensajes', description: 'Habla directamente con el equipo', badge: unreadCount },
          { href: '/dashboard/suscripcion', icon: Package, title: 'Suscripción', description: 'Gestiona tu plan de mantenimiento', badge: 0 },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="card-hover flex flex-col gap-2 p-5 border border-border group relative"
            >
              <div className="flex items-center justify-between">
                <Icon size={18} className="text-muted group-hover:text-neon transition-colors" />
                {item.badge > 0 && (
                  <span className="bg-neon text-background text-xs font-black px-1.5 py-0.5 min-w-[20px] text-center leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
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
