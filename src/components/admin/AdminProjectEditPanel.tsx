'use client'

import { useState, useTransition } from 'react'
import { updateProject } from '@/app/admin/proyectos/[id]/actions'
import type { ProjectStatus } from '@/types'
import { Check, Loader2 } from 'lucide-react'

const STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'LEAD', label: 'Lead' },
  { value: 'BRIEFING', label: 'Briefing' },
  { value: 'DEVELOPMENT', label: 'Desarrollo' },
  { value: 'REVIEW', label: 'Revisión' },
  { value: 'DELIVERED', label: 'Entregado' },
  { value: 'CANCELLED', label: 'Cancelado' },
]

interface Props {
  projectId: string
  currentStatus: ProjectStatus
  currentPrice: number
  currentDeadline: string | null
  currentDemoUrl: string | null
}

export function AdminProjectEditPanel({
  projectId,
  currentStatus,
  currentPrice,
  currentDeadline,
  currentDemoUrl,
}: Props) {
  const [status, setStatus] = useState<ProjectStatus>(currentStatus)
  const [price, setPrice] = useState(String(currentPrice))
  const [deadline, setDeadline] = useState(currentDeadline ? currentDeadline.slice(0, 16) : '')
  const [demoUrl, setDemoUrl] = useState(currentDemoUrl ?? '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSave = () => {
    setError('')
    startTransition(async () => {
      try {
        await updateProject(projectId, {
          status,
          price: parseFloat(price) || 0,
          timerDeadline: deadline || null,
          demoUrl: demoUrl || null,
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al guardar')
      }
    })
  }

  const dirty =
    status !== currentStatus ||
    parseFloat(price) !== currentPrice ||
    (deadline || null) !== (currentDeadline ? currentDeadline.slice(0, 16) : null) ||
    (demoUrl || null) !== currentDemoUrl

  return (
    <section className="border border-border p-5 space-y-5">
      <h2 className="text-xs uppercase tracking-widest text-muted font-bold">Editar proyecto</h2>

      {/* Status */}
      <div>
        <p className="label mb-2">Estado</p>
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStatus(s.value)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-colors ${
                status === s.value
                  ? 'border-neon text-neon bg-neon/10'
                  : 'border-border text-muted hover:border-neon/40 hover:text-foreground'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {status !== currentStatus && (
          <p className="text-xs text-yellow-400 mt-1.5">
            El cliente recibirá un email con la actualización de estado.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label className="label">Precio (€)</label>
          <input
            type="number"
            className="input"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Deadline</label>
          <input
            type="datetime-local"
            className="input"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>

      {/* Demo URL */}
      <div>
        <label className="label">URL de demo</label>
        <input
          type="url"
          className="input"
          placeholder="https://..."
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs border border-red-400/30 bg-red-400/5 px-3 py-2">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={isPending || !dirty}
        className={`flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all ${
          saved
            ? 'bg-neon/20 text-neon border border-neon'
            : dirty
            ? 'bg-neon text-background hover:bg-neon/90'
            : 'bg-card text-muted border border-border cursor-not-allowed'
        }`}
      >
        {isPending ? (
          <><Loader2 size={12} className="animate-spin" /> Guardando…</>
        ) : saved ? (
          <><Check size={12} /> Guardado</>
        ) : (
          'Guardar cambios'
        )}
      </button>
    </section>
  )
}
