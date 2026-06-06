'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Send, Plus, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'
import type { Ticket, TicketMessage } from '@/types'
import { formatDateTime } from '@/lib/utils'

function statusVariant(status: string): 'neon' | 'outline' | 'error' | 'warning' | 'info' {
  const map: Record<string, 'neon' | 'outline' | 'error' | 'warning' | 'info'> = {
    OPEN: 'info', IN_PROGRESS: 'warning', RESOLVED: 'neon', CLOSED: 'outline',
  }
  return map[status] ?? 'outline'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    OPEN: 'Abierto', IN_PROGRESS: 'En curso', RESOLVED: 'Resuelto', CLOSED: 'Cerrado',
  }
  return map[status] ?? status
}

function AdminTicketThread({ ticket: initial }: { ticket: Ticket }) {
  const [open, setOpen] = useState(true)
  const [messages, setMessages] = useState<TicketMessage[]>(initial.messages)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return
    setSending(true)
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: initial.id, content: reply }),
      })
      if (res.ok) {
        const msg = await res.json()
        setMessages((prev) => [...prev, msg])
        setReply('')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-card transition-colors"
      >
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant(initial.status)}>{statusLabel(initial.status)}</Badge>
          <span className="font-medium text-sm">{initial.subject}</span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <span className="text-xs">{formatDateTime(initial.updatedAt)}</span>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {open && (
        <div className="border-t border-border">
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col gap-1 ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 text-sm ${
                  msg.isAdmin
                    ? 'bg-neon/10 border border-neon/30 text-foreground'
                    : 'bg-card border border-border text-foreground'
                }`}>
                  {msg.content}
                </div>
                <span className="text-muted text-xs">
                  {msg.isAdmin ? 'Tú · ' : 'Cliente · '}
                  {formatDateTime(msg.createdAt)}
                </span>
              </div>
            ))}
          </div>

          {initial.status !== 'CLOSED' && (
            <form onSubmit={sendReply} className="border-t border-border p-4 flex gap-3">
              <textarea
                className="input flex-1 min-h-[60px] resize-none text-sm"
                placeholder="Responder al cliente..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(e) }
                }}
              />
              <Button type="submit" variant="primary" size="sm" loading={sending} className="self-end">
                <Send size={14} />
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export function AdminTicketSystem({ projectId }: { projectId: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [newSubject, setNewSubject] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetch(`/api/tickets?projectId=${projectId}`)
      .then((r) => r.json())
      .then((data) => setTickets(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [projectId])

  const createTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, subject: newSubject, message: newMessage }),
      })
      if (res.ok) {
        const ticket = await res.json()
        setTickets((prev) => [ticket, ...prev])
        setShowNew(false)
        setNewSubject('')
        setNewMessage('')
      }
    } finally {
      setCreating(false)
    }
  }

  return (
    <section className="border border-border p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-muted flex items-center gap-2">
          <MessageSquare size={12} /> Mensajes con el cliente
        </h2>
        <Button variant="outline" size="sm" onClick={() => setShowNew(!showNew)}>
          <Plus size={14} className="mr-1.5" />
          Iniciar conversación
        </Button>
      </div>

      {showNew && (
        <form onSubmit={createTicket} className="border border-neon bg-neon/5 p-5 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold uppercase tracking-tight neon-text">Nuevo mensaje al cliente</h3>
          <div>
            <label className="label">Asunto</label>
            <input className="input" placeholder="Ej. Preguntas sobre el briefing" required
              value={newSubject} onChange={(e) => setNewSubject(e.target.value)} />
          </div>
          <div>
            <label className="label">Mensaje</label>
            <textarea className="input min-h-[100px] resize-none" placeholder="Escribe tu mensaje al cliente..."
              required value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="sm" loading={creating}>
              Enviar al cliente
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowNew(false)}>Cancelar</Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="p-6 text-center text-muted text-sm">Cargando mensajes...</div>
        ) : tickets.length === 0 ? (
          <div className="border border-dashed border-border p-6 text-center text-muted text-sm">
            Sin mensajes aún. Usa el botón para iniciar una conversación con el cliente.
          </div>
        ) : (
          tickets.map((ticket) => <AdminTicketThread key={ticket.id} ticket={ticket} />)
        )}
      </div>
    </section>
  )
}
