'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Trash2, Search, Send } from 'lucide-react'

type ClientRow = {
  id: string
  name: string | null
  email: string
  createdAt: string
  projectCount: number
  totalSpent: number
  hasSubscription: boolean
  subscriptionPrice: number | null
}

function formatCurrencyClient(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatDateClient(s: string) {
  return new Date(s).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function ClientsTable({ initialClients }: { initialClients: ClientRow[] }) {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [sendingAccessId, setSendingAccessId] = useState<string | null>(null)

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.email.toLowerCase().includes(q) ||
      (c.name ?? '').toLowerCase().includes(q)
    )
  })

  const handleSendAccess = async (client: ClientRow) => {
    setSendingAccessId(client.id)
    try {
      const res = await fetch(`/api/admin/clients/${client.id}/send-access`, { method: 'POST' })
      if (!res.ok) throw new Error('Error al enviar')
      alert(`Acceso enviado a ${client.email}`)
    } catch {
      alert('No se pudo enviar el acceso.')
    } finally {
      setSendingAccessId(null)
    }
  }

  const handleDelete = async (client: ClientRow) => {
    if (!confirm(`¿Eliminar a "${client.name ?? client.email}" y todos sus proyectos? Esta acción no se puede deshacer.`)) return
    setDeletingId(client.id)
    try {
      const res = await fetch(`/api/admin/clients/${client.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar')
      setClients((prev) => prev.filter((c) => c.id !== client.id))
    } catch {
      alert('No se pudo eliminar el cliente.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          className="input pl-8 text-sm"
          placeholder="Buscar por nombre o email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border p-16 text-center">
          <p className="text-muted text-sm">{search ? 'Sin resultados.' : 'No hay clientes aún.'}</p>
        </div>
      ) : (
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                {['Cliente', 'Email', 'Proyectos', 'Total gastado', 'Suscripción', 'Alta', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => (
                <tr
                  key={client.id}
                  className={`border-b border-border hover:bg-card transition-colors ${i % 2 === 0 ? '' : 'bg-card/30'}`}
                >
                  <td className="px-4 py-3 font-medium">{client.name ?? '—'}</td>
                  <td className="px-4 py-3 text-muted mono text-xs">{client.email}</td>
                  <td className="px-4 py-3 mono">{client.projectCount}</td>
                  <td className="px-4 py-3 mono font-bold neon-text">{formatCurrencyClient(client.totalSpent)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={client.hasSubscription ? 'neon' : 'outline'}>
                      {client.hasSubscription ? `€${client.subscriptionPrice}/mes` : 'Sin plan'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{formatDateClient(client.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        disabled={sendingAccessId === client.id}
                        onClick={() => handleSendAccess(client)}
                        className="text-muted hover:text-neon transition-colors disabled:opacity-40"
                        title="Enviar acceso"
                      >
                        <Send size={14} />
                      </button>
                      <button
                        disabled={deletingId === client.id}
                        onClick={() => handleDelete(client)}
                        className="text-muted hover:text-red-400 transition-colors disabled:opacity-40"
                        title="Eliminar cliente"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
