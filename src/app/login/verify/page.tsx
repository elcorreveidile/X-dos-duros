import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

interface Props {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  console.log('[verify] email=%s token=%s', email, token ? token.slice(0, 8) + '...' : 'MISSING')

  if (!token || !email) {
    console.log('[verify] missing params → invalid')
    redirect('/login?error=invalid')
  }

  const now = new Date()
  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token },
  })

  console.log('[verify] db found=%s expires=%s now=%s', !!record, record?.expires?.toISOString(), now.toISOString())

  if (!record || record.expires < now) {
    console.log('[verify] not found or expired → expired')
    redirect('/login?error=expired')
  }

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo: '/dashboard' })
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.log('[verify] signIn error (not redirect):', error)
    redirect('/login?error=expired')
  }
}
