'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, MessageCircle } from 'lucide-react'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34690026370'

interface Props {
  prefilledEmail?: string
  pct?: number
}

export function RetoClient({ prefilledEmail, pct = 0 }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState(prefilledEmail ?? '')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [preference, setPreference] = useState<'secure' | 'risk'>('secure')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const isLoggedIn = !!prefilledEmail
  const pctLabel = pct >= 100 ? '100% GRATIS' : `${pct}%`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reto-mundial/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phone: phone || undefined, company: company || undefined, preference }),
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
      <div className="border border-orange-500/40 bg-orange-500/5 p-8 text-center space-y-4">
        <CheckCircle size={40} className="text-orange-400 mx-auto" />
        <p className="font-black text-lg uppercase tracking-tight">¡Estás dentro!</p>
        <p className="text-muted text-sm max-w-sm mx-auto">
          {isLoggedIn
            ? 'Ya estás apuntado al Reto Mundial. Tu descuento se actualizará con cada victoria de España.'
            : <>Te hemos enviado un enlace mágico a <strong className="text-foreground">{email}</strong>. Ábrelo para acceder a tu área y ver tu descuento actual.</>
          }
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isLoggedIn && (
            <a
              href="/dashboard"
              className="px-6 py-3 bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-colors"
            >
              Ir a mi área
            </a>
          )}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, acabo de apuntarme al Reto Mundial en por2duros.com')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-green-500/40 text-green-400 text-xs uppercase tracking-widest hover:border-green-400 transition-colors font-bold"
          >
            <MessageCircle size={14} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted mb-2">
          Tu nombre <span className="text-orange-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre y apellido"
          className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {!isLoggedIn && (
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted mb-2">
            Email <span className="text-orange-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-orange-500 transition-colors font-mono"
          />
        </div>
      )}

      <div>
        <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-muted mb-2">
          WhatsApp / Teléfono <span className="text-muted">(opcional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+34 600 000 000"
          className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-orange-500 transition-colors font-mono"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-xs uppercase tracking-widest text-muted mb-2">
          Nombre del negocio <span className="text-muted">(opcional)</span>
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Tu bar, tienda, estudio…"
          className="w-full bg-card border border-border px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-3">
          ¿Qué prefieres? <span className="text-orange-400">*</span>
        </p>
        <div className="space-y-2">
          <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${preference === 'secure' ? 'border-orange-500 bg-orange-500/5' : 'border-border hover:border-foreground/40'}`}>
            <input
              type="radio"
              name="preference"
              value="secure"
              checked={preference === 'secure'}
              onChange={() => setPreference('secure')}
              className="mt-0.5 accent-orange-500"
            />
            <div>
              <p className="text-sm font-bold">✅ Asegurar mi web con el {pctLabel} ahora</p>
              <p className="text-xs text-muted mt-0.5">Me llevo el descuento actual, sin riesgo.</p>
            </div>
          </label>
          <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${preference === 'risk' ? 'border-orange-500 bg-orange-500/5' : 'border-border hover:border-foreground/40'}`}>
            <input
              type="radio"
              name="preference"
              value="risk"
              checked={preference === 'risk'}
              onChange={() => setPreference('risk')}
              className="mt-0.5 accent-orange-500"
            />
            <div>
              <p className="text-sm font-bold">🎲 Arriesgarme al siguiente partido</p>
              <p className="text-xs text-muted mt-0.5">Si España gana, el descuento sube. Si pierde, vuelve a 0%.</p>
            </div>
          </label>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !name || !email}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-400 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Apuntando…
          </>
        ) : (
          'Apuntarme al Reto'
        )}
      </button>

      {!isLoggedIn && (
        <p className="text-xs text-muted text-center">
          Sin spam. Sin contraseña. Sin compromiso.
        </p>
      )}
    </form>
  )
}
