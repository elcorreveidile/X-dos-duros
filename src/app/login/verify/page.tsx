import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

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
  } catch (error) {
    if (isRedirectError(error)) throw error
    redirect('/login?error=expired')
  }
}
