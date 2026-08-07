'use client'

import { useState } from 'react'

type Unit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%' | 'ch'

export function UnitConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState<Unit>('px')
  const [to, setTo] = useState<Unit>('rem')
  const [baseSize, setBaseSize] = useState('16')

  const convert = (val: string, fromUnit: Unit, toUnit: Unit, base: number): string => {
    const num = parseFloat(val)
    if (isNaN(num)) return ''

    // Primero a px
    let inPx = num
    switch (fromUnit) {
      case 'rem': inPx = num * base; break
      case 'em': inPx = num * base; break
      case 'vw': inPx = (num / 100) * 1920; break // Asumiendo 1920px base
      case 'vh': inPx = (num / 100) * 1080; break
      case '%': inPx = (num / 100) * 16; break // Relativo a font-size
    }

    // Luego de px a target
    let result = inPx
    switch (toUnit) {
      case 'rem': result = inPx / base; break
      case 'em': result = inPx / base; break
      case 'vw': result = (inPx / 1920) * 100; break
      case 'vh': result = (inPx / 1080) * 100; break
      case '%': result = (inPx / 16) * 100; break
    }

    // Limitar decimales
    return Number(result.toFixed(4)).toString()
  }

  const result = value ? convert(value, from, to, parseFloat(baseSize) || 16) : ''

  const units: Unit[] = ['px', 'rem', 'em', 'vw', 'vh', '%', 'ch']

  return (
    <div className="space-y-8">
      {/* Base font size */}
      <div className="bg-card border border-border p-4">
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
          Tamaño base del navegador (px)
        </label>
        <input
          type="number"
          value={baseSize}
          onChange={(e) => setBaseSize(e.target.value)}
          className="w-24 px-3 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
        />
        <p className="text-xs text-muted mt-2">
          Valor típico: 16px (por defecto en la mayoría de navegadores)
        </p>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            De
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="16"
              className="flex-1 px-4 py-3 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value as Unit)}
              className="px-3 py-3 border border-border bg-background text-foreground text-sm font-mono uppercase focus:outline-none focus:border-neon"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="text-center pb-3">
          <span className="text-neon">→</span>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            A
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={result}
              readOnly
              className="flex-1 px-4 py-3 border border-border bg-card text-foreground text-sm font-mono"
              placeholder="—"
            />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value as Unit)}
              className="px-3 py-3 border border-border bg-background text-foreground text-sm font-mono uppercase focus:outline-none focus:border-neon"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Reference */}
      <div className="bg-card border border-border p-4 space-y-3">
        <p className="text-xs font-mono text-neon">Referencias rápidas (base 16px)</p>
        <div className="grid grid-cols-3 gap-4 text-xs text-muted font-mono">
          <div>12px = 0.75rem</div>
          <div>14px = 0.875rem</div>
          <div>16px = 1rem</div>
          <div>18px = 1.125rem</div>
          <div>20px = 1.25rem</div>
          <div>24px = 1.5rem</div>
          <div>32px = 2rem</div>
          <div>48px = 3rem</div>
          <div>64px = 4rem</div>
        </div>
      </div>

      {/* Swap button */}
      <button
        onClick={() => {
          const temp = from
          setFrom(to)
          setTo(temp)
        }}
        className="text-xs text-muted hover:text-neon transition-colors uppercase tracking-wider"
      >
        ↔ Invertir unidades
      </button>
    </div>
  )
}
