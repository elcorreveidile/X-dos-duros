import avatares from '@/lib/la-banda-avatares.json'
import { cn } from '@/lib/utils'

const AVATARES = avatares as Record<string, { role: string; inner: string }>

/**
 * Avatar de un agente de La Banda: máscara geométrica en SVG con trazos en
 * currentColor (neón por defecto). Fuente única: marketing/la-banda/build/avatars.mjs.
 */
export function AgentAvatar({ codename, className }: { codename: string; className?: string }) {
  const a = AVATARES[codename]
  if (!a) return null
  return <svg viewBox="0 0 120 120" role="img" aria-label={codename} className={cn('text-neon', className)} dangerouslySetInnerHTML={{ __html: a.inner }} />
}
