const STEPS = [
  {
    number: '01',
    title: 'Solicitud',
    description:
      'Rellenas el formulario de contacto con una descripción básica de tu proyecto. Sin reuniones eternas.',
    time: 'Hoy',
  },
  {
    number: '02',
    title: 'Briefing',
    description:
      'Confirmamos requisitos, precio final y te damos acceso a tu panel de cliente para subir textos y logos.',
    time: 'Día 1',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'El contador de 48h se activa. Desarrollamos tu proyecto con actualizaciones en tiempo real.',
    time: 'Días 1-2',
  },
  {
    number: '04',
    title: 'Entrega',
    description:
      'Recibes la URL de demo. Revisas y confirmás. Publicamos en tu dominio o te entregamos el código.',
    time: '48h después',
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
          — Cómo funciona —
        </span>
        <h2 className="section-title">
          4 pasos.
          <br />
          <span className="neon-text">48 horas. Punto.</span>
        </h2>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-4 group">
              {/* Step number / dot */}
              <div className="relative z-10 flex items-center gap-4 lg:flex-col lg:items-start">
                <div className="w-12 h-12 bg-background border-2 border-border group-hover:border-neon flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                  <span className="mono text-sm font-black text-muted group-hover:text-neon transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <span className="text-neon text-xs mono lg:hidden">{step.time}</span>
              </div>

              <div>
                <div className="hidden lg:block text-neon text-xs mono mb-2">{step.time}</div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Mobile connector */}
              {i < STEPS.length - 1 && (
                <div className="lg:hidden w-px h-8 bg-border ml-6" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rules callout */}
      <div className="mt-16 border border-neon/30 bg-neon/5 p-6 md:p-8">
        <h3 className="text-neon text-xs uppercase tracking-widest font-mono mb-4">
          Reglas del juego
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Las 48h empiezan cuando tú mandas el material',
              body: 'El contador se activa cuando recibimos textos, logos y accesos. Sin material = sin reloj.',
            },
            {
              title: 'El MVP incluye lo pactado en el briefing',
              body: 'Funcionalidades extra fuera del briefing tienen coste adicional. Transparencia total.',
            },
            {
              title: 'Hosting gratis el primer mes',
              body: 'Incluimos un mes de hosting sin coste. Después puedes contratar nuestro mantenimiento mensual.',
            },
          ].map((rule) => (
            <div key={rule.title}>
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tight">{rule.title}</h4>
              <p className="text-muted text-sm leading-relaxed">{rule.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
