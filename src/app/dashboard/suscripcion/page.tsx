export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { SubscriptionManager } from '@/components/dashboard/SubscriptionManager'

export default async function SuscripcionPage() {
  const session = await auth()

  const subscription = await prisma.subscription.findFirst({
    where: { clientId: session!.user!.id, status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
  })

  const initialSubscription = subscription
    ? {
        plan: (subscription.price >= 49 ? 'pro' : 'basic') as 'basic' | 'pro',
        price: subscription.price,
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
      }
    : null

  return (
    <div className="max-w-3xl">
      <SubscriptionManager initialSubscription={initialSubscription} />
    </div>
  )
}
