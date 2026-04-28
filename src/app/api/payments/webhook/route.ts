import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { sendProjectPaymentConfirmed, sendSubscriptionActivated } from '@/lib/email'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook signature missing' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { type, projectId, clientId } = session.metadata ?? {}

      if (type === 'project_payment' && projectId) {
        await prisma.payment.create({
          data: {
            projectId,
            amount: (session.amount_total ?? 0) / 100,
            status: 'PAID',
            stripePaymentId: session.payment_intent as string,
            paidAt: new Date(),
          },
        })

        const project = await prisma.project.findUnique({
          where: { id: projectId },
          include: { client: true },
        })
        if (project) {
          await sendProjectPaymentConfirmed({ project, client: project.client })
        }
      }

      if (type === 'subscription' && clientId && session.subscription) {
        const stripeSub = await stripe.subscriptions.retrieve(session.subscription as string)
        const plan = session.metadata?.plan ?? 'basic'

        const price = plan === 'pro' ? 49 : 29

        await prisma.subscription.upsert({
          where: { clientId_projectId: { clientId, projectId: session.metadata?.projectId || '' } },
          create: {
            clientId,
            projectId: session.metadata?.projectId || null,
            status: 'ACTIVE',
            stripeSubscriptionId: stripeSub.id,
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
            price,
          },
          update: {
            status: 'ACTIVE',
            stripeSubscriptionId: stripeSub.id,
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
          },
        })

        const client = await prisma.user.findUnique({ where: { id: clientId } })
        if (client) {
          await sendSubscriptionActivated({ client, plan })
        }
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      if (invoice.subscription) {
        const stripeSub = await stripe.subscriptions.retrieve(invoice.subscription as string)
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: stripeSub.id },
          data: {
            status: 'ACTIVE',
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
          },
        })
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      if (invoice.subscription) {
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: invoice.subscription as string },
          data: { status: 'PAST_DUE' },
        })
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { status: 'CANCELLED' },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
