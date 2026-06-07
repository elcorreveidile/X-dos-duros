export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import Link from 'next/link'
import { PlusCircle, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { PortfolioToggle } from './PortfolioToggle'

const CATEGORY_LABELS: Record<string, string> = {
  LANDING: 'Landing Page',
  ECOMMERCE: 'E-commerce',
  MVP: 'MVP Web App',
  CUSTOM: 'App a medida',
}

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Portfolio</h1>
          <p className="text-muted text-sm mt-1">{items.length} proyecto{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/portfolio/nuevo"
          className="flex items-center gap-2 px-5 py-2 bg-neon text-background text-xs uppercase tracking-widest font-bold hover:bg-neon/90 transition-colors"
        >
          <PlusCircle size={14} />
          Añadir proyecto
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">Aún no hay proyectos en el portfolio.</p>
          <Link href="/admin/portfolio/nuevo" className="text-neon text-xs uppercase tracking-widest font-bold mt-3 inline-block hover:underline">
            Añadir el primero
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className={`border p-4 space-y-3 ${item.active ? 'border-border' : 'border-border/40 opacity-50'}`}>
              <div className="aspect-video bg-card border border-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted uppercase tracking-widest border border-border px-2 py-0.5">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                  <span className="text-xs text-muted">#{item.order}</span>
                </div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-muted text-xs mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Link
                  href={`/admin/portfolio/${item.id}`}
                  className="flex-1 text-center py-1.5 text-xs uppercase tracking-widest border border-border text-muted hover:border-neon hover:text-neon transition-colors"
                >
                  Editar
                </Link>
                {item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-border text-muted hover:border-neon hover:text-neon transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <PortfolioToggle id={item.id} active={item.active} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
