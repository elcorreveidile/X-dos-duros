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
        const piId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : (session.payment_intent as { id?: string } | null)?.id ?? null
        const uniqueId = piId ?? `session_${session.id}`
        await prisma.payment.upsert({
          where: { stripePaymentId: uniqueId },
          create: {
            projectId,
            amount: (session.amount_total ?? 0) / 100,
            status: 'PAID',
            stripePaymentId: uniqueId,
            paidAt: new Date(),
          },
          update: { status: 'PAID' },
        })

        const project = await prisma.project.findUnique({
          where: { id: projectId },
          include: { client: true },
        })
        if (project) {
          await sendProjectPaymentConfirmed({ project, client: project.client })
        }
      }

      const sessionSubId =
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription?.id ?? null

      if (type === 'subscription' && clientId && sessionSubId) {
        const stripeSub = await stripe.subscriptions.retrieve(sessionSubId)
        const plan = session.metadata?.plan ?? 'basic'

        const price = plan === 'pro' ? 49 : 29

        const existingSub = await prisma.subscription.findFirst({
          where: { clientId },
        })

        const subPeriodEnd = stripeSub.current_period_end ?? null

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              status: 'ACTIVE',
              stripeSubscriptionId: stripeSub.id,
              currentPeriodEnd: subPeriodEnd != null ? new Date(subPeriodEnd * 1000) : null,
              price,
            },
          })
        } else {
          await prisma.subscription.create({
            data: {
              clientId,
              projectId: session.metadata?.projectId || null,
              status: 'ACTIVE',
              stripeSubscriptionId: stripeSub.id,
              currentPeriodEnd: subPeriodEnd != null ? new Date(subPeriodEnd * 1000) : null,
              price,
            },
          })
        }

        const client = await prisma.user.findUnique({ where: { id: clientId } })
        if (client) {
          await sendSubscriptionActivated({ client, plan })
        }
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const invoiceSubId =
        typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id ?? null
      if (invoiceSubId) {
        const stripeSub = await stripe.subscriptions.retrieve(invoiceSubId)
        const periodEnd = stripeSub.current_period_end
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: stripeSub.id },
          data: {
            status: 'ACTIVE',
            ...(periodEnd != null && { currentPeriodEnd: new Date(periodEnd * 1000) }),
          },
        })
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const invoiceSubId =
        typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id ?? null
      if (invoiceSubId) {
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: invoiceSubId },
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
