import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')
  if (token !== process.env.SETUP_TOKEN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const hash = await bcrypt.hash('Admin1234!', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@por2duros.com' },
    update: { password: hash, role: 'ADMIN' },
    create: {
      email: 'admin@por2duros.com',
      name: 'Admin',
      password: hash,
      role: 'ADMIN',
    },
  })

  return NextResponse.json({ ok: true, email: user.email })
}
