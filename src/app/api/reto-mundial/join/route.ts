import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db'
import { sendRetoMundialMagicLink } from '@/lib/email'
import { getMundialRetoPct } from '@/lib/espanias'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  preference: z.enum(['secure', 'risk']),
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://por2duros.com'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { email, name, phone, company, preference } = parsed.data

  // Get current pct to record at join time
  let pctAtJoin = 0
  try {
    const reto = await getMundialRetoPct()
    pctAtJoin = reto.pct
  } catch {
    // non-fatal: record 0 if API is unavailable
  }

  // Save lead with timestamp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).retoMundialLead.create({
    data: { email, name, phone, company, preference, pctAtJoin },
  })

  // Upsert user and mark as reto participant
  await prisma.user.upsert({
    where: { email },
    create: { name, email, phone, company, role: 'CLIENT', retoMundial: true },
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
