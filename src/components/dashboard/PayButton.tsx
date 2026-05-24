'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CreditCard } from 'lucide-react'

interface PayButtonProps {
  projectId: string
  amount: number
}

export function PayButton({ projectId, amount }: PayButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    const res = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.url) window.location.href = data.url
  }

  return (
    <Button variant="primary" size="lg" loading={loading} onClick={handlePay} className="w-full">
      <CreditCard size={16} className="mr-2" />
      Pagar €{amount} con tarjeta
    </Button>
  )
}
