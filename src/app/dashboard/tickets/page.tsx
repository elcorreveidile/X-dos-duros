export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { TicketSystem } from '@/components/dashboard/TicketSystem'
import { redirect } from 'next/navigation'

export default async function TicketsPage() {
  const session = await auth()

  const project = await prisma.project.findFirst({
    where: { clientId: session!.user!.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  })

  if (!project) redirect('/dashboard')

  return (
    <div className="max-w-3xl">
      <TicketSystem projectId={project.id} />
    </div>
  )
}
