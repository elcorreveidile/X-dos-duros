import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  projectId: z.string(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const project = await prisma.project.findUnique({
    where: { id: parsed.data.projectId },
    include: { client: true },
  })

  if (!project) {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }

  if (project.price <= 0) {
    return NextResponse.json({ error: 'Este proyecto no tiene coste' }, { status: 400 })
  }

  if (session.user.role !== 'ADMIN' && project.clientId !== session.user.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: project.client.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(project.price * 100),
          product_data: {
            name: project.name,
            description: `Desarrollo web — Por 2 Duros`,
          },
        },
      },
    ],
    metadata: {
      projectId: project.id,
      clientId: project.clientId,
      type: 'project_payment',
    },
    allow_promotion_codes: true,
    success_url: `${appUrl}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/dashboard?payment=cancelled`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
