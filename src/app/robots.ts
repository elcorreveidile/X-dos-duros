import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api', '/login', '/login/verify'],
      },
    ],
    sitemap: 'https://por2duros.com/sitemap.xml',
  }
}
