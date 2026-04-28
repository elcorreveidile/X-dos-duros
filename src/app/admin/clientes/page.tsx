import { Badge } from '@/components/ui/Badge'
import { formatDate, formatCurrency } from '@/lib/utils'

const MOCK_CLIENTS = [
  { id: 'u1', name: 'Ana García', email: 'ana@panaderia.com', projects: 1, totalSpent: 299, lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), subscribed: false },
  { id: 'u2', name: 'Carlos López', email: 'carlos@moda.es', projects: 1, totalSpent: 599, lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5), subscribed: true },
  { id: 'u3', name: 'María Ruiz', email: 'maria@reservas.io', projects: 2, totalSpent: 1698, lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), subscribed: true },
  { id: 'u4', name: 'Pedro Sanz', email: 'pedro@hr.com', projects: 1, totalSpent: 349, lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 1), subscribed: false },
  { id: 'u5', name: 'Laura Vega', email: 'laura@restaurante.com', projects: 3, totalSpent: 2097, lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 72), subscribed: true },
]

export default function AdminClientesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Clientes</h1>
        <p className="text-muted text-sm mt-1">{MOCK_CLIENTS.length} clientes registrados</p>
      </div>

      <div className="border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-card">
            <tr>
              {['Cliente', 'Email', 'Proyectos', 'Total gastado', 'Suscripción', 'Última actividad'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_CLIENTS.map((client, i) => (
              <tr
                key={client.id}
                className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
              >
                <td className="px-4 py-3 font-medium">{client.name}</td>
                <td className="px-4 py-3 text-muted mono text-xs">{client.email}</td>
                <td className="px-4 py-3">
                  <span className="mono">{client.projects}</span>
                </td>
                <td className="px-4 py-3 mono font-bold neon-text">
                  {formatCurrency(client.totalSpent)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={client.subscribed ? 'neon' : 'outline'}>
                    {client.subscribed ? 'Activa' : 'Sin plan'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted text-xs">
                  {formatDate(client.lastActivity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
