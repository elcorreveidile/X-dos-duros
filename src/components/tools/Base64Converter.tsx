'use client'

import { useState } from 'react'
import { Upload, Copy, Check, Download } from 'lucide-react'

export function Base64Converter() {
  const [base64, setBase64] = useState('')
  const [fileName, setFileName] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFile = (file: File) => {
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      // Remove data URL prefix to get pure base64
      const pureBase64 = result.split(',')[1]
      setBase64(pureBase64)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const copy = () => {
    navigator.clipboard.writeText(base64)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([base64], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName || 'imagen'}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getMimeType = () => {
    // Detect MIME type from base64
    if (base64.startsWith('/9j/')) return 'image/jpeg'
    if (base64.startsWith('iVBORw0KG')) return 'image/png'
    if (base64.startsWith('R0lGOD')) return 'image/gif'
    if (base64.startsWith('UklGR')) return 'image/webp'
    if (base64.startsWith('Qk0')) return 'image/bmp'
    return 'image/png'
  }

  const cssCode = base64 ? `background-image: url(data:${getMimeType()};base64,${base64});` : ''
  const htmlCode = base64 ? `<img src="data:${getMimeType()};base64,${base64}" alt="${fileName}" />` : ''

  return (
    <div className="space-y-8">
      {/* Upload */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-3">
          Sube imagen
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border hover:border-neon transition-colors"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInput}
            className="hidden"
            id="base64-upload"
          />
          <label
            htmlFor="base64-upload"
            className="flex flex-col items-center justify-center gap-3 p-8 cursor-pointer"
          >
            <Upload size={32} className="text-muted" />
            <span className="text-sm text-muted">
              Arrastra una imagen aquí o haz clic
            </span>
            <span className="text-xs text-muted">
              PNG, JPG, GIF, WebP (máx. 10MB)
            </span>
          </label>
        </div>
      </div>

      {/* Result */}
      {base64 && (
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-card border border-border p-4">
            <p className="text-xs text-muted mb-2">Vista previa</p>
            <img
              src={`data:${getMimeType()};base64,${base64}`}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto"
            />
          </div>

          {/* Base64 output */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs uppercase tracking-wider font-mono text-muted">
                Base64 ({(base64.length / 1024).toFixed(1)} KB)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={download}
                  className="flex items-center gap-2 text-xs text-muted hover:text-neon transition-colors"
                >
                  <Download size={14} /> Descargar
                </button>
                <button
                  onClick={copy}
                  className="flex items-center gap-2 text-xs text-neon hover:text-neon/80"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copiar
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={base64}
              className="w-full h-32 px-4 py-3 border border-border bg-card text-foreground text-xs font-mono resize-none"
            />
          </div>

          {/* Code examples */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-muted mb-2">CSS</p>
              <pre className="bg-card border border-border p-3 text-xs font-mono overflow-x-auto">
                {cssCode}
              </pre>
            </div>
            <div>
              <p className="text-xs font-mono text-muted mb-2">HTML</p>
              <pre className="bg-card border border-border p-3 text-xs font-mono overflow-x-auto">
                {htmlCode}
              </pre>
            </div>
          </div>

          <p className="text-xs text-muted">
            ⚠️ Los datos Base64 aumentan el tamaño del archivo en ~33%. Úsalo solo para
            imágenes pequeñas o iconos. Para imágenes grandes, mejor usar archivos externos.
          </p>
        </div>
      )}
    </div>
  )
}
