'use client'

import { useState } from 'react'
import { Smartphone, Monitor, ExternalLink } from 'lucide-react'

export function MobileFriendly() {
  const [url, setUrl] = useState('')
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop')

  const toggleView = () => {
    setView(view === 'desktop' ? 'mobile' : 'desktop')
  }

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
        />
        <button
          onClick={toggleView}
          disabled={!url.trim()}
          className="px-4 py-3 border border-border text-foreground text-sm uppercase tracking-wider hover:border-neon hover:text-neon transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {view === 'desktop' ? (
            <>
              <Smartphone size={16} /> Ver móvil
            </>
          ) : (
            <>
              <Monitor size={16} /> Ver desktop
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      {url && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted font-mono">
            <span>Vista: {view === 'desktop' ? 'Escritorio' : 'Móvil'}</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-neon"
            >
              Abrir <ExternalLink size={10} />
            </a>
          </div>

          <div className={view === 'mobile' ? 'max-w-[375px] mx-auto border-4 border-gray-800 rounded-lg overflow-hidden' : ''}>
            <iframe
              src={url}
              title="Preview"
              className="w-full bg-white border border-border"
              style={{ height: view === 'mobile' ? '667px' : '600px' }}
              sandbox="allow-same-origin allow-scripts"
            />
          </div>

          {view === 'mobile' && (
            <p className="text-xs text-muted text-center">
              Simulado en iPhone SE (375 × 667px)
            </p>
          )}
        </div>
      )}

      {!url && (
        <div className="bg-card border border-border p-8 text-center text-muted text-sm">
          Introduce una URL para ver cómo se ve en móvil y escritorio
        </div>
      )}
    </div>
  )
}
