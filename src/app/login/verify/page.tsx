'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'

interface Props {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo: '/dashboard' })
  } catch {
    redirect('/login?error=expired')
  }
}
