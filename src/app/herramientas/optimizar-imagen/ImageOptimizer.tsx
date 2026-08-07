'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, Download, RefreshCw, ImageIcon, ChevronDown, ChevronUp } from 'lucide-react'

interface ImageInfo {
  name: string
  originalSize: number
  width: number
  height: number
  src: string
}

interface Result {
  blob: Blob
  url: string
  size: number
  width: number
  height: number
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function savings(original: number, optimized: number): string {
  const pct = ((original - optimized) / original) * 100
  return pct > 0 ? `-${pct.toFixed(0)}%` : `+${Math.abs(pct).toFixed(0)}%`
}

export function ImageOptimizer() {
  const [image, setImage] = useState<ImageInfo | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [quality, setQuality] = useState(80)
  const [maxWidth, setMaxWidth] = useState<number | ''>('')
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp')
  const [processing, setProcessing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const prevResultUrl = useRef<string | null>(null)

  // Revoke old blob URLs on cleanup
  useEffect(() => {
    return () => {
      if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current)
    }
  }, [])

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      const img = new window.Image()
      img.onload = () => {
        setImage({
          name: file.name,
          originalSize: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          src,
        })
        setResult(null)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const optimize = useCallback(() => {
    if (!image) return
    setProcessing(true)

    const img = new window.Image()
    img.onload = () => {
      const targetWidth = maxWidth && maxWidth < img.naturalWidth ? maxWidth : img.naturalWidth
      const scale = targetWidth / img.naturalWidth
      const targetHeight = Math.round(img.naturalHeight * scale)

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const q = format === 'image/png' ? undefined : quality / 100
      canvas.toBlob(
        (blob) => {
          if (!blob) { setProcessing(false); return }
          if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current)
          const url = URL.createObjectURL(blob)
          prevResultUrl.current = url
          setResult({ blob, url, size: blob.size, width: targetWidth, height: targetHeight })
          setProcessing(false)
        },
        format,
        q,
      )
    }
    img.src = image.src
  }, [image, quality, maxWidth, format])

  const download = useCallback(() => {
    if (!result || !image) return
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png'
    const baseName = image.name.replace(/\.[^.]+$/, '')
    const a = document.createElement('a')
    a.href = result.url
    a.download = `${baseName}-optimizada.${ext}`
    a.click()
  }, [result, image, format])

  const reset = useCallback(() => {
    setImage(null)
    setResult(null)
  }, [])

  const formatExt = format === 'image/webp' ? 'WebP' : format === 'image/jpeg' ? 'JPEG' : 'PNG'

  return (
    <div className="space-y-8">
      {/* Drop zone */}
      {!image ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-none cursor-pointer transition-all p-16 flex flex-col items-center justify-center gap-5 text-center select-none ${
            dragging ? 'border-neon bg-neon/5' : 'border-border hover:border-foreground/40'
          }`}
        >
          <div className={`w-16 h-16 border flex items-center justify-center transition-colors ${dragging ? 'border-neon' : 'border-border'}`}>
            <Upload size={24} className={dragging ? 'text-neon' : 'text-muted'} />
          </div>
          <div>
            <p className="font-bold text-sm uppercase tracking-widest">
              {dragging ? 'Suelta aquí' : 'Arrastra tu imagen aquí'}
            </p>
            <p className="text-xs text-muted mt-1">o haz clic para seleccionar · JPG, PNG, WebP, GIF, AVIF</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image info */}
          <div className="border border-border p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <ImageIcon size={16} className="text-muted flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-mono truncate">{image.name}</p>
                <p className="text-xs text-muted mt-0.5">
                  {image.width} × {image.height}px · {formatBytes(image.originalSize)}
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs text-muted hover:text-neon transition-colors flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider"
            >
              <RefreshCw size={12} /> Cambiar imagen
            </button>
          </div>

          {/* Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            <div className="bg-background p-4 space-y-2">
              <p className="text-xs uppercase tracking-widest text-muted font-mono">Original</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="Original" className="w-full object-contain max-h-64 bg-card" />
              <p className="text-xs text-muted">{image.width}×{image.height}px · {formatBytes(image.originalSize)}</p>
            </div>
            <div className="bg-background p-4 space-y-2">
              <p className="text-xs uppercase tracking-widest text-muted font-mono">Optimizada</p>
              {result ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.url} alt="Optimizada" className="w-full object-contain max-h-64 bg-card" />
                  <p className="text-xs text-muted">
                    {result.width}×{result.height}px · {formatBytes(result.size)}{' '}
                    <span className={result.size < image.originalSize ? 'text-neon font-bold' : 'text-orange-400 font-bold'}>
                      ({savings(image.originalSize, result.size)})
                    </span>
                  </p>
                </>
              ) : (
                <div className="w-full max-h-64 h-40 bg-card flex items-center justify-center">
                  <p className="text-xs text-muted">Configura y pulsa "Optimizar"</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="border border-border p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Format */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-2">Formato de salida</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['image/webp', 'image/jpeg', 'image/png'] as const).map((f) => {
                    const label = f === 'image/webp' ? 'WebP' : f === 'image/jpeg' ? 'JPEG' : 'PNG'
                    return (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                          format === f ? 'border-neon text-neon bg-neon/5' : 'border-border text-muted hover:border-foreground/40'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
                {format === 'image/webp' && (
                  <p className="text-xs text-muted mt-1.5">Recomendado para web — hasta 30% más ligero que JPEG</p>
                )}
              </div>

              {/* Quality */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Calidad {format !== 'image/png' ? <span className="text-neon font-mono">{quality}%</span> : <span className="text-muted">(sin pérdida)</span>}
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={quality}
                  disabled={format === 'image/png'}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-neon disabled:opacity-40"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>Mínimo</span>
                  <span>Máximo</span>
                </div>
              </div>
            </div>

            {/* Advanced */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                {showAdvanced ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                Opciones avanzadas
              </button>
              {showAdvanced && (
                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">
                    Ancho máximo (px) <span className="normal-case text-muted">— opcional, mantiene proporción</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={8000}
                    placeholder={`Sin cambio (${image.width}px)`}
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(e.target.value ? Number(e.target.value) : '')}
                    className="w-full sm:w-48 bg-card border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:border-neon transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border">
              <button
                onClick={optimize}
                disabled={processing}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/80 transition-colors disabled:opacity-50"
              >
                {processing ? (
                  <><RefreshCw size={14} className="animate-spin" /> Procesando…</>
                ) : (
                  `Optimizar a ${formatExt}`
                )}
              </button>
              {result && (
                <button
                  onClick={download}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-neon text-neon font-black text-xs uppercase tracking-widest hover:bg-neon/5 transition-colors whitespace-nowrap"
                >
                  <Download size={14} />
                  Descargar
                </button>
              )}
            </div>
          </div>

          {/* Result summary */}
          {result && (
            <div className={`border p-4 flex items-center justify-between gap-4 flex-wrap ${
              result.size < image.originalSize ? 'border-neon/40 bg-neon/5' : 'border-orange-500/40 bg-orange-500/5'
            }`}>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted font-mono mb-1">Resultado</p>
                <p className="text-sm">
                  {formatBytes(image.originalSize)} → <strong className={result.size < image.originalSize ? 'text-neon' : 'text-orange-400'}>{formatBytes(result.size)}</strong>
                  {' · '}
                  <span className={`font-bold ${result.size < image.originalSize ? 'text-neon' : 'text-orange-400'}`}>
                    {savings(image.originalSize, result.size)}
                  </span>
                  {' de peso'}
                </p>
              </div>
              <p className="text-xs text-muted">
                {result.width}×{result.height}px · {formatExt}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Privacy note */}
      <p className="text-xs text-muted text-center border-t border-border pt-6">
        Tu imagen no se sube a ningún servidor. Todo el procesado ocurre en tu navegador.
      </p>
    </div>
  )
}
