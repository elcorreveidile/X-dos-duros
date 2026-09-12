import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { getMesaEstado, type MesaSession } from '@/lib/la-banda'
import { cn } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'La mesa — experimento de agentes de IA — Por 2 Duros',
  description:
    'Diez agentes de IA con un trabajo cada uno, veto obligatorio y traspasos trazables operan una cartera simulada de 100 dólares. En público, en tiempo real, sin trucos.',
  alternates: { canonical: 'https://por2duros.com/mesa' },
}

const usd = (v: number | null | undefined, digits = 2) => (v == null ? '—' : `${v.toFixed(digits)} $`)
const pct = (v: number) => `${(v * 100).toFixed(1).replace('.', ',')} %`
const fecha = (iso: string | null) => (iso ? new Date(iso).toLocaleString('es-ES', { hour12: false, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—')

const AGENTES = [
  ['Tokio', 'detecta configuraciones: volumen que sube antes que el precio'],
  ['Denver', 'contrasta con el contexto externo y descarta el ruido'],
  ['Estocolmo', 'calcula el tamaño de la posición según la volatilidad'],
  ['Río', 'marca los niveles de invalidación y salida'],
  ['Berlín', 'redacta las condiciones exactas de entrada y salida'],
  ['Lisboa', 'comprueba que los datos son frescos; devuelve si no'],
  ['Nairobi', 'comprime todo en un brief de una página'],
  ['Palermo', 'veta si falta liquidez, invalidación o brief'],
  ['Helsinki', 'registra cada orden y cada cambio'],
  ['Profesor', 'cierra la sesión y redacta el informe'],
] as const

const RESULTADO: Record<string, string> = {
  orden_ejecutada: 'orden ejecutada',
  orden_rechazada: 'orden rechazada',
  sin_operacion: 'sin operación',
}

function estadoSesion(s: MesaSession): { label: string; tone: string } {
  if (s.status === 'vetoed') return { label: `veto de ${s.finalReport?.vetoedBy ?? 'Palermo'}`, tone: 'text-red-400' }
  if (s.status === 'failed') return { label: 'sesión detenida', tone: 'text-red-400' }
  if (s.status === 'open') return { label: 'en curso', tone: 'text-neon' }
  return { label: RESULTADO[s.finalReport?.resultado ?? ''] ?? 'cerrada', tone: 'text-muted' }
}

export default async function MesaPage() {
  const m = await getMesaEstado()
  const delta = m ? m.cartera.equityUsd - m.cartera.initialUsd : 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Experimento · en público</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              La mesa: diez agentes, <span className="neon-text">cien dólares</span>
            </h1>
            <p className="text-muted text-sm max-w-2xl leading-relaxed">
              Diez agentes de IA con un trabajo cada uno operan una cartera simulada de 100 dólares en BTC y ETH, con velas de una hora.
              El que busca no aprueba; el que aprueba no ejecuta. Ninguna orden sale sin el visto bueno de Palermo, y cualquier agente
              puede devolver el trabajo al anterior. Lo dejamos correr y publicamos lo que pase, gane o pierda.
            </p>
            <p className="text-xs text-muted font-mono">
              Simulación con dinero ficticio. No es asesoramiento financiero ni una recomendación de inversión.
            </p>
          </header>

          {!m ? (
            <section className="border border-border p-6">
              <p className="text-muted text-sm">La mesa está en preparación. Vuelve en unas horas.</p>
            </section>
          ) : (
            <>
              <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
                <Stat label="patrimonio" value={usd(m.cartera.equityUsd)} tone={delta >= 0 ? 'text-neon' : 'text-red-400'} />
                <Stat label="caja" value={usd(m.cartera.cashUsd)} />
                <Stat label="resultado" value={`${delta >= 0 ? '+' : ''}${usd(delta)}`} tone={delta >= 0 ? 'text-neon' : 'text-red-400'} />
                <Stat label="operaciones" value={String(m.metricas.operaciones)} />
                <Stat label="vetos de Palermo" value={String(m.metricas.vetosPalermo)} />
                <Stat label="devoluciones de Lisboa" value={String(m.metricas.devolucionesLisboa)} />
              </section>

              <section className="text-xs text-muted font-mono flex flex-wrap gap-x-6 gap-y-1">
                <span>capital inicial {usd(m.reglas.capitalInicialUsd, 0)}</span>
                <span>slippage {pct(m.reglas.slippage)}</span>
                <span>comisión {pct(m.reglas.comision)}</span>
                <span>{m.reglas.simbolos.join(' · ')}</span>
                <span>velas {m.reglas.velas} · ciclo {m.reglas.ciclo}</span>
                <span>sesiones {m.metricas.sesiones}</span>
              </section>

              {m.cartera.positions.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs uppercase tracking-widest text-muted">Posiciones abiertas</h2>
                  <ul className="divide-y divide-border border border-border">
                    {m.cartera.positions.map((p) => (
                      <li key={p.id} className="flex flex-wrap gap-x-4 gap-y-1 px-4 py-3 text-sm font-mono">
                        <span className="font-black">{p.symbol}</span>
                        <span className="text-muted">entrada {usd(p.entryPrice)}</span>
                        <span className="text-muted">último {usd(p.lastClose)}</span>
                        <span className="text-muted">stop {usd(p.stopPrice)}</span>
                        <span className="text-muted">objetivo {usd(p.targetPrice)}</span>
                        <span className={cn((p.unrealizedUsd ?? 0) >= 0 ? 'text-neon' : 'text-red-400')}>latente {usd(p.unrealizedUsd)}</span>
                        <span className="text-muted">{p.hoursOpen} h</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="space-y-3">
                <h2 className="text-xs uppercase tracking-widest text-muted">Operaciones</h2>
                {m.operaciones.length === 0 ? (
                  <p className="text-muted text-sm">Todavía ninguna. Palermo es estricto: la mayoría de las horas no se opera.</p>
                ) : (
                  <div className="overflow-x-auto border border-border">
                    <table className="w-full text-xs font-mono">
                      <thead className="text-left text-muted border-b border-border">
                        <tr>
                          <th className="px-3 py-2">abierta</th>
                          <th className="px-3 py-2">símbolo</th>
                          <th className="px-3 py-2">importe</th>
                          <th className="px-3 py-2">entrada</th>
                          <th className="px-3 py-2">salida</th>
                          <th className="px-3 py-2">motivo</th>
                          <th className="px-3 py-2">resultado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {m.operaciones.map((t) => (
                          <tr key={t.id} className={cn('border-b border-border', t.status === 'rejected' && 'text-muted/60')}>
                            <td className="px-3 py-2">{fecha(t.openedAt)}</td>
                            <td className="px-3 py-2">{t.symbol}</td>
                            <td className="px-3 py-2">{usd(t.sizeUsd)}</td>
                            <td className="px-3 py-2">{t.status === 'rejected' ? 'rechazada' : usd(t.entryPrice)}</td>
                            <td className="px-3 py-2">{usd(t.exitPrice)}</td>
                            <td className="px-3 py-2">{t.exitReason ?? (t.status === 'open' ? 'abierta' : t.status === 'rejected' ? t.note?.slice(0, 60) : '—')}</td>
                            <td className={cn('px-3 py-2', t.pnlUsd != null && (t.pnlUsd >= 0 ? 'text-neon' : 'text-red-400'))}>
                              {t.pnlUsd == null ? '—' : `${t.pnlUsd >= 0 ? '+' : ''}${usd(t.pnlUsd, 3)}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="space-y-3">
                <h2 className="text-xs uppercase tracking-widest text-muted">Últimas sesiones</h2>
                <ul className="divide-y divide-border border border-border">
                  {m.sesiones.map((s) => {
                    const e = estadoSesion(s)
                    return (
                      <li key={s.id} className="px-4 py-3 space-y-1">
                        <div className="flex flex-wrap gap-x-4 text-xs font-mono">
                          <span className="text-muted">{fecha(s.startedAt)}</span>
                          <span className={e.tone}>{e.label}</span>
                        </div>
                        {(s.finalReport?.resumen || s.finalReport?.reason) && (
                          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">{s.finalReport.resumen ?? s.finalReport.reason}</p>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            </>
          )}

          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-muted">Quién hace qué</h2>
            <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
              {AGENTES.map(([nombre, trabajo]) => (
                <li key={nombre} className="bg-background px-4 py-3 text-sm">
                  <span className="font-black text-neon">{nombre}</span> <span className="text-muted">{trabajo}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted text-sm max-w-2xl leading-relaxed">
              Los agentes no comparten memoria: solo se pasan ficheros con remitente, destinatario, carga y motivo. Cada traspaso queda
              registrado; cada veto y cada devolución, también. Es el mismo sistema que usamos para revisar textos en una revista literaria.
            </p>
          </section>

          <section className="border-t border-border pt-10 text-center space-y-4">
            <p className="text-muted text-sm">¿Quieres un sistema así trabajando para tu negocio?</p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors"
            >
              Hablemos <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="bg-background px-4 py-3">
      <p className="text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <p className={cn('text-lg font-black font-mono', tone)}>{value}</p>
    </div>
  )
}
