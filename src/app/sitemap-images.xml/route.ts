import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://por2duros.com'

export async function GET() {
  let posts: { slug: string; title: string; excerpt: string; coverImageUrl: string }[] = []

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true, NOT: { coverImageUrl: '' } },
      select: { slug: true, title: true, excerpt: true, coverImageUrl: true },
    })
  } catch {
    // DB unavailable
  }

  const escape = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const imageUrl = (path: string) =>
    path.startsWith('http') ? path : `${BASE_URL}${path}`

  const urls = posts
    .map(
      (post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${escape(imageUrl(post.coverImageUrl))}</image:loc>
      <image:title>${escape(post.title)}</image:title>
      <image:caption>${escape(post.excerpt)}</image:caption>
    </image:image>
  </url>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
