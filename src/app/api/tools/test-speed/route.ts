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

    const startTime = performance.now()

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Por2DurosSpeedTest/1.0)',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })

    const endTime = performance.now()

    const text = await response.text()
    const size = new Blob([text]).size

    return NextResponse.json({
      url: targetUrl,
      time: Math.round(endTime - startTime),
      size,
      status: response.status,
    })
  } catch (error) {
    console.error('Speed test error:', error)
    return NextResponse.json(
      { error: 'Error al medir la velocidad. La URL puede no ser accesible.' },
      { status: 500 }
    )
  }
}
