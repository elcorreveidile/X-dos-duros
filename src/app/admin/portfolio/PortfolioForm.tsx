'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from './actions'
import { Check, Loader2, Trash2 } from 'lucide-react'
import type { PortfolioCategory } from '@prisma/client'

const CATEGORIES: { value: PortfolioCategory; label: string }[] = [
  { value: 'LANDING', label: 'Landing Page' },
  { value: 'ECOMMERCE', label: 'E-commerce' },
  { value: 'MVP', label: 'MVP Web App' },
  { value: 'CUSTOM', label: 'App a medida' },
]

interface Props {
  item?: {
    id: string
    title: string
    category: PortfolioCategory
    description: string
    imageUrl: string
    demoUrl: string | null
    tags: string[]
    order: number
    active: boolean
  }
}

export function PortfolioForm({ item }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDeleting, startDeleteTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(item?.title ?? '')
  const [category, setCategory] = useState<PortfolioCategory>(item?.category ?? 'LANDING')
  const [description, setDescription] = useState(item?.description ?? '')
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? '')
  const [demoUrl, setDemoUrl] = useState(item?.demoUrl ?? '')
  const [tags, setTags] = useState(item?.tags.join(', ') ?? '')
  const [order, setOrder] = useState(String(item?.order ?? 0))

  const handleSubmit = () => {
    if (!title || !description || !imageUrl) {
      setError('Título, descripción e imagen son obligatorios')
      return
    }
    setError('')
    startTransition(async () => {
      try {
        const data = {
          title,
          category,
          description,
          imageUrl,
          demoUrl: demoUrl || undefined,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          order: parseInt(order) || 0,
        }
        if (item) {
          await updatePortfolioItem(item.id, data)
        } else {
          await createPortfolioItem(data)
        }
        setSaved(true)
        setTimeout(() => {
          router.push('/admin/portfolio')
        }, 800)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al guardar')
      }
    })
  }

  const handleDelete = () => {
    if (!item) return
    if (!confirm(`¿Eliminar "${item.title}"? Esta acción no se puede deshacer.`)) return
    startDeleteTransition(async () => {
      await deletePortfolioItem(item.id)
      router.push('/admin/portfolio')
    })
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Category */}
      <div>
        <p className="label mb-2">Categoría</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-colors ${
                category === c.value
                  ? 'border-neon text-neon bg-neon/10'
                  : 'border-border text-muted hover:border-neon/40 hover:text-foreground'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="label">Título del proyecto</label>
        <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nombre del proyecto" />
      </div>

      {/* Description */}
      <div>
        <label className="label">Descripción corta</label>
        <textarea className="input min-h-[80px] resize-none" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Una o dos frases sobre el proyecto y el cliente" />
      </div>

      {/* Image URL */}
      <div>
        <label className="label">URL de la captura</label>
        <input type="url" className="input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
        {imageUrl && (
          <div className="mt-2 aspect-video max-w-sm border border-border overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover object-top" />
          </div>
        )}
      </div>

      {/* Demo URL */}
      <div>
        <label className="label">URL del proyecto (opcional)</label>
        <input type="url" className="input" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://..." />
      </div>

      {/* Tags */}
      <div>
        <label className="label">Tecnologías / etiquetas (separadas por coma)</label>
        <input type="text" className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Next.js, Stripe, Tailwind" />
      </div>

      {/* Order */}
      <div>
        <label className="label">Orden de aparición</label>
        <input type="number" className="input w-24" value={order} min={0} onChange={(e) => setOrder(e.target.value)} />
      </div>

      {error && <p className="text-red-400 text-xs border border-red-400/30 bg-red-400/5 px-3 py-2">{error}</p>}

      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className={`flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all ${
            saved ? 'bg-neon/20 text-neon border border-neon' : 'bg-neon text-background hover:bg-neon/90'
          }`}
        >
          {isPending ? <><Loader2 size={12} className="animate-spin" /> Guardando…</> : saved ? <><Check size={12} /> Guardado</> : item ? 'Guardar cambios' : 'Crear proyecto'}
        </button>

        {item && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold border border-red-400/40 text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
          >
            {isDeleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}
