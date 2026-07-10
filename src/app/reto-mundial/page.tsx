import type { Metadata } from 'next'
import { Flame, Trophy, Zap, Shield, CheckCircle, ArrowRight, MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import { getMundialRetoPct } from '@/lib/espanias'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { RetoClient } from './RetoClient'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34690026370'

export const metadata: Metadata = {
  title: 'Reto Mundial 2026 — Por 2 Duros',
  description: 'Apúntate al Reto Mundial: tu descuento crece con cada victoria de España. Si ganan el Mundial, tu web es gratis.',
  robots: { index: false, follow: false },
}

export default async function RetoMundialPage() {
  const [reto, session] = await Promise.all([getMundialRetoPct(), auth()])
  const isFree = reto.pct >= 100 || reto.champion

  // Check logged-in user's reto status
  let userRetoMundial = false
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { retoMundial: true },
    })
    userRetoMundial = user?.retoMundial ?? false
  }

  const isLoggedIn = !!session?.user
  const isParticipant = isLoggedIn && userRetoMundial
  const pctLabel = isFree ? '100%' : `${reto.pct}%`

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-background text-foreground pt-16">
      <div className="max-w-2xl mx-auto px-6 py-24 space-y-16">

        {/* Hero */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Flame size={28} className="text-orange-400" />
            <span className="text-xs uppercase tracking-widest text-orange-400 font-mono">Reto Mundial 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none">
            Tu descuento crece<br />
            con <span className="text-orange-400">cada victoria</span><br />
            de España
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            {isParticipant
              ? 'Ya estás dentro. Tu descuento se actualiza automáticamente con cada partido que gane la Selección.'
              : <>Apúntate ahora. Cuantos más partidos gane la Selección, mayor será tu descuento en una Landing Page, MVP o E-commerce.
                {' '}<strong className="text-foreground">Si España gana el Mundial, tu web es completamente gratis.</strong></>
            }
          </p>
        </div>

        {/* Última oportunidad — aviso urgente */}
        <div className="border border-red-500/50 bg-red-500/5 p-5 flex items-start gap-4">
          <Clock size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black uppercase tracking-tight text-red-400">Última oportunidad</p>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Hay que apuntarse <strong className="text-foreground">antes de que empiece la semifinal España–Francia (14 jul)</strong>.
              Una vez jugado el partido, no se admiten nuevas altas para aprovechar el resultado.
            </p>
          </div>
        </div>

        {/* Current status */}
        <div className="border border-orange-500/40 bg-orange-500/5 p-6 space-y-3">
          <p className="text-xs uppercase tracking-widest text-orange-400 font-mono">Descuento actual</p>
          <p className="text-5xl font-black font-mono">
            {isFree ? (
              <span className="text-neon">100% GRATIS</span>
            ) : reto.pct > 0 ? (
              <span>{reto.pct}<span className="text-orange-400">%</span></span>
            ) : (
              <span className="text-muted text-3xl">¡Empieza cuando gane España!</span>
            )}
          </p>
          {reto.wins > 0 && (
            <p className="text-sm text-muted">
              {reto.wins} {reto.wins === 1 ? 'victoria' : 'victorias'} de España en el Mundial 2026
            </p>
          )}
        </div>

        {/* Mecánica del reto (same copy as espanias) */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Cómo funciona</h2>
          <div className="border border-border p-6 space-y-5">
            <p className="text-sm leading-relaxed">
              <strong className="text-foreground">Para llevarte el descuento hay que apuntarse.</strong>{' '}
              Ahora mismo, quien se apunte se lleva ya un <strong className="text-orange-400">{pctLabel}</strong>.
            </p>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted">Una vez apuntado, eliges:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0">✅</span>
                  <p>
                    <strong>Asegúratelo:</strong> te construimos la web con el {pctLabel} de descuento, sin riesgo.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0">🎲</span>
                  <p>
                    <strong>Arriésgate al siguiente partido:</strong> si España gana, tu descuento sube (+15%);
                    si es <strong>campeona</strong>, tu web es <strong className="text-neon">GRATIS</strong>;
                    si <strong>pierde</strong>, te quedas sin descuento (0%).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works — 3 steps */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Los pasos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {[
              { icon: Flame, title: 'Te apuntas', desc: 'Rellenas el formulario. Sin tarjeta. Sin compromiso. El descuento te espera.' },
              { icon: Trophy, title: 'España gana', desc: 'Con cada partido que gane la Selección, tu descuento sube automáticamente.' },
              { icon: Zap, title: 'Lanzas tu web', desc: 'Cuando elijas, usas el descuento acumulado. Cuanto más esperes, más ahorras.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-background p-6 space-y-3">
                <Icon size={18} className="text-orange-400" />
                <p className="font-bold text-sm uppercase tracking-tight">{title}</p>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Qué puedes lanzar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {[
              { label: 'Landing Page', price: 297, delivery: '24h' },
              { label: 'MVP Web App', price: 797, delivery: '48h' },
              { label: 'E-commerce', price: 497, delivery: '48h' },
            ].map(({ label, price, delivery }) => {
              const final = reto.pct >= 100 ? 0 : Math.round(price * (1 - reto.pct / 100))
              return (
                <div key={label} className="bg-background p-6 space-y-2">
                  <p className="font-bold text-sm uppercase tracking-tight">{label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted line-through text-xs">€{price}</span>
                    {reto.pct > 0 ? (
                      reto.pct >= 100 ? (
                        <span className="text-neon font-black">GRATIS</span>
                      ) : (
                        <span className="font-black text-orange-400">€{final}</span>
                      )
                    ) : (
                      <span className="font-black">€{price}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted font-mono">Entrega en {delivery}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-3 text-muted text-sm border border-border p-4">
          <Shield size={16} className="flex-shrink-0 mt-0.5" />
          <p>El descuento se calcula en tiempo real en el servidor. No puede manipularse desde el navegador.</p>
        </div>

        {/* Bottom CTA — depends on auth state */}
        {isParticipant ? (
          <div className="border border-orange-500/40 bg-orange-500/5 p-8 text-center space-y-4">
            <CheckCircle size={36} className="text-orange-400 mx-auto" />
            <p className="font-black text-lg uppercase tracking-tight">Ya estás en el Reto</p>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Tu descuento actual es <strong className="text-orange-400">{isFree ? '100% GRATIS' : `-${reto.pct}%`}</strong>. Entra en tu área para activarlo cuando quieras.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-colors"
              >
                Ir a mi área
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, estoy apuntado al Reto Mundial. Mi descuento es ${pctLabel} y quiero hablar de mi web.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-green-500/40 text-green-400 text-xs uppercase tracking-widest hover:border-green-400 transition-colors font-bold"
              >
                <MessageCircle size={14} />
                Cerrar por WhatsApp
              </a>
            </div>
          </div>
        ) : isLoggedIn ? (
          <div className="border border-border p-8 space-y-6">
            <div>
              <p className="font-black text-lg uppercase tracking-tight">Ya tienes cuenta</p>
              <p className="text-muted text-sm mt-1">
                Aún no estás en el Reto Mundial. Un clic y te apuntamos.
              </p>
            </div>
            <RetoClient prefilledEmail={session!.user!.email!} pct={reto.pct} />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Apúntate ahora</h2>
              <p className="text-muted text-sm mt-2">Gratis. Sin tarjeta. Sin compromiso. El descuento te espera.</p>
            </div>
            <RetoClient pct={reto.pct} />
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="border border-green-500/30 bg-green-500/3 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold uppercase tracking-tight">¿Prefieres cerrarlo por WhatsApp?</p>
              <p className="text-xs text-muted mt-1">Te atendemos directamente. Resolvemos dudas y cerramos tu web en el mismo chat.</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, quiero apuntarme al Reto Mundial de por2duros.com')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 border border-green-500/40 text-green-400 text-xs uppercase tracking-widest hover:border-green-400 hover:text-green-300 transition-colors font-bold whitespace-nowrap"
          >
            <MessageCircle size={12} />
            Abrir WhatsApp
          </a>
        </div>

      </div>
    </main>
    <Footer />
    </>
  )
}
