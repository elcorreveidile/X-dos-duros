'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle } from 'lucide-react'

export function ContactSection() {
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    budget: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError('Hubo un error al enviar. Inténtalo de nuevo.')
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

        {sent ? (
          <div className="border border-neon bg-neon/5 p-12 flex flex-col items-center gap-4 text-center animate-fade-in">
            <CheckCircle size={40} className="text-neon" />
            <h3 className="text-2xl font-bold uppercase">¡Recibido!</h3>
            <p className="text-muted">
              Te contactamos en menos de 2 horas para confirmar los detalles y darte acceso a tu panel de cliente.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              <Send size={16} className="mr-2" />
              Enviar solicitud
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
