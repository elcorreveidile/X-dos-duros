import type { Metadata } from 'next'
import { Flame, Trophy, Zap, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getMundialRetoPct } from '@/lib/espanias'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { RetoClient } from './RetoClient'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

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

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Cómo funciona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {[
              { icon: Flame, title: 'Te apuntas', desc: 'Introduces tu email y recibes un enlace mágico a tu área de cliente.' },
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
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-colors"
            >
              Ir a mi área
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : isLoggedIn ? (
          <div className="border border-border p-8 text-center space-y-4">
            <p className="font-black text-lg uppercase tracking-tight">Ya tienes cuenta</p>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Tienes una cuenta en Por 2 Duros pero aún no estás en el Reto Mundial. ¿Quieres apuntarte?
            </p>
            <RetoClient />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Apúntate ahora</h2>
              <p className="text-muted text-sm mt-2">Gratis. Sin tarjeta. Sin compromiso. El descuento te espera.</p>
            </div>
            <RetoClient />
          </div>
        )}

      </div>
    </main>
    <Footer />
    </>
  )
}
