import Link from 'next/link'
import { Trophy, ExternalLink } from 'lucide-react'

export function MundialSection() {
  return (
    <section id="mundial" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border border-neon/40 bg-neon/5 p-8 sm:p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          {/* Icon */}
          <div className="flex-shrink-0 w-20 h-20 border-2 border-neon flex items-center justify-center">
            <Trophy size={36} className="text-neon" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-3 block">
              — Concurso —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-tight mb-4">
              Mundial 2026
              <br />
              <span className="neon-text">Gana tu web gratis.</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-xl">
              Participa en el <strong className="text-foreground">Mundial 2026 de Espanias</strong> y
              gana descuentos de hasta el <strong className="text-foreground">100%</strong> en tu proyecto web —
              landing page, tienda online o MVP. Los mejores jugadores se llevan su web completamente gratis.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex-shrink-0 flex flex-col gap-3 w-full lg:w-auto">
            <a
              href="https://www.espanias.com/mundial"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Participar ahora
              <ExternalLink size={14} />
            </a>
            <Link
              href="/concurso-mundial-2026"
              className="btn-outline inline-flex items-center justify-center gap-2 text-sm"
            >
              Más información
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
