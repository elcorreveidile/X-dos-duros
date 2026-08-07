'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function FontCalculator() {
  const [minViewport, setMinViewport] = useState('320')
  const [maxViewport, setMaxViewport] = useState('1280')
  const [minFont, setMinFont] = useState('16')
  const [maxFont, setMaxFont] = useState('48')
  const [copied, setCopied] = useState(false)

  const clamp = `clamp(${minFont}px, ${minFont}px + (${parseFloat(maxFont) - parseFloat(minFont)}) * ((100vw - ${minViewport}px) / (${parseFloat(maxViewport) - parseFloat(minViewport)})), ${maxFont}px)`

  const copy = () => {
    navigator.clipboard.writeText(clamp)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-2 gap-6">
        {/* Viewport */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-mono text-neon">Viewport (px)</h3>
          <div>
            <label className="block text-xs text-muted mb-2">Mínimo (móvil)</label>
            <input
              type="number"
              value={minViewport}
              onChange={(e) => setMinViewport(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-2">Máximo (desktop)</label>
            <input
              type="number"
              value={maxViewport}
              onChange={(e) => setMaxViewport(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
            />
          </div>
        </div>

        {/* Font size */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-mono text-neon">Tamaño fuente (px)</h3>
          <div>
            <label className="block text-xs text-muted mb-2">Mínimo (móvil)</label>
            <input
              type="number"
              value={minFont}
              onChange={(e) => setMinFont(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-2">Máximo (desktop)</label>
            <input
              type="number"
              value={maxFont}
              onChange={(e) => setMaxFont(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
            />
          </div>
        </div>
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-wider font-mono text-muted">
            CSS clamp() generado
          </label>
          <button
            onClick={copy}
            className="flex items-center gap-2 text-xs text-neon hover:text-neon/80"
          >
            {copied ? (
              <>
                <Check size={14} /> Copiado
              </>
            ) : (
              <>
                <Copy size={14} /> Copiar
              </>
            )}
          </button>
        </div>
        <pre className="bg-card border border-border p-4 text-sm font-mono break-all">
          font-size: {clamp};
        </pre>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Vista previa
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border p-4">
            <p className="text-xs text-muted mb-2">Móvil ({minViewport}px)</p>
            <p style={{ fontSize: `${minFont}px` }}>
              Texto de ejemplo
            </p>
          </div>
          <div className="bg-card border border-border p-4">
            <p className="text-xs text-muted mb-2">Desktop ({maxViewport}px)</p>
            <p style={{ fontSize: `${maxFont}px` }}>
              Texto de ejemplo
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-card border border-border p-4 space-y-2">
        <p className="text-xs font-mono text-neon">¿Cómo funciona clamp()?</p>
        <p className="text-xs text-muted">
          <code>clamp(min, preferred, max)</code> establece un tamaño mínimo, máximo,
          y un valor preferido que escala fluidamente entre breakpoints. Sin media queries,
          sin saltos bruscos.
        </p>
      </div>
    </div>
  )
}
