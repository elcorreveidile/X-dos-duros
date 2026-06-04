import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  projectType: z.string(),
  description: z.string().min(10),
  budget: z.string().optional(),
  verificationCode: z.string().length(6),
})

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

  await Promise.all([
    sendContactNotification(data),
    sendContactConfirmation({ name: data.name, email: data.email }),
  ])

  return NextResponse.json({ success: true }, { status: 201 })
}
