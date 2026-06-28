import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db'
import { sendRetoMundialMagicLink } from '@/lib/email'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://por2duros.com'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const { email } = parsed.data

  // Upsert user and mark as reto participant
  await prisma.user.upsert({
    where: { email },
    create: { name: email.split('@')[0], email, role: 'CLIENT', retoMundial: true },
    update: { retoMundial: true },
  })

  // Generate magic link → dashboard
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })
  const magicLink = `${APP_URL}/login/verify?email=${encodeURIComponent(email)}&token=${token}`

  await sendRetoMundialMagicLink({ email, magicLink })

  return NextResponse.json({ ok: true })
}
