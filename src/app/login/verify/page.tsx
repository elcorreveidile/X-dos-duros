'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AuthError } from 'next-auth'

interface Props {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  console.log('[verify] received email=%s token=%s', email, token ? token.slice(0, 8) + '...' : 'MISSING')

  if (!token || !email) {
    console.log('[verify] missing token or email → invalid')
    redirect('/login?error=invalid')
  }

  const now = new Date()
  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token },
  })

  console.log('[verify] db lookup: found=%s expires=%s now=%s', !!record, record?.expires?.toISOString(), now.toISOString())

  if (!record || record.expires < now) {
    console.log('[verify] token not found or expired → expired')
    redirect('/login?error=expired')
  }

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo: '/dashboard' })
  } catch (error) {
    // AuthError = NextAuth auth failure (wrong credentials, token not found in provider, etc.)
    // Non-AuthError = typically a Next.js NEXT_REDIRECT (success redirect) — must re-throw
    if (error instanceof AuthError) {
      console.log('[verify] AuthError from signIn: %s', (error as AuthError).type)
      redirect('/login?error=expired')
    }
    throw error
  }
}
