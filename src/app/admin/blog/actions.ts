'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

type BlogPostData = {
  slug: string
  title: string
  excerpt: string
  content: string
  metaDesc: string
  coverImageUrl: string
  published: boolean
}

export async function createBlogPost(data: BlogPostData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  await prisma.blogPost.create({
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function updateBlogPost(id: string, data: Partial<BlogPostData>) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  const current = await prisma.blogPost.findUnique({ where: { id }, select: { published: true, publishedAt: true } })
  const justPublished = data.published && !current?.published

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: justPublished ? new Date() : current?.publishedAt ?? null,
    },
  })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function deleteBlogPost(id: string) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}
