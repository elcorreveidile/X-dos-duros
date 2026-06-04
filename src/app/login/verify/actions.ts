'use server'

import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function verifyMagicLink(formData: FormData) {
  const token = formData.get('token') as string | null
  const email = formData.get('email') as string | null

  console.log('[verify-action] email=%s token=%s', email, token ? token.slice(0, 8) + '...' : 'MISSING')

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo: '/dashboard' })
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.log('[verify-action] signIn failed:', error)
    redirect('/login?error=expired')
  }
}
