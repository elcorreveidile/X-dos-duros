'use client'

import { useState } from 'react'
import { Trophy, CheckCircle, Loader2, Mail } from 'lucide-react'

interface Props {
  code: string
  pct: number
  sig: string
  leadEmail: string
}

export default function MundialClient({ code, pct, sig, leadEmail }: Props) {
  const [email, setEmail] = useState(leadEmail)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const prizeLabel = pct === 100 ? 'WEB GRATIS' : `${pct}% de descuento`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/mundial/send-magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, pct: String(pct), sig, email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al enviar el enlace')
        return
      }
      setSent(true)
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle size={64} className="text-neon mx-auto mb-6" />
          <h1 className="text-4xl font-black uppercase tracking-tighter neon-text mb-4">
            ¡Premio validado!
          </h1>
          <p className="text-muted mb-2">
            Te hemos enviado un enlace a{' '}
            <span className="text-foreground font-mono">{email}</span>
          </p>
          <p className="text-muted text-sm">
            Pulsa el enlace del email para entrar en tu área y elegir tu producto con el{' '}
            <span className="text-neon font-bold">{prizeLabel}</span> aplicado.
          </p>
          <p className="text-muted/50 text-xs mt-6">Revisa también la carpeta de spam. El enlace caduca en 7 días.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Prize header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-neon mb-6">
            <Trophy size={28} className="text-neon" />
          </div>
          <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-6">
            <span className="text-neon text-xs uppercase tracking-widest font-mono">
              Mundial 2026 · Premio validado
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
            {pct === 100 ? (
              <span className="neon-text">Web gratis.</span>
            ) : (
              <><span className="neon-text">{pct}%</span> de descuento.</>
            )}
          </h1>
          <p className="text-muted">
            Confirma tu email y te enviamos el acceso a tu área para elegir y activar tu premio.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2">
              Tu email
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-card border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neon transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            {leadEmail && email !== leadEmail && (
              <p className="text-muted/60 text-xs mt-1">
                Email distinto al original. Asegúrate de que es correcto.
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Enviar enlace de acceso'
            )}
          </button>

          <p className="text-muted/50 text-xs text-center">
            Sin permanencia. Garantía de devolución de 15 días.
          </p>
        </form>
      </div>
    </div>
  )
}
