'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

interface Props {
  prefilledEmail?: string
}

export function RetoClient({ prefilledEmail }: Props) {
  const [email, setEmail] = useState(prefilledEmail ?? '')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const isLoggedIn = !!prefilledEmail

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reto-mundial/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al registrarse')
        return
      }
      setDone(true)
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="border border-neon/40 bg-neon/5 p-8 text-center space-y-4">
        <CheckCircle size={40} className="text-neon mx-auto" />
        <p className="font-black text-lg uppercase tracking-tight">¡Estás dentro!</p>
        <p className="text-muted text-sm max-w-sm mx-auto">
          {isLoggedIn
            ? 'Ya estás apuntado al Reto Mundial. Tu descuento se actualizará con cada victoria de España.'
            : <>Te hemos enviado un enlace mágico a <strong>{email}</strong>. Ábrelo para acceder a tu área y ver tu descuento actual.</>
          }
        </p>
        {isLoggedIn && (
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-colors"
          >
            Ir a mi área
          </a>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLoggedIn && (
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted mb-2">
            Tu email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-neon transition-colors font-mono"
          />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || (!isLoggedIn && !email)}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Apuntando...
          </>
        ) : (
          'Apuntarme al Reto'
        )}
      </button>

      {!isLoggedIn && (
        <p className="text-xs text-muted text-center">
          Sin spam. Sin contraseña. Solo el enlace mágico en tu bandeja.
        </p>
      )}
    </form>
  )
}
