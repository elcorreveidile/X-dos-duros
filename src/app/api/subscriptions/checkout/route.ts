import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe, STRIPE_PLANS, type StripePlan } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  plan: z.enum(['basic', 'pro']),
  projectId: z.string().optional(),
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

  const plan = STRIPE_PLANS[parsed.data.plan as StripePlan]
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })

  // Get or create Stripe customer
  let customerId: string | undefined

  const existingSub = await prisma.subscription.findFirst({
    where: { clientId: session.user.id },
  })

  if (existingSub?.stripeSubscriptionId) {
    const stripeSub = await stripe.subscriptions.retrieve(existingSub.stripeSubscriptionId)
    customerId = stripeSub.customer as string
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    customer_email: customerId ? undefined : user.email,
    line_items: [
      {
        price: plan.priceId || undefined,
        // Fallback when price IDs are not configured
        ...(plan.priceId
          ? {}
          : {
              price_data: {
                currency: 'eur',
                recurring: { interval: 'month' },
                unit_amount: plan.amount,
                product_data: { name: plan.name },
              },
            }),
        quantity: 1,
      },
    ],
    metadata: {
      clientId: session.user.id,
      projectId: parsed.data.projectId ?? '',
      plan: parsed.data.plan,
      type: 'subscription',
    },
    subscription_data: {
      trial_period_days: 30,
      metadata: {
        clientId: session.user.id,
        plan: parsed.data.plan,
      },
    },
    success_url: `${appUrl}/dashboard/suscripcion?subscription=success`,
    cancel_url: `${appUrl}/dashboard/suscripcion?subscription=cancelled`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
