'use client'

import { useState, useEffect } from 'react'
import { FileText, Clock, Hash } from 'lucide-react'

export function WordCounter() {
  const [text, setText] = useState('')

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length
  const readingTime = Math.ceil(words / 200) // 200 palabras por minuto

  return (
    <div className="space-y-8">
      {/* Textarea */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Escribe o pega tu texto
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega aquí tu texto para analizar..."
          className="w-full h-64 p-4 border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:border-neon transition-colors"
        />
        <button
          onClick={() => setText('')}
          className="mt-2 text-xs text-muted hover:text-neon transition-colors"
        >
          Limpiar texto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard
          icon={FileText}
          value={words.toLocaleString()}
          label="Palabras"
        />
        <StatCard
          icon={Hash}
          value={chars.toLocaleString()}
          label="Caracteres"
        />
        <StatCard
          icon={Hash}
          value={charsNoSpaces.toLocaleString()}
          label="Caracteres (sin espacios)"
        />
        <StatCard
          value={sentences}
          label="Frases"
        />
        <StatCard
          value={paragraphs}
          label="Párrafos"
        />
        <StatCard
          icon={Clock}
          value={`${readingTime} min`}
          label="Lectura estimada"
        />
      </div>

      {/* Reading reference */}
      <div className="bg-card border border-border p-4 space-y-2">
        <p className="text-xs font-mono text-neon">Referencias de velocidad</p>
        <div className="grid grid-cols-3 gap-4 text-xs text-muted">
          <div>
            <span className="font-bold">100 ppm</span> → lenta
          </div>
          <div>
            <span className="font-bold">200 ppm</span> → normal
          </div>
          <div>
            <span className="font-bold">300 ppm</span> → rápida
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  value,
  label
}: {
  icon?: React.ElementType
  value: string | number
  label: string
}) {
  return (
    <div className="bg-card border border-border p-4 space-y-1">
      {Icon && <Icon size={14} className="text-neon mb-1" />}
      <p className="text-2xl font-black uppercase">{value}</p>
      <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
    </div>
  )
}
