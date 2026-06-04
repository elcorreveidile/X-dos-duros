'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

export function NewProjectForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    projectName: '',
    projectDescription: '',
    price: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<{ isNewClient: boolean; projectId: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al crear el proyecto')
        return
      }
      setDone({ isNewClient: data.isNewClient, projectId: data.project.id })
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="border border-neon bg-neon/5 p-12 flex flex-col items-center gap-4 text-center">
        <CheckCircle size={40} className="text-neon" />
        <h2 className="text-xl font-black uppercase">¡Proyecto creado!</h2>
        {done.isNewClient ? (
          <p className="text-muted text-sm max-w-sm">
            Se ha creado la cuenta del cliente y se le ha enviado un email con sus credenciales de acceso.
          </p>
        ) : (
          <p className="text-muted text-sm max-w-sm">
            El proyecto se ha añadido al cliente existente.
          </p>
        )}
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-2 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/90 transition-colors"
          >
            Ver Kanban
          </button>
          <button
            onClick={() => { setDone(null); setForm({ clientName: '', clientEmail: '', projectName: '', projectDescription: '', price: '' }) }}
            className="px-6 py-2 border border-border text-muted font-bold text-xs uppercase tracking-widest hover:border-neon/40 transition-colors"
          >
            Crear otro
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-sm">{error}</div>
      )}

      {/* Cliente */}
      <div className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-neon font-bold border-b border-neon/20 pb-2">
          Datos del cliente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Nombre</label>
            <input
              className="input"
              placeholder="Nombre completo"
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="cliente@email.com"
              required
              value={form.clientEmail}
              onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
            />
          </div>
        </div>
        <p className="text-muted text-xs">
          Si el email ya existe en el sistema, el proyecto se añadirá a ese cliente sin crear una cuenta nueva.
        </p>
      </div>

      {/* Proyecto */}
      <div className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-neon font-bold border-b border-neon/20 pb-2">
          Datos del proyecto
        </h2>
        <div>
          <label className="label">Nombre del proyecto</label>
          <input
            className="input"
            placeholder="Ej: Landing Page Panadería García"
            required
            value={form.projectName}
            onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Descripción <span className="text-muted">(opcional)</span></label>
          <textarea
            className="input min-h-[80px] resize-none"
            placeholder="Notas internas sobre el proyecto..."
            value={form.projectDescription}
            onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
          />
        </div>
        <div className="sm:w-48">
          <label className="label">Precio total (€)</label>
          <input
            type="number"
            className="input"
            placeholder="299"
            required
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading}>
        Crear proyecto y notificar cliente
      </Button>
    </form>
  )
}
