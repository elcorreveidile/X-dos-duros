'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle, Mail, ArrowLeft, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

type Step = 'form' | 'verify' | 'done'

export function ContactSection() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    budget: '',
  })
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const codeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const type = searchParams.get('projectType')
    const price = searchParams.get('price')
    const addons = searchParams.get('addons')

    if (type || price || addons) {
      const addonsText = addons ? ` Extras: ${addons.replace(/,/g, ', ')}.` : ''
      const priceText = price ? ` Presupuesto calculado: €${price}.` : ''
      setForm((f) => ({
        ...f,
        projectType: type ?? f.projectType,
        description: `Proyecto configurado desde la calculadora.${addonsText}${priceText}`,
      }))
    }
  }, [searchParams])

  useEffect(() => {
    if (step === 'verify') codeRef.current?.focus()
  }, [step])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      })
      if (res.ok) {
        setStep('verify')
      } else {
        setError('No pudimos enviar el código. Comprueba el email e inténtalo de nuevo.')
      }
    } catch {
      setError('Hubo un error. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, verificationCode: code }),
      })
      if (res.ok) {
        setStep('done')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).dataLayer?.push({
          event: 'contact_form_submitted',
          project_type: form.projectType,
          budget: form.budget,
        })
      } else {
        const data = await res.json()
        setError(data.error ?? 'Código incorrecto. Inténtalo de nuevo.')
      }
    } catch {
      setError('Hubo un error al enviar. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-24 bg-card border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
            — Empieza hoy —
          </span>
          <h2 className="section-title">
            ¿Listo?
            <br />
            <span className="neon-text">Cuéntanos tu proyecto.</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-center">
            Respondemos en menos de 2 horas (horario laboral). Sin compromiso.
          </p>
        </div>

        {session && (
          <div className="border border-neon/40 bg-neon/5 p-8 flex flex-col items-center gap-4 text-center">
            <LayoutDashboard size={32} className="text-neon" />
            <div>
              <p className="font-black uppercase tracking-tight text-lg">Ya tienes cuenta</p>
              <p className="text-muted text-sm mt-1">
                Accede a tu área para gestionar tu proyecto o solicitar uno nuevo.
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="primary" size="lg">Ir a mi área</Button>
            </Link>
          </div>
        )}

        {!session && step === 'done' && (
          <div className="border border-neon bg-neon/5 p-12 flex flex-col items-center gap-4 text-center animate-fade-in">
            <CheckCircle size={40} className="text-neon" />
            <h3 className="text-2xl font-bold uppercase">¡Recibido!</h3>
            <p className="text-muted">
              Te contactamos en menos de 2 horas para confirmar los detalles y darte acceso a tu panel de cliente.
            </p>
          </div>
        )}

        {!session && step === 'verify' && (
          <div className="space-y-6">
            <div className="border border-[#39FF14]/30 bg-[#39FF14]/5 p-6 flex items-start gap-4">
              <Mail size={20} className="text-neon shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Código enviado a {form.email}</p>
                <p className="text-xs text-muted mt-1">
                  Revisa tu bandeja de entrada (y el spam). Válido 10 minutos.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-sm">{error}</div>
              )}

              <div>
                <label className="label">Código de verificación</label>
                <input
                  ref={codeRef}
                  className="input text-center text-2xl font-mono tracking-[0.5em]"
                  placeholder="000000"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                <Send size={16} className="mr-2" />
                Enviar solicitud
              </Button>
            </form>

            <button
              onClick={() => { setStep('form'); setCode(''); setError('') }}
              className="flex items-center gap-2 text-muted text-xs hover:text-white transition-colors mx-auto"
            >
              <ArrowLeft size={12} />
              Volver y editar el formulario
            </button>
          </div>
        )}

        {!session && step === 'form' && (
          <form onSubmit={handleSendCode} className="space-y-6">
            {error && (
              <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Nombre</label>
                <input
                  className="input"
                  placeholder="Tu nombre"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="tu@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Tipo de proyecto</label>
                <select
                  className="input bg-background"
                  required
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                >
                  <option value="">Selecciona...</option>
                  <option value="landing">Landing Page</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="mvp">MVP Web App</option>
                  <option value="custom">App a medida</option>
                </select>
              </div>
              <div>
                <label className="label">Presupuesto aproximado</label>
                <select
                  className="input bg-background"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option value="">Selecciona...</option>
                  <option value="300-500">€300 – €500</option>
                  <option value="500-1000">€500 – €1.000</option>
                  <option value="1000-2000">€1.000 – €2.000</option>
                  <option value="2000+">+€2.000</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Descripción del proyecto</label>
              <textarea
                className="input min-h-[140px] resize-none"
                placeholder="Cuéntanos qué necesitas. Cuanto más detalle, mejor presupuesto."
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* Privacy checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  required
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                />
                <div className={`w-5 h-5 border transition-colors flex items-center justify-center
                  ${privacyAccepted ? 'border-neon bg-neon/10' : 'border-[#444] group-hover:border-[#666]'}`}>
                  {privacyAccepted && (
                    <svg viewBox="0 0 12 10" className="w-3 h-3 text-neon fill-none stroke-current stroke-2">
                      <polyline points="1,5 4,8 11,1" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted leading-relaxed">
                He leído y acepto la{' '}
                <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">
                  Política de Privacidad
                </a>
                {' '}y consiento el tratamiento de mis datos para recibir información sobre el proyecto solicitado.
              </span>
            </label>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              <Mail size={16} className="mr-2" />
              Verificar email y continuar
            </Button>

            <p className="text-muted text-xs text-center">
              Sin spam. Sin suscripciones. Solo te contactamos para hablar de tu proyecto.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
