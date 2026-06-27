import type { Metadata } from 'next'
import { createHmac, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/db'
import { Navbar } from '@/components/landing/Navbar'
import MundialClient from './MundialClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const ALLOWED_PCT = new Set([10, 15, 20, 80, 100])

function verifyCoupon(code: string, pctRaw: string, sig: string) {
  const pct = Number(pctRaw)
  if (!code || !ALLOWED_PCT.has(pct) || !sig) return null
  const secret = process.env.MUNDIAL_COUPON_SECRET
  if (!secret) return null
  const expected = createHmac('sha256', secret)
    .update(`${code}.${pct}`)
    .digest('hex')
  try {
    const a = Buffer.from(sig, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  return { code, pct }
}

function InvalidPage({ message }: { message: string }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen grid-bg flex items-center justify-center px-4 pt-16">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-8 font-black text-muted/20">?</div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
            {message}
          </h1>
          <p className="text-muted text-sm">
            Si crees que es un error, contacta con nosotros en{' '}
            <a href="mailto:hola@por2duros.com" className="text-neon hover:underline">
              hola@por2duros.com
            </a>
          </p>
        </div>
      </main>
    </>
  )
}

export default async function MundialPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; pct?: string; sig?: string; email?: string }>
}) {
  const { code = '', pct: pctRaw = '', sig = '', email = '' } = await searchParams

  const coupon = verifyCoupon(code, pctRaw, sig)
  if (!coupon) {
    return <InvalidPage message="Cupón no válido" />
  }

  // Soft check — real enforcement is in the API
  const existing = await prisma.mundialCoupon.findUnique({ where: { code } })
  if (existing?.redeemedAt) {
    return <InvalidPage message="Este cupón ya ha sido canjeado" />
  }

  // Save lead email on first visit (email not signed — only used as contact, pct is already verified)
  const leadEmail = email.includes('@') ? email : undefined
  if (leadEmail) {
    await prisma.mundialCoupon.upsert({
      where: { code },
      create: { code, pct: coupon.pct, email: leadEmail },
      update: existing ? {} : { email: leadEmail },
    })
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <MundialClient code={coupon.code} pct={coupon.pct} sig={sig} leadEmail={leadEmail} />
      </main>
    </>
  )
}
