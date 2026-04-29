'use server'

import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function loginAction(email: string, password: string, callbackUrl: string) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Email o contraseña incorrectos.' }
    }
    // signIn throws a redirect, which is normal — re-throw it
    throw error
  }
}
