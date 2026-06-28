import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual, randomBytes } from 'crypto'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const ALLOWED_PCT = new Set([10, 15, 20, 80, 100])
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://por2duros.com'

const PRODUCTS = {
  landing: { label: 'Landing Page', price: 297 },
  mvp: { label: 'MVP Web App', price: 797 },
  ecommerce: { label: 'E-commerce', price: 497 },
} as const

type ProductKey = keyof typeof PRODUCTS

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
  product: z.enum(['landing', 'mvp', 'ecommerce']),
  name: z.string().min(2).max(100),
  email: z.string().email(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { code, pct: pctRaw, sig, product, name, email } = parsed.data

  const coupon = verifyCoupon(code, pctRaw, sig)
  if (!coupon) {
    return NextResponse.json({ error: 'Cupón no válido' }, { status: 400 })
  }

  const { pct } = coupon
  const prod = PRODUCTS[product as ProductKey]
  const discountedPrice = Math.round(prod.price * (1 - pct / 100))

  // Atomic: create coupon if not exists, fail if already redeemed
  const existing = await prisma.mundialCoupon.findUnique({ where: { code } })
  if (existing?.redeemedAt) {
    return NextResponse.json({ error: 'Este cupón ya ha sido canjeado' }, { status: 409 })
  }

  // Create or find user
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({
      data: { name, email, role: 'CLIENT' },
    })
  }

  // Create project
  const project = await prisma.project.create({
    data: {
      name: `${prod.label} — Mundial`,
      description: `Proyecto ganado con cupón Mundial ${code} (${pct}% descuento)`,
      price: discountedPrice,
      clientId: user.id,
      status: 'LEAD',
    },
  })

  // Mark coupon as redeemed
  await prisma.mundialCoupon.upsert({
    where: { code },
    create: { code, pct, email, projectId: project.id, redeemedAt: new Date() },
    update: { email, projectId: project.id, redeemedAt: new Date() },
  })

  // Generate magic link
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })
  const magicLink = `${APP_URL}/login/verify?email=${encodeURIComponent(email)}&token=${token}`

  // Free project
  if (pct === 100) {
    await prisma.payment.create({
      data: { projectId: project.id, amount: 0, status: 'PAID', paidAt: new Date() },
    })
    return NextResponse.json({ type: 'free', magicLink })
  }

  // Paid project — create Stripe checkout with discounted price
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: discountedPrice * 100,
          product_data: {
            name: `${prod.label} — Por 2 Duros (Mundial -${pct}%)`,
            description: `Precio especial Mundial. Descuento ${pct}% aplicado.`,
          },
        },
      },
    ],
    metadata: { projectId: project.id, clientId: user.id, type: 'project_payment' },
    success_url: `${APP_URL}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/mundial?code=${code}&pct=${pct}&sig=${sig}`,
  })

  return NextResponse.json({ type: 'paid', stripeUrl: checkoutSession.url, magicLink })
}
