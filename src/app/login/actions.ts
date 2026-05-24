'use server'

import { signIn } from '@/lib/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function loginAction(email: string, password: string, callbackUrl: string) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl,
    })
  } catch (error) {
    // Next.js redirect throws internally — must re-throw so navigation works
    if (isRedirectError(error)) throw error
    // Everything else = bad credentials
    return { error: 'Email o contraseña incorrectos.' }
  }
}
