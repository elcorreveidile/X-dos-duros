'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

interface Props {
  name: string | null
  email: string
  phone: string | null
  company: string | null
}

export function ProfileForm({ name, email, phone, company }: Props) {
  const [values, setValues] = useState({
    name: name ?? '',
    phone: phone ?? '',
    company: company ?? '',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSaved(false)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al guardar')
        return
      }
      setSaved(true)
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            maxLength={100}
            className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full bg-card border border-border px-4 py-3 text-sm text-muted cursor-not-allowed"
          />
          <p className="text-muted/50 text-xs mt-1">El email no se puede cambiar.</p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            maxLength={30}
            className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon transition-colors"
            placeholder="+34 600 000 000"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2">
            Empresa / Proyecto
          </label>
          <input
            type="text"
            name="company"
            value={values.company}
            onChange={handleChange}
            maxLength={100}
            className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon transition-colors"
            placeholder="Nombre de tu empresa o proyecto"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading || !values.name}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : 'Guardar cambios'}
        </button>
        {saved && (
          <span className="flex items-center gap-2 text-neon text-sm">
            <CheckCircle size={16} />
            Guardado
          </span>
        )}
      </div>
    </form>
  )
}
