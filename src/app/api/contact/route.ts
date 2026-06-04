import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { sendContactNotification, sendContactConfirmation, sendClientWelcome } from '@/lib/email'
import bcrypt from 'bcryptjs'

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

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'P2D-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
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
  let tempPassword: string | null = null

  if (!user) {
    isNewClient = true
    tempPassword = generatePassword()
    const hash = await bcrypt.hash(tempPassword, 10)
    user = await prisma.user.create({
      data: { name: data.name, email: data.email, password: hash, role: 'CLIENT' },
    })
  }

  // Create LEAD project
  const typeLabel = PROJECT_TYPE_LABELS[data.projectType] ?? data.projectType
  const projectName = `${typeLabel} — ${data.name}`

  await prisma.project.create({
    data: {
      name: projectName,
      description: data.description,
      price: 0,
      clientId: user.id,
      status: 'LEAD',
    },
  })

  // Send emails
  const emails: Promise<unknown>[] = [
    sendContactNotification(data),
    sendContactConfirmation({ name: data.name, email: data.email }),
  ]

  if (isNewClient && tempPassword) {
    emails.push(sendClientWelcome({ name: data.name, email: data.email, password: tempPassword }))
  }

  await Promise.all(emails)

  return NextResponse.json({ success: true }, { status: 201 })
}
