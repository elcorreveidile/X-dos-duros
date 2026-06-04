import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Debug endpoint: checks if a magic-link token exists in DB without consuming it.
// Usage: GET /api/debug/check-token?token=<token>&email=<email>
// Safe to call multiple times — read-only.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) {
    return NextResponse.json({ error: 'token and email params required' }, { status: 400 })
  }

  const now = new Date()

  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token },
  })

  if (!record) {
    // Also count how many tokens exist for this email to help diagnose
    const count = await prisma.verificationToken.count({ where: { identifier: email } })
    return NextResponse.json({ found: false, tokensForEmail: count, now: now.toISOString() })
  }

  return NextResponse.json({
    found: true,
    expired: record.expires < now,
    expires: record.expires.toISOString(),
    now: now.toISOString(),
    msRemaining: record.expires.getTime() - now.getTime(),
  })
}
