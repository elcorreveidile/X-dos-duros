import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'
import { sendClientMagicAccess } from '@/lib/email'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const user = await prisma.user.findUnique({ where: { id }, select: { name: true, email: true, role: true } })

  if (!user) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  if (user.role !== 'CLIENT') return NextResponse.json({ error: 'No es un cliente' }, { status: 400 })

  // Invalidate old tokens and create a fresh one
  await prisma.verificationToken.deleteMany({ where: { identifier: user.email } })

  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await prisma.verificationToken.create({ data: { identifier: user.email, token, expires } })

  const magicLink = `${APP_URL}/login/verify?email=${encodeURIComponent(user.email)}&token=${token}`
  await sendClientMagicAccess({ name: user.name ?? user.email, email: user.email, magicLink })

  return NextResponse.json({ ok: true })
}
