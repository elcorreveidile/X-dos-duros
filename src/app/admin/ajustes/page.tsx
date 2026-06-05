import { Info } from 'lucide-react'

export default function AdminAjustesPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Ajustes</h1>
        <p className="text-muted text-sm mt-1">Configuración del sistema</p>
      </div>

      <div className="border border-border p-6 flex gap-4">
        <Info size={18} className="text-muted shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Configuración vía variables de entorno</p>
          <p className="text-muted text-sm">
            La configuración del sistema (credenciales de Stripe, correo, URL de la app) se gestiona
            directamente en las variables de entorno del servidor. No hay ajustes editables desde el panel.
          </p>
        </div>
      </div>

      <div className="border border-border p-6 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Variables activas</h2>
        {[
          { key: 'NEXT_PUBLIC_APP_URL', value: process.env.NEXT_PUBLIC_APP_URL ?? '—' },
          { key: 'DATABASE_URL', value: process.env.DATABASE_URL ? '✓ Configurada' : '✗ No configurada' },
          { key: 'STRIPE_SECRET_KEY', value: process.env.STRIPE_SECRET_KEY ? '✓ Configurada' : '✗ No configurada' },
          { key: 'RESEND_API_KEY', value: process.env.RESEND_API_KEY ? '✓ Configurada' : '✗ No configurada' },
        ].map(({ key, value }) => (
          <div key={key} className="flex items-center justify-between gap-4 text-sm border-b border-border pb-3 last:border-0 last:pb-0">
            <span className="mono text-xs text-muted">{key}</span>
            <span className="mono text-xs">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
