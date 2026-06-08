const BASE_URL = 'https://por2duros.com'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Por 2 Duros',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.jpg`,
  description:
    'Agencia de desarrollo web de bajo coste y entrega ultra-rápida. MVPs, Landing Pages, E-commerce y Apps a medida listos en 48 horas. Código a medida, sin plantillas, cumpliendo con el RGPD.',
  areaServed: 'ES',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
    url: `${BASE_URL}/#contacto`,
  },
  sameAs: ['https://twitter.com/por2duros'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Por 2 Duros',
  url: BASE_URL,
  description: 'Tu web lista en 48 horas. Sin excusas.',
  inLanguage: 'es-ES',
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servicios de Por 2 Duros',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Landing Page',
        description:
          'Página de aterrizaje de alta conversión. Diseño personalizado, SEO básico, formulario de contacto y analítica.',
        provider: { '@type': 'Organization', name: 'Por 2 Duros' },
        offers: { '@type': 'Offer', price: '299', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
        url: `${BASE_URL}/#servicios`,
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'MVP Web App',
        description:
          'Producto mínimo viable funcional. Panel de usuario, autenticación, base de datos y lógica de negocio básica.',
        provider: { '@type': 'Organization', name: 'Por 2 Duros' },
        offers: { '@type': 'Offer', price: '799', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
        url: `${BASE_URL}/#servicios`,
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'E-commerce',
        description:
          'Tienda online completa con catálogo, carrito, checkout con Stripe y gestión de pedidos básica.',
        provider: { '@type': 'Organization', name: 'Por 2 Duros' },
        offers: { '@type': 'Offer', price: '599', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
        url: `${BASE_URL}/#servicios`,
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'App a Medida',
        description: 'Desarrollo personalizado según tus requisitos. Presupuesto y plazo según briefing.',
        provider: { '@type': 'Organization', name: 'Por 2 Duros' },
        offers: { '@type': 'Offer', price: '999', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
        url: `${BASE_URL}/#servicios`,
      },
    },
  ],
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
    </>
  )
}
