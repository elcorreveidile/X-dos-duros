'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBlogPost, updateBlogPost } from './actions'
import type { BlogPost } from '@prisma/client'

export function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [metaDesc, setMetaDesc] = useState(post?.metaDesc ?? '')
  const [published, setPublished] = useState(post?.published ?? false)

  function toSlug(str: string) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !slug || !excerpt || !content) return
    setSaving(true)
    try {
      if (post) {
        await updateBlogPost(post.id, { title, slug, excerpt, content, metaDesc, published })
      } else {
        await createBlogPost({ title, slug, excerpt, content, metaDesc, published })
      }
      router.push('/admin/blog')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-muted">Título</label>
        <input
          className="input w-full"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (!post) setSlug(toSlug(e.target.value))
          }}
          placeholder="Cómo crear una landing page que convierte"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-muted">Slug (URL)</label>
        <div className="flex items-center gap-2">
          <span className="text-muted text-sm">/blog/</span>
          <input
            className="input flex-1"
            value={slug}
            onChange={(e) => setSlug(toSlug(e.target.value))}
            placeholder="como-crear-landing-page"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-muted">Extracto (resumen visible en el listado)</label>
        <textarea
          className="input w-full min-h-[80px] resize-none"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Una o dos frases que resumen el artículo."
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-muted">
          Contenido{' '}
          <span className="normal-case text-muted/60">(soporta Markdown: ## título, **negrita**, - lista)</span>
        </label>
        <textarea
          className="input w-full min-h-[400px] resize-y font-mono text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="## Introducción&#10;&#10;Escribe aquí el cuerpo del artículo..."
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest text-muted">Meta descripción (SEO, ~155 caracteres)</label>
        <input
          className="input w-full"
          value={metaDesc}
          onChange={(e) => setMetaDesc(e.target.value)}
          placeholder="Aprende a crear una landing page que convierte visitas en clientes..."
          maxLength={160}
        />
        <p className="text-xs text-muted">{metaDesc.length}/160</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 accent-neon"
        />
        <label htmlFor="published" className="text-sm uppercase tracking-widest">
          Publicar ahora
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Guardando...' : post ? 'Guardar cambios' : 'Crear artículo'}
        </button>
        <button type="button" onClick={() => router.back()} className="border border-border px-5 py-2 text-sm uppercase tracking-widest hover:border-neon/40 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  )
}
