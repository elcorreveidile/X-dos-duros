import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 })
    }

    // Validar URL
    let targetUrl = url
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl
    }

    // Hacer fetch a la URL
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Por2DurosLinkChecker/1.0)',
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `No se pudo acceder a la URL: ${response.status}` },
        { status: 400 }
      )
    }

    const html = await response.text()

    // Extraer enlaces con regex
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
    const matches = html.match(linkRegex)

    if (!matches) {
      return NextResponse.json({ links: [] })
    }

    // Extraer URLs y verificarlas (limitado a primeros 20)
    const links: string[] = []
    const seen = new Set<string>()

    for (const match of matches) {
      const hrefMatch = match.match(/href=["']([^"']+)["']/i)
      if (hrefMatch) {
        let href = hrefMatch[1]

        // Ignorar anchors, mailto, tel, javascript
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
          continue
        }

        // Convertir URL relativa a absoluta
        if (href.startsWith('/')) {
          const urlObj = new URL(targetUrl)
          href = `${urlObj.origin}${href}`
        } else if (!href.startsWith('http')) {
          href = new URL(href, targetUrl).href
        }

        // Evitar duplicados
        if (!seen.has(href)) {
          seen.add(href)
          links.push(href)
        }

        // Limitar a 20 enlaces
        if (links.length >= 20) break
      }
    }

    // Verificar cada enlace (con timeout)
    const linkResults = await Promise.all(
      links.slice(0, 20).map(async (link) => {
        try {
          const res = await fetch(link, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000),
          })
          return {
            url: link,
            status: res.status,
            error: null
          }
        } catch (e) {
          return {
            url: link,
            status: null,
            error: 'No accesible'
          }
        }
      })
    )

    return NextResponse.json({ links: linkResults })
  } catch (error) {
    console.error('Link checker error:', error)
    return NextResponse.json(
      { error: 'Error al analizar la página. Verifica que sea accesible.' },
      { status: 500 }
    )
  }
}
