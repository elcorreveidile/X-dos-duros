import { redirect } from 'next/navigation'
import VerifyClient from './VerifyClient'

interface Props {
  searchParams: Promise<{ token?: string; email?: string; callbackUrl?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token, email, callbackUrl } = await searchParams
  if (!token || !email) redirect('/login?error=invalid')
  return <VerifyClient token={token} email={email} callbackUrl={callbackUrl} />
}
