'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let html = ''

    // Basic
    if (title) html += `  <title>${title}</title>\n`
    if (description) html += `  <meta name="description" content="${description}">\n`

    // Open Graph
    if (title) html += `  <meta property="og:title" content="${title}">\n`
    if (description) html += `  <meta property="og:description" content="${description}">\n`
    if (url) html += `  <meta property="og:url" content="${url}">\n`
    if (image) html += `  <meta property="og:image" content="${image}">\n`
    html += `  <meta property="og:type" content="website">\n`

    // Twitter Card
    html += `  <meta name="twitter:card" content="summary_large_image">\n`
    if (title) html += `  <meta name="twitter:title" content="${title}">\n`
    if (description) html += `  <meta name="twitter:description" content="${description}">\n`
    if (image) html += `  <meta name="twitter:image" content="${image}">\n`
    if (twitterHandle) html += `  <meta name="twitter:site" content="${twitterHandle}">\n`

    // Additional SEO
    html += `  <link rel="canonical" href="${url || ''}">\n`

    return html
  }

  const copy = () => {
    navigator.clipboard.writeText(generate())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mi sitio web increíble"
            maxLength={60}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
          <p className="text-xs text-muted mt-1">
            {title.length}/60 caracteres
          </p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción atractiva de tu sitio para resultados de búsqueda..."
            maxLength={160}
            rows={3}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon resize-none"
          />
          <p className="text-xs text-muted mt-1">
            {description.length}/160 caracteres
          </p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            URL (canonical)
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Imagen (OG/Twitter)
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://ejemplo.com/og-image.jpg"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
          <p className="text-xs text-muted mt-1">
            Recomendado: 1200 × 630px (mínimo 600 × 315px)
          </p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Twitter handle
          </label>
          <input
            type="text"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            placeholder="@usuario"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>
      </div>

      {/* Output */}
      {(title || description) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              HTML generado
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
          <pre className="bg-card border border-border p-4 text-sm font-mono overflow-x-auto">
            <code>{generate()}</code>
          </pre>
        </div>
      )}

      {/* Preview cards */}
      {(title || description || image) && (
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-mono text-neon">Vista previa</h3>

          {/* Google preview */}
          <div className="bg-card border border-border p-4 space-y-2">
            <p className="text-xs text-muted">Resultado de búsqueda</p>
            <p className="text-sm text-neon truncate">{url || 'ejemplo.com'}</p>
            <p className="text-base text-blue-600 hover:underline truncate">{title || 'Título de tu página'}</p>
            <p className="text-sm text-muted line-clamp-2">{description || 'Descripción de tu página que aparecerá en los resultados de búsqueda...'}</p>
          </div>

          {/* Social preview */}
          <div className="bg-card border border-border p-4 space-y-2">
            <p className="text-xs text-muted">Redes sociales (Facebook/Twitter)</p>
            {image && (
              <div className="aspect-video bg-muted flex items-center justify-center text-xs text-muted">
                [Imagen: {image}]
              </div>
            )}
            <p className="text-sm font-bold">{title || 'Título'}</p>
            <p className="text-xs text-muted">{url || 'ejemplo.com'}</p>
            <p className="text-sm text-muted line-clamp-2">{description || 'Descripción...'}</p>
          </div>
        </div>
      )}
    </div>
  )
}
