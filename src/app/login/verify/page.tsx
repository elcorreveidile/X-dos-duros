import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

interface Props {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  console.log('[verify] start email=%s token=%s', email, token ? token.slice(0, 8) + '...' : 'MISSING')

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  console.log('[verify] calling signIn')
  try {
    await signIn('credentials', { email, magicToken: token, redirectTo: '/dashboard' })
    // If signIn returns without throwing, do an explicit redirect
    console.log('[verify] signIn returned (no throw) → redirecting to dashboard')
    redirect('/dashboard')
  } catch (error) {
    const isRedirect = isRedirectError(error)
    console.log('[verify] caught: isRedirect=%s digest=%s', isRedirect, (error as { digest?: string }).digest)
    if (isRedirect) throw error
    // Auth error (credentials rejected) → expired
    redirect('/login?error=expired')
  }
}
