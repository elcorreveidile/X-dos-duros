import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Karim',
    role: 'Conductor de MakiCar',
    text: 'Ya tengo mi lista de pasajeros habituales y publicar un viaje me lleva menos de un minuto. Exactamente lo que necesitaba — rápido, sencillo y funciona perfecto desde el primer día.',
    initials: 'K',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 border-t border-border" id="testimonios">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
            — Clientes reales —
          </span>
          <h2 className="section-title">
            Lo que dicen
            <br />
            <span className="neon-text">quienes ya lo tienen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="neon-border p-8 md:p-10 relative">
              <Quote size={32} className="text-neon/20 absolute top-6 right-8" aria-hidden="true" />
              <p className="text-lg leading-relaxed mb-8 max-w-2xl">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neon/10 border border-neon/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-neon font-black text-sm">{t.initials}</span>
                </div>
                <div>
                  <p className="font-black uppercase tracking-tight text-sm">{t.name}</p>
                  <p className="text-muted text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
