import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual, randomBytes } from 'crypto'
import { prisma } from '@/lib/db'
import { sendMundialMagicLink } from '@/lib/email'
import { z } from 'zod'

const ALLOWED_PCT = new Set([10, 15, 20, 80, 100])
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://por2duros.com'

function verifyCoupon(code: string, pctRaw: string, sig: string) {
  const pct = Number(pctRaw)
  if (!code || !ALLOWED_PCT.has(pct) || !sig) return null
  const secret = process.env.MUNDIAL_COUPON_SECRET
  if (!secret) return null
  const expected = createHmac('sha256', secret)
    .update(`${code}.${pct}`)
    .digest('hex')
  try {
    const a = Buffer.from(sig, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  return { code, pct }
}

const schema = z.object({
  code: z.string().min(1),
  pct: z.string(),
  sig: z.string().min(1),
  email: z.string().email(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { code, pct: pctRaw, sig, email } = parsed.data

  const coupon = verifyCoupon(code, pctRaw, sig)
  if (!coupon) {
    return NextResponse.json({ error: 'Cupón no válido' }, { status: 400 })
  }

  // Check already redeemed
  const existing = await prisma.mundialCoupon.findUnique({ where: { code } })
  if (existing?.redeemedAt) {
    return NextResponse.json({ error: 'Este cupón ya ha sido canjeado' }, { status: 409 })
  }

  // Create or find user
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({
      data: { name: email.split('@')[0], email, role: 'CLIENT' },
    })
  }

  // Upsert coupon as lead with userId
  await prisma.mundialCoupon.upsert({
    where: { code },
    create: { code, pct: coupon.pct, email, userId: user.id },
    update: { email, userId: user.id },
  })

  // Generate magic link → dashboard
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })
  const magicLink = `${APP_URL}/login/verify?email=${encodeURIComponent(email)}&token=${token}&callbackUrl=${encodeURIComponent('/dashboard')}`

  await sendMundialMagicLink({ email, pct: coupon.pct, magicLink })

  return NextResponse.json({ ok: true })
}
