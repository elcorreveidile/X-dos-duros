import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const AGENTES = ['Tokio', 'Denver', 'Estocolmo', 'Río', 'Berlín', 'Lisboa', 'Nairobi', 'Palermo', 'Helsinki', 'Profesor']

/** Fuente local (Inter, woff; satori no lee woff2). Si falla la lectura, se usa la fuente por defecto. */
async function fuentes() {
  try {
    const dir = join(process.cwd(), 'src/lib/fonts')
    const [black, medium] = await Promise.all([readFile(join(dir, 'inter-900.woff')), readFile(join(dir, 'inter-500.woff'))])
    return [
      { name: 'Inter', data: black, weight: 900 as const, style: 'normal' as const },
      { name: 'Inter', data: medium, weight: 500 as const, style: 'normal' as const },
    ]
  } catch {
    return []
  }
}

/** Imagen social de /mesa (1200×630): el anuncio del experimento de La Banda. */
export async function ogMesa() {
  const fonts = await fuentes()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '56px 60px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#39FF14' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(57,255,20,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: '#39FF14',
                color: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 900,
              }}
            >
              P
            </div>
            <span style={{ color: '#ffffff', fontSize: '16px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700 }}>
              Por 2 Duros
            </span>
          </div>
          <span style={{ color: '#39FF14', fontSize: '15px', letterSpacing: '5px', textTransform: 'uppercase' }}>
            Experimento · en público
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <span
            style={{
              color: '#ffffff',
              fontSize: '78px',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
            }}
          >
            La mesa: diez agentes,
          </span>
          <span
            style={{
              color: '#39FF14',
              fontSize: '78px',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
            }}
          >
            cien dólares.
          </span>
          <span style={{ color: '#cccccc', fontSize: '24px', fontWeight: 500, lineHeight: 1.35, marginTop: '6px', maxWidth: '980px' }}>
            Diez agentes de IA con un trabajo cada uno operan una cartera simulada en BTC y ETH. El que busca no aprueba; el que
            aprueba no ejecuta. Lo publicamos todo, gane o pierda.
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '820px' }}>
            {AGENTES.map((a) => (
              <span
                key={a}
                style={{
                  border: `1px solid ${a === 'Palermo' ? '#39FF14' : '#333333'}`,
                  color: a === 'Palermo' ? '#39FF14' : '#cccccc',
                  fontSize: '15px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '7px 12px',
                }}
              >
                {a}
              </span>
            ))}
          </div>
          <span style={{ color: '#39FF14', fontSize: '18px', letterSpacing: '2px', fontWeight: 900, whiteSpace: 'nowrap' }}>por2duros.com/mesa</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  )
}
