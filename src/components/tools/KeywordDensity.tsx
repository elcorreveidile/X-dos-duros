'use client'

import { useState, useMemo } from 'react'
import { BarChart } from 'lucide-react'

export function KeywordDensity() {
  const [text, setText] = useState('')

  const stopWords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'en', 'y', 'a', 'que',
    'por', 'con', 'para', 'es', 'se', 'su', 'sus', 'lo', 'le', 'les', 'me', 'te', 'nos',
    'os', 'mi', 'tu', 'su', 'nuestro', 'vuestro', 'este', 'esta', 'estos', 'estas',
    'ese', 'esa', 'esos', 'esas', 'aquel', 'aquella', 'aquellos', 'aquellas', 'como',
    'cuando', 'donde', 'quien', 'cual', 'cuanto', 'muy', 'mas', 'menos', 'todo', 'toda',
    'todos', 'todas', 'algun', 'alguna', 'algunos', 'algunas', 'ningun', 'ninguna',
    'solo', 'sola', 'solos', 'solas', 'tan', 'tambien', 'entre', 'sin', 'sobre', 'hacia',
    'hasta', 'desde', 'por', 'para', 'según', 'durante', 'mediante', 'excepto', 'salvo'
  ])

  const wordCounts = useMemo(() => {
    if (!text.trim()) return []

    const words = text
      .toLowerCase()
      .replace(/[^\wáéíóúñü\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))

    const counts: Record<string, number> = {}
    words.forEach(word => {
      counts[word] = (counts[word] || 0) + 1
    })

    const total = words.length
    return Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)
  }, [text])

  const totalWords = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
          Texto para analizar
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega aquí tu texto para analizar la densidad de palabras clave..."
          className="w-full h-48 px-4 py-3 border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:border-neon"
        />
      </div>

      {/* Stats */}
      {text && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <p>Total de palabras: <span className="font-bold">{totalWords}</span></p>
            <p>Palabras clave únicas: <span className="font-bold">{wordCounts.length}</span></p>
          </div>

          {/* Results */}
          {wordCounts.length > 0 ? (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-mono text-neon mb-4">
                Top 20 palabras clave
              </h3>
              <div className="space-y-2">
                {wordCounts.map((item, index) => (
                  <div key={item.word} className="flex items-center gap-4">
                    <span className="text-xs text-muted w-6">{index + 1}</span>
                    <div className="flex-1 flex items-center gap-4">
                      <span className="text-sm font-mono">{item.word}</span>
                      <div className="flex-1 h-6 bg-card border border-border">
                        <div
                          className="h-full bg-neon/50"
                          style={{ width: `${Math.min(parseFloat(item.percentage) * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted">{item.count}</span>
                    <span className="text-xs text-muted">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border p-4 text-center text-muted text-sm">
              <BarChart size={24} className="mx-auto mb-2" />
              Añade más texto para ver los resultados
            </div>
          )}

          <p className="text-xs text-muted">
            * Se excluyen palabras vacías (artículos, preposiciones, etc.) y palabras
            de menos de 3 caracteres.
          </p>
        </div>
      )}
    </div>
  )
}
