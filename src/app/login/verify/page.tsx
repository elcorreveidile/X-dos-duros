'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'

interface Props {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  // Verify token exists and is not expired before calling signIn
  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token },
  })

  if (!record || record.expires < new Date()) {
    redirect('/login?error=expired')
  }

  // Token is valid — signIn will throw NEXT_REDIRECT on success, let it propagate
  try {
    await signIn('credentials', { email, magicToken: token, redirectTo: '/dashboard' })
  } catch (error) {
    const digest = (error as { digest?: string }).digest
    if (digest?.startsWith('NEXT_REDIRECT')) throw error
    redirect('/login?error=expired')
  }
}
