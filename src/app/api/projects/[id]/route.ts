import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { sendTimerStarted } from '@/lib/email'

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.enum(['LEAD', 'BRIEFING', 'DEVELOPMENT', 'REVIEW', 'DELIVERED', 'CANCELLED']).optional(),
  demoUrl: z.string().url().optional().nullable(),
  price: z.number().min(0).optional(),
  startTimer: z.boolean().optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, email: true } },
      briefing: true,
      tickets: { include: { messages: true }, orderBy: { updatedAt: 'desc' } },
      payments: true,
    },
  })

  if (!project) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  const isAdmin = session.user.role === 'ADMIN'
  if (!isAdmin && project.clientId !== session.user.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  return NextResponse.json(project)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { id } = await params
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { startTimer, ...rest } = parsed.data
  const updateData: Record<string, unknown> = { ...rest }

  if (startTimer) {
    const now = new Date()
    updateData.timerStartedAt = now
    updateData.timerDeadline = new Date(now.getTime() + 48 * 60 * 60 * 1000)
    if (!updateData.status) updateData.status = 'DEVELOPMENT'
  }

  const project = await prisma.project.update({
    where: { id },
    data: updateData,
    include: { client: { select: { id: true, name: true, email: true, role: true, createdAt: true } } },
  })

  if (startTimer && project.client && project.timerDeadline) {
    sendTimerStarted({
      project: project as Parameters<typeof sendTimerStarted>[0]['project'],
      client: project.client as Parameters<typeof sendTimerStarted>[0]['client'],
      deadline: project.timerDeadline,
    }).catch(console.error)
  }

  return NextResponse.json(project)
}
