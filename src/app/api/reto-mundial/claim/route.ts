import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getMundialRetoPct } from '@/lib/espanias'
import { z } from 'zod'

const PRODUCTS = {
  landing: { label: 'Landing Page' },
  mvp: { label: 'MVP Web App' },
  ecommerce: { label: 'E-commerce' },
} as const

type ProductKey = keyof typeof PRODUCTS

const schema = z.object({
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

  // Verify user is a reto participant
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { retoMundial: true },
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

  // Create project — price is 0 until admin sets it after reviewing the briefing
  const project = await prisma.project.create({
    data: {
      name: `${prod.label} — Reto Mundial`,
      description: `Reto Mundial 2026: ${pct}% de descuento (${retoStatus.wins} victorias de España). Precio pendiente de briefing.`,
      price: 0,
      clientId: session.user.id,
      status: 'LEAD',
    },
  })

  // Mark user as no longer a reto participant (one-time claim)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { retoMundial: false },
  })

  return NextResponse.json({ ok: true, projectId: project.id })
}
