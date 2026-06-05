import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({ projectId: z.string() })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })

  const project = await prisma.project.findUnique({
    where: { id: parsed.data.projectId },
  })

  if (!project) return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })

  // Only the client who owns the project (or admin) can confirm
  if (session.user.role !== 'ADMIN' && project.clientId !== session.user.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  if (project.price > 0) {
    return NextResponse.json({ error: 'Este proyecto tiene coste — usa el flujo de pago normal' }, { status: 400 })
  }

  // Idempotent: don't create a duplicate if already confirmed
  const existing = await prisma.payment.findFirst({
    where: { projectId: project.id, status: 'PAID' },
  })
  if (existing) return NextResponse.json({ ok: true })

  await prisma.payment.create({
    data: {
      projectId: project.id,
      amount: 0,
      status: 'PAID',
      paidAt: new Date(),
    },
  })

  return NextResponse.json({ ok: true })
}
