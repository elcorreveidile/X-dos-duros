'use client'

import { useEffect, useState } from 'react'
import { getTimeRemaining } from '@/lib/utils'
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react'

interface ProjectTimerProps {
  deadline: Date | string | null
  started: boolean
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function ProjectTimer({ deadline, started }: ProjectTimerProps) {
  const [remaining, setRemaining] = useState(
    deadline ? getTimeRemaining(deadline) : null
  )

  useEffect(() => {
    if (!deadline) return
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(deadline))
    }, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  if (!started) {
    return (
      <div className="border border-border p-6 flex flex-col items-center gap-3 text-center">
        <Clock size={32} className="text-muted" />
        <h3 className="font-bold uppercase tracking-tight">Contador pendiente</h3>
        <p className="text-muted text-sm">
          El equipo activará el contador de 48h una vez confirmemos tu briefing y materiales.
        </p>
      </div>
    )
  }

  if (remaining?.expired) {
    return (
      <div className="border border-neon bg-neon/5 p-6 flex flex-col items-center gap-3 text-center">
        <CheckCircle size={32} className="text-neon" />
        <h3 className="font-bold uppercase tracking-tight neon-text">¡Proyecto entregado!</h3>
        <p className="text-muted text-sm">
          El tiempo ha concluido. Revisa la URL de demo en tu panel.
        </p>
      </div>
    )
  }

  const urgency = remaining && remaining.total < 1000 * 60 * 60 * 6

  return (
    <div
      className={`border p-6 flex flex-col items-center gap-4 text-center ${
        urgency ? 'border-yellow-400 bg-yellow-400/5' : 'border-neon bg-neon/5'
      }`}
    >
      <div className="flex items-center gap-2">
        {urgency ? (
          <AlertTriangle size={16} className="text-yellow-400" />
        ) : (
          <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
        )}
        <span className={`text-xs uppercase tracking-widest font-mono ${urgency ? 'text-yellow-400' : 'text-neon'}`}>
          Tiempo restante de entrega
        </span>
      </div>

      {remaining && (
        <div className="flex items-center gap-3">
          {[
            { value: remaining.hours, label: 'horas' },
            { value: remaining.minutes, label: 'min' },
            { value: remaining.seconds, label: 'seg' },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`mono text-5xl font-black tabular-nums ${
                    urgency ? 'text-yellow-400' : 'neon-text'
                  }`}
                >
                  {pad(unit.value)}
                </span>
                <span className="text-muted text-xs uppercase tracking-widest mt-1">{unit.label}</span>
              </div>
              {i < 2 && <span className={`text-2xl font-black mb-4 ${urgency ? 'text-yellow-400' : 'text-neon'} opacity-60`}>:</span>}
            </div>
          ))}
        </div>
      )}

      <p className="text-muted text-xs">
        Deadline: {deadline ? new Date(deadline).toLocaleString('es-ES') : '—'}
      </p>
    </div>
  )
}
