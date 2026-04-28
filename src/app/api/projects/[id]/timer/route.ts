import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const now = new Date()
  const deadline = new Date(now.getTime() + 48 * 60 * 60 * 1000)

  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      timerStartedAt: now,
      timerDeadline: deadline,
      status: 'DEVELOPMENT',
    },
  })

  return NextResponse.json(project)
}
