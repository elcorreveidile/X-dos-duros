'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, Mail, ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'
import { loginAction } from './actions'

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'
  const urlError = searchParams.get('error')

  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [form, setForm] = useState({ email: '', password: '' })
  const [magicEmail, setMagicEmail] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(
    urlError === 'expired' ? 'El enlace ha caducado. Solicita uno nuevo.' : ''
  )
  const [magicSent, setMagicSent] = useState(false)

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await loginAction(form.email, form.password, callbackUrl)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const handleMagicSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: magicEmail }),
      })
      if (res.ok) {
        setMagicSent(true)
      } else {
        setError('Error al enviar el enlace. Inténtalo de nuevo.')
      }
    } catch {
      setError('Error al enviar el enlace. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'magic') {
    return (
      <div className="border border-border bg-card p-8 space-y-5">
        <button
          onClick={() => { setMode('password'); setMagicSent(false); setError('') }}
          className="flex items-center gap-1 text-muted text-xs hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} /> Volver
        </button>

        {magicSent ? (
          <div className="text-center space-y-3 py-4">
            <div className="w-12 h-12 border border-neon bg-neon/10 flex items-center justify-center mx-auto">
              <Mail size={20} className="text-neon" />
            </div>
            <h2 className="font-bold uppercase tracking-tight">Revisa tu email</h2>
            <p className="text-muted text-sm">
              Hemos enviado un enlace de acceso a <strong className="text-foreground">{magicEmail}</strong>.
              Caduca en 15 minutos.
            </p>
          </div>
        ) : (
          <form onSubmit={handleMagicSubmit} className="space-y-5">
            <div>
              <h2 className="font-bold uppercase tracking-tight mb-1">Acceso sin contraseña</h2>
              <p className="text-muted text-xs">Te enviamos un enlace directo a tu email.</p>
            </div>

            {error && (
              <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-xs">{error}</div>
            )}

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="tu@email.com"
                required
                value={magicEmail}
                onChange={(e) => setMagicEmail(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              <Mail size={16} className="mr-2" />
              Enviar enlace
            </Button>
          </form>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="border border-border bg-card p-8 space-y-5">
      {error && (
        <div className="border border-red-400/40 bg-red-400/5 p-3 text-red-400 text-xs">{error}</div>
      )}

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

      <div>
        <label className="label">Contraseña</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            className="input pr-10"
            placeholder="••••••••"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        <LogIn size={16} className="mr-2" />
        Entrar
      </Button>

      <button
        type="button"
        onClick={() => { setMode('magic'); setError('') }}
        className="w-full text-center text-muted text-xs hover:text-neon transition-colors pt-1"
      >
        ¿Olvidaste la contraseña? Accede sin ella →
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col items-center justify-center px-4">
      <div className="scanline absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-black tracking-tighter uppercase">
              <span className="text-foreground">Por</span>
              <span className="neon-text"> 2</span>
              <span className="text-foreground"> Duros</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold uppercase tracking-tight mt-4">Accede a tu panel</h1>
          <p className="text-muted text-sm mt-1">Gestiona tu proyecto desde aquí</p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-muted text-xs">
          ¿No tienes cuenta?{' '}
          <Link href="/#contacto" className="text-neon hover:underline">
            Empieza tu proyecto
          </Link>
        </p>
      </div>
    </div>
  )
}
