'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type SchemaType = 'WebSite' | 'Organization' | 'Article' | 'LocalBusiness' | 'Product'

export function SchemaGenerator() {
  const [type, setType] = useState<SchemaType>('WebSite')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [datePublished, setDatePublished] = useState('')
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  const [telephone, setTelephone] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let schema: any = {
      '@context': 'https://schema.org',
      '@type': type
    }

    switch (type) {
      case 'WebSite':
        schema.name = name || 'Mi Sitio Web'
        schema.url = url
        break

      case 'Organization':
        schema.name = name || 'Mi Empresa'
        schema.url = url
        if (description) schema.description = description
        break

      case 'Article':
        schema.headline = name || 'Título del artículo'
        schema.author = { '@type': 'Person', name: author || 'Autor' }
        if (datePublished) schema.datePublished = datePublished
        if (description) schema.description = description
        break

      case 'LocalBusiness':
        schema.name = name || 'Mi Negocio'
        if (address) schema.address = { '@type': 'PostalAddress', streetAddress: address }
        if (telephone) schema.telephone = telephone
        if (url) schema.url = url
        break

      case 'Product':
        schema.name = name || 'Mi Producto'
        if (description) schema.description = description
        if (price) schema.offers = {
          '@type': 'Offer',
          price: price,
          priceCurrency: 'EUR'
        }
        if (url) schema.url = url
        break
    }

    return `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`
  }

  const copy = () => {
    navigator.clipboard.writeText(generate())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Type selector */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Tipo de Schema
        </label>
        <div className="flex flex-wrap gap-2">
          {(['WebSite', 'Organization', 'Article', 'LocalBusiness', 'Product'] as SchemaType[]).map((t) => (
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

      {/* Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Nombre *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mi sitio/negocio/producto"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        {(type === 'Article' || type === 'Organization' || type === 'Product') && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción..."
              rows={3}
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon resize-none"
            />
          </div>
        )}

        {type === 'Article' && (
          <>
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
                Autor
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nombre del autor"
                className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
                Fecha publicación
              </label>
              <input
                type="date"
                value={datePublished}
                onChange={(e) => setDatePublished(e.target.value)}
                className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
              />
            </div>
          </>
        )}

        {type === 'Product' && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Precio (EUR)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="99.99"
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
        )}

        {type === 'LocalBusiness' && (
          <>
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle Ejemplo, 123, Ciudad"
                className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="+34 900 000 000"
                className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
              />
            </div>
          </>
        )}
      </div>

      {/* Output */}
      {name && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              JSON-LD generado
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
            {generate()}
          </pre>
        </div>
      )}
    </div>
  )
}
