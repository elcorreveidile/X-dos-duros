'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, QrCode } from 'lucide-react'

// Simple QR code generator using a basic library-free approach
// For production, you'd want to use qrcode library or similar

export function QrGenerator() {
  const [url, setUrl] = useState('')
  const [size, setSize] = useState('256')
  const [qrData, setQrData] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!url || !canvasRef.current) return

    // Using a free QR API for generation (no library needed)
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
    setQrData(apiUrl)
  }, [url, size])

  const download = () => {
    if (!qrData) return

    // Create a canvas to convert the image to downloadable format
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = parseInt(size)
      canvas.height = parseInt(size)
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'qr-code.png'
            link.click()
          }
        })
      }
    }
    img.src = qrData
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            URL o texto
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Tamaño (px)
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          >
            <option value="128">128 × 128</option>
            <option value="256">256 × 256</option>
            <option value="512">512 × 512</option>
            <option value="1024">1024 × 1024</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      {qrData && (
        <div className="space-y-4">
          <div className="bg-card border border-border p-8 flex items-center justify-center">
            <img
              src={qrData}
              alt="QR Code"
              className="max-w-full"
              style={{ maxWidth: size + 'px' }}
            />
          </div>

          <button
            onClick={download}
            className="w-full px-6 py-3 bg-neon text-background font-bold uppercase tracking-wider text-sm hover:bg-neon/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Descargar PNG
          </button>
        </div>
      )}

      {!qrData && (
        <div className="bg-card border border-border p-8 text-center text-muted text-sm flex flex-col items-center gap-3">
          <QrCode size={32} />
          Introduce una URL para generar tu código QR
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
