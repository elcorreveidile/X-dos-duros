import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import {
  sendTicketCreatedToAdmin,
  sendTicketCreatedToClient,
  sendTicketReplyToAdmin,
  sendTicketReplyToClient,
} from '@/lib/email'
import type { Project, User } from '@/types'

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
  const isAdmin = session.user.role === 'ADMIN'

  if (body.ticketId) {
    // Reply to existing ticket
    const parsed = messageSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: parsed.data.ticketId,
        authorId: session.user.id!,
        content: parsed.data.content,
        isAdmin,
      },
    })

    await prisma.ticket.update({
      where: { id: parsed.data.ticketId },
      data: { status: 'IN_PROGRESS', updatedAt: new Date() },
    })

    // Send email notification to the other party
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id: parsed.data.ticketId },
        include: { project: { include: { client: true } } },
      })
      if (ticket) {
        const emailData = {
          project: ticket.project as unknown as Project,
          client: ticket.project.client as unknown as User,
          subject: ticket.subject,
          message: parsed.data.content,
        }
        if (isAdmin) {
          await sendTicketReplyToClient(emailData)
        } else {
          await sendTicketReplyToAdmin(emailData)
        }
      }
    } catch {
      // email failure doesn't block the response
    }

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
          authorId: session.user.id!,
          content: parsed.data.message,
          isAdmin,
        },
      },
    },
    include: {
      messages: true,
      project: { include: { client: true } },
    },
  })

  // Send email notification to the other party
  try {
    const emailData = {
      project: ticket.project as unknown as Project,
      client: ticket.project.client as unknown as User,
      subject: parsed.data.subject,
      message: parsed.data.message,
    }
    if (isAdmin) {
      await sendTicketCreatedToClient(emailData)
    } else {
      await sendTicketCreatedToAdmin(emailData)
    }
  } catch {
    // email failure doesn't block the response
  }

  // Don't expose project/client data to the client response
  const { project: _project, ...ticketResponse } = ticket
  return NextResponse.json(ticketResponse, { status: 201 })
}
