import { ChevronRight } from 'lucide-react'

export const FAQ_ITEMS = [
  {
    q: '¿En serio entregáis en 48 horas?',
    a: 'Sí, desde que confirmas el briefing y nos mandas el material (textos, logos, imágenes). El contador empieza en ese momento, no antes. Para landing pages simples, en 24 horas.',
  },
  {
    q: '¿Usáis WordPress o plantillas?',
    a: 'No. Desarrollamos en Next.js con código a medida desde cero. Tu web es más rápida, más segura y no depende de plugins ni licencias. El código es tuyo al 100%.',
  },
  {
    q: '¿Qué pasa si no me gusta el resultado?',
    a: 'Tienes 15 días de garantía de devolución completa. Sin letra pequeña, sin preguntas. Si no quedas satisfecho, te devolvemos el 100% del importe.',
  },
  {
    q: '¿Hay cuotas mensuales obligatorias?',
    a: 'No. El precio es un pago único. Ofrecemos planes de mantenimiento opcionales desde €29/mes, pero son completamente voluntarios.',
  },
  {
    q: '¿Puedo pedir cambios después de la entrega?',
    a: 'Sí. Los cambios menores dentro del briefing original son gratuitos durante los primeros 7 días. Las nuevas funcionalidades o secciones tienen presupuesto aparte.',
  },
  {
    q: '¿Trabajáis solo con empresas de Andalucía?',
    a: 'No. Trabajamos con cualquier empresa o autónomo de España. Hacemos el proceso 100% en remoto: videollamada de briefing, entrega en demo y despliegue sin que tengamos que vernos en persona.',
  },
]

export function FaqSection() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
            — FAQ —
          </span>
          <h2 className="section-title">
            Preguntas
            <br />
            <span className="neon-text">frecuentes.</span>
          </h2>
        </div>

        <div className="space-y-0">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="border-b border-border py-6 group">
              <div className="flex items-start gap-3">
                <ChevronRight
                  size={14}
                  className="text-neon mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-tight mb-2">{item.q}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
