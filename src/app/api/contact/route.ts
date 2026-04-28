import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  projectType: z.string(),
  description: z.string().min(10),
  budget: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  // In production: send email via Resend/SendGrid
  // For now, just acknowledge
  console.log('[Contact Form]', parsed.data)

  return NextResponse.json({ success: true }, { status: 201 })
}
