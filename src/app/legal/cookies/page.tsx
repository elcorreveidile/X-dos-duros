export const metadata = {
  title: 'Política de Cookies — Por 2 Duros',
  description: 'Política de cookies de Por 2 Duros. Qué cookies usamos, para qué y cómo puedes gestionarlas.',
  alternates: { canonical: 'https://por2duros.com/legal/cookies' },
}

export default function CookiesPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Política de Cookies</h1>
      <p className="text-muted text-sm mb-12">Última actualización: mayo 2025</p>

      <Section title="¿Qué son las cookies?">
        <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Sirven para que el sitio funcione correctamente, recuerde tus preferencias y, en algunos casos, analice cómo se usa.</p>
      </Section>

      <Section title="Cookies que utilizamos">
        <Table
          headers={['Nombre', 'Tipo', 'Duración', 'Finalidad']}
          rows={[
            ['authjs.session-token', 'Necesaria', 'Sesión', 'Mantiene tu sesión iniciada en el panel de cliente'],
            ['authjs.csrf-token', 'Necesaria', 'Sesión', 'Protección contra ataques CSRF'],
            ['authjs.callback-url', 'Necesaria', 'Sesión', 'Redirige correctamente tras el login'],
          ]}
        />
      </Section>

      <Section title="Cookies de terceros">
        <p>Utilizamos los siguientes servicios de terceros que pueden establecer sus propias cookies:</p>
        <ul>
          <li><strong>Stripe</strong> — para el procesamiento seguro de pagos. Consulta su política en <a href="https://stripe.com/es/privacy" className="text-neon hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/es/privacy</a></li>
        </ul>
        <p>No utilizamos cookies de seguimiento publicitario ni compartimos datos con redes publicitarias.</p>
      </Section>

      <Section title="Cookies estrictamente necesarias">
        <p>Las cookies de sesión listadas arriba son estrictamente necesarias para el funcionamiento del panel de cliente. No requieren tu consentimiento previo según la normativa vigente, ya que son esenciales para prestar el servicio solicitado.</p>
      </Section>

      <Section title="Cómo gestionar las cookies">
        <p>Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que si bloqueas las cookies necesarias, el panel de cliente no funcionará correctamente.</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" className="text-neon hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-neon hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-neon hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
        </ul>
      </Section>

      <Section title="Contacto">
        <p>Si tienes dudas sobre nuestra política de cookies, escríbenos a <a href="mailto:hola@por2duros.com" className="text-neon hover:underline">hola@por2duros.com</a>.</p>
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

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-border">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2 text-xs uppercase tracking-wider text-muted font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted font-mono text-xs">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
