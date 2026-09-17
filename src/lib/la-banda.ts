/**
 * Cliente de La Banda (motor de agentes, repo la-banda) para la página pública
 * /mesa. Se llama SOLO desde el servidor con la clave LA_BANDA_API_KEY.
 */

export interface MesaTrade {
  id: string
  symbol: string
  status: 'open' | 'closed' | 'rejected'
  sizeUsd: number
  entryPrice: number
  exitPrice: number | null
  exitReason: string | null
  pnlUsd: number | null
  openedAt: string
  closedAt: string | null
  note: string | null
}

export interface MesaPosition {
  id: string
  symbol: string
  qty: number
  entryPrice: number
  stopPrice: number
  targetPrice: number | null
  costUsd: number
  lastClose: number | null
  valueUsd: number | null
  unrealizedUsd: number | null
  openedAt: string
  hoursOpen: number
}

export interface MesaSession {
  id: string
  status: 'open' | 'closed' | 'vetoed' | 'failed'
  startedAt: string
  closedAt: string | null
  finalReport: { resultado?: string; resumen?: string; mejora?: string; vetoedBy?: string; reason?: string } | null
}

export interface MesaEstado {
  reglas: { capitalInicialUsd: number; slippage: number; comision: number; simbolos: string[]; velas: string; ciclo: string }
  cartera: { initialUsd: number; cashUsd: number; equityUsd: number; positions: MesaPosition[] }
  metricas: { sesiones: number; operaciones: number; vetosPalermo: number; devolucionesLisboa: number; resultadoRealizadoUsd: number }
  operaciones: MesaTrade[]
  sesiones: MesaSession[]
}

export function laBandaConfigurada(): boolean {
  const ok = Boolean(process.env.LA_BANDA_URL && process.env.LA_BANDA_API_KEY)
  if (!ok) console.error('[la-banda] faltan LA_BANDA_URL o LA_BANDA_API_KEY en este despliegue')
  return ok
}

/** Tope de espera de La Banda. Menor que el maxDuration de la función: si La Banda está
 * fría (arranque en frío + consultas a Neon), la mesa degrada en vez de colgar la función. */
const LA_BANDA_TIMEOUT_MS = 7000

/** Último estado bueno en memoria del proceso: si una regeneración falla o tarda, servimos
 * este (mesa ligeramente antigua) en vez de la pantalla «en preparación». */
let ultimoBueno: MesaEstado | null = null

/**
 * Estado de la mesa; el último dato bueno (o null) si La Banda no está configurada, tarda o
 * no responde. Caché de 5 minutos (ISR de la página + caché del fetch). El timeout evita que
 * un arranque en frío de La Banda cuelgue el render de /mesa.
 */
export async function getMesaEstado(): Promise<MesaEstado | null> {
  if (!laBandaConfigurada()) return null
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), LA_BANDA_TIMEOUT_MS)
  try {
    const res = await fetch(`${process.env.LA_BANDA_URL!.replace(/\/$/, '')}/api/v1/trading`, {
      headers: { authorization: `Bearer ${process.env.LA_BANDA_API_KEY}` },
      next: { revalidate: 300 },
      signal: ctrl.signal,
    })
    if (!res.ok) {
      console.error('[la-banda] /api/v1/trading respondió', res.status)
      return ultimoBueno
    }
    ultimoBueno = (await res.json()) as MesaEstado
    return ultimoBueno
  } catch (err) {
    console.error('[la-banda] no se pudo consultar La Banda', err instanceof Error ? err.message : err)
    return ultimoBueno
  } finally {
    clearTimeout(t)
  }
}
