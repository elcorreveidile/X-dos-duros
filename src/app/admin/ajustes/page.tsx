export default function AdminAjustesPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Ajustes</h1>
        <p className="text-muted text-sm mt-1">Configuración del sistema</p>
      </div>

      <div className="border border-border p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Notificaciones</h2>
        {[
          { label: 'Email al recibir nueva solicitud', defaultChecked: true },
          { label: 'Email al completar briefing', defaultChecked: true },
          { label: 'Alerta cuando queden menos de 6h', defaultChecked: true },
          { label: 'Resumen diario de proyectos activos', defaultChecked: false },
        ].map((item) => (
          <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={item.defaultChecked}
              />
              <div className="w-10 h-5 bg-border peer-checked:bg-neon rounded-full transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-sm text-muted group-hover:text-foreground transition-colors">
              {item.label}
            </span>
          </label>
        ))}
      </div>

      <div className="border border-border p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">General</h2>
        <div>
          <label className="label">Email de contacto público</label>
          <input className="input" defaultValue="hola@por2duros.com" />
        </div>
        <div>
          <label className="label">Tiempo de entrega (horas)</label>
          <input type="number" className="input" defaultValue={48} min={1} max={168} />
        </div>
        <button className="btn-primary text-sm">Guardar cambios</button>
      </div>
    </div>
  )
}
