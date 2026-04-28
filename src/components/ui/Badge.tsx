import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'neon' | 'outline' | 'error' | 'warning' | 'info'
  className?: string
}

export function Badge({ children, variant = 'outline', className }: BadgeProps) {
  const variants = {
    neon: 'bg-neon text-background',
    outline: 'border border-border text-muted',
    error: 'border border-red-400 text-red-400',
    warning: 'border border-yellow-400 text-yellow-400',
    info: 'border border-blue-400 text-blue-400',
  }

  return (
    <span className={cn('badge', variants[variant], className)}>
      {children}
    </span>
  )
}
