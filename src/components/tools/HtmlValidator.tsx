'use client'

import { useState } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  stats: {
    tags: number
    attributes: number
    textLength: number
  }
}

export function HtmlValidator() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)

  const validate = () => {
    const errors: string[] = []
    const warnings: string[] = []
    let tags = 0
    let attributes = 0

    if (!code.trim()) {
      setResult({
        valid: false,
        errors: ['Código vacío'],
        warnings: [],
        stats: { tags: 0, attributes: 0, textLength: 0 }
      })
      return
    }

    // Check for basic HTML structure
    if (!code.toLowerCase().includes('<html')) {
      warnings.push('No se encuentra tag <html>')
    }
    if (!code.toLowerCase().includes('<head')) {
      warnings.push('No se encuentra tag <head>')
    }
    if (!code.toLowerCase().includes('<body')) {
      warnings.push('No se encuentra tag <body>')
    }

    // Count tags and check basic issues
    const tagMatches = code.match(/<[^>]+>/g) || []
    tags = tagMatches.length

    // Check for unclosed tags (basic check)
    const selfClosing = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'command', 'embed', 'keygen', 'param', 'source', 'track', 'wbr'])

    tagMatches.forEach((tag, i) => {
      if (tag.startsWith('</')) return // Closing tag

      const tagName = tag.match(/<(\w+)/)?.[1]?.toLowerCase()
      if (!tagName) return

      // Check for attributes
      const attrMatches = tag.match(/\s\w+=/g)
      if (attrMatches) {
        attributes += attrMatches.length
      }

      // Check for self-closing tags
      if (selfClosing.has(tagName) && !tag.endsWith('/>') && !tag.endsWith('>')) {
        warnings.push(`Tag <${tagName}> debería ser self-closing (con /)`)
      }

      // Check for alt on images
      if (tagName === 'img' && !tag.includes('alt=')) {
        errors.push(`Falta atributo alt en tag <img>`)
      }

      // Check for href on links
      if (tagName === 'a' && !tag.includes('href=')) {
        warnings.push(`Falta atributo href en tag <a>`)
      }
    })

    // Check for DOCTYPE
    if (!code.toLowerCase().includes('<!doctype')) {
      warnings.push('Falta declaración DOCTYPE')
    }

    // Check for title
    if (!code.toLowerCase().match(/<title[^>]*>.*<\/title>/)) {
      warnings.push('Falta tag <title>')
    }

    // Check for meta description
    if (!code.toLowerCase().includes('name="description"') && !code.toLowerCase().includes("name='description'")) {
      warnings.push('Falta meta description')
    }

    // Check for viewport
    if (!code.toLowerCase().includes('viewport')) {
      warnings.push('Falta meta viewport para responsive')
    }

    setResult({
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        tags,
        attributes,
        textLength: code.replace(/<[^>]+>/g, '').length
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
          Código HTML
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="<!DOCTYPE html>
<html>
<head>
  <title>Mi página</title>
</head>
<body>
  <h1>Hola mundo</h1>
</body>
</html>"
          className="w-full h-64 px-4 py-3 border border-border bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-neon"
        />
        <button
          onClick={validate}
          disabled={!code.trim()}
          className="mt-3 px-6 py-2 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Validar
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Status */}
          <div className={`flex items-center gap-3 p-4 border ${result.valid ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
            {result.valid ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <X size={20} className="text-red-500" />
            )}
            <div>
              <p className="font-bold text-sm">
                {result.valid ? 'HTML válido' : 'HTML con errores'}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Tags</p>
              <p className="text-lg font-bold">{result.stats.tags}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Atributos</p>
              <p className="text-lg font-bold">{result.stats.attributes}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Texto</p>
              <p className="text-lg font-bold">{result.stats.textLength}</p>
            </div>
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider font-mono text-red-500">Errores</p>
              {result.errors.map((error, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <X size={14} className="text-red-500 mt-0.5" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider font-mono text-yellow-500">Advertencias</p>
              {result.warnings.map((warning, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <AlertCircle size={14} className="text-yellow-500 mt-0.5" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          )}

          {result.errors.length === 0 && result.warnings.length === 0 && (
            <div className="bg-green-500/10 border border-green-500/30 p-4 text-sm text-green-500 flex items-center gap-2">
              <Check size={16} />
              ¡Sin errores ni advertencias!
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-muted">
        Esta es una validación básica. Para una validación completa, usa el
        {' '}
        <a
          href="https://validator.w3.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon hover:underline"
        >
          Validador W3C
        </a>
      </p>
    </div>
  )
}
