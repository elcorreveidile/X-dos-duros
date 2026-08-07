'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function BorderRadiusGenerator() {
  const [topLeft, setTopLeft] = useState('8')
  const [topRight, setTopRight] = useState('8')
  const [bottomLeft, setBottomLeft] = useState('8')
  const [bottomRight, setBottomRight] = useState('8')
  const [copied, setCopied] = useState(false)

  const css = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
  const shorthand = topLeft === topRight && topRight === bottomLeft && bottomLeft === bottomRight
    ? `${topLeft}px`
    : css

  const copy = () => {
    navigator.clipboard.writeText(`border-radius: ${shorthand};`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { name: 'Square', values: [0, 0, 0, 0] },
    { name: 'Rounded', values: [8, 8, 8, 8] },
    { name: 'Pill', values: [9999, 9999, 9999, 9999] },
    { name: 'Leaf', values: [0, 9999, 9999, 0] },
    { name: 'Arch', values: [9999, 9999, 0, 0] },
    { name: 'Blob', values: [40, 60, 30, 70] },
  ]

  const applyPreset = (values: number[]) => {
    setTopLeft(values[0].toString())
    setTopRight(values[1].toString())
    setBottomRight(values[2].toString())
    setBottomLeft(values[3].toString())
  }

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Presets rápidos
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.values)}
              className="px-3 py-2 border border-border hover:border-neon hover:text-neon transition-colors text-sm"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <div
          className="h-48 bg-card border border-border flex items-center justify-center transition-all duration-200"
          style={{ borderRadius: css }}
        >
          <span className="text-sm text-muted">Preview</span>
        </div>

        {/* Diagram */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="h-24 bg-card/50 flex items-center justify-center text-xs text-muted"
            style={{ borderRadius: `${topLeft}px 0 0 0` }}
          >
            TL: {topLeft}px
          </div>
          <div
            className="h-24 bg-card/50 flex items-center justify-center text-xs text-muted"
            style={{ borderRadius: `0 ${topRight}px 0 0` }}
          >
            TR: {topRight}px
          </div>
          <div
            className="h-24 bg-card/50 flex items-center justify-center text-xs text-muted"
            style={{ borderRadius: `0 0 0 ${bottomLeft}px` }}
          >
            BL: {bottomLeft}px
          </div>
          <div
            className="h-24 bg-card/50 flex items-center justify-center text-xs text-muted"
            style={{ borderRadius: `0 0 ${bottomRight}px 0` }}
          >
            BR: {bottomRight}px
          </div>
        </div>
      </div>

      {/* Controls */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Radio de borde (px)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-12">Top-Left</span>
            <input
              type="range"
              min="0"
              max="100"
              value={topLeft}
              onChange={(e) => setTopLeft(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={topLeft}
              onChange={(e) => setTopLeft(e.target.value)}
              className="w-16 px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-12">Top-Right</span>
            <input
              type="range"
              min="0"
              max="100"
              value={topRight}
              onChange={(e) => setTopRight(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={topRight}
              onChange={(e) => setTopRight(e.target.value)}
              className="w-16 px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-12">Bottom-Left</span>
            <input
              type="range"
              min="0"
              max="100"
              value={bottomLeft}
              onChange={(e) => setBottomLeft(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={bottomLeft}
              onChange={(e) => setBottomLeft(e.target.value)}
              className="w-16 px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-12">Bottom-Right</span>
            <input
              type="range"
              min="0"
              max="100"
              value={bottomRight}
              onChange={(e) => setBottomRight(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={bottomRight}
              onChange={(e) => setBottomRight(e.target.value)}
              className="w-16 px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
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
          border-radius: {shorthand};
        </pre>
        <p className="text-xs text-muted mt-2">
          Forma corta: <code className="text-neon">{shorthand}</code>
        </p>
      </div>
    </div>
  )
}
