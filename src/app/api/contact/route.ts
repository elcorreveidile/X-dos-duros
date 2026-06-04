import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'
import { sendContactNotification, sendContactConfirmation, sendClientMagicAccess } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  projectType: z.string(),
  description: z.string().min(10),
  budget: z.string().optional(),
  verificationCode: z.string().length(6),
})

const PROJECT_TYPE_LABELS: Record<string, string> = {
  landing: 'Landing Page',
  ecommerce: 'E-commerce',
  mvp: 'MVP Web App',
  custom: 'App a medida',
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

async function createMagicLink(email: string) {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  await prisma.verificationToken.create({ data: { identifier: email, token, expires } })
  return `${APP_URL}/login/verify?email=${encodeURIComponent(email)}&token=${token}`
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { verificationCode, ...data } = parsed.data
  const identifier = `contact:${data.email}`

  const record = await prisma.verificationToken.findFirst({
    where: { identifier, token: verificationCode },
  })

  if (!record || record.expires < new Date()) {
    return NextResponse.json({ error: 'Código incorrecto o caducado' }, { status: 422 })
  }

  await prisma.verificationToken.deleteMany({ where: { identifier } })

  // Create or find client account
  let user = await prisma.user.findUnique({ where: { email: data.email } })
  let isNewClient = false

  if (!user) {
    isNewClient = true
    user = await prisma.user.create({
      data: { name: data.name, email: data.email, role: 'CLIENT' },
    })
  }

  // Create LEAD project
  const typeLabel = PROJECT_TYPE_LABELS[data.projectType] ?? data.projectType
  const projectName = `${typeLabel} — ${data.name}`

  await prisma.project.create({
    data: { name: projectName, description: data.description, price: 0, clientId: user.id, status: 'LEAD' },
  })

  // Send emails
  const emails: Promise<unknown>[] = [
    sendContactNotification(data),
    sendContactConfirmation({ name: data.name, email: data.email }),
  ]

  if (isNewClient) {
    const magicLink = await createMagicLink(data.email)
    emails.push(sendClientMagicAccess({ name: data.name, email: data.email, magicLink }))
  }

  await Promise.all(emails)

  return NextResponse.json({ success: true }, { status: 201 })
}
