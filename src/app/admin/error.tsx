'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Admin error]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <AlertTriangle size={40} className="text-yellow-400" />
      <div>
        <h2 className="text-xl font-black uppercase tracking-tight">Error al cargar</h2>
        <p className="text-muted text-sm mt-2 max-w-sm mx-auto">
          No se pudieron cargar los datos. Puede ser un problema temporal de conexión con la base de datos.
        </p>
        {error.digest && (
          <p className="text-muted text-xs mt-2 mono">Digest: {error.digest}</p>
        )}
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-2 bg-neon text-background font-black text-xs uppercase tracking-widest hover:bg-neon/90 transition-colors"
      >
        <RefreshCw size={14} />
        Reintentar
      </button>
    </div>
  )
}
