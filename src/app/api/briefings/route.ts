import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { sendBriefingReceived } from '@/lib/email'

const briefingSchema = z.object({
  projectId: z.string(),
  businessName: z.string().min(1).max(200),
  businessDescription: z.string().min(10),
  targetAudience: z.string().optional(),
  desiredFeatures: z.string().min(10),
  referenceUrls: z.array(z.string().url()).default([]),
  brandColors: z.array(z.string()).default([]),
  deadline: z.string().optional(),
  additionalNotes: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json()
  const parsed = briefingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const project = await prisma.project.findUnique({
    where: { id: parsed.data.projectId },
    include: { client: true },
  })
  if (!project) return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })

  if (session.user.role !== 'ADMIN' && project.clientId !== session.user.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const briefing = await prisma.briefing.upsert({
    where: { projectId: parsed.data.projectId },
    create: {
      ...parsed.data,
      referenceUrls: parsed.data.referenceUrls.filter(Boolean),
    },
    update: {
      ...parsed.data,
      referenceUrls: parsed.data.referenceUrls.filter(Boolean),
    },
  })

  if (project.status === 'LEAD') {
    await prisma.project.update({
      where: { id: parsed.data.projectId },
      data: { status: 'BRIEFING' },
    })
    await sendBriefingReceived({ project, client: project.client })
  }

  return NextResponse.json(briefing, { status: 201 })
}
