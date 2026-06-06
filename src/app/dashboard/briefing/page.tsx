export const dynamic = 'force-dynamic'

import { BriefingForm } from '@/components/dashboard/BriefingForm'
import { FileText } from 'lucide-react'

export default function BriefingPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <FileText size={20} className="text-neon" />
          <h1 className="text-2xl font-black uppercase tracking-tight">Briefing del proyecto</h1>
        </div>
        <p className="text-muted text-sm">
          Rellena este formulario con toda la información sobre tu proyecto. Cuanto más detallado sea, mejor podremos ejecutarlo.
          <span className="text-neon"> El contador de 48h se activa una vez validemos tu briefing.</span>
        </p>
      </div>

      <div className="border border-border bg-card p-6 md:p-8">
        <BriefingForm />
      </div>
    </div>
  )
}
