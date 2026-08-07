'use client'

import { useState } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'

type Direction = 'to right' | 'to left' | 'to bottom' | 'to top' | 'to bottom right' | 'to top right'

export function GradientGenerator() {
  const [colors, setColors] = useState(['#667eea', '#764ba2'])
  const [direction, setDirection] = useState<Direction>('to right')
  const [copied, setCopied] = useState(false)

  const css = `linear-gradient(${direction}, ${colors.join(', ')})`

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addColor = () => {
    setColors([...colors, colors[colors.length - 1]])
  }

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }

  const reverse = () => {
    setColors([...colors].reverse())
  }

  const randomize = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setColors([randomColor(), randomColor()])
  }

  return (
    <div className="space-y-8">
      {/* Preview */}
      <div
        className="w-full h-48 rounded-lg shadow-inner"
        style={{ background: css }}
      />

      {/* Controls */}
      <div className="space-y-6">
        {/* Colors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              Colores
            </label>
            <div className="flex gap-2">
              <button
                onClick={reverse}
                className="text-xs text-muted hover:text-neon flex items-center gap-1"
              >
                <RotateCcw size={12} /> Invertir
              </button>
              <button
                onClick={randomize}
                className="text-xs text-neon hover:text-neon/80"
              >
                Random
              </button>
              <button
                onClick={addColor}
                className="text-xs text-neon hover:text-neon/80"
              >
                + Color
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {colors.map((color, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...colors]
                    newColors[index] = e.target.value
                    setColors(newColors)
                  }}
                  className="w-12 h-10 border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...colors]
                    newColors[index] = e.target.value
                    setColors(newColors)
                  }}
                  className="flex-1 px-3 py-2 border border-border bg-background text-foreground text-sm font-mono uppercase focus:outline-none focus:border-neon"
                />
                {colors.length > 2 && (
                  <button
                    onClick={() => removeColor(index)}
                    className="px-2 text-red-500 hover:text-red-400"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
            Dirección
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as Direction)}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          >
            <option value="to right">→ Derecha</option>
            <option value="to left">← Izquierda</option>
            <option value="to bottom">↓ Abajo</option>
            <option value="to top">↑ Arriba</option>
            <option value="to bottom right">↘ Diagonal derecha</option>
            <option value="to top right">↗ Diagonal izquierda</option>
          </select>
        </div>
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-wider font-mono text-muted">
            CSS generado
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
        <pre className="bg-card border border-border p-4 text-sm font-mono">
          background: {css};
        </pre>
      </div>
    </div>
  )
}
