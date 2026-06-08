import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog — Desarrollo web, MVPs y SEO — Por 2 Duros',
  description: 'Artículos sobre desarrollo web rápido, cómo lanzar tu MVP, SEO y marketing digital para pequeñas empresas y startups.',
  openGraph: {
    title: 'Blog de Por 2 Duros',
    description: 'Desarrollo web, MVPs y SEO para pequeñas empresas y startups.',
    url: 'https://por2duros.com/blog',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default async function BlogPage() {
  let posts: { slug: string; title: string; excerpt: string; publishedAt: Date | null }[] = []
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, excerpt: true, publishedAt: true },
    })
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-6 block">— Blog —</span>
          <h1 className="section-title mb-4">
            Artículos sobre{' '}
            <span className="neon-text">desarrollo web.</span>
          </h1>
          <p className="section-subtitle mb-16">
            MVPs, landing pages, SEO y todo lo que necesitas saber para lanzar tu proyecto online.
          </p>

          {posts.length === 0 ? (
            <p className="text-muted text-sm">Próximamente — los primeros artículos están en camino.</p>
          ) : (
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <article key={post.slug} className="py-8 group">
                  <time className="text-xs text-muted font-mono uppercase tracking-widest">
                    {post.publishedAt?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <h2 className="text-xl font-black uppercase tracking-tight mt-2 mb-3 group-hover:text-neon transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-xs text-neon uppercase tracking-widest hover:underline">
                    Leer artículo <ArrowRight size={12} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
