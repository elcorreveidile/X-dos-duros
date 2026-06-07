import { prisma } from '@/lib/db'
import { ExternalLink } from 'lucide-react'

const CATEGORY_LABELS: Record<string, string> = {
  LANDING: 'Landing Page',
  ECOMMERCE: 'E-commerce',
  MVP: 'MVP Web App',
  CUSTOM: 'App a medida',
}

export async function PortfolioSection() {
  const items = await prisma.portfolioItem.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  if (items.length === 0) return null

  return (
    <section className="py-24 border-t border-border" id="portfolio">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
            — Proyectos reales —
          </span>
          <h2 className="section-title">
            Lo que hemos
            <br />
            <span className="neon-text">construido.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group border border-border bg-card flex flex-col overflow-hidden hover:border-neon/40 transition-colors">
              <div className="aspect-video overflow-hidden bg-card border-b border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neon uppercase tracking-widest border border-neon/30 px-2 py-0.5">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tight">{item.title}</h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">{item.description}</p>
                </div>
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs text-muted border border-border px-2 py-0.5 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-neon hover:underline mt-1"
                  >
                    <ExternalLink size={12} />
                    Ver proyecto
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
