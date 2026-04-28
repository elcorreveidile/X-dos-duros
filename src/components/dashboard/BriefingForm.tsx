'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, Plus, X, CheckCircle } from 'lucide-react'

export function BriefingForm() {
  const [form, setForm] = useState({
    businessName: '',
    businessDescription: '',
    targetAudience: '',
    desiredFeatures: '',
    referenceUrls: [''],
    brandColors: ['#39FF14'],
    deadline: '',
    additionalNotes: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const addUrl = () => setForm((f) => ({ ...f, referenceUrls: [...f.referenceUrls, ''] }))
  const removeUrl = (i: number) =>
    setForm((f) => ({ ...f, referenceUrls: f.referenceUrls.filter((_, idx) => idx !== i) }))
  const updateUrl = (i: number, val: string) =>
    setForm((f) => ({
      ...f,
      referenceUrls: f.referenceUrls.map((u, idx) => (idx === i ? val : u)),
    }))

  const addColor = () => setForm((f) => ({ ...f, brandColors: [...f.brandColors, '#000000'] }))
  const removeColor = (i: number) =>
    setForm((f) => ({ ...f, brandColors: f.brandColors.filter((_, idx) => idx !== i) }))
  const updateColor = (i: number, val: string) =>
    setForm((f) => ({
      ...f,
      brandColors: f.brandColors.map((c, idx) => (idx === i ? val : c)),
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-neon bg-neon/5 p-12 flex flex-col items-center gap-4 text-center animate-fade-in">
        <CheckCircle size={40} className="text-neon" />
        <h3 className="text-xl font-bold uppercase">Briefing enviado</h3>
        <p className="text-muted text-sm max-w-sm">
          El equipo ha sido notificado. Revisaremos tu briefing y activaremos el contador de 48h en breve.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Nombre del negocio *</label>
          <input
            className="input"
            placeholder="Ej. Panadería García"
            required
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Fecha límite deseada (opcional)</label>
          <input
            type="date"
            className="input"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">Descripción del negocio *</label>
        <textarea
          className="input min-h-[100px] resize-none"
          placeholder="¿Qué hace tu empresa? ¿A qué se dedica?"
          required
          value={form.businessDescription}
          onChange={(e) => setForm({ ...form, businessDescription: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Público objetivo</label>
        <input
          className="input"
          placeholder="Ej. Mujeres de 25-45 años interesadas en moda sostenible"
          value={form.targetAudience}
          onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Funcionalidades deseadas *</label>
        <textarea
          className="input min-h-[120px] resize-none"
          placeholder="Lista las funcionalidades que necesitas. Ej: formulario de contacto, galería de fotos, pasarela de pago, área privada..."
          required
          value={form.desiredFeatures}
          onChange={(e) => setForm({ ...form, desiredFeatures: e.target.value })}
        />
      </div>

      <div>
        <label className="label">URLs de referencia (webs que te gustan)</label>
        <div className="space-y-2">
          {form.referenceUrls.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="url"
                className="input flex-1"
                placeholder="https://ejemplo.com"
                value={url}
                onChange={(e) => updateUrl(i, e.target.value)}
              />
              {form.referenceUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUrl(i)}
                  className="border border-border px-3 hover:border-red-400 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addUrl}
            className="flex items-center gap-2 text-muted hover:text-neon text-xs uppercase tracking-wider transition-colors"
          >
            <Plus size={12} />
            Añadir URL
          </button>
        </div>
      </div>

      <div>
        <label className="label">Colores de marca</label>
        <div className="flex flex-wrap gap-3">
          {form.brandColors.map((color, i) => (
            <div key={i} className="flex items-center gap-2 border border-border px-3 py-2">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="w-8 h-8 cursor-pointer bg-transparent border-0"
              />
              <span className="mono text-xs text-muted">{color}</span>
              {form.brandColors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColor(i)}
                  className="text-muted hover:text-red-400 transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addColor}
            className="flex items-center gap-2 border border-border px-3 py-2 text-muted hover:border-neon hover:text-neon transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Logo upload area */}
      <div>
        <label className="label">Logo (próximamente)</label>
        <div className="border border-dashed border-border p-8 flex flex-col items-center gap-2 text-center opacity-50 cursor-not-allowed">
          <Upload size={24} className="text-muted" />
          <span className="text-muted text-sm">Arrastra tu logo aquí (PNG, SVG, PDF)</span>
          <span className="text-xs text-muted">Disponible próximamente</span>
        </div>
      </div>

      <div>
        <label className="label">Notas adicionales</label>
        <textarea
          className="input min-h-[100px] resize-none"
          placeholder="Cualquier detalle extra que quieras que sepamos..."
          value={form.additionalNotes}
          onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        Enviar briefing
      </Button>
    </form>
  )
}
