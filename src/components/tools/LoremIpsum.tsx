'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

const WORDS = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'dolor', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur',
  'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
  'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

const SPANISH_WORDS = [
  'texto', 'de', 'prueba', 'para', 'diseño', 'web', 'contenido', 'artículo',
  'página', 'sitio', 'internet', 'desarrollo', 'creación', 'diseño', 'editorial',
  'periodismo', 'redacción', 'escritura', 'publicación', 'blog', 'noticias',
  'información', 'comunicación', 'medios', 'digitales', 'online', 'plataforma',
  'portal', 'web', 'sitio', 'página', 'contenido', 'artículo', 'post', 'entrada',
  'blog', 'noticia', 'información', 'dato', 'mensaje', 'texto', 'palabra', 'frase',
  'párrafo', 'título', 'subtítulo', 'encabezado', 'cuerpo', 'pie', 'página',
  'sección', 'categoría', 'etiqueta', 'comentario', 'respuesta', 'discusión',
  'conversación', 'hilo', 'tema', 'asunto', 'temática', 'contenido', 'material'
]

export function LoremIpsum() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [count, setCount] = useState('3')
  const [language, setLanguage] = useState<'latin' | 'spanish'>('spanish')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const wordList = language === 'latin' ? WORDS : SPANISH_WORDS
    const num = parseInt(count) || 1
    let result = ''

    if (type === 'words') {
      const words = []
      for (let i = 0; i < num; i++) {
        words.push(wordList[Math.floor(Math.random() * wordList.length)])
      }
      result = words.join(' ')
    } else if (type === 'sentences') {
      const sentences = []
      for (let i = 0; i < num; i++) {
        const sentenceLength = Math.floor(Math.random() * 10) + 5
        const words = []
        for (let j = 0; j < sentenceLength; j++) {
          words.push(wordList[Math.floor(Math.random() * wordList.length)])
        }
        sentences.push(words.join(' ') + '.')
      }
      result = sentences.join(' ')
    } else {
      const paragraphs = []
      for (let i = 0; i < num; i++) {
        const sentenceCount = Math.floor(Math.random() * 4) + 3
        const sentences = []
        for (let j = 0; j < sentenceCount; j++) {
          const sentenceLength = Math.floor(Math.random() * 10) + 5
          const words = []
          for (let k = 0; k < sentenceLength; k++) {
            words.push(wordList[Math.floor(Math.random() * wordList.length)])
          }
          sentences.push(words.join(' ') + '.')
        }
        paragraphs.push(sentences.join(' '))
      }
      result = paragraphs.join('\n\n')
    }

    setOutput(result)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const regenerate = () => {
    generate()
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="space-y-6">
        {/* Type and Language */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            >
              <option value="paragraphs">Párrafos</option>
              <option value="sentences">Frases</option>
              <option value="words">Palabras</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Idioma
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            >
              <option value="spanish">Español</option>
              <option value="latin">Latín (Lorem Ipsum)</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Cantidad
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            max="50"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors"
        >
          Generar texto
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider font-mono text-muted">
              Texto generado
            </label>
            <div className="flex gap-2">
              <button
                onClick={regenerate}
                className="flex items-center gap-2 text-xs text-muted hover:text-neon transition-colors"
              >
                <RefreshCw size={14} /> Regenerar
              </button>
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
          </div>
          <div className="bg-card border border-border p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{output}</p>
          </div>
          <p className="text-xs text-muted">
            {output.split(/\s+/).length} palabras · {output.split(/[.!?]+/).filter(s => s.trim()).length} frases
          </p>
        </div>
      )}
    </div>
  )
}
