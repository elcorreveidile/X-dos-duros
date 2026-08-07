'use client'

import { useState } from 'react'
import { Zap, Clock, AlertCircle } from 'lucide-react'

interface SpeedResult {
  url: string
  time: number
  size: number
  status: number
}

export function SpeedTest() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SpeedResult | null>(null)
  const [error, setError] = useState('')

  const testSpeed = async () => {
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    const startTime = performance.now()

    try {
      const response = await fetch('/api/tools/test-speed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const endTime = performance.now()
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al medir la velocidad')
      }

      setResult({
        url: data.url,
        time: Math.round(endTime - startTime),
        size: data.size || 0,
        status: data.status || 200
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const getSpeedRating = (time: number) => {
    if (time < 500) return { label: 'Excelente', color: 'text-green-500' }
    if (time < 1000) return { label: 'Bueno', color: 'text-yellow-500' }
    if (time < 2000) return { label: 'Regular', color: 'text-orange-500' }
    return { label: 'Lento', color: 'text-red-500' }
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="flex gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ejemplo.com"
          className="flex-1 px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon transition-colors"
          onKeyPress={(e) => e.key === 'Enter' && testSpeed()}
        />
        <button
          onClick={testSpeed}
          disabled={loading || !url.trim()}
          className="px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? 'Analizando...' : 'Medir'}
          <Zap size={16} />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-500 flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5" />
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Main result */}
          <div className="bg-card border border-border p-6 text-center">
            <p className="text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Tiempo de carga
            </p>
            <p className="text-5xl font-black">{result.time}</p>
            <p className="text-sm text-muted">ms</p>
            <p className={`text-sm font-bold mt-2 ${getSpeedRating(result.time).color}`}>
              {getSpeedRating(result.time).label}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border p-4">
              <p className="text-xs uppercase tracking-wider font-mono text-muted mb-1">
                Estado HTTP
              </p>
              <p className="text-2xl font-bold">{result.status}</p>
            </div>
            <div className="bg-card border border-border p-4">
              <p className="text-xs uppercase tracking-wider font-mono text-muted mb-1">
                Tamaño
              </p>
              <p className="text-2xl font-bold">{formatBytes(result.size)}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-card border border-border p-4 space-y-2">
            <p className="text-xs uppercase tracking-wider font-mono text-neon">Recomendaciones</p>
            {result.time > 1000 && (
              <p className="text-sm text-muted">• El tiempo de carga es superior a 1s. Considera optimizar imágenes y reducir JavaScript.</p>
            )}
            {result.time > 2000 && (
              <p className="text-sm text-muted">• El tiempo de carga es superior a 2s. Requiere optimización urgente para retener usuarios.</p>
            )}
            {result.time <= 500 && (
              <p className="text-sm text-muted">• ¡Excelente! Tu web carga muy rápido.</p>
            )}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-card border border-border p-4 space-y-2">
        <p className="text-xs font-mono text-neon">Nota</p>
        <p className="text-xs text-muted">
          Esta es una medición básica del tiempo de respuesta. Para un análisis completo,
          usa Google PageSpeed Insights o Lighthouse.
        </p>
      </div>
    </div>
  )
}
