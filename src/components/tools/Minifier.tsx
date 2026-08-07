'use client'

import { useState } from 'react'
import { Copy, Check, Minimize2 } from 'lucide-react'

export function Minifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [type, setType] = useState<'css' | 'js'>('css')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<{ original: number; minified: number; saved: number } | null>(null)

  const minifyCss = (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([{}:;,>])\s*/g, '$1') // Remove spaces around operators
      .replace(/;\}/g, '}') // Remove last semicolon
      .trim()
  }

  const minifyJs = (js: string) => {
    return js
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([{}();,:<>=+*/%!&|])\s*/g, '$1') // Remove spaces around operators
      .trim()
  }

  const handleMinify = () => {
    if (!input.trim()) return

    const result = type === 'css' ? minifyCss(input) : minifyJs(input)
    setOutput(result)

    const original = input.length
    const minified = result.length
    const saved = ((original - minified) / original * 100)

    setStats({ original, minified, saved: Math.round(saved) })
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
          Tipo de código
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setType('css')}
            className={`px-4 py-2 border text-sm uppercase tracking-wider transition-colors ${
              type === 'css'
                ? 'border-neon text-neon bg-neon/10'
                : 'border-border text-muted hover:border-neon'
            }`}
          >
            CSS
          </button>
          <button
            onClick={() => setType('js')}
            className={`px-4 py-2 border text-sm uppercase tracking-wider transition-colors ${
              type === 'js'
                ? 'border-neon text-neon bg-neon/10'
                : 'border-border text-muted hover:border-neon'
            }`}
          >
            JavaScript
          </button>
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
          Código original
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={type === 'css' ? '.mi-clase {\n  color: red;\n  font-size: 16px;\n}' : 'function miFuncion() {\n  console.log("Hola");\n}'}
          className="w-full h-48 px-4 py-3 border border-border bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-neon"
        />
      </div>

      {/* Minify button */}
      <button
        onClick={handleMinify}
        disabled={!input.trim()}
        className="w-full px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Minimize2 size={16} />
        Minificar
      </button>

      {/* Output */}
      {output && (
        <div className="space-y-4">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border p-3 text-center">
                <p className="text-xs text-muted">Original</p>
                <p className="text-lg font-bold">{stats.original} B</p>
              </div>
              <div className="bg-card border border-border p-3 text-center">
                <p className="text-xs text-muted">Minificado</p>
                <p className="text-lg font-bold">{stats.minified} B</p>
              </div>
              <div className="bg-card border border-border p-3 text-center">
                <p className="text-xs text-muted">Ahorrado</p>
                <p className="text-lg font-bold text-neon">{stats.saved}%</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              Código minificado
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
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
