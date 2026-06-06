'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sendProjectStatusChanged } from '@/lib/email'
import type { ProjectStatus } from '@/types'

export async function updateProject(
  projectId: string,
  data: {
    status?: ProjectStatus
    price?: number
    timerDeadline?: string | null
    demoUrl?: string | null
  }
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  const current = await prisma.project.findUnique({
    where: { id: projectId },
    include: { client: true },
  })
  if (!current) throw new Error('Proyecto no encontrado')

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...(data.status !== undefined && { status: data.status }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.timerDeadline !== undefined && {
        timerDeadline: data.timerDeadline ? new Date(data.timerDeadline) : null,
      }),
      ...(data.demoUrl !== undefined && { demoUrl: data.demoUrl || null }),
    },
  })

  if (data.status && data.status !== current.status && current.client) {
    try {
      await sendProjectStatusChanged({
        project: updated as Parameters<typeof sendProjectStatusChanged>[0]['project'],
        client: current.client,
        oldStatus: current.status,
        newStatus: data.status,
      })
    } catch {}
  }

  revalidatePath(`/admin/proyectos/${projectId}`)
  revalidatePath('/admin/proyectos')
  revalidatePath('/admin')
}

export async function recordManualPayment(projectId: string, amount: number) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) throw new Error('Proyecto no encontrado')

  await prisma.payment.create({
    data: {
      projectId,
      amount,
      status: 'PAID',
      paidAt: new Date(),
    },
  })

  revalidatePath(`/admin/proyectos/${projectId}`)
  revalidatePath('/admin/pagos')
  revalidatePath('/admin/clientes')
}
