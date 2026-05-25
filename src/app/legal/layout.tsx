import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted text-sm hover:text-neon transition-colors">
            <ArrowLeft size={14} />
            Volver a por2duros.com
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </main>
      <footer className="border-t border-border mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 text-xs text-muted">
          <Link href="/legal/privacidad" className="hover:text-neon transition-colors">Privacidad</Link>
          <Link href="/legal/terminos" className="hover:text-neon transition-colors">Términos</Link>
          <Link href="/legal/cookies" className="hover:text-neon transition-colors">Cookies</Link>
        </div>
      </footer>
    </div>
  )
}
