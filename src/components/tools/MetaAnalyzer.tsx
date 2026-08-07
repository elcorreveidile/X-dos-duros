'use client'

import { useState } from 'react'
import { Search, Check, X, ExternalLink } from 'lucide-react'

interface MetaData {
  title?: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
  robots?: string
  viewport?: string
  charset?: string
  language?: string
}

export function MetaAnalyzer() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<MetaData | null>(null)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setData(null)

    try {
      const res = await fetch('/api/tools/analyze-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!res.ok) throw new Error('Error al analizar la URL')

      const result = await res.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const MetaItem = ({
    label,
    value,
    valid,
    recommended
  }: {
    label: string
    value?: string
    valid?: boolean
    recommended?: string
  }) => (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted mb-1">{label}</p>
        {value ? (
          <p className="text-sm font-mono truncate" title={value}>{value}</p>
        ) : (
          <p className="text-sm text-muted italic">No encontrado</p>
        )}
        {recommended && (
          <p className="text-xs text-muted mt-1">Recomendado: {recommended}</p>
        )}
      </div>
      <div className="ml-4">
        {valid === undefined ? (
          <span className="text-muted text-xs">—</span>
        ) : valid ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <X size={16} className="text-red-500" />
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && analyze()}
          />
        </div>
        <button
          onClick={analyze}
          disabled={loading || !url.trim()}
          className="px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? 'Analizando...' : 'Analizar'}
          <Search size={16} />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {/* Basic info */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-mono text-neon mb-4">Información básica</h3>
            <div className="bg-card border border-border">
              <MetaItem
                label="Title"
                value={data.title}
                valid={!!data.title && data.title.length >= 30 && data.title.length <= 60}
                recommended="30-60 caracteres"
              />
              <MetaItem
                label="Description"
                value={data.description}
                valid={!!data.description && data.description.length >= 120 && data.description.length <= 160}
                recommended="120-160 caracteres"
              />
              <MetaItem
                label="Canonical"
                value={data.canonical}
                valid={!!data.canonical}
              />
              <MetaItem
                label="Charset"
                value={data.charset}
                valid={data.charset === 'utf-8'}
                recommended="utf-8"
              />
              <MetaItem
                label="Viewport"
                value={data.viewport}
                valid={!!data.viewport}
                recommended="width=device-width, initial-scale=1"
              />
              <MetaItem
                label="Language"
                value={data.language}
                valid={!!data.language}
              />
            </div>
          </div>

          {/* Open Graph */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-mono text-neon mb-4">Open Graph (Facebook/LinkedIn)</h3>
            <div className="bg-card border border-border">
              <MetaItem
                label="OG Title"
                value={data.ogTitle}
                valid={!!data.ogTitle}
              />
              <MetaItem
                label="OG Description"
                value={data.ogDescription}
                valid={!!data.ogDescription}
              />
              <MetaItem
                label="OG Image"
                value={data.ogImage}
                valid={!!data.ogImage}
              />
            </div>
          </div>

          {/* Twitter */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-mono text-neon mb-4">Twitter Card</h3>
            <div className="bg-card border border-border">
              <MetaItem
                label="Card Type"
                value={data.twitterCard}
                valid={!!data.twitterCard}
                recommended="summary_large_image"
              />
            </div>
          </div>

          {/* SEO */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-mono text-neon mb-4">SEO</h3>
            <div className="bg-card border border-border">
              <MetaItem
                label="Robots"
                value={data.robots}
              />
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-neon transition-colors"
          >
            Ver sitio <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  )
}
