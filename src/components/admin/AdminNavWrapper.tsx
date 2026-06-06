import { prisma } from '@/lib/db'
import { AdminNav } from './AdminNav'

export async function AdminNavWrapper() {
  let pendingMessages = 0
  try {
    const tickets = await prisma.ticket.findMany({
      where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
      select: {
        messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { isAdmin: true } },
      },
    })
    pendingMessages = tickets.filter((t) => t.messages[0]?.isAdmin === false).length
  } catch {
    // don't block render if DB is unreachable
  }
  return <AdminNav pendingMessages={pendingMessages} />
}
