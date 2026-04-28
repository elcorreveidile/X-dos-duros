import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Por 2 Duros — Tu web en 48 horas',
  description:
    'Agencia de desarrollo web de bajo coste y entrega ultra-rápida. MVPs, Landing Pages, E-commerce y Apps a medida listos en 48 horas.',
  keywords: ['desarrollo web', 'MVP', 'landing page', 'e-commerce', '48 horas', 'bajo coste'],
  openGraph: {
    title: 'Por 2 Duros — Tu web en 48 horas',
    description: 'MVPs, Landing Pages y E-commerce listos en 48 horas desde la confirmación.',
    url: 'https://por2duros.com',
    siteName: 'Por 2 Duros',
    locale: 'es_ES',
    type: 'website',
  },
  robots: { index: true, follow: true },
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
