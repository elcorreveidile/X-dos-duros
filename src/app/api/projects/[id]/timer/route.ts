import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendTimerStarted } from '@/lib/email'

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const now = new Date()
  const deadline = new Date(now.getTime() + 48 * 60 * 60 * 1000)

  const project = await prisma.project.update({
    where: { id },
    data: {
      timerStartedAt: now,
      timerDeadline: deadline,
      status: 'DEVELOPMENT',
    },
    include: { client: true },
  })

  await sendTimerStarted({ project, client: project.client, deadline })

  return NextResponse.json(project)
}
