'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed'

    const variants = {
      primary: 'btn-primary',
      outline: 'btn-outline',
      ghost: 'btn-ghost',
      danger:
        'bg-transparent text-red-400 border border-red-400 hover:bg-red-400 hover:text-background px-6 py-3 text-sm',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], size !== 'md' && sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="mr-2 h-3 w-3 border border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
