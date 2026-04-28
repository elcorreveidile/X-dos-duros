'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Send, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import type { Ticket, TicketMessage } from '@/types'
import { formatDateTime } from '@/lib/utils'

const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    projectId: 'p1',
    subject: 'Pregunta sobre la integración de pago',
    status: 'IN_PROGRESS',
    messages: [
      {
        id: 'm1',
        ticketId: '1',
        authorId: 'a1',
        content: '¿Podéis integrar Bizum además de tarjeta?',
        isAdmin: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
      {
        id: 'm2',
        ticketId: '1',
        authorId: 'admin',
        content:
          'Sí, podemos integrar Bizum a través de Redsys. Tiene un coste adicional de €80. ¿Te parece bien?',
        isAdmin: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
]

function statusVariant(status: string): 'neon' | 'outline' | 'error' | 'warning' | 'info' {
  const map: Record<string, 'neon' | 'outline' | 'error' | 'warning' | 'info'> = {
    OPEN: 'info',
    IN_PROGRESS: 'warning',
    RESOLVED: 'neon',
    CLOSED: 'outline',
  }
  return map[status] ?? 'outline'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    OPEN: 'Abierto',
    IN_PROGRESS: 'En curso',
    RESOLVED: 'Resuelto',
    CLOSED: 'Cerrado',
  }
  return map[status] ?? status
}

interface TicketThreadProps {
  ticket: Ticket
}

function TicketThread({ ticket }: TicketThreadProps) {
  const [open, setOpen] = useState(true)
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState<TicketMessage[]>(ticket.messages)
  const [sending, setSending] = useState(false)

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 500))
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ticketId: ticket.id,
        authorId: 'me',
        content: reply,
        isAdmin: false,
        createdAt: new Date(),
      },
    ])
    setReply('')
    setSending(false)
  }

  return (
    <div className="border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-card transition-colors"
      >
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant(ticket.status)}>{statusLabel(ticket.status)}</Badge>
          <span className="font-medium text-sm">{ticket.subject}</span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <span className="text-xs">{formatDateTime(ticket.updatedAt)}</span>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {open && (
        <div className="border-t border-border">
          {/* Messages */}
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${msg.isAdmin ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm ${
                    msg.isAdmin
                      ? 'bg-neon/10 border border-neon/30 text-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-muted text-xs">
                  {msg.isAdmin ? 'Por 2 Duros · ' : 'Tú · '}
                  {formatDateTime(msg.createdAt)}
                </span>
              </div>
            ))}
          </div>

          {/* Reply form */}
          {ticket.status !== 'CLOSED' && (
            <form onSubmit={sendReply} className="border-t border-border p-4 flex gap-3">
              <textarea
                className="input flex-1 min-h-[60px] resize-none text-sm"
                placeholder="Escribe tu mensaje..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendReply(e)
                  }
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

export function TicketSystem() {
  const [tickets] = useState<Ticket[]>(MOCK_TICKETS)
  const [showNew, setShowNew] = useState(false)
  const [newSubject, setNewSubject] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [creating, setCreating] = useState(false)

  const createTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    await new Promise((r) => setTimeout(r, 800))
    setCreating(false)
    setShowNew(false)
    setNewSubject('')
    setNewMessage('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-tight">Mensajes</h2>
          <p className="text-muted text-sm mt-1">Comunicación directa con el equipo</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowNew(!showNew)}>
          <Plus size={14} className="mr-2" />
          Nuevo mensaje
        </Button>
      </div>

      {showNew && (
        <form onSubmit={createTicket} className="border border-neon bg-neon/5 p-6 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold uppercase tracking-tight neon-text">Nuevo mensaje</h3>
          <div>
            <label className="label">Asunto</label>
            <input
              className="input"
              placeholder="Describe brevemente tu consulta"
              required
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Mensaje</label>
            <textarea
              className="input min-h-[100px] resize-none"
              placeholder="Explica tu consulta con detalle..."
              required
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="sm" loading={creating}>
              Enviar
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowNew(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="border border-border p-8 text-center text-muted text-sm">
            No hay mensajes aún. ¿Tienes alguna duda?
          </div>
        ) : (
          tickets.map((ticket) => <TicketThread key={ticket.id} ticket={ticket} />)
        )}
      </div>
    </div>
  )
}
