import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sendClientWelcome } from '@/lib/email'

const schema = z.object({
  clientName: z.string().min(2).max(100),
  clientEmail: z.string().email(),
  projectName: z.string().min(2).max(200),
  projectDescription: z.string().optional(),
  price: z.number().min(0),
})

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'P2D-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
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
  let tempPassword: string | null = null

  if (!user) {
    isNewClient = true
    tempPassword = generatePassword()
    const hash = await bcrypt.hash(tempPassword, 10)
    user = await prisma.user.create({
      data: { name: clientName, email: clientEmail, password: hash, role: 'CLIENT' },
    })
  }

  const project = await prisma.project.create({
    data: {
      name: projectName,
      description: projectDescription,
      price,
      clientId: user.id,
      status: 'LEAD',
    },
  })

  if (isNewClient && tempPassword) {
    await sendClientWelcome({ name: clientName, email: clientEmail, password: tempPassword }).catch(console.error)
  }

  return NextResponse.json({ project, client: user, isNewClient }, { status: 201 })
}
