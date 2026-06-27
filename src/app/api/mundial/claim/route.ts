import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const PRODUCTS = {
  landing: { label: 'Landing Page', price: 297 },
  mvp: { label: 'MVP Web App', price: 797 },
  ecommerce: { label: 'E-commerce', price: 497 },
} as const

type ProductKey = keyof typeof PRODUCTS

const schema = z.object({
  couponCode: z.string().min(1),
  product: z.enum(['landing', 'mvp', 'ecommerce']),
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://por2duros.com'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { couponCode, product } = parsed.data

  // Find coupon and verify it belongs to this user
  const coupon = await prisma.mundialCoupon.findUnique({ where: { code: couponCode } })
  if (!coupon) {
    return NextResponse.json({ error: 'Cupón no encontrado' }, { status: 404 })
  }
  if (coupon.redeemedAt) {
    return NextResponse.json({ error: 'Este cupón ya ha sido canjeado' }, { status: 409 })
  }
  if (coupon.userId && coupon.userId !== session.user.id) {
    return NextResponse.json({ error: 'Cupón no válido para este usuario' }, { status: 403 })
  }

  const prod = PRODUCTS[product as ProductKey]
  const discountedPrice = Math.round(prod.price * (1 - coupon.pct / 100))

  // Create project
  const project = await prisma.project.create({
    data: {
      name: `${prod.label} — Mundial`,
      description: `Proyecto ganado con cupón Mundial ${couponCode} (${coupon.pct}% descuento)`,
      price: discountedPrice,
      clientId: session.user.id,
      status: 'LEAD',
    },
  })

  // Mark coupon as redeemed
  await prisma.mundialCoupon.update({
    where: { code: couponCode },
    data: { redeemedAt: new Date(), projectId: project.id, userId: session.user.id },
  })

  // Free project
  if (coupon.pct === 100) {
    await prisma.payment.create({
      data: { projectId: project.id, amount: 0, status: 'PAID', paidAt: new Date() },
    })
    return NextResponse.json({ ok: true })
  }

  // Paid project — Stripe checkout
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: session.user.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: discountedPrice * 100,
          product_data: {
            name: `${prod.label} — Por 2 Duros (Mundial -${coupon.pct}%)`,
            description: `Precio especial Mundial 2026. Descuento ${coupon.pct}% aplicado.`,
          },
        },
      },
    ],
    metadata: { projectId: project.id, clientId: session.user.id, type: 'project_payment' },
    success_url: `${APP_URL}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/dashboard`,
  })

  return NextResponse.json({ stripeUrl: checkoutSession.url })
}
