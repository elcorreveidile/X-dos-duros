export const metadata = {
  title: 'Política de Privacidad — Por 2 Duros',
  description: 'Política de privacidad de Por 2 Duros. Cómo recogemos, usamos y protegemos tus datos personales de acuerdo con el RGPD.',
  alternates: { canonical: 'https://por2duros.com/legal/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Política de Privacidad</h1>
      <p className="text-muted text-sm mb-12">Última actualización: mayo 2025</p>

      <Section title="1. Responsable del tratamiento">
        <p>El responsable del tratamiento de los datos personales recogidos en este sitio web es <strong>Por 2 Duros</strong>, con correo electrónico de contacto: <a href="mailto:hola@por2duros.com" className="text-neon hover:underline">hola@por2duros.com</a>.</p>
      </Section>

      <Section title="2. Datos que recogemos">
        <p>Podemos recoger los siguientes datos personales:</p>
        <ul>
          <li>Nombre y apellidos</li>
          <li>Dirección de correo electrónico</li>
          <li>Información sobre el proyecto que deseas desarrollar</li>
          <li>Datos de pago (gestionados por Stripe; no almacenamos datos de tarjeta)</li>
        </ul>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Utilizamos tus datos para:</p>
        <ul>
          <li>Gestionar tu solicitud de proyecto y darte acceso a tu panel de cliente</li>
          <li>Enviarte comunicaciones relacionadas con tu proyecto</li>
          <li>Procesar pagos a través de Stripe</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>
      </Section>

      <Section title="4. Base legal">
        <p>El tratamiento se basa en la ejecución de un contrato (prestación del servicio) y, cuando procede, en tu consentimiento expreso.</p>
      </Section>

      <Section title="5. Conservación de datos">
        <p>Conservamos tus datos mientras se mantenga la relación comercial y durante los plazos legalmente exigidos (mínimo 5 años para datos fiscales).</p>
      </Section>

      <Section title="6. Terceros y transferencias">
        <p>Podemos compartir datos con proveedores de servicios necesarios para la prestación del servicio:</p>
        <ul>
          <li><strong>Stripe</strong> — procesamiento de pagos (EE.UU., con garantías adecuadas)</li>
          <li><strong>Vercel</strong> — alojamiento de la aplicación (EE.UU., con garantías adecuadas)</li>
          <li><strong>Supabase</strong> — base de datos (UE)</li>
          <li><strong>Resend</strong> — envío de correos transaccionales</li>
        </ul>
        <p>No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>
      </Section>

      <Section title="7. Tus derechos">
        <p>Tienes derecho a acceder, rectificar, suprimir, oponerte y solicitar la portabilidad de tus datos. Puedes ejercerlos escribiendo a <a href="mailto:hola@por2duros.com" className="text-neon hover:underline">hola@por2duros.com</a>. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>
      </Section>

      <Section title="8. Seguridad">
        <p>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o destrucción.</p>
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
