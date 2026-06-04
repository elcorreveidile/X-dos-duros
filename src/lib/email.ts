import { Resend } from 'resend'
import type { User, Project } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
const FROM = process.env.EMAIL_FROM ?? 'Por 2 Duros <hola@por2duros.com>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@por2duros.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function baseTemplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #222;">
              <span style="font-size:24px;font-weight:900;letter-spacing:-1px;text-transform:uppercase;">
                Por<span style="color:#39FF14;"> 2</span> Duros
              </span>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px 0;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;border-top:1px solid #222;color:#666;font-size:12px;">
              <p style="margin:0;">Por 2 Duros — Tu web en 48 horas</p>
              <p style="margin:4px 0 0;">
                <a href="${APP_URL}" style="color:#39FF14;text-decoration:none;">por2duros.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function btn(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:#39FF14;color:#0A0A0A;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;text-decoration:none;padding:14px 28px;margin-top:24px;">${label}</a>`
}

function h1(text: string): string {
  return `<h1 style="margin:0 0 16px;font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:-1px;">${text}</h1>`
}

function p(text: string): string {
  return `<p style="margin:0 0 16px;color:#CCCCCC;line-height:1.6;font-size:15px;">${text}</p>`
}

function highlight(text: string): string {
  return `<span style="color:#39FF14;font-weight:700;">${text}</span>`
}

// ─── Email senders ─────────────────────────────────────────────────────────────

/** 1. Nueva solicitud de contacto — al admin */
export async function sendContactNotification(data: {
  name: string
  email: string
  projectType: string
  description: string
  budget?: string
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Por 2 Duros] Nueva solicitud de ${data.name}`,
    html: baseTemplate(
      'Nueva solicitud',
      `${h1('Nueva solicitud de proyecto')}
       ${p(`<strong>${data.name}</strong> (${data.email}) ha enviado una solicitud.`)}
       ${p(`<strong>Tipo:</strong> ${data.projectType}`)}
       ${p(`<strong>Presupuesto:</strong> ${data.budget ?? 'No especificado'}`)}
       ${p(`<strong>Descripción:</strong><br/>${data.description}`)}
       ${btn('Ver en el panel', `${APP_URL}/admin`)}`
    ),
  })
}

/** 2. Confirmación al cliente de solicitud recibida */
export async function sendContactConfirmation(data: { name: string; email: string }) {
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Hemos recibido tu solicitud — Por 2 Duros',
    html: baseTemplate(
      'Solicitud recibida',
      `${h1(`Hola, ${data.name}!`)}
       ${p(`Hemos recibido tu solicitud y te contactaremos en ${highlight('menos de 2 horas')} (horario laboral) para confirmar los detalles de tu proyecto.`)}
       ${p('Mientras tanto, puedes revisar nuestro proceso de trabajo en la web.')}
       ${btn('Ver proceso', `${APP_URL}/#proceso`)}`
    ),
  })
}

/** 3b. Acceso al panel con magic link (sin contraseña) */
export async function sendClientMagicAccess(data: { name: string; email: string; magicLink: string }) {
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Tu panel de cliente está listo — Por 2 Duros',
    html: baseTemplate(
      'Accede a tu panel',
      `${h1(`¡Hola, ${data.name}!`)}
       ${p('Tu solicitud ha sido procesada. Hemos creado tu panel de cliente donde podrás seguir el progreso de tu proyecto en tiempo real.')}
       ${p(`Pulsa el botón para acceder directamente. El enlace es válido durante ${highlight('7 días')}.`)}
       ${btn('Acceder a mi panel', data.magicLink)}
       ${p('Si el botón no funciona, copia este enlace en tu navegador:')}
       <p style="margin:0;font-family:monospace;font-size:12px;color:#666;word-break:break-all;">${data.magicLink}</p>`
    ),
  })
}

/** 3. Acceso al panel de cliente (bienvenida) */
export async function sendClientWelcome(data: { name: string; email: string; password: string }) {
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Tu panel de cliente está listo — Por 2 Duros',
    html: baseTemplate(
      'Bienvenido a Por 2 Duros',
      `${h1('¡Tu panel está listo!')}
       ${p(`Hola <strong>${data.name}</strong>, hemos creado tu cuenta para gestionar tu proyecto.`)}
       <table style="background:#111;border:1px solid #222;padding:20px;margin:16px 0;width:100%;box-sizing:border-box;">
         <tr><td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Email</td></tr>
         <tr><td style="font-family:monospace;font-size:16px;color:#FFF;">${data.email}</td></tr>
         <tr><td style="padding:12px 0 4px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Contraseña temporal</td></tr>
         <tr><td style="font-family:monospace;font-size:16px;color:#39FF14;">${data.password}</td></tr>
       </table>
       ${p('Cambia tu contraseña en el primer acceso.')}
       ${btn('Acceder al panel', `${APP_URL}/login`)}`
    ),
  })
}

/** 4. Briefing recibido — al admin */
export async function sendBriefingReceived(data: { project: Project; client: User }) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Por 2 Duros] Briefing completado — ${data.project.name}`,
    html: baseTemplate(
      'Briefing recibido',
      `${h1('Briefing completado')}
       ${p(`El cliente <strong>${data.client.name ?? data.client.email}</strong> ha enviado el briefing para el proyecto ${highlight(data.project.name)}.`)}
       ${p('Revisa el briefing, confirma los detalles y activa el contador de 48h cuando tengas todo el material.')}
       ${btn('Ver proyecto', `${APP_URL}/admin/proyectos`)}`
    ),
  })
}

/** 5. Timer de 48h activado — al cliente */
export async function sendTimerStarted(data: { project: Project; client: User; deadline: Date }) {
  const deadlineStr = data.deadline.toLocaleString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })

  return resend.emails.send({
    from: FROM,
    to: data.client.email,
    subject: `¡Las 48h han comenzado! — ${data.project.name}`,
    html: baseTemplate(
      'Contador iniciado',
      `${h1('¡El reloj ha arrancado!')}
       ${p(`El equipo ha recibido todo el material y ha iniciado el desarrollo de ${highlight(data.project.name)}.`)}
       <table style="background:#111;border:1px solid #39FF14;padding:20px;margin:16px 0;width:100%;box-sizing:border-box;text-align:center;">
         <tr><td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;">Entrega estimada</td></tr>
         <tr><td style="font-size:22px;font-weight:900;color:#39FF14;font-family:monospace;">${deadlineStr}</td></tr>
       </table>
       ${p('Puedes seguir el progreso en tiempo real desde tu panel de cliente.')}
       ${btn('Ver mi proyecto', `${APP_URL}/dashboard`)}`
    ),
  })
}

/** 6. Proyecto entregado — al cliente */
export async function sendProjectDelivered(data: {
  project: Project & { demoUrl: string }
  client: User
}) {
  return resend.emails.send({
    from: FROM,
    to: data.client.email,
    subject: `¡Tu proyecto está listo! — ${data.project.name}`,
    html: baseTemplate(
      'Proyecto entregado',
      `${h1('¡Listo para revisar!')}
       ${p(`Tu proyecto ${highlight(data.project.name)} está terminado y esperando tu aprobación.`)}
       ${p('Accede a la URL de demo, revisa que todo esté correcto y confírmanos. Una vez aprobado, publicamos en tu dominio.')}
       ${btn('Ver demo', data.project.demoUrl)}
       ${btn('Ir al panel', `${APP_URL}/dashboard`)}`
    ),
  })
}

/** 7. Pago confirmado — al cliente */
export async function sendProjectPaymentConfirmed(data: { project: Project; client: User }) {
  return resend.emails.send({
    from: FROM,
    to: data.client.email,
    subject: `Pago confirmado — ${data.project.name}`,
    html: baseTemplate(
      'Pago confirmado',
      `${h1('Pago recibido')}
       ${p(`Hemos recibido el pago de ${highlight(`€${data.project.price}`)} para el proyecto <strong>${data.project.name}</strong>.`)}
       ${p('El equipo comenzará el desarrollo en cuanto confirmes el briefing y nos envíes el material necesario.')}
       ${btn('Completar briefing', `${APP_URL}/dashboard/briefing`)}`
    ),
  })
}

/** 8b. Solicitud de pago — al cliente */
export async function sendPaymentRequest(data: {
  project: Project
  client: User
  checkoutUrl: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.client.email,
    subject: `Enlace de pago — ${data.project.name}`,
    html: baseTemplate(
      'Enlace de pago',
      `${h1('Tu web, lista para confirmar')}
       ${p(`Hola <strong>${data.client.name ?? data.client.email}</strong>, tu proyecto ${highlight(data.project.name)} está esperando confirmación de pago.`)}
       <table style="background:#111;border:1px solid #222;padding:20px;margin:16px 0;width:100%;box-sizing:border-box;">
         <tr><td style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Total a pagar</td></tr>
         <tr><td style="font-family:monospace;font-size:28px;font-weight:900;color:#39FF14;">€${data.project.price}</td></tr>
       </table>
       ${p('Paga de forma segura con tarjeta a través de Stripe. El enlace es válido durante 24 horas.')}
       ${btn('Pagar ahora', data.checkoutUrl)}
       ${p('Si tienes alguna duda, responde a este email o escríbenos directamente.')}`
    ),
  })
}

/** 8. Suscripción activada — al cliente */
export async function sendSubscriptionActivated(data: { client: User; plan: string }) {
  const planLabel = data.plan === 'pro' ? 'Pro (€49/mes)' : 'Básico (€29/mes)'
  return resend.emails.send({
    from: FROM,
    to: data.client.email,
    subject: 'Tu suscripción está activa — Por 2 Duros',
    html: baseTemplate(
      'Suscripción activada',
      `${h1('Suscripción activa')}
       ${p(`Tu plan ${highlight(planLabel)} está activo. Primer mes ${highlight('gratuito')}.`)}
       ${p('Puedes gestionar o cancelar tu suscripción en cualquier momento desde el panel de cliente.')}
       ${btn('Gestionar suscripción', `${APP_URL}/dashboard/suscripcion`)}`
    ),
  })
}
