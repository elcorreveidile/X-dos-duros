import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET(req: Request) {
  try {
    const token = new URL(req.url).searchParams.get('token')
    if (token !== process.env.SETUP_TOKEN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Generate fresh hash and update user
    const hash = await bcrypt.hash('Admin1234!', 12)
    const user = await prisma.user.upsert({
      where: { email: 'informa@blablaele.com' },
      update: { password: hash, role: 'ADMIN' },
      create: {
        email: 'informa@blablaele.com',
        name: 'Admin',
        password: hash,
        role: 'ADMIN',
      },
    })

    // Verify the hash works
    const verify = await bcrypt.compare('Admin1234!', user.password!)

    return NextResponse.json({
      ok: true,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password,
      passwordVerifies: verify,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
