export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PortfolioForm } from '../PortfolioForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPortfolioItemPage({ params }: Props) {
  const { id } = await params
  const item = await prisma.portfolioItem.findUnique({ where: { id } })
  if (!item) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio" className="text-muted hover:text-neon transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-tight">Editar proyecto</h1>
      </div>
      <PortfolioForm item={{ ...item, demoUrl: item.demoUrl }} />
    </div>
  )
}
