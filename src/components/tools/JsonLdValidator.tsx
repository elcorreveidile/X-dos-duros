'use client'

import { useState } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  schemaType?: string
}

export function JsonLdValidator() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)

  const validate = () => {
    const errors: string[] = []
    const warnings: string[] = []
    let schemaType: string | undefined

    try {
      const parsed = JSON.parse(code)

      // Must be object
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        errors.push('JSON-LD debe ser un objeto, no un array')
      }

      // Must have @context
      if (!parsed['@context']) {
        errors.push('Falta @context (debe ser "https://schema.org" o "http://schema.org")')
      } else if (
        parsed['@context'] !== 'https://schema.org' &&
        parsed['@context'] !== 'http://schema.org'
      ) {
        warnings.push('@context debería ser "https://schema.org"')
      }

      // Must have @type
      if (!parsed['@type']) {
        errors.push('Falta @type (ej: "WebSite", "Organization", "Article")')
      } else {
        schemaType = parsed['@type']
      }

      // Common schema.org types validation
      if (parsed['@type'] === 'WebSite') {
        if (!parsed.url) warnings.push('WebSite debería tener "url"')
        if (!parsed.name) warnings.push('WebSite debería tener "name"')
      }

      if (parsed['@type'] === 'Organization') {
        if (!parsed.name) warnings.push('Organization debería tener "name"')
        if (!parsed.url) warnings.push('Organization debería tener "url"')
      }

      if (parsed['@type'] === 'Article' || parsed['@type'] === 'BlogPosting') {
        if (!parsed.headline) warnings.push('Article debería tener "headline"')
        if (!parsed.author) warnings.push('Article debería tener "author"')
        if (!parsed.datePublished) warnings.push('Article debería tener "datePublished"')
      }

      // Check for @graph (array of objects)
      if (parsed['@graph']) {
        if (!Array.isArray(parsed['@graph'])) {
          errors.push('@graph debe ser un array')
        }
      }

      setResult({
        valid: errors.length === 0,
        errors,
        warnings,
        schemaType
      })

    } catch (e) {
      setResult({
        valid: false,
        errors: ['JSON inválido: ' + (e instanceof Error ? e.message : 'Error desconocido')],
        warnings: []
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Pega tu JSON-LD
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mi Sitio",
  "url": "https://ejemplo.com"
}`}
          className="w-full h-64 px-4 py-3 border border-border bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-neon transition-colors"
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
                {result.valid ? 'JSON-LD válido' : 'JSON-LD con errores'}
              </p>
              {result.schemaType && (
                <p className="text-xs text-muted mt-1">
                  Tipo detectado: <code className="text-neon">{result.schemaType}</code>
                </p>
              )}
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
        </div>
      )}
    </div>
  )
}
