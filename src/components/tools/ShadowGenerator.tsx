'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ShadowConfig {
  x: number
  y: number
  blur: number
  spread: number
  color: string
  opacity: number
  inset: boolean
}

export function ShadowGenerator() {
  const [shadows, setShadows] = useState<ShadowConfig[]>([
    { x: 0, y: 4, blur: 6, spread: 0, color: '#000000', opacity: 0.1, inset: false }
  ])
  const [copied, setCopied] = useState(false)

  const rgba = (color: string, opacity: number) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const css = shadows.map(s => {
    const color = rgba(s.color, s.opacity)
    return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${color}`
  }).join(', ')

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateShadow = (index: number, key: keyof ShadowConfig, value: ShadowConfig[keyof ShadowConfig]) => {
    setShadows(prev => prev.map((shadow, i) =>
      i === index ? { ...shadow, [key]: value } : shadow
    ))
  }

  const addShadow = () => {
    setShadows([...shadows, {
      x: 0, y: 4, blur: 6, spread: 0, color: '#000000', opacity: 0.1, inset: false
    }])
  }

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((_, i) => i !== index))
    }
  }

  const presets = [
    { name: 'Sutil', shadow: { x: 0, y: 2, blur: 4, spread: 0, color: '#000000', opacity: 0.1, inset: false } },
    { name: 'Media', shadow: { x: 0, y: 4, blur: 6, spread: 0, color: '#000000', opacity: 0.15, inset: false } },
    { name: 'Fuerte', shadow: { x: 0, y: 10, blur: 15, spread: 0, color: '#000000', opacity: 0.2, inset: false } },
    { name: 'Inset', shadow: { x: 0, y: 2, blur: 4, spread: 0, color: '#000000', opacity: 0.1, inset: true } },
    { name: 'Glow', shadow: { x: 0, y: 0, blur: 20, spread: 0, color: '#3b82f6', opacity: 0.5, inset: false } },
  ]

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
              onClick={() => setShadows([{ ...preset.shadow }])}
              className="px-3 py-2 border border-border hover:border-neon hover:text-neon transition-colors text-sm"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="h-32 bg-card rounded flex items-center justify-center"
          style={{ boxShadow: css }}
        >
          <span className="text-sm text-muted">Preview</span>
        </div>
        <div
          className="h-32 bg-card rounded flex items-center justify-center"
          style={{ boxShadow: css }}
        >
          <span className="text-sm text-muted">Preview</span>
        </div>
        <div
          className="h-32 bg-card rounded flex items-center justify-center"
          style={{ boxShadow: css }}
        >
          <span className="text-sm text-muted">Preview</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider font-mono text-muted">
            Sombras ({shadows.length})
          </label>
          <button
            onClick={addShadow}
            className="text-xs text-neon hover:text-neon/80"
          >
            + Añadir sombra
          </button>
        </div>

        {shadows.map((shadow, index) => (
          <div key={index} className="bg-card border border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted">Sombra #{index + 1}</span>
              {shadows.length > 1 && (
                <button
                  onClick={() => removeShadow(index)}
                  className="text-xs text-red-500 hover:text-red-400"
                >
                  Eliminar
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1">X</label>
                <input
                  type="number"
                  value={shadow.x}
                  onChange={(e) => updateShadow(index, 'x', parseInt(e.target.value))}
                  className="w-full px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Y</label>
                <input
                  type="number"
                  value={shadow.y}
                  onChange={(e) => updateShadow(index, 'y', parseInt(e.target.value))}
                  className="w-full px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Blur</label>
                <input
                  type="number"
                  value={shadow.blur}
                  onChange={(e) => updateShadow(index, 'blur', parseInt(e.target.value))}
                  className="w-full px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Spread</label>
                <input
                  type="number"
                  value={shadow.spread}
                  onChange={(e) => updateShadow(index, 'spread', parseInt(e.target.value))}
                  className="w-full px-2 py-1 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={shadow.color}
                    onChange={(e) => updateShadow(index, 'color', e.target.value)}
                    className="w-10 h-8 border border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={shadow.color}
                    onChange={(e) => updateShadow(index, 'color', e.target.value)}
                    className="flex-1 px-2 py-1 border border-border bg-background text-foreground text-sm font-mono uppercase focus:outline-none focus:border-neon"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Opacidad: {shadow.opacity}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={shadow.opacity}
                  onChange={(e) => updateShadow(index, 'opacity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shadow.inset}
                onChange={(e) => updateShadow(index, 'inset', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Inset (sombra interior)</span>
            </label>
          </div>
        ))}
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
          box-shadow: {css};
        </pre>
      </div>
    </div>
  )
}
