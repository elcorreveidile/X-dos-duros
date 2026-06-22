import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ArrowLeft } from 'lucide-react'
import { markdownToHtml } from '@/lib/markdown'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true }, select: { title: true, metaDesc: true, excerpt: true, coverImageUrl: true } })
  if (!post) return {}
  const ogImageUrl = post.coverImageUrl
    ? post.coverImageUrl.startsWith('http') ? post.coverImageUrl : `https://por2duros.com${post.coverImageUrl}`
    : 'https://por2duros.com/og-image.jpg'
  const ogImage = { url: ogImageUrl, width: 1200, height: 630, alt: post.title }
  return {
    title: `${post.title} — Por 2 Duros`,
    description: post.metaDesc || post.excerpt,
    alternates: {
      canonical: `https://por2duros.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDesc || post.excerpt,
      url: `https://por2duros.com/blog/${slug}`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDesc || post.excerpt,
      site: '@por2duros',
      images: ['https://por2duros.com/og-image.jpg'],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } })
  if (!post) notFound()

  const htmlContent = markdownToHtml(post.content)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-xs text-muted uppercase tracking-widest hover:text-neon transition-colors mb-12">
            <ArrowLeft size={12} /> Volver al blog
          </Link>

          <header className="mb-12">
            <time className="text-xs text-muted font-mono uppercase tracking-widest">
              {post.publishedAt?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-tight mt-3 mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted leading-relaxed border-l-2 border-neon pl-4">{post.excerpt}</p>
            {post.coverImageUrl && (
              <div className="relative w-full h-56 sm:h-72 mt-10 overflow-hidden border border-border">
                <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover opacity-90" />
              </div>
            )}
          </header>

          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="mt-16 pt-12 border-t border-border text-center">
            <p className="text-muted text-sm mb-6">¿Quieres lanzar tu proyecto?</p>
            <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
              Pedir presupuesto gratis
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
