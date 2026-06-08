import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { BlogForm } from '../BlogForm'

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Editar artículo</h1>
        <p className="text-muted text-sm mt-1 font-mono">/blog/{post.slug}</p>
      </div>
      <BlogForm post={post} />
    </div>
  )
}
