'use server'

import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function loginAction(email: string, password: string, callbackUrl: string) {
  try {
    let redirectTo = callbackUrl
    if (callbackUrl === '__role__') {
      const user = await prisma.user.findUnique({ where: { email }, select: { role: true } })
      redirectTo = user?.role === 'ADMIN' ? '/admin' : '/dashboard'
    }
    await signIn('credentials', { email, password, redirectTo })
  } catch (error) {
    if (isRedirectError(error)) throw error
    return { error: 'Email o contraseña incorrectos.' }
  }
}
