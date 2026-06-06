import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { sendPaymentRequest } from '@/lib/email'

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: { client: true },
  })
  if (!project) return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  if (project.price <= 0) return NextResponse.json({ error: 'Este proyecto no tiene coste' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: project.client.email,
    expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24h
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(project.price * 100),
          product_data: {
            name: project.name,
            description: 'Desarrollo web — Por 2 Duros',
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
    success_url: `${appUrl}/dashboard?payment=success`,
    cancel_url: `${appUrl}/dashboard?payment=cancelled`,
  })

  if (!checkoutSession.url) {
    return NextResponse.json({ error: 'No se pudo crear la sesión de pago' }, { status: 500 })
  }

  await sendPaymentRequest({
    project: project as Parameters<typeof sendPaymentRequest>[0]['project'],
    client: project.client as Parameters<typeof sendPaymentRequest>[0]['client'],
    checkoutUrl: checkoutSession.url,
  }).catch(console.error)

  return NextResponse.json({ ok: true, url: checkoutSession.url })
}
