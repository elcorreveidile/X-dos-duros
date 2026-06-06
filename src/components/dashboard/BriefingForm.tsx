'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Plus, X, CheckCircle, AlertCircle, Upload, ImageIcon } from 'lucide-react'
import { submitBriefing } from '@/app/dashboard/briefing/actions'

const MAX_FILE_BYTES = 2 * 1024 * 1024 // 2 MB

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
}

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
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<string | null>(null)
  // Object URL for preview only — never stored in React state
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const logoFileRef = useRef<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoError(null)

    if (file.size > MAX_FILE_BYTES) {
      setLogoError(`El archivo pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El máximo es 2 MB.`)
      e.target.value = ''
      return
    }

    // Store the File object in a ref — zero React re-renders
    logoFileRef.current = file
    // Object URL for preview: instant, no base64 encoding
    if (logoPreview) URL.revokeObjectURL(logoPreview)
    setLogoPreview(URL.createObjectURL(file))
  }

  const removeLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview)
    logoFileRef.current = null
    setLogoPreview(null)
    setLogoError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Convert to base64 only at submit time, not on file selection
    let logoUrl = ''
    if (logoFileRef.current) {
      try {
        logoUrl = await readFileAsDataURL(logoFileRef.current)
      } catch {
        setError('No se pudo leer el logo. Prueba sin logo o con otro archivo.')
        setLoading(false)
        return
      }
    }

    try {
      await submitBriefing({ ...form, logoUrl })
      setSubmitted(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el briefing. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
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
      {error && (
        <div className="border border-red-400/40 bg-red-400/5 p-4 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          {error}
        </div>
      )}

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

      <div>
        <label className="label">Logo (opcional)</label>
        {logoPreview ? (
          <div className="border border-neon/40 bg-neon/5 p-4 flex items-center gap-4">
            {logoFileRef.current?.type.startsWith('image/') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoPreview} alt="Logo preview" className="h-16 w-auto object-contain bg-white p-1" />
            ) : (
              <div className="flex items-center gap-2 text-muted">
                <ImageIcon size={32} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neon font-bold uppercase tracking-widest">Logo cargado</p>
              <p className="text-muted text-xs truncate mt-0.5">{logoFileRef.current?.name}</p>
            </div>
            <button
              type="button"
              onClick={removeLogo}
              className="text-muted hover:text-red-400 transition-colors flex-shrink-0"
              aria-label="Eliminar logo"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed border-border p-8 flex flex-col items-center gap-2 text-center hover:border-neon hover:bg-neon/5 transition-colors group"
          >
            <Upload size={24} className="text-muted group-hover:text-neon transition-colors" />
            <span className="text-muted text-sm group-hover:text-foreground transition-colors">
              Haz clic para subir tu logo
            </span>
            <span className="text-xs text-muted">PNG, JPG, SVG · Máx. 2 MB</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/gif,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        {logoError && (
          <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle size={12} className="flex-shrink-0" />
            {logoError}
          </div>
        )}
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
