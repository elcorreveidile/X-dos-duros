import Link from 'next/link'
import { Trophy } from 'lucide-react'

export function MundialSection() {
  return (
    <section id="mundial" className="pt-32 pb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border border-neon/40 bg-neon/5 p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-shrink-0 w-20 h-20 border-2 border-neon flex items-center justify-center">
            <Trophy size={36} className="text-neon" />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-3 block">
              — Mundial 2026 · Cerrado —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-tight mb-4">
              🇪🇸 España, campeona.
              <br />
              <span className="neon-text">7 webs gratis entregadas.</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-xl">
              El Reto Mundial 2026 ha terminado. Los participantes que se arriesgaron hasta la final
              se llevan su web completamente gratis. Los cupones del concurso de Espanias siguen siendo válidos.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col gap-3 w-full lg:w-auto">
            <Link
              href="/mundial"
              className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Canjear mi cupón
            </Link>
            <Link
              href="/calculadora"
              className="btn-outline inline-flex items-center justify-center gap-2 text-sm"
            >
              Ver precios
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
