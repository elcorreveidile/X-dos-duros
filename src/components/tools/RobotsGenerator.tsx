'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type Agent = 'allow' | 'disallow'

export function RobotsGenerator() {
  const [userAgent, setUserAgent] = useState('*')
  const [rules, setRules] = useState<Array<{ path: string, type: Agent }>>([
    { path: '/', type: 'allow' }
  ])
  const [sitemap, setSitemap] = useState('')
  const [copied, setCopied] = useState(false)

  const addRule = () => {
    setRules([...rules, { path: '', type: 'disallow' }])
  }

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index))
  }

  const updateRule = (index: number, field: 'path' | 'type', value: string | Agent) => {
    const newRules = [...rules]
    newRules[index][field] = value as never
    setRules(newRules)
  }

  const generate = () => {
    let output = `User-agent: ${userAgent}\n`

    rules.forEach(rule => {
      if (rule.path) {
        output += `${rule.type === 'allow' ? 'Allow' : 'Disallow'}: ${rule.path}\n`
      }
    })

    if (sitemap) {
      output += `\nSitemap: ${sitemap}\n`
    }

    return output
  }

  const copy = () => {
    navigator.clipboard.writeText(generate())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Config */}
      <div className="space-y-6">
        {/* User agent */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            User-agent
          </label>
          <select
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          >
            <option value="*">* (todos los bots)</option>
            <option value="Googlebot">Googlebot</option>
            <option value="Googlebot-Image">Googlebot-Image</option>
            <option value="Googlebot-News">Googlebot-News</option>
            <option value="bingbot">bingbot</option>
            <option value="Slurp">Slurp (Yahoo)</option>
            <option value="DuckDuckBot">DuckDuckBot</option>
          </select>
        </div>

        {/* Rules */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              Reglas
            </label>
            <button
              onClick={addRule}
              className="text-xs text-neon hover:text-neon/80"
            >
              + Añadir regla
            </button>
          </div>
          <div className="space-y-2">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={rule.type}
                  onChange={(e) => updateRule(index, 'type', e.target.value as Agent)}
                  className="px-3 py-2 border border-border bg-background text-foreground text-xs uppercase focus:outline-none focus:border-neon"
                >
                  <option value="allow">Allow</option>
                  <option value="disallow">Disallow</option>
                </select>
                <input
                  type="text"
                  value={rule.path}
                  onChange={(e) => updateRule(index, 'path', e.target.value)}
                  placeholder="/admin"
                  className="flex-1 px-3 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
                />
                {rules.length > 1 && (
                  <button
                    onClick={() => removeRule(index)}
                    className="px-3 text-red-500 hover:text-red-400"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Sitemap (opcional)
          </label>
          <input
            type="url"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="https://ejemplo.com/sitemap.xml"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:border-neon"
          />
        </div>
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-wider font-mono text-muted">
            robots.txt generado
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
          {generate()}
        </pre>
      </div>
    </div>
  )
}
