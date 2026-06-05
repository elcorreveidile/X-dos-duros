import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')

const schema = z.object({ email: z.string().email() })

const FROM = process.env.EMAIL_FROM ?? 'Por 2 Duros <hola@por2duros.com>'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const { email } = parsed.data
  const identifier = `contact:${email}`
  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expires = new Date(Date.now() + 10 * 60 * 1000)

  await prisma.verificationToken.deleteMany({ where: { identifier } })
  await prisma.verificationToken.create({ data: { identifier, token: code, expires } })

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Tu código de verificación: ${code}`,
    html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><title>Código de verificación</title></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #222;">
          <span style="font-size:24px;font-weight:900;letter-spacing:-1px;text-transform:uppercase;">Por<span style="color:#39FF14;"> 2</span> Duros</span>
        </td></tr>
        <tr><td style="padding:32px 0;">
          <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:-1px;">Verifica tu email</h1>
          <p style="margin:0 0 16px;color:#CCCCCC;line-height:1.6;font-size:15px;">Introduce este código en el formulario para enviar tu solicitud. Válido durante <strong style="color:#FFF;">10 minutos</strong>.</p>
          <div style="background:#111;border:1px solid #39FF14;padding:24px;text-align:center;margin:24px 0;">
            <span style="font-family:monospace;font-size:40px;font-weight:900;letter-spacing:12px;color:#39FF14;">${code}</span>
          </div>
          <p style="margin:0;color:#666;font-size:13px;">Si no has rellenado ningún formulario en por2duros.com, ignora este email.</p>
        </td></tr>
        <tr><td style="padding-top:32px;border-top:1px solid #222;color:#666;font-size:12px;">
          <p style="margin:0;">Por 2 Duros — Tu web en 48 horas</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })

  return NextResponse.json({ ok: true })
}
