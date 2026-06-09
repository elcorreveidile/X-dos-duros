'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className="fixed bottom-24 right-6 z-50 w-10 h-10 border border-neon/40 bg-background/90 backdrop-blur-sm text-neon flex items-center justify-center hover:bg-neon/10 hover:border-neon transition-all duration-200 hover:scale-110"
    >
      <ArrowUp size={16} />
    </button>
  )
}
