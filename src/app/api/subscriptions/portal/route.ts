import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function POST() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findFirst({
    where: { clientId: session.user.id, status: 'ACTIVE' },
  })

  if (!subscription?.stripeSubscriptionId) {
    return NextResponse.json({ error: 'Sin suscripción activa' }, { status: 404 })
  }

  const stripeSub = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeSub.customer as string,
    return_url: `${appUrl}/dashboard/suscripcion`,
  })

  return NextResponse.json({ url: portalSession.url })
}
