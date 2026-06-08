import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-black tracking-tighter uppercase mb-3">
              <span className="text-foreground">Por</span>
              <span className="neon-text"> 2</span>
              <span className="text-foreground"> Duros</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Agencia de desarrollo web ultra-rápida. Tu proyecto listo en 48 horas desde la confirmación de requisitos.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              <span className="text-neon text-xs mono">Disponible ahora</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted mb-4">Servicios</h4>
            <ul className="space-y-2">
              {[
                { label: 'Landing Page', href: '/landing-page' },
                { label: 'MVP Web App', href: '/mvp' },
                { label: 'E-commerce', href: '/ecommerce' },
                { label: 'App a medida', href: '/#servicios' },
              ].map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-muted hover:text-neon transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted mb-4">Empresa</h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'Proceso', href: '/#proceso' },
                { label: 'Precios', href: '/#precio' },
                { label: 'Contacto', href: '/#contacto' },
                { label: 'Acceder', href: '/login' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-neon transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {year} Por 2 Duros. Hecho con <span className="neon-text">mucho café</span> en{' '}
            <a href="https://www.espanias.com" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">Espanias</a>.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacidad" className="text-muted text-xs hover:text-neon transition-colors">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="text-muted text-xs hover:text-neon transition-colors">
              Términos
            </Link>
            <Link href="/legal/cookies" className="text-muted text-xs hover:text-neon transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
