import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.por2duros.com'
const FROM = process.env.EMAIL_FROM ?? 'Por 2 Duros <hola@por2duros.com>'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    // Always return ok to avoid email enumeration
    if (!user) return NextResponse.json({ ok: true })

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 15 * 60 * 1000) // 15 min

    await prisma.verificationToken.create({ data: { identifier: email, token, expires } })

    const link = `${APP_URL}/login/verify?token=${token}&email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Tu enlace de acceso — Por 2 Duros',
      html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#FFF;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #222;">
          <span style="font-size:24px;font-weight:900;letter-spacing:-1px;text-transform:uppercase;">
            Por<span style="color:#39FF14;"> 2</span> Duros
          </span>
        </td></tr>
        <tr><td style="padding:32px 0;">
          <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:-1px;">Tu enlace de acceso</h1>
          <p style="margin:0 0 16px;color:#CCC;line-height:1.6;font-size:15px;">Haz clic en el botón para acceder a tu panel. El enlace caduca en <strong style="color:#39FF14;">15 minutos</strong>.</p>
          <a href="${link}" style="display:inline-block;background:#39FF14;color:#0A0A0A;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;text-decoration:none;padding:14px 28px;margin-top:8px;">Acceder al panel</a>
          <p style="margin:24px 0 0;color:#666;font-size:12px;">Si no solicitaste este acceso, ignora este email.</p>
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
  } catch (err) {
    console.error('[magic-link]', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
