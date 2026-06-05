import { NewProjectForm } from './NewProjectForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AdminNuevoPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin"
          className="flex items-center gap-2 text-muted text-xs hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={12} />
          Volver al panel
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-tight">Nuevo proyecto</h1>
        <p className="text-muted text-sm mt-1">
          Crea un proyecto y la cuenta del cliente. Le llegará un email con acceso al panel.
        </p>
      </div>

      <NewProjectForm />
    </div>
  )
}
