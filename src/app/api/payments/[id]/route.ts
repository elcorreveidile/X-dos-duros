import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateSchema = z.object({
  status: z.enum(['PAID', 'FAILED', 'REFUNDED', 'PENDING']),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { status } = parsed.data
  const payment = await prisma.payment.update({
    where: { id },
    data: {
      status,
      paidAt: status === 'PAID' ? new Date() : undefined,
    },
  })

  return NextResponse.json(payment)
}
