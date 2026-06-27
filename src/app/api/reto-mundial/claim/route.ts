import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { getMundialRetoPct } from '@/lib/espanias'
import { z } from 'zod'

const PRODUCTS = {
  landing: { label: 'Landing Page', price: 297 },
  mvp: { label: 'MVP Web App', price: 797 },
  ecommerce: { label: 'E-commerce', price: 497 },
} as const

type ProductKey = keyof typeof PRODUCTS

const schema = z.object({
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

  // Verify user is a reto participant
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { retoMundial: true, email: true },
  })
  if (!user?.retoMundial) {
    return NextResponse.json({ error: 'No estás inscrito en el Reto Mundial' }, { status: 403 })
  }

  // Fetch pct server-side — cannot be tampered by client
  const retoStatus = await getMundialRetoPct()
  const pct = retoStatus.pct

  if (pct === 0) {
    return NextResponse.json({ error: 'El descuento aún no está disponible' }, { status: 400 })
  }

  const { product } = parsed.data
  const prod = PRODUCTS[product as ProductKey]
  const discountedPrice = pct >= 100 ? 0 : Math.round(prod.price * (1 - pct / 100))

  // Create project
  const project = await prisma.project.create({
    data: {
      name: `${prod.label} — Reto Mundial`,
      description: `Proyecto del Reto Mundial 2026 (${pct}% descuento, ${retoStatus.wins} victorias de España)`,
      price: discountedPrice,
      clientId: session.user.id,
      status: 'LEAD',
    },
  })

  // Mark user as no longer a reto participant (one-time claim)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { retoMundial: false },
  })

  // Free project
  if (discountedPrice === 0) {
    await prisma.payment.create({
      data: { projectId: project.id, amount: 0, status: 'PAID', paidAt: new Date() },
    })
    return NextResponse.json({ ok: true })
  }

  // Paid project — Stripe checkout
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: user.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: discountedPrice * 100,
          product_data: {
            name: `${prod.label} — Por 2 Duros (Reto Mundial -${pct}%)`,
            description: `Precio especial Reto Mundial 2026. Descuento ${pct}% aplicado.`,
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
