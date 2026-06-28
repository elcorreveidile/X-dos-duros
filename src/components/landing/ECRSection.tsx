import Link from 'next/link'
import SelloECR from '@/components/marca/SelloECR'
import SimboloQPQ from '@/components/marca/SimboloQPQ'

const PAYMENT_METHODS = [
  {
    icon: '💶',
    label: 'Al contado',
    detail: 'Pago único con 10% de descuento sobre el precio normal.',
    example: '1.800 €',
    tag: '−10%',
  },
  {
    icon: '🗓️',
    label: 'A plazos sin interés',
    detail: 'Cuatro cuotas iguales, sin intereses ni comisiones.',
    example: '4 × 500 €',
    tag: 'Sin interés',
  },
  {
    icon: '♻️',
    label: 'Con QPQ',
    detail: 'Pagas una parte en efectivo y el resto con bonos de tu propio negocio. 1 QPQ = 30 €.',
    example: '300 € + bonos QPQ',
    tag: 'Economía circular',
  },
]

export function ECRSection() {
  return (
    <section className="py-24 border-t border-border scroll-mt-20" id="ecr">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-muted block mb-4">
                — Economía Circular Realejo —
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
                Paga como<br />
                <span className="text-neon">mejor te venga.</span>
              </h2>
              <p className="text-muted mt-4 leading-relaxed">
                En el Realejo nos cuidamos entre vecinos. Por eso ponemos web profesional a tu
                alcance <strong className="text-foreground">sin descapitalizarte</strong>: al
                contado, a plazos sin intereses… o pagando con tu propio producto.
              </p>
            </div>

            <div className="space-y-px bg-border">
              {PAYMENT_METHODS.map((m) => (
                <div key={m.label} className="bg-background p-5 flex gap-4">
                  <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-bold text-sm uppercase tracking-tight">{m.label}</p>
                      <span className="text-xs font-mono text-neon border border-neon/30 px-2 py-0.5">
                        {m.tag}
                      </span>
                    </div>
                    <p className="text-muted text-xs mt-1 leading-relaxed">{m.detail}</p>
                    <p className="text-sm font-black font-mono mt-2">{m.example}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted">
              Ejemplo orientativo para una web estándar (precio normal 2.000 €).
              El precio final depende del proyecto y sus complementos.
            </p>

            <Link
              href="/agencia-web-granada/ecr"
              className="inline-flex items-center gap-2 px-6 py-3 border border-neon text-neon font-black text-xs uppercase tracking-widest hover:bg-neon hover:text-background transition-colors"
            >
              Más sobre el ECR y el QPQ →
            </Link>
          </div>

          {/* Right: sello + símbolo */}
          <div className="flex flex-col items-center gap-8">
            <SelloECR size={220} color="currentColor" className="text-foreground opacity-90" />
            <div className="border border-border bg-card p-6 w-full space-y-3">
              <div className="flex items-center gap-4">
                <SimboloQPQ size={52} color="currentColor" className="text-neon flex-shrink-0" />
                <div>
                  <p className="font-black text-sm uppercase tracking-tight">QPQ — La moneda del barrio</p>
                  <p className="text-muted text-xs mt-1">
                    Un bono de tu negocio que vale 30 €. Al portador, sin caducidad.
                    Pagas parte de tu web con lo que sabes hacer.
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted border-t border-border pt-3">
                El sello ECR identifica a los negocios del Realejo que forman parte
                de la red. Tu web lo lucirá cuando te adhieras.{' '}
                <a
                  href="https://espanias.com/ecr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon hover:underline"
                >
                  Ver directorio ECR →
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
