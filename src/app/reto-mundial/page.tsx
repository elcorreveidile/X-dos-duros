import type { Metadata } from 'next'
import { Trophy, CheckCircle, MessageCircle, Shield } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34690026370'

export const metadata: Metadata = {
  title: 'Reto Mundial 2026 — Cerrado · Por 2 Duros',
  description: 'El Reto Mundial 2026 ha terminado. España, campeona del mundo. 7 negocios se llevaron su web completa gratis.',
  robots: { index: false, follow: false },
}

export default async function RetoMundialPage() {
  const session = await auth()

  let isParticipant = false
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { retoMundial: true },
    })
    isParticipant = user?.retoMundial ?? false
  }

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-background text-foreground pt-16">
      <div className="max-w-2xl mx-auto px-6 py-24 space-y-16">

        {/* Hero de cierre */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy size={28} className="text-neon" />
            <span className="text-xs uppercase tracking-widest text-neon font-mono">Reto Mundial 2026 — Cerrado</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none">
            🇪🇸 España,<br />
            <span className="neon-text">campeona del mundo.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            El Reto Mundial ha terminado. Gracias a todos los que participasteis:{' '}
            <strong className="text-foreground">7 negocios se llevan su web completa gratis.</strong>
          </p>
        </div>

        {/* Resultado */}
        <div className="border border-neon/40 bg-neon/5 p-6 space-y-3">
          <p className="text-xs uppercase tracking-widest text-neon font-mono">Resultado final</p>
          <p className="text-5xl font-black font-mono neon-text">100% GRATIS</p>
          <p className="text-sm text-muted">7 victorias · España campeona · descuento máximo para los inscritos en el reto</p>
        </div>

        {/* Bloque para participantes */}
        {isParticipant && (
          <div className="border border-neon/40 bg-neon/5 p-8 space-y-5">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-neon" />
              <p className="font-black text-lg uppercase tracking-tight">Estabas en el Reto</p>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Si elegiste <strong className="text-foreground">"Arriesgarme al siguiente partido"</strong> antes de la final
              y España ganó mientras tú estabas en juego, tu web es <strong className="text-neon">GRATIS</strong>.
              Contáctanos por WhatsApp y lo confirmamos contra el registro de tu alta.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, participé en el Reto Mundial en por2duros.com y quiero reclamar mi web gratis.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              <MessageCircle size={14} />
              Reclamar mi web gratis por WhatsApp
            </a>
            <p className="text-xs text-muted">
              También puedes ir a tu área para ver el estado de tu proyecto.{' '}
              <Link href="/dashboard" className="text-neon hover:underline">Ir al dashboard →</Link>
            </p>
          </div>
        )}

        {/* Cupones — se mantiene el canje */}
        <div className="border border-border p-6 space-y-3">
          <div className="flex items-start gap-3">
            <Shield size={16} className="text-muted flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold uppercase tracking-tight">¿Tienes un cupón de Espanias?</p>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                Los cupones firmados del concurso (penaltis, rasca, porra) siguen siendo válidos.
                Úsalos en <Link href="/mundial" className="text-neon hover:underline">/mundial</Link> para aplicar tu descuento.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA general */}
        <div className="border border-green-500/30 bg-green-500/3 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold uppercase tracking-tight">¿Quieres una web sin haber participado?</p>
              <p className="text-xs text-muted mt-1">El Reto está cerrado, pero seguimos haciendo webs. Pídenos presupuesto.</p>
            </div>
          </div>
          <Link
            href="/calculadora"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 border border-border text-xs uppercase tracking-widest hover:border-neon hover:text-neon transition-colors font-bold whitespace-nowrap"
          >
            Ver precios →
          </Link>
        </div>

      </div>
    </main>
    <Footer />
    </>
  )
}
