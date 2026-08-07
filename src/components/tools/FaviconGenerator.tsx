'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Download, Image as ImageIcon } from 'lucide-react'

export function FaviconGenerator() {
  const [image, setImage] = useState<string>('')
  const [generated, setGenerated] = useState<{ ico: string, png16: string, png32: string, png180: string, svg: string } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // Generate different sizes
      const sizes = [16, 32, 180]
      const results: any = {}

      sizes.forEach(size => {
        canvas.width = size
        canvas.height = size
        ctx.drawImage(img, 0, 0, size, size)
        results[`png${size}`] = canvas.toDataURL('image/png')
      })

      // SVG version (simplified - just wraps in SVG)
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
          <image href="${image}" width="180" height="180"/>
        </svg>
      `
      results.svg = 'data:image/svg+xml,' + encodeURIComponent(svgData)

      // ICO (simplified - just 32x32 PNG with .ico extension)
      canvas.width = 32
      canvas.height = 32
      ctx.drawImage(img, 0, 0, 32, 32)
      results.ico = canvas.toDataURL('image/png')

      setGenerated(results)
    }
    img.src = image
  }, [image])

  const download = (data: string, filename: string) => {
    const link = document.createElement('a')
    link.href = data
    link.download = filename
    link.click()
  }

  return (
    <div className="space-y-8">
      {/* Upload */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Sube tu imagen
        </label>
        <div className="border-2 border-dashed border-border hover:border-neon transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="favicon-upload"
          />
          <label
            htmlFor="favicon-upload"
            className="flex flex-col items-center justify-center gap-3 p-8 cursor-pointer"
          >
            <Upload size={32} className="text-muted" />
            <span className="text-sm text-muted">
              Haz clic o arrastra una imagen aquí
            </span>
            <span className="text-xs text-muted">
              PNG, JPG, SVG (máx. 2MB)
            </span>
          </label>
        </div>
      </div>

      {/* Preview */}
      {image && (
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
            Vista previa
          </label>
          <div className="bg-card border border-border p-4 flex items-center gap-4">
            <img src={image} alt="Original" className="w-16 h-16 object-contain" />
            <div className="text-xs text-muted">
              <p>Imagen original</p>
            </div>
          </div>
        </div>
      )}

      {/* Downloads */}
      {generated && (
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
            Descargar
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <DownloadButton
              icon={<ImageIcon size={16} />}
              label="favicon.ico"
              onClick={() => download(generated!.ico, 'favicon.ico')}
            />
            <DownloadButton
              label="favicon-16x16.png"
              onClick={() => download(generated!.png16, 'favicon-16x16.png')}
            />
            <DownloadButton
              label="favicon-32x32.png"
              onClick={() => download(generated!.png32, 'favicon-32x32.png')}
            />
            <DownloadButton
              label="apple-touch-icon.png"
              onClick={() => download(generated!.png180, 'apple-touch-icon.png')}
            />
            <DownloadButton
              label="favicon.svg"
              onClick={() => download(generated!.svg, 'favicon.svg')}
            />
          </div>
        </div>
      )}

      {/* HTML code */}
      {generated && (
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
            Código HTML para &lt;head&gt;
          </label>
          <pre className="bg-card border border-border p-4 text-xs font-mono overflow-x-auto">
            {`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`}
          </pre>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

function DownloadButton({
  icon,
  label,
  onClick
}: {
  icon?: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-4 py-3 border border-border hover:border-neon hover:text-neon transition-colors text-sm"
    >
      {icon}
      <Download size={14} />
      {label}
    </button>
  )
}
