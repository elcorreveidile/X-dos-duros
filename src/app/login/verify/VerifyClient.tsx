'use client'

import { useEffect, useRef } from 'react'
import { verifyMagicLink } from './actions'

export default function VerifyClient({ token, email, callbackUrl }: { token: string; email: string; callbackUrl?: string }) {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    formRef.current?.requestSubmit()
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <form ref={formRef} action={verifyMagicLink}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
        {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
        <p className="text-muted text-sm uppercase tracking-widest animate-pulse">Verificando enlace…</p>
      </form>
    </div>
  )
}
