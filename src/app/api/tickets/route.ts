import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createTicketSchema = z.object({
  projectId: z.string(),
  subject: z.string().min(3).max(200),
  message: z.string().min(1),
})

const messageSchema = z.object({
  ticketId: z.string(),
  content: z.string().min(1),
})

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')

  const tickets = await prisma.ticket.findMany({
    where: projectId ? { projectId } : undefined,
    include: { messages: { orderBy: { createdAt: 'asc' } } },
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json(tickets)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json()

  if (body.ticketId) {
    // Add message to existing ticket
    const parsed = messageSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: parsed.data.ticketId,
        authorId: session.user.id,
        content: parsed.data.content,
        isAdmin: session.user.role === 'ADMIN',
      },
    })

    await prisma.ticket.update({
      where: { id: parsed.data.ticketId },
      data: { status: 'IN_PROGRESS', updatedAt: new Date() },
    })

    return NextResponse.json(message, { status: 201 })
  }

  // Create new ticket
  const parsed = createTicketSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const ticket = await prisma.ticket.create({
    data: {
      projectId: parsed.data.projectId,
      subject: parsed.data.subject,
      messages: {
        create: {
          authorId: session.user.id,
          content: parsed.data.message,
          isAdmin: session.user.role === 'ADMIN',
        },
      },
    },
    include: { messages: true },
  })

  return NextResponse.json(ticket, { status: 201 })
}
