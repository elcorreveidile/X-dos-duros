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
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
            <div className="space-y-12">
              {/* Featured post */}
              <Link href={`/blog/${posts[0].slug}`} className="group block neon-border p-8 md:p-10 hover:border-neon transition-colors">
                <time className="text-xs text-neon font-mono uppercase tracking-widest">
                  {posts[0].publishedAt?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  <span className="ml-3 text-muted">— Último artículo</span>
                </time>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-3 mb-4 group-hover:text-neon transition-colors leading-tight">
                  {posts[0].title}
                </h2>
                <p className="text-muted leading-relaxed mb-6 max-w-2xl">{posts[0].excerpt}</p>
                <span className="flex items-center gap-2 text-xs text-neon uppercase tracking-widest">
                  Leer artículo <ArrowRight size={12} />
                </span>
              </Link>

              {/* Grid */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {posts.slice(1).map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block border border-border hover:border-neon/40 p-6 transition-colors">
                      <time className="text-xs text-muted font-mono uppercase tracking-widest">
                        {post.publishedAt?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      <h2 className="text-base font-black uppercase tracking-tight mt-2 mb-3 group-hover:text-neon transition-colors leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <span className="flex items-center gap-2 text-xs text-neon uppercase tracking-widest">
                        Leer <ArrowRight size={10} />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
