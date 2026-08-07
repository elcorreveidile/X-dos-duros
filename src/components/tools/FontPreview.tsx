'use client'

import { useState } from 'react'

const FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Playfair Display',
  'Merriweather',
  'Source Sans Pro',
  'Poppins'
]

export function FontPreview() {
  const [text, setText] = useState('El rápido zorro marrón salta sobre el perro perezoso. The quick brown fox jumps over the lazy dog.')
  const [size, setSize] = useState('24')
  const [fonts, setFonts] = useState(['Inter', 'Roboto', 'Open Sans'])

  const addFont = (font: string) => {
    if (!fonts.includes(font)) {
      setFonts([...fonts, font])
    }
  }

  const removeFont = (font: string) => {
    if (fonts.length > 1) {
      setFonts(fonts.filter(f => f !== font))
    }
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Texto de ejemplo
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Tamaño de fuente (px)
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted mt-1">{size}px</p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Añadir fuente
          </label>
          <select
            onChange={(e) => e.target.value && addFont(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            defaultValue=""
          >
            <option value="">Selecciona una fuente...</option>
            {FONTS.filter(f => !fonts.includes(f)).map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        {fonts.map(font => (
          <div key={font} className="bg-card border border-border p-4 relative group">
            <button
              onClick={() => removeFont(font)}
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            >
              × Eliminar
            </button>
            <p className="text-xs font-mono text-muted mb-3">{font}</p>
            <p
              style={{
                fontFamily: font,
                fontSize: `${size}px`,
                lineHeight: '1.4'
              }}
              className="transition-all"
            >
              {text}
            </p>
            <div className="mt-3 flex gap-4 text-xs text-muted font-mono">
              <span>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
              <span>abcdefghijklmnopqrstuvwxyz</span>
              <span>0123456789</span>
            </div>
          </div>
        ))}
      </div>

      {/* CSS code */}
      <div className="bg-card border border-border p-4">
        <p className="text-xs font-mono text-muted mb-3">CSS para usar {fonts[0]}</p>
        <pre className="text-xs font-mono text-neon overflow-x-auto">
          {`@import url('https://fonts.googleapis.com/css2?family=${fonts[0]?.replace(' ', '+')}&display=swap');

body {
  font-family: '${fonts[0]}', sans-serif;
}`}
        </pre>
      </div>
    </div>
  )
}
