'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function verifyMagicLink(formData: FormData) {
  const token = formData.get('token') as string | null
  const email = formData.get('email') as string | null

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  // Determine redirect based on role before consuming the token
  const user = await prisma.user.findUnique({ where: { email }, select: { role: true } })
  const redirectTo = user?.role === 'ADMIN' ? '/admin' : '/dashboard'

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo })
  } catch (error) {
    if (isRedirectError(error)) throw error
    redirect('/login?error=expired')
  }
}
