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
        'User-Agent': 'Mozilla/5.0 (compatible; Por2DurosBot/1.0)',
      },
      // Timeout
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `No se pudo acceder a la URL: ${response.status}` },
        { status: 400 }
      )
    }

    const html = await response.text()

    // Extraer meta tags con regex
    const extractMeta = (patterns: RegExp[]) => {
      for (const pattern of patterns) {
        const match = html.match(pattern)
        if (match && match[1]) return match[1]
      }
      return undefined
    }

    const cleanQuotes = (str: string) => str.replace(/^["']|["']$/g, '').trim()

    const title = extractMeta([
      /<title[^>]*>([^<]+)<\/title>/i,
    ]) || undefined

    const description = extractMeta([
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i,
    ]) || undefined

    const canonical = extractMeta([
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    ]) || undefined

    const ogTitle = extractMeta([
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
    ]) || undefined

    const ogDescription = extractMeta([
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
    ]) || undefined

    const ogImage = extractMeta([
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    ]) || undefined

    const twitterCard = extractMeta([
      /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["']/i,
    ]) || undefined

    const robots = extractMeta([
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
    ]) || undefined

    const viewport = extractMeta([
      /<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i,
    ]) || undefined

    const charset = extractMeta([
      /<meta[^>]+charset=["']?([^"'\s>]+)["']?/i,
    ]) || undefined

    const language = extractMeta([
      /<html[^>]+lang=["']([^"']+)["']/i,
    ]) || undefined

    return NextResponse.json({
      title: title ? cleanQuotes(title) : undefined,
      description: description ? cleanQuotes(description) : undefined,
      canonical: canonical ? cleanQuotes(canonical) : undefined,
      ogTitle: ogTitle ? cleanQuotes(ogTitle) : undefined,
      ogDescription: ogDescription ? cleanQuotes(ogDescription) : undefined,
      ogImage: ogImage ? cleanQuotes(ogImage) : undefined,
      twitterCard: twitterCard ? cleanQuotes(twitterCard) : undefined,
      robots: robots ? cleanQuotes(robots) : undefined,
      viewport: viewport ? cleanQuotes(viewport) : undefined,
      charset: charset || undefined,
      language: language || undefined,
    })
  } catch (error) {
    console.error('Meta analysis error:', error)
    return NextResponse.json(
      { error: 'Error al analizar la URL. Verifica que sea accesible.' },
      { status: 500 }
    )
  }
}
