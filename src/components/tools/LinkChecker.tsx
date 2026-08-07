'use client'

import { useState } from 'react'
import { Check, X, AlertCircle, ExternalLink } from 'lucide-react'

interface LinkResult {
  url: string
  status: number | null
  error: string | null
}

export function LinkChecker() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<LinkResult[]>([])
  const [error, setError] = useState('')

  const check = async () => {
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setResults([])

    try {
      const res = await fetch('/api/tools/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!res.ok) throw new Error('Error al analizar la página')

      const data = await res.json()
      setResults(data.links || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const broken = results.filter(r => r.status && r.status >= 400).length
  const total = results.length

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="flex gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ejemplo.com"
          className="flex-1 px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon transition-colors"
          onKeyPress={(e) => e.key === 'Enter' && check()}
        />
        <button
          onClick={check}
          disabled={loading || !url.trim()}
          className="px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analizando...' : 'Comprobar'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Total</p>
              <p className="text-lg font-bold">{total}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">OK</p>
              <p className="text-lg font-bold text-green-500">{total - broken}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Rotos</p>
              <p className="text-lg font-bold text-red-500">{broken}</p>
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider font-mono text-muted">
              Enlaces encontrados
            </p>
            {results.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-card border border-border"
              >
                {link.status === null ? (
                  <AlertCircle size={16} className="text-yellow-500" />
                ) : link.status >= 400 ? (
                  <X size={16} className="text-red-500" />
                ) : (
                  <Check size={16} className="text-green-500" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono truncate" title={link.url}>
                    {link.url}
                  </p>
                  {link.error && (
                    <p className="text-xs text-red-500">{link.error}</p>
                  )}
                </div>
                <p className="text-xs font-mono text-muted">
                  {link.status || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
