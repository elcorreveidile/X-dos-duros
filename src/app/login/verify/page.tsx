import { redirect } from 'next/navigation'
import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

interface Props {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  if (!token || !email) {
    redirect('/login?error=invalid')
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { role: true },
  })
  const redirectTo = user?.role === 'ADMIN' ? '/admin' : '/dashboard'

  try {
    await signIn('credentials', { email, magicToken: token, redirectTo })
  } catch (error) {
    if (isRedirectError(error)) throw error
    redirect('/login?error=expired')
  }
}
