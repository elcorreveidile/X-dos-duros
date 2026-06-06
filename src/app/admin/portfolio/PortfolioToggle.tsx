'use client'

import { useTransition } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { updatePortfolioItem } from './actions'

export function PortfolioToggle({ id, active }: { id: string; active: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => updatePortfolioItem(id, { active: !active }))}
      disabled={isPending}
      className="p-1.5 border border-border text-muted hover:border-neon hover:text-neon transition-colors disabled:opacity-40"
      title={active ? 'Ocultar' : 'Mostrar'}
    >
      {isPending ? <Loader2 size={14} className="animate-spin" /> : active ? <Eye size={14} /> : <EyeOff size={14} />}
    </button>
  )
}
