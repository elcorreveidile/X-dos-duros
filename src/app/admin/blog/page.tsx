export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { deleteBlogPost } from './actions'

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Blog</h1>
          <p className="text-muted text-sm mt-1">{posts.length} artículo{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/blog/nuevo"
          className="flex items-center gap-2 px-5 py-2 bg-neon text-background text-xs uppercase tracking-widest font-bold hover:bg-neon/90 transition-colors"
        >
          <PlusCircle size={14} />
          Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">Aún no hay artículos.</p>
          <Link href="/admin/blog/nuevo" className="text-neon text-xs uppercase tracking-widest font-bold mt-3 inline-block hover:underline">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-5 py-4 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 border ${post.published ? 'border-neon/40 text-neon' : 'border-border text-muted'}`}>
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                  <span className="text-xs text-muted font-mono">/blog/{post.slug}</span>
                </div>
                <p className="font-bold text-sm truncate">{post.title}</p>
                <p className="text-muted text-xs mt-0.5 truncate">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {post.published && (
                  <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-muted hover:text-neon uppercase tracking-widest transition-colors">
                    Ver
                  </Link>
                )}
                <Link href={`/admin/blog/${post.id}`} className="text-xs text-neon uppercase tracking-widest hover:underline">
                  Editar
                </Link>
                <form action={async () => { 'use server'; await deleteBlogPost(post.id) }}>
                  <button type="submit" className="text-xs text-muted hover:text-red-400 uppercase tracking-widest transition-colors">
                    Borrar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
