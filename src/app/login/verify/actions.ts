'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function verifyMagicLink(formData: FormData) {
  const token = formData.get('token') as string | null
  const email = formData.get('email') as string | null
  const rawCallback = formData.get('callbackUrl') as string | null

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  const user = await prisma.user.findUnique({ where: { email }, select: { role: true } })

  // Only allow internal relative paths starting with /dashboard or /admin
  const safeCallback =
    rawCallback && /^\/dashboard/.test(rawCallback) ? rawCallback : null

  const redirectTo = safeCallback ?? (user?.role === 'ADMIN' ? '/admin' : '/dashboard')

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo })
  } catch (error) {
    if (isRedirectError(error)) throw error
    redirect('/login?error=expired')
  }
}
