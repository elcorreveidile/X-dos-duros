'use client'

import { useState, useMemo } from 'react'

interface ReadabilityScore {
  level: string
  score: number
  color: string
}

export function ReadabilityCalculator() {
  const [text, setText] = useState('')

  const countSyllables = (word: string) => {
    word = word.toLowerCase().replace(/[^a-záéíóúñü]/g, '')
    if (word.length <= 2) return 1
    word = word.replace(/([aeiouáéíóú])([aeiouáéíóú])/g, '$1-$2')
    const syllables = word.split(/[-]/).filter(s => /[aeiouáéíóú]/.test(s))
    return Math.max(1, syllables.length)
  }

  const stats = useMemo(() => {
    if (!text.trim()) return null

    const words = text.trim().split(/\s+/)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    const syllables = words.reduce((acc, word) => {
      return acc + countSyllables(word)
    }, 0)

    const wordCount = words.length
    const sentenceCount = sentences.length
    const avgSentenceLength = wordCount / sentenceCount
    const avgSyllablesPerWord = syllables / wordCount

    // Flesch Reading Ease (Spanish adaptation)
    const flesch = 206.84 - (1.02 * avgSentenceLength) - (0.6 * avgSyllablesPerWord)

    // Flesch-Kincaid Grade Level
    const grade = 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59

    return {
      words: wordCount,
      sentences: sentenceCount,
      syllables,
      avgSentenceLength: avgSentenceLength.toFixed(1),
      avgSyllablesPerWord: avgSyllablesPerWord.toFixed(2),
      flesch: flesch.toFixed(1),
      grade: grade.toFixed(1)
    }
  }, [text])

  const getScore = (flesch: string): ReadabilityScore => {
    const score = parseFloat(flesch)
    if (score >= 90) return { level: 'Muy fácil', score, color: 'text-green-500' }
    if (score >= 80) return { level: 'Fácil', score, color: 'text-green-500' }
    if (score >= 70) return { level: 'Bastante fácil', score, color: 'text-green-500' }
    if (score >= 60) return { level: 'Estándar', score, color: 'text-yellow-500' }
    if (score >= 50) return { level: 'Bastante difícil', score, color: 'text-orange-500' }
    if (score >= 30) return { level: 'Difícil', score, color: 'text-orange-500' }
    return { level: 'Muy difícil', score, color: 'text-red-500' }
  }

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
          placeholder="Pega aquí tu texto para analizar su nivel de lectura..."
          className="w-full h-48 px-4 py-3 border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:border-neon"
        />
      </div>

      {/* Results */}
      {stats && (
        <div className="space-y-4">
          {/* Main score */}
          <div className="bg-card border border-border p-6 text-center">
            <p className="text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Índice Flesch Reading Ease
            </p>
            <p className="text-4xl font-black">{stats.flesch}</p>
            <p className={`text-sm font-bold mt-1 ${getScore(stats.flesch).color}`}>
              {getScore(stats.flesch).level}
            </p>
            <p className="text-xs text-muted mt-2">
              Nivel educativo: ~{stats.grade}º grado
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Palabras</p>
              <p className="text-lg font-bold">{stats.words}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Frases</p>
              <p className="text-lg font-bold">{stats.sentences}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Sílabas</p>
              <p className="text-lg font-bold">{stats.syllables}</p>
            </div>
            <div className="bg-card border border-border p-3 text-center">
              <p className="text-xs text-muted">Promedio/frase</p>
              <p className="text-lg font-bold">{stats.avgSentenceLength}</p>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-card border border-border p-4 space-y-2">
            <p className="text-xs font-mono text-neon">Interpretación</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted">
              <div>90-100: Muy fácil (5º curso)</div>
              <div>80-90: Fácil (6º curso)</div>
              <div>70-80: Bastante fácil (7º curso)</div>
              <div>60-70: Estándar (8º-9º)</div>
              <div>50-60: Bastante difícil (10º-12º)</div>
              <div>30-50: Difícil (Universidad)</div>
              <div className="col-span-2">0-30: Muy difícil (Experto)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
