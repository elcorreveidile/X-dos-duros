'use client'

import { useState, useTransition } from 'react'
import { updateAdminProfile, changeAdminPassword, triggerTestEmail } from '@/app/admin/ajustes/actions'
import { Check, Loader2, Mail } from 'lucide-react'

export function ProfileForm({ currentName }: { currentName: string | null }) {
  const [name, setName] = useState(currentName ?? '')
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = () => {
    setError('')
    startTransition(async () => {
      try {
        await updateAdminProfile({ name })
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error')
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Nombre</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
        />
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="button"
        onClick={handleSave}
        disabled={isPending}
        className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-bold bg-neon text-background hover:bg-neon/90 transition-colors disabled:opacity-50"
      >
        {isPending ? <><Loader2 size={12} className="animate-spin" /> Guardando…</> : saved ? <><Check size={12} /> Guardado</> : 'Guardar'}
      </button>
    </div>
  )
}

export function PasswordForm() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (form.next !== form.confirm) { setError('Las contraseñas no coinciden'); return }
    if (form.next.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return }
    setError('')
    startTransition(async () => {
      try {
        await changeAdminPassword({ current: form.current, next: form.next })
        setSaved(true)
        setForm({ current: '', next: '', confirm: '' })
        setTimeout(() => setSaved(false), 2500)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error')
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Contraseña actual</label>
        <input type="password" className="input" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Nueva contraseña</label>
          <input type="password" className="input" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} />
        </div>
        <div>
          <label className="label">Confirmar contraseña</label>
          <input type="password" className="input" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        </div>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="button"
        onClick={handleSave}
        disabled={isPending || !form.current || !form.next}
        className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-bold border border-border text-muted hover:border-neon/40 hover:text-foreground transition-colors disabled:opacity-40"
      >
        {isPending ? <><Loader2 size={12} className="animate-spin" /> Cambiando…</> : saved ? <><Check size={12} /> Cambiada</> : 'Cambiar contraseña'}
      </button>
    </div>
  )
}

export function TestEmailButton() {
  const [isPending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSend = () => {
    setError('')
    startTransition(async () => {
      try {
        await triggerTestEmail()
        setSent(true)
        setTimeout(() => setSent(false), 4000)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error')
      }
    })
  }

  return (
    <div className="space-y-3">
      <p className="text-muted text-sm">Envía un email de prueba a la dirección configurada en <span className="mono text-xs">ADMIN_EMAIL</span> para verificar que Resend funciona correctamente.</p>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="button"
        onClick={handleSend}
        disabled={isPending}
        className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-bold border border-border text-muted hover:border-neon/40 hover:text-foreground transition-colors disabled:opacity-40"
      >
        {isPending ? <><Loader2 size={12} className="animate-spin" /> Enviando…</> : sent ? <><Check size={12} /> Enviado</> : <><Mail size={12} /> Enviar email de prueba</>}
      </button>
    </div>
  )
}
