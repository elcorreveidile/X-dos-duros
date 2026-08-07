'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

export function SeoRoiCalculator() {
  const [monthlyTraffic, setMonthlyTraffic] = useState('')
  const [conversionRate, setConversionRate] = useState('')
  const [avgOrderValue, setAvgOrderValue] = useState('')
  const [seoImprovement, setSeoImprovement] = useState('30')
  const [monthlyBudget, setMonthlyBudget] = useState('')

  const calculate = () => {
    const traffic = parseFloat(monthlyTraffic) || 0
    const convRate = (parseFloat(conversionRate) || 0) / 100
    const aov = parseFloat(avgOrderValue) || 0
    const improvement = (parseFloat(seoImprovement) || 0) / 100
    const budget = parseFloat(monthlyBudget) || 0

    // Current monthly revenue
    const currentRevenue = traffic * convRate * aov

    // After SEO improvement
    const improvedTraffic = traffic * (1 + improvement)
    const improvedRevenue = improvedTraffic * convRate * aov

    // Monthly ROI
    const monthlyIncrease = improvedRevenue - currentRevenue
    const roi = budget > 0 ? ((monthlyIncrease - budget) / budget) * 100 : 0

    // Break-even (months)
    const breakEven = budget > 0 && monthlyIncrease > 0 ? budget / monthlyIncrease : 0

    return {
      currentRevenue,
      improvedRevenue,
      monthlyIncrease,
      roi,
      breakEven,
      yearlyIncrease: monthlyIncrease * 12
    }
  }

  const result = monthlyTraffic ? calculate() : null

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Tráfico mensual actual (visitas)
          </label>
          <input
            type="number"
            value={monthlyTraffic}
            onChange={(e) => setMonthlyTraffic(e.target.value)}
            placeholder="10000"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Tasa de conversión (%)
          </label>
          <input
            type="number"
            value={conversionRate}
            onChange={(e) => setConversionRate(e.target.value)}
            placeholder="2"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Valor medio de pedido (€)
          </label>
          <input
            type="number"
            value={avgOrderValue}
            onChange={(e) => setAvgOrderValue(e.target.value)}
            placeholder="50"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Mejora esperada con SEO (%)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="10"
              max="100"
              value={seoImprovement}
              onChange={(e) => setSeoImprovement(e.target.value)}
              className="flex-1"
            />
            <span className="text-sm font-mono">{seoImprovement}%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-mono text-muted mb-2">
            Presupuesto SEO mensual (€)
          </label>
          <input
            type="number"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            placeholder="1000"
            className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-neon"
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 text-center">
            <p className="text-xs uppercase tracking-wider font-mono text-muted mb-2">
              ROI mensual estimado
            </p>
            <p className={`text-4xl font-black ${result.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {result.roi.toFixed(1)}%
            </p>
            <p className="text-xs text-muted mt-1">
              {result.roi >= 0 ? 'Rentable' : 'No rentable'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border p-4">
              <p className="text-xs text-muted">Ingreso mensual actual</p>
              <p className="text-lg font-bold">{result.currentRevenue.toFixed(0)} €</p>
            </div>
            <div className="bg-card border border-border p-4">
              <p className="text-xs text-muted">Ingreso con SEO</p>
              <p className="text-lg font-bold text-neon">{result.improvedRevenue.toFixed(0)} €</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border p-4">
              <p className="text-xs text-muted">Incremento mensual</p>
              <p className="text-lg font-bold text-green-500">+{result.monthlyIncrease.toFixed(0)} €</p>
            </div>
            <div className="bg-card border border-border p-4">
              <p className="text-xs text-muted">Break-even</p>
              <p className="text-lg font-bold">{result.breakEven.toFixed(1)} meses</p>
            </div>
          </div>

          <div className="bg-card border border-border p-4">
            <p className="text-xs text-muted">Incremento anual</p>
            <p className="text-2xl font-bold text-neon">+{result.yearlyIncrease.toFixed(0)} €</p>
          </div>

          <p className="text-xs text-muted">
            * Estimación basada en mejora de tráfico. Los resultados reales pueden variar
            según competitividad, calidad del SEO y tiempo de implementación.
          </p>
        </div>
      )}
    </div>
  )
}
