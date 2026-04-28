import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.enum(['LEAD', 'BRIEFING', 'DEVELOPMENT', 'REVIEW', 'DELIVERED', 'CANCELLED']).optional(),
  demoUrl: z.string().url().optional().nullable(),
  price: z.number().min(0).optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const project = await prisma.project.findUnique({
    where: { id: params.id },
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const project = await prisma.project.update({
    where: { id: params.id },
    data: parsed.data,
  })

  return NextResponse.json(project)
}
