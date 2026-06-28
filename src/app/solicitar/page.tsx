'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle, Package, Zap } from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

const PROJECT_LABELS: Record<string, string> = {
  LANDING: 'Landing Page',
  ECOMMERCE: 'E-commerce',
  MVP: 'MVP Web App',
  CUSTOM: 'App a medida',
}

const ADDON_LABELS: Record<string, string> = {
  seo: 'SEO avanzado',
  blog: 'Blog',
  analytics: 'Analítica',
  multilang: 'Multiidioma',
  crm: 'Integración CRM',
  payments: 'Pagos online',
}

function SolicitarForm() {
  const searchParams = useSearchParams()
  const projectType = searchParams.get('projectType') ?? 'LANDING'
  const addonsRaw = searchParams.get('addons') ?? ''
  const price = searchParams.get('price') ?? ''

  const addons = addonsRaw ? addonsRaw.split(',').filter(Boolean) : []
  const projectLabel = PROJECT_LABELS[projectType] ?? projectType

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const callbackUrl = `/dashboard?newProject=1&projectType=${projectType}&addons=${addonsRaw}&price=${price}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, callbackUrl }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError('Error al enviar el enlace. Inténtalo de nuevo.')
      }
    } catch {
      setError('Error al enviar el enlace. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="border border-neon/30 bg-neon/5 p-8 text-center space-y-4">
        <div className="w-14 h-14 border border-neon bg-neon/10 flex items-center justify-center mx-auto">
          <Mail size={24} className="text-neon" />
        </div>
        <h2 className="font-black text-xl uppercase tracking-tight">Revisa tu email</h2>
        <p className="text-muted text-sm max-w-sm mx-auto">
          Hemos enviado un enlace de acceso a <strong className="text-foreground">{email}</strong>.
          Caduca en <strong className="text-foreground">15 minutos</strong>.
        </p>
        <p className="text-muted text-xs max-w-xs mx-auto">
          Al hacer clic en el enlace, accederás a tu panel con el proyecto ya seleccionado y listo para preparar el branding.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Resumen del proyecto */}
      <div className="border border-border bg-card p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted font-mono">Tu proyecto</p>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-neon" />
              <h2 className="font-black text-lg uppercase tracking-tight">{projectLabel}</h2>
            </div>
            {addons.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {addons.map((a) => (
                  <span key={a} className="text-xs border border-border text-muted px-2 py-0.5 font-mono">
                    {ADDON_LABELS[a] ?? a}
                  </span>
                ))}
              </div>
            )}
          </div>
          {price && (
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted uppercase tracking-widest">Total</p>
              <p className="text-2xl font-black text-neon">€{price}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Zap size={12} className="text-neon" />
          <p className="text-xs text-muted">Entrega garantizada en <strong className="text-foreground">48 horas</strong></p>
        </div>
      </div>

      {/* Confirmaciones */}
      <div className="space-y-2">
        {[
          'Recibirás acceso inmediato a tu panel',
          'Podrás subir tu branding y referencias',
          'El equipo empieza en cuanto confirmemos el briefing',
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle size={14} className="text-neon flex-shrink-0" />
            <p className="text-sm text-muted">{item}</p>
          </div>
        ))}
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Tu email</label>
          <input
            type="email"
            className="input"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-muted mt-1">
            Te enviamos un enlace de acceso directo. Sin contraseña.
          </p>
        </div>

        {error && (
          <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-xs">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors disabled:opacity-50"
        >
          <Mail size={14} />
          {loading ? 'Enviando…' : 'Recibir enlace de acceso'}
        </button>
      </form>

      <p className="text-xs text-muted text-center">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-neon hover:underline">
          Accede directamente →
        </Link>
      </p>
    </div>
  )
}

export default function SolicitarPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-lg mx-auto px-6 py-24 space-y-10">

          <Link
            href="/calculadora"
            className="inline-flex items-center gap-2 text-muted text-xs uppercase tracking-widest hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Volver a la calculadora
          </Link>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Paso final</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Solicita tu proyecto
            </h1>
            <p className="text-muted text-sm">
              Introduce tu email para recibir acceso a tu panel y preparar el briefing.
            </p>
          </div>

          <Suspense fallback={null}>
            <SolicitarForm />
          </Suspense>

        </div>
      </main>
      <Footer />
    </>
  )
}
