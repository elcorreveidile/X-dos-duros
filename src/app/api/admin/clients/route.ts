import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import { sendClientMagicAccess } from '@/lib/email'

const schema = z.object({
  clientName: z.string().min(2).max(100),
  clientEmail: z.string().email(),
  projectName: z.string().min(2).max(200),
  projectDescription: z.string().optional(),
  price: z.number().min(0),
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

async function createMagicLink(email: string) {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  await prisma.verificationToken.deleteMany({ where: { identifier: email } })
  await prisma.verificationToken.create({ data: { identifier: email, token, expires } })
  return `${APP_URL}/login/verify?email=${encodeURIComponent(email)}&token=${token}`
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { clientName, clientEmail, projectName, projectDescription, price } = parsed.data

  let user = await prisma.user.findUnique({ where: { email: clientEmail } })
  let isNewClient = false

  if (!user) {
    isNewClient = true
    user = await prisma.user.create({
      data: { name: clientName, email: clientEmail, role: 'CLIENT' },
    })
  }

  const project = await prisma.project.create({
    data: { name: projectName, description: projectDescription, price, clientId: user.id, status: 'LEAD' },
  })

  const magicLink = await createMagicLink(clientEmail)
  await sendClientMagicAccess({ name: clientName, email: clientEmail, magicLink }).catch(console.error)

  return NextResponse.json({ project, client: user, isNewClient }, { status: 201 })
}
