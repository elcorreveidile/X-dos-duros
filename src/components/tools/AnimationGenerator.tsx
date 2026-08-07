'use client'

import { useState } from 'react'
import { Copy, Check, Play } from 'lucide-react'

type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce'

export function AnimationGenerator() {
  const [type, setType] = useState<AnimationType>('fade')
  const [duration, setDuration] = useState('1')
  const [easing, setEasing] = useState('ease')
  const [delay, setDelay] = useState('0')
  const [copied, setCopied] = useState(false)
  const [playing, setPlaying] = useState(false)

  const animations = {
    fade: `from { opacity: 0; }
to { opacity: 1; }`,
    slide: `from { transform: translateX(-100%); }
to { transform: translateX(0); }`,
    scale: `from { transform: scale(0); }
to { transform: scale(1); }`,
    rotate: `from { transform: rotate(0deg); }
to { transform: rotate(360deg); }`,
    bounce: `0%, 100% { transform: translateY(0); }
50% { transform: translateY(-20px); }`
  }

  const keyframes = animations[type]
  const className = `my-${type}-animation`

  const css = `.${className} {
  animation: ${className} ${duration}s ${easing} ${delay}s;
}

@keyframes ${className} {
  ${keyframes}
}`

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const play = () => {
    setPlaying(true)
    setTimeout(() => setPlaying(false), (parseFloat(duration) + parseFloat(delay)) * 1000)
  }

  const getPreviewStyle = () => {
    const base = {
      animation: `${className} ${duration}s ${easing} ${delay}s`,
      animationFillMode: 'forwards' as const
    }
    return base
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
            Tipo de animación
          </label>
          <div className="flex flex-wrap gap-2">
            {(['fade', 'slide', 'scale', 'rotate', 'bounce'] as AnimationType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 border text-sm uppercase tracking-wider transition-colors ${
                  type === t
                    ? 'border-neon text-neon bg-neon/10'
                    : 'border-border text-muted hover:border-neon'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Duración (s)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="0.1"
              step="0.1"
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Easing
            </label>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            >
              <option value="ease">ease</option>
              <option value="linear">linear</option>
              <option value="ease-in">ease-in</option>
              <option value="ease-out">ease-out</option>
              <option value="ease-in-out">ease-in-out</option>
              <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">bounce</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Delay (s)
            </label>
            <input
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider font-mono text-muted">
            Vista previa
          </label>
          <button
            onClick={play}
            className="flex items-center gap-2 text-xs text-neon hover:text-neon/80"
          >
            <Play size={14} /> Reproducir
          </button>
        </div>

        <div className="bg-card border border-border p-8 flex items-center justify-center h-32">
          <div
            className={playing ? className : ''}
            style={playing ? getPreviewStyle() : {}}
          >
            <div className="w-16 h-16 bg-neon rounded" />
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
        <pre className="bg-card border border-border p-4 text-xs font-mono overflow-x-auto">
          {css}
        </pre>
      </div>

      {/* Info */}
      <div className="bg-card border border-border p-4 space-y-2">
        <p className="text-xs font-mono text-neon">Consejos</p>
        <p className="text-xs text-muted">
          • Añade "animation-fill-mode: forwards" para mantener el estado final<br />
          • Usa "animation-iteration-count: infinite" para loops<br />
          • Combina múltiples animaciones con comas en la propiedad animation
        </p>
      </div>
    </div>
  )
}
