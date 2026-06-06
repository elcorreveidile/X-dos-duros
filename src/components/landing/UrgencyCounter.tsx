'use client'

import { useEffect, useState } from 'react'

interface TimeUnit {
  value: number
  label: string
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function secondsToUnits(totalSeconds: number): TimeUnit[] {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [
    { value: h, label: 'h' },
    { value: m, label: 'm' },
    { value: s, label: 's' },
  ]
}

interface Props {
  deadline?: string | null
}

export function UrgencyCounter({ deadline }: Props) {
  const [units, setUnits] = useState<TimeUnit[]>([
    { value: 0, label: 'h' },
    { value: 0, label: 'm' },
    { value: 0, label: 's' },
  ])
  const [ticking, setTicking] = useState(false)

  useEffect(() => {
    let totalSeconds: number

    if (deadline) {
      totalSeconds = Math.max(0, Math.floor((new Date(deadline).getTime() - Date.now()) / 1000))
    } else {
      const randomHours = Math.floor(Math.random() * 20) + 8
      const randomMinutes = Math.floor(Math.random() * 60)
      const randomSeconds = Math.floor(Math.random() * 60)
      totalSeconds = randomHours * 3600 + randomMinutes * 60 + randomSeconds
    }

    setUnits(secondsToUnits(totalSeconds))
    setTicking(true)

    const interval = setInterval(() => {
      totalSeconds--
      if (totalSeconds < 0) {
        clearInterval(interval)
        setTicking(false)
        return
      }
      setUnits(secondsToUnits(totalSeconds))
    }, 1000)

    return () => clearInterval(interval)
  }, [deadline])

  return (
    <div className="inline-flex flex-col items-center gap-3 border border-border bg-card px-8 py-5">
      <span className="text-muted text-xs uppercase tracking-widest">
        Proyecto en producción — tiempo restante
      </span>
      <div className="flex items-center gap-4">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span
                className="mono text-4xl sm:text-5xl font-black neon-text tabular-nums"
                style={{ minWidth: '2.5ch', display: 'inline-block', textAlign: 'center' }}
              >
                {pad(unit.value)}
              </span>
              <span className="text-muted text-xs uppercase tracking-widest mt-1">{unit.label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="text-neon text-3xl font-black mb-3 opacity-60">:</span>
            )}
          </div>
        ))}
      </div>
      {ticking && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
          <span className="text-neon text-xs uppercase tracking-widest">En desarrollo ahora</span>
        </div>
      )}
    </div>
  )
}
