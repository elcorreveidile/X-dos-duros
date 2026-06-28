import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import SelloECR from '@/components/marca/SelloECR'
import SimboloQPQ from '@/components/marca/SimboloQPQ'

export const metadata: Metadata = {
  title: 'Economía Circular Realejo — Por 2 Duros',
  description:
    'Paga tu web al contado, a plazos sin intereses, o con QPQ: la moneda circular del Realejo. Si tienes un negocio en el Realejo, únete al ECR.',
}

const PAYMENT_ROWS = [
  { forma: 'Contado (pago único)', coste: '1.800 €', detalle: '−10 % sobre el precio normal' },
  { forma: 'A plazos (sin interés)', coste: '4 × 500 €', detalle: 'precio normal fraccionado' },
  { forma: 'QPQ (kupekus)', coste: '300 € + bonos QPQ', detalle: 'sin descuento; pagas con lo que sabes hacer' },
]

export default function ECRPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-2xl mx-auto px-6 py-24 space-y-16">

          {/* Hero */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <SelloECR size={72} color="currentColor" className="text-foreground" />
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-muted">
                  Economía Circular Realejo
                </p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mt-1">
                  Tu negocio,<br />
                  <span className="text-neon">con web propia.</span>
                </h1>
              </div>
            </div>
            <p className="text-muted text-lg leading-relaxed">
              En el Realejo nos cuidamos entre vecinos. Por eso ponemos web profesional a tu
              alcance <strong className="text-foreground">sin descapitalizarte</strong>: al contado,
              a plazos sin intereses… o pagando con tu propio producto. Bienvenido a la{' '}
              <strong className="text-foreground">Economía Circular Realejo</strong>.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              <em>Your Realejo business deserves its own website. Pay however suits you best.</em>
            </p>
          </div>

          {/* Payment methods */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-muted">Cómo puedes pagar tu web</h2>
            <p className="text-xs text-muted font-mono">Ejemplo: web estándar, precio normal 2.000 €</p>
            <div className="border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-mono">Forma de pago</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-widest text-muted font-mono">Coste</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-mono hidden sm:table-cell">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT_ROWS.map((row) => (
                    <tr key={row.forma} className="border-b border-border last:border-0">
                      <td className="px-4 py-4 font-bold">{row.forma}</td>
                      <td className="px-4 py-4 text-right font-black font-mono text-neon whitespace-nowrap">{row.coste}</td>
                      <td className="px-4 py-4 text-muted text-xs hidden sm:table-cell">{row.detalle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QPQ explanation */}
          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <SimboloQPQ size={64} color="currentColor" className="text-neon flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h2 className="text-xs uppercase tracking-widest text-muted">¿Qué es el QPQ?</h2>
                <p className="font-black text-xl uppercase tracking-tight">La moneda circular del Realejo</p>
                <p className="text-muted leading-relaxed">
                  Un bono de tu negocio que vale <strong className="text-foreground">30 €</strong>,
                  al portador y <strong className="text-foreground">sin caducidad</strong>. Pagas
                  parte de tu web con ellos y esos bonos circulan por el barrio.{' '}
                  <em>Trueque justo, del siglo XXI.</em>
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  <em>
                    The Realejo&apos;s circular currency: a €30 voucher from your business, to
                    the bearer and with no expiry date. Part of your website is paid with them,
                    and those vouchers circulate around the neighbourhood.
                  </em>
                </p>
              </div>
            </div>

            <div className="border border-border bg-card p-6 space-y-3 text-sm">
              <p><strong className="text-foreground">1 QPQ = bono de 30 €.</strong> Al portador, no caduca.</p>
              <p className="text-muted">
                El QPQ es un método de pago entre el negocio y la agencia, no una moneda de
                consumo final. El canje es digital (vale firmado) o impreso con el sello.
              </p>
              <p className="text-muted">
                Si el servicio cuesta 32 € o 38 €, el resto se abona en metálico. Siempre redondo.
              </p>
            </div>
          </div>

          {/* ECR seal */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-muted">El sello ECR</h2>
            <div className="flex items-start gap-6 flex-wrap">
              <SelloECR size={140} color="currentColor" className="text-foreground flex-shrink-0" />
              <div className="space-y-3 flex-1 min-w-[200px]">
                <p className="font-black text-lg uppercase tracking-tight">
                  La señal de que formas parte de la red
                </p>
                <p className="text-muted leading-relaxed text-sm">
                  Tu web lucirá el sello <em>Economía Circular Realejo</em>: la señal de que
                  formas parte de la red de negocios del barrio que se apoyan entre sí.
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  <em>
                    Your site carries the Realejo Circular Economy seal — proof that you&apos;re
                    part of the local network of businesses that support each other.
                  </em>
                </p>
                <a
                  href="https://espanias.com/ecr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neon text-sm hover:underline"
                >
                  Ver directorio ECR en espanias.com →
                </a>
              </div>
            </div>
          </div>

          {/* Multi-barrio note */}
          <div className="border border-border bg-card p-5 text-sm space-y-1">
            <p className="font-bold text-xs uppercase tracking-widest text-muted">Multi-barrio</p>
            <p className="text-muted">
              ECR es el Realejo. ECZ es el Zaidín. El sistema funciona por barrio:
              cada comunidad tiene su código y su red propia.
            </p>
          </div>

          {/* CTA */}
          <div className="border border-neon/30 bg-neon/5 p-8 text-center space-y-4">
            <p className="font-black text-xl uppercase tracking-tight">
              ¿Tienes un negocio en el Realejo?
            </p>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Escríbenos y te montamos tu web. Súmate al ECR.
            </p>
            <p className="text-muted text-sm italic">
              Run a business in the Realejo? Get in touch and we&apos;ll build your site.
            </p>
            <Link
              href="/#precio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Ver precios y formas de pago
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
