export const metadata = {
  title: 'Términos y Condiciones — Por 2 Duros',
  description: 'Términos y condiciones de contratación de Por 2 Duros. Condiciones de uso del servicio, entregas, garantías y devoluciones.',
  alternates: { canonical: 'https://por2duros.com/legal/terminos' },
}

export default function TerminosPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Términos y Condiciones</h1>
      <p className="text-muted text-sm mb-12">Última actualización: mayo 2025</p>

      <Section title="1. Objeto">
        <p>Las presentes condiciones regulan la contratación de servicios de desarrollo web y mantenimiento ofrecidos por <strong>Por 2 Duros</strong> a través de por2duros.com.</p>
      </Section>

      <Section title="2. El servicio">
        <p>Por 2 Duros ofrece el desarrollo de proyectos web (landing pages, e-commerce, aplicaciones web) con entrega garantizada en <strong>48 horas</strong> desde la recepción de todos los materiales necesarios por parte del cliente.</p>
        <p>El plazo de 48 horas comienza únicamente cuando:</p>
        <ul>
          <li>El pago ha sido confirmado</li>
          <li>El briefing completo ha sido enviado y aprobado</li>
          <li>Todos los materiales necesarios (textos, imágenes, logos) han sido entregados</li>
        </ul>
      </Section>

      <Section title="3. Precios y pagos">
        <p>Los precios mostrados en el sitio web son orientativos. El presupuesto final se confirma tras revisar el briefing del cliente. El pago se realiza al 100% antes del inicio del desarrollo, a través de Stripe (tarjeta de crédito/débito).</p>
      </Section>

      <Section title="4. Garantía de entrega">
        <p>Si el proyecto no es entregado dentro del plazo de 48 horas acordado (contando desde el inicio del temporizador), el cliente tendrá derecho a un reembolso completo del importe pagado.</p>
        <p>Esta garantía no aplica cuando el retraso sea causado por:</p>
        <ul>
          <li>Falta de materiales o información por parte del cliente</li>
          <li>Solicitudes de cambio sustanciales durante el desarrollo</li>
          <li>Causas de fuerza mayor</li>
        </ul>
      </Section>

      <Section title="5. Revisiones y cambios">
        <p>El precio incluye hasta <strong>2 rondas de revisiones</strong> menores tras la entrega. Los cambios sustanciales o nuevas funcionalidades se presupuestarán por separado.</p>
      </Section>

      <Section title="6. Propiedad intelectual">
        <p>Una vez abonado el importe total, el cliente recibe los derechos de uso completos sobre el proyecto entregado. Por 2 Duros se reserva el derecho de mostrar el proyecto en su portfolio salvo indicación expresa en contrario.</p>
      </Section>

      <Section title="7. Suscripciones de mantenimiento">
        <p>Los planes de mantenimiento son contratos de duración mensual, renovables automáticamente. El cliente puede cancelar en cualquier momento con 30 días de antelación. No se realizan reembolsos de períodos ya iniciados.</p>
      </Section>

      <Section title="8. Limitación de responsabilidad">
        <p>Por 2 Duros no será responsable de daños indirectos, pérdida de beneficios o cualquier daño consecuente derivado del uso o imposibilidad de uso del servicio.</p>
      </Section>

      <Section title="9. Ley aplicable">
        <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del consumidor.</p>
      </Section>

      <Section title="10. Contacto">
        <p>Para cualquier consulta: <a href="mailto:hola@por2duros.com" className="text-neon hover:underline">hola@por2duros.com</a></p>
      </Section>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold uppercase tracking-tight text-foreground mb-3 border-b border-border pb-2">{title}</h2>
      <div className="text-muted leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  )
}
