import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createProjectSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const isAdmin = session.user.role === 'ADMIN'

  const projects = await prisma.project.findMany({
    where: isAdmin ? {} : { clientId: session.user.id },
    include: { client: { select: { id: true, name: true, email: true } } },
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = createProjectSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const project = await prisma.project.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price ?? 0,
      clientId: body.clientId,
    },
  })

  return NextResponse.json(project, { status: 201 })
}
