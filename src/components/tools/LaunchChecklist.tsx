'use client'

import { useState } from 'react'
import { Check, Square } from 'lucide-react'

interface ChecklistItem {
  category: string
  items: {
    id: string
    text: string
    checked: boolean
  }[]
}

const defaultChecklist: ChecklistItem[] = [
  {
    category: 'SEO Básico',
    items: [
      { id: 'title', text: 'Title único y descriptivo', checked: false },
      { id: 'description', text: 'Meta description en todas las páginas', checked: false },
      { id: 'canonical', text: 'URLs canónicas', checked: false },
      { id: 'sitemap', text: 'Sitemap.xml generado', checked: false },
      { id: 'robots', text: 'Robots.txt configurado', checked: false },
      { id: 'ga', text: 'Google Analytics instalado', checked: false },
      { id: 'gsc', text: 'Google Search Connect verificado', checked: false },
    ]
  },
  {
    category: 'Performance',
    items: [
      { id: 'images', text: 'Imágenes optimizadas (WebP)', checked: false },
      { id: 'minify', text: 'CSS/JS minificados', checked: false },
      { id: 'lazy', text: 'Lazy loading de imágenes', checked: false },
      { id: 'cache', text: 'Caché configurada', checked: false },
      { id: 'https', text: 'HTTPS activado', checked: false },
      { id: 'mobile', text: 'Versión móvil probada', checked: false },
    ]
  },
  {
    category: 'Contenido',
    items: [
      { id: '404', text: 'Página 404 personalizada', checked: false },
      { id: 'legal', text: 'Páginas legales (Privacidad, Cookies)', checked: false },
      { id: 'contact', text: 'Formulario de contacto funcional', checked: false },
      { id: 'links', text: 'Enlaces rotos revisados', checked: false },
      { id: 'favicon', text: 'Favicon en todos los formatos', checked: false },
    ]
  },
  {
    category: 'Social',
    items: [
      { id: 'og', text: 'Open Graph configurado', checked: false },
      { id: 'twitter', text: 'Twitter Cards configurado', checked: false },
      { id: 'social-links', text: 'Enlaces a redes sociales', checked: false },
      { id: 'share', text: 'Botones compartir funcionales', checked: false },
    ]
  },
  {
    category: 'Testing',
    items: [
      { id: 'cross-browser', text: 'Probado en Chrome, Firefox, Safari', checked: false },
      { id: 'responsive', text: 'Probado en diferentes tamaños', checked: false },
      { id: 'forms', text: 'Formularios probados', checked: false },
      { id: 'speed', text: 'PageSpeed Insights > 80', checked: false },
    ]
  }
]

export function LaunchChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist)
  const [saved, setSaved] = useState(false)

  const toggle = (categoryIndex: number, itemId: string) => {
    const newChecklist = [...checklist]
    const item = newChecklist[categoryIndex].items.find(i => i.id === itemId)
    if (item) {
      item.checked = !item.checked
    }
    setChecklist(newChecklist)
    setSaved(false)
  }

  const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0)
  const checkedItems = checklist.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0)
  const progress = (checkedItems / totalItems) * 100

  const save = () => {
    localStorage.setItem('launch-checklist', JSON.stringify(checklist))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const reset = () => {
    setChecklist(defaultChecklist)
    localStorage.removeItem('launch-checklist')
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-mono">
            Progreso: <span className="text-neon">{checkedItems}/{totalItems}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="text-xs text-muted hover:text-neon transition-colors"
            >
              Reiniciar
            </button>
            <button
              onClick={save}
              className="text-xs text-neon hover:text-neon/80 transition-colors"
            >
              {saved ? '✓ Guardado' : 'Guardar'}
            </button>
          </div>
        </div>
        <div className="w-full h-2 bg-card border border-border">
          <div
            className="h-full bg-neon transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-6">
        {checklist.map((category, catIndex) => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-neon">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggle(catIndex, item.id)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                      item.checked
                        ? 'border-neon bg-neon'
                        : 'border-border group-hover:border-neon/50'
                    }`}>
                      {item.checked && <Check size={12} className="text-background" />}
                    </div>
                  </div>
                  <span className={`text-sm ${item.checked ? 'text-muted line-through' : ''}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div className="bg-green-500/10 border border-green-500/30 p-4 text-center">
          <p className="text-sm text-green-500">¡Todo listo para el launch! 🚀</p>
        </div>
      )}
    </div>
  )
}
