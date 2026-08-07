'use client'

import { useState } from 'react'
import { Copy, Check, Wand2 } from 'lucide-react'

export function Beautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [type, setType] = useState<'css' | 'js' | 'html'>('css')
  const [copied, setCopied] = useState(false)

  const beautifyCss = (css: string) => {
    let formatted = ''
    let indent = 0
    const tab = '  '

    // Remove existing formatting
    css = css.replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1')

    for (let i = 0; i < css.length; i++) {
      const char = css[i]

      if (char === '{') {
        formatted += ' {\n' + tab.repeat(++indent)
      } else if (char === '}') {
        formatted += '\n' + tab.repeat(--indent) + '}'
        if (i < css.length - 1 && css[i + 1] !== '}') {
          formatted += '\n\n'
        }
      } else if (char === ';') {
        formatted += ';\n' + tab.repeat(indent)
      } else if (char === ':') {
        formatted += ': '
      } else {
        formatted += char
      }
    }

    return formatted.trim()
  }

  const beautifyJs = (js: string) => {
    let formatted = ''
    let indent = 0
    const tab = '  '

    // Remove existing formatting
    js = js.replace(/\s+/g, ' ').replace(/\s*([{}();,:<>=+*/%!&|])\s*/g, '$1')

    for (let i = 0; i < js.length; i++) {
      const char = js[i]

      if (char === '{') {
        formatted += ' {\n' + tab.repeat(++indent)
      } else if (char === '}') {
        formatted += '\n' + tab.repeat(--indent) + '}'
      } else if (char === ';') {
        formatted += ';\n' + tab.repeat(indent)
      } else {
        formatted += char
      }
    }

    return formatted.trim()
  }

  const beautifyHtml = (html: string) => {
    let formatted = ''
    let indent = 0
    const tab = '  '

    html = html.replace(/\s+</g, '<').replace(/>\s+/g, '>')

    for (let i = 0; i < html.length; i++) {
      const char = html[i]

      if (char === '<') {
        if (html[i + 1] === '/') {
          // Closing tag
          formatted += '\n' + tab.repeat(Math.max(0, --indent)) + '</'
        } else {
          // Opening tag
          if (formatted.endsWith('>')) {
            formatted += '\n' + tab.repeat(indent)
          }
          formatted += '<'
          indent++
        }
      } else if (char === '>') {
        formatted += '>'
      } else {
        formatted += char
      }
    }

    return formatted.trim()
  }

  const handleBeautify = () => {
    if (!input.trim()) return

    let result = ''
    switch (type) {
      case 'css':
        result = beautifyCss(input)
        break
      case 'js':
        result = beautifyJs(input)
        break
      case 'html':
        result = beautifyHtml(input)
        break
    }
    setOutput(result)
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
          <button
            onClick={() => setType('html')}
            className={`px-4 py-2 border text-sm uppercase tracking-wider transition-colors ${
              type === 'html'
                ? 'border-neon text-neon bg-neon/10'
                : 'border-border text-muted hover:border-neon'
            }`}
          >
            HTML
          </button>
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
          Código formatear
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Pega aquí tu código ${type} formatear...`}
          className="w-full h-48 px-4 py-3 border border-border bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:border-neon"
        />
      </div>

      {/* Beautify button */}
      <button
        onClick={handleBeautify}
        disabled={!input.trim()}
        className="w-full px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Wand2 size={16} />
        Formatear
      </button>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              Código formateado
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
