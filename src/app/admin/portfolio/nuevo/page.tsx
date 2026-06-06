import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PortfolioForm } from '../PortfolioForm'

export default function NewPortfolioItemPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio" className="text-muted hover:text-neon transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-tight">Nuevo proyecto</h1>
      </div>
      <PortfolioForm />
    </div>
  )
}
