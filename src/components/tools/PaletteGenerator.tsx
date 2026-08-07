'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

interface Color {
  hex: string
  rgb: string
  hsl: string
}

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6')
  const [palette, setPalette] = useState<Color[]>([])
  const [copied, setCopied] = useState(false)

  const generatePalette = (hex: string) => {
    const colors: Color[] = []

    // Convert hex to RGB
    const hexToRgb = (h: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const rgbToHex = (r: number, g: number, b: number) => {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
    }

    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255; g /= 255; b /= 255
      const max = Math.max(r, g, b), min = Math.min(r, g, b)
      let h = 0, s = 0
      const l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
          case g: h = ((b - r) / d + 2) / 6; break
          case b: h = ((r - g) / d + 4) / 6; break
        }
      }
      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    }

    const rgb = hexToRgb(hex)
    if (!rgb) return

    // Generate palette using color harmonies
    const { r, g, b } = rgb
    const hsl = rgbToHsl(r, g, b)

    // 1. Original
    colors.push({
      hex: hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl
    })

    // 2. Complementary (opposite)
    const compHue = (parseInt(hsl.match(/\d+/)?.[0] || '0') + 180) % 360
    const compHsl = hsl.replace(/\d+/, compHue.toString())
    colors.push({
      hex: rgbToHex(...hslToRgb(compHsl)),
      rgb: `rgb(${hslToRgb(compHsl).join(', ')})`,
      hsl: compHsl
    })

    // 3. Analogous (30 degrees)
    const ana1Hue = (parseInt(hsl.match(/\d+/)?.[0] || '0') + 30) % 360
    const ana1Hsl = hsl.replace(/\d+/, ana1Hue.toString())
    colors.push({
      hex: rgbToHex(...hslToRgb(ana1Hsl)),
      rgb: `rgb(${hslToRgb(ana1Hsl).join(', ')})`,
      hsl: ana1Hsl
    })

    // 4. Analogous 2 (-30 degrees)
    const ana2Hue = (parseInt(hsl.match(/\d+/)?.[0] || '0') - 30 + 360) % 360
    const ana2Hsl = hsl.replace(/\d+/, ana2Hue.toString())
    colors.push({
      hex: rgbToHex(...hslToRgb(ana2Hsl)),
      rgb: `rgb(${hslToRgb(ana2Hsl).join(', ')})`,
      hsl: ana2Hsl
    })

    // 5. Triadic (120 degrees)
    const triHue = (parseInt(hsl.match(/\d+/)?.[0] || '0') + 120) % 360
    const triHsl = hsl.replace(/\d+/, triHue.toString())
    colors.push({
      hex: rgbToHex(...hslToRgb(triHsl)),
      rgb: `rgb(${hslToRgb(triHsl).join(', ')})`,
      hsl: triHsl
    })

    setPalette(colors)
  }

  const hslToRgb = (hslStr: string) => {
    const match = hslStr.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (!match) return [0, 0, 0]

    let h = parseInt(match[1]) / 360
    const s = parseInt(match[2]) / 100
    const l = parseInt(match[3]) / 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  useEffect(() => {
    generatePalette(baseColor)
  }, [baseColor])

  const copyAll = () => {
    const css = palette.map(c => `  ${c.hsl} /* ${c.hex} */`).join('\n')
    navigator.clipboard.writeText(`/* Paleta */\n${css}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Color base
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-10 border border-border cursor-pointer"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="flex-1 px-3 py-2 border border-border bg-background text-foreground text-sm font-mono uppercase focus:outline-none focus:border-neon"
            />
          </div>
        </div>
        <button
          onClick={() => setBaseColor(randomColor())}
          className="px-4 py-2 border border-border text-foreground text-sm uppercase tracking-wider hover:border-neon hover:text-neon transition-colors flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Random
        </button>
      </div>

      {/* Palette */}
      {palette.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              Paleta generada
            </label>
            <button
              onClick={copyAll}
              className="flex items-center gap-2 text-xs text-neon hover:text-neon/80"
            >
              {copied ? (
                <>
                  <Check size={14} /> Copiado
                </>
              ) : (
                <>
                  <Copy size={14} /> Copiar CSS
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {palette.map((color, index) => (
              <div
                key={index}
                className="bg-background p-4 space-y-2"
              >
                <div
                  className="w-full h-20 rounded border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="space-y-1">
                  <p className="text-sm font-mono">{color.hex}</p>
                  <p className="text-xs text-muted font-mono">{color.hsl}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border p-4 space-y-2">
            <p className="text-xs font-mono text-neon">Armonía de color</p>
            <p className="text-xs text-muted">
              Complementario + Análogos + Triádico. Esta combinación crea paletas
              equilibradas y visuales para diseño web.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
