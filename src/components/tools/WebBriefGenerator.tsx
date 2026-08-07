'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function WebBriefGenerator() {
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [objective, setObjective] = useState('')
  const [target, setTarget] = useState('')
  const [competitors, setCompetitors] = useState('')
  const [features, setFeatures] = useState('')
  const [pages, setPages] = useState('')
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let brief = `BRIEF DE PROYECTO WEB
=====================

PROYECTO
--------
Nombre: ${projectName || '[Por definir]'}
Cliente: ${clientName || '[Por definir]'}

OBJETIVO
---------
${objective || '[Por definir]'}

PÚBLICO OBJETIVO
-----------------
${target || '[Por definir]'}

COMPIDENCIA
-----------
${competitors || '[Por definir]'}

FUNCIONALIDADES PRINCIPALES
---------------------------
${features || '[Por definir]'}

PÁGINAS/SECCIONES
-----------------
${pages || '[Por definir]'}

PRESUPUESTO
-----------
${budget || '[Por definir]'}

PLAZO
-----
${deadline || '[Por definir]'}

OBSERVACIONES
-------------
- El presupuesto es orientativo y podrá variar según el alcance final.
- Se necesita aprovación del cliente antes de comenzar el desarrollo.
- Los tiempos de entrega pueden variar según la disponibilidad de materiales.`

    return brief
  }

  const copy = () => {
    navigator.clipboard.writeText(generate())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([generate()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `brief-${projectName || 'proyecto'}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Nombre proyecto
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Mi nueva web"
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Cliente
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nombre empresa"
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Objetivo
          </label>
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="¿Qué queremos conseguir con este proyecto?"
            rows={3}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Público objetivo
          </label>
          <textarea
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="¿A quién va dirigido? Edad, perfil, intereses..."
            rows={2}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Competidores
          </label>
          <input
            type="text"
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
            placeholder="webs rivales (separadas por comas)"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Funcionalidades principales
          </label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Formulario contacto, blog, tienda online, reserva..."
            rows={3}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Páginas/secciones
          </label>
          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="Inicio, sobre nosotros, servicios, contacto..."
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Presupuesto estimado
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="2.000 - 5.000 €"
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
              Plazo deseado
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="2-3 meses"
              className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={copy}
          className="flex-1 px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check size={16} /> Copiado
            </>
          ) : (
            <>
              <Copy size={16} /> Copiar
            </>
          )}
        </button>
        <button
          onClick={download}
          className="px-6 py-3 border border-border text-foreground font-bold uppercase tracking-wider text-sm hover:border-neon hover:text-neon transition-colors"
        >
          Descargar
        </button>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Vista previa
        </label>
        <pre className="bg-card border border-border p-4 text-xs font-mono whitespace-pre-wrap">
          {generate()}
        </pre>
      </div>
    </div>
  )
}
