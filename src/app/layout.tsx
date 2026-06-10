import type { Metadata, Viewport } from 'next'
import './globals.css'
import { JsonLd } from '@/components/JsonLd'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ScrollToTop } from '@/components/ScrollToTop'

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
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Por 2 Duros — Tu web lista en 48 horas' }],
  },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image',
    title: 'Por 2 Duros — Tu web en 48 horas',
    description: 'MVPs, Landing Pages y E-commerce listos en 48 horas desde la confirmación.',
    site: '@por2duros',
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://por2duros.com'),
}

export const viewport: Viewport = {
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
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MX4L7L77');` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX4L7L77" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <GoogleAnalytics />
        {children}
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  )
}
