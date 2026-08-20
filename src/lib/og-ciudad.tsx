import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export function ogCiudad(ciudad: string, subtitulo?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#0a0a0a',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Neon accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: '#39FF14',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Brand tag */}
        <div
          style={{
            position: 'absolute',
            top: '52px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ color: '#39FF14', fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase' }}>
            Por 2 Duros
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              color: '#39FF14',
              fontSize: '14px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
            }}
          >
            Agencia Web ·
          </span>
          <span
            style={{
              color: '#ffffff',
              fontSize: '80px',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
            }}
          >
            {ciudad}
          </span>
          <span
            style={{
              color: '#888888',
              fontSize: '22px',
              marginTop: '8px',
            }}
          >
            {subtitulo ?? 'Webs, landing pages y tiendas online desde €299 · Entrega en 48h'}
          </span>
        </div>

        {/* URL tag */}
        <span
          style={{
            position: 'absolute',
            bottom: '52px',
            right: '60px',
            color: '#444444',
            fontSize: '14px',
            letterSpacing: '2px',
          }}
        >
          por2duros.com
        </span>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
