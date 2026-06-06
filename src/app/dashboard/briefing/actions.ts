'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendBriefingReceived } from '@/lib/email'
import { redirect } from 'next/navigation'

export async function submitBriefing(data: {
  businessName: string
  businessDescription: string
  targetAudience: string
  desiredFeatures: string
  referenceUrls: string[]
  brandColors: string[]
  logoUrl: string
  deadline: string
  additionalNotes: string
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const project = await prisma.project.findFirst({
    where: { clientId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { client: true },
  })

  if (!project) throw new Error('No se encontró ningún proyecto')

  await prisma.$transaction([
    prisma.briefing.upsert({
      where: { projectId: project.id },
      create: {
        projectId: project.id,
        businessName: data.businessName,
        businessDescription: data.businessDescription,
        targetAudience: data.targetAudience || null,
        desiredFeatures: data.desiredFeatures,
        referenceUrls: data.referenceUrls.filter(Boolean),
        brandColors: data.brandColors.filter(Boolean),
        logoUrl: data.logoUrl || null,
        deadline: data.deadline || null,
        additionalNotes: data.additionalNotes || null,
      },
      update: {
        businessName: data.businessName,
        businessDescription: data.businessDescription,
        targetAudience: data.targetAudience || null,
        desiredFeatures: data.desiredFeatures,
        referenceUrls: data.referenceUrls.filter(Boolean),
        brandColors: data.brandColors.filter(Boolean),
        logoUrl: data.logoUrl || null,
        deadline: data.deadline || null,
        additionalNotes: data.additionalNotes || null,
        submittedAt: new Date(),
      },
    }),
    prisma.project.update({
      where: { id: project.id },
      data: { status: 'BRIEFING' },
    }),
  ])

  try {
    await sendBriefingReceived({
      project,
      client: project.client,
    })
  } catch {
    // email failure doesn't block submission
  }
}
