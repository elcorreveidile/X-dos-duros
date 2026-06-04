'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Gift } from 'lucide-react'

export function FreeConfirmBlock({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const confirm = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/payments/confirm-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      if (res.ok) {
        setDone(true)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) return null

  return (
    <div className="border border-neon/40 bg-neon/5 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Gift size={16} className="text-neon" />
        <p className="text-xs uppercase tracking-widest text-neon font-bold">Proyecto sin coste</p>
      </div>
      <p className="text-muted text-sm">
        Este proyecto es un regalo. Pulsa el botón para activarlo y empezar a trabajar juntos.
      </p>
      <Button variant="primary" size="lg" loading={loading} onClick={confirm} className="w-full">
        Activar proyecto
      </Button>
    </div>
  )
}
