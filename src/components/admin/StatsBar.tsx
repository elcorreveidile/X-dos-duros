import { TrendingUp, Clock, Package, Users, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const STATS = [
  { label: 'Proyectos activos', value: 4, icon: Package, unit: '' },
  { label: 'En desarrollo', value: 2, icon: Clock, unit: '' },
  { label: 'Entregados (mes)', value: 8, icon: TrendingUp, unit: '' },
  { label: 'Clientes activos', value: 12, icon: Users, unit: '' },
  { label: 'Revenue (mes)', value: 3480, icon: DollarSign, unit: 'currency' },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
      {STATS.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-background p-5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted mb-2">
              <Icon size={14} />
              <span className="text-xs uppercase tracking-wider">{stat.label}</span>
            </div>
            <span className="text-2xl font-black mono neon-text">
              {stat.unit === 'currency' ? formatCurrency(stat.value) : stat.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
