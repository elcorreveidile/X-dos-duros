import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getTimeRemaining(deadline: Date | string): {
  hours: number
  minutes: number
  seconds: number
  total: number
  expired: boolean
} {
  const total = new Date(deadline).getTime() - Date.now()
  if (total <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, total: 0, expired: true }
  }
  const hours = Math.floor((total / (1000 * 60 * 60)) % 48)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { hours, minutes, seconds, total, expired: false }
}

export function getProjectStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    LEAD: 'Lead',
    BRIEFING: 'Briefing',
    DEVELOPMENT: 'Desarrollo',
    REVIEW: 'Revisión',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
  }
  return labels[status] ?? status
}

export function getProjectStatusColor(status: string): string {
  const colors: Record<string, string> = {
    LEAD: 'text-muted border-border',
    BRIEFING: 'text-yellow-400 border-yellow-400',
    DEVELOPMENT: 'text-blue-400 border-blue-400',
    REVIEW: 'text-purple-400 border-purple-400',
    DELIVERED: 'text-neon border-neon',
    CANCELLED: 'text-red-400 border-red-400',
  }
  return colors[status] ?? 'text-muted border-border'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
