import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  const user = await prisma.user.findUnique({ where: { id }, select: { email: true, role: true } })
  if (!user) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  if (user.role !== 'CLIENT') return NextResponse.json({ error: 'No es un cliente' }, { status: 400 })

  await prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { identifier: user.email } }),
    prisma.subscription.deleteMany({ where: { clientId: id } }),
    prisma.project.deleteMany({ where: { clientId: id } }),
    prisma.user.delete({ where: { id } }),
  ])

  return NextResponse.json({ ok: true })
}
