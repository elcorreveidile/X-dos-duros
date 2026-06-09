import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { UrgencyCounter } from './UrgencyCounter'
import { ArrowDown, Zap } from 'lucide-react'
import { prisma } from '@/lib/db'

async function getActiveDeadline(): Promise<string | null> {
  try {
    const project = await prisma.project.findFirst({
      where: {
        status: { in: ['DEVELOPMENT', 'REVIEW'] },
        timerDeadline: { not: null, gt: new Date() },
      },
      orderBy: { updatedAt: 'desc' },
      select: { timerDeadline: true },
    })
    return project?.timerDeadline?.toISOString() ?? null
  } catch {
    return null
  }
}

export async function HeroSection() {
  const deadline = await getActiveDeadline()
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden pt-16">
      <div className="scanline absolute inset-0" />

      {/* Neon glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-4 py-2 mb-8 mt-16 animate-slide-up">
          <Zap size={14} className="text-neon" />
          <span className="text-neon text-xs uppercase tracking-widest font-mono">
            Entrega garantizada en 48 horas
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 animate-slide-up">
          Tu web lista{' '}
          <br />
          <span className="neon-text animate-flicker">en 48 horas.</span>
          <br />
          Sin excusas.
        </h1>

        {/* Subheadline */}
        <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-4 animate-slide-up leading-relaxed">
          MVPs, Landing Pages, E-commerce y Apps a medida.
          Pago único. Sin suscripciones obligatorias.
        </p>

        {/* Price anchor */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 mb-10 animate-slide-up">
          <span className="text-muted/60 text-sm line-through">Agencias tradicionales: €3.000–€8.000</span>
          <span className="text-muted/60 text-sm hidden sm:inline">→</span>
          <span className="text-foreground font-black text-xl">
            Aquí desde <span className="neon-text">€299</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
          <Link href="/#contacto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Pedir mi proyecto
            </Button>
          </Link>
          <Link href="/#precio">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver precios
            </Button>
          </Link>
        </div>

        {/* Urgency Counter */}
        <UrgencyCounter deadline={deadline} />

        {/* Social proof */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in">
          {[
            { value: '+50', label: 'Proyectos entregados' },
            { value: '48h', label: 'Tiempo de entrega' },
            { value: '15 días', label: 'Garantía de devolución' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black neon-text mono">{stat.value}</div>
              <div className="text-muted text-xs uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="text-neon" />
      </div>
    </section>
  )
}
