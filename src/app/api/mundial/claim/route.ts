import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const PRODUCTS = {
  landing: { label: 'Landing Page' },
  mvp: { label: 'MVP Web App' },
  ecommerce: { label: 'E-commerce' },
} as const

type ProductKey = keyof typeof PRODUCTS

const schema = z.object({
  couponCode: z.string().min(1),
  product: z.enum(['landing', 'mvp', 'ecommerce']),
})

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

  // Create project — price is 0 until admin sets it after reviewing the briefing
  const project = await prisma.project.create({
    data: {
      name: `${prod.label} — Mundial`,
      description: `Premio Mundial 2026: ${coupon.pct}% de descuento (cupón ${couponCode}). Precio pendiente de briefing.`,
      price: 0,
      clientId: session.user.id,
      status: 'LEAD',
    },
  })

  // Mark coupon as redeemed
  await prisma.mundialCoupon.update({
    where: { code: couponCode },
    data: { redeemedAt: new Date(), projectId: project.id, userId: session.user.id },
  })

  return NextResponse.json({ ok: true })
}
