export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProfileForm, PasswordForm, TestEmailButton } from '@/components/admin/AdminSettingsForms'

export default async function AdminAjustesPage() {
  const session = await auth()
  const admin = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id as string }, select: { name: true, email: true } })
    : null

  const envVars = [
    { key: 'NEXT_PUBLIC_APP_URL', value: process.env.NEXT_PUBLIC_APP_URL ?? '—' },
    { key: 'DATABASE_URL', value: process.env.DATABASE_URL ? '✓ Configurada' : '✗ No configurada' },
    { key: 'STRIPE_SECRET_KEY', value: process.env.STRIPE_SECRET_KEY ? '✓ Configurada' : '✗ No configurada' },
    { key: 'RESEND_API_KEY', value: process.env.RESEND_API_KEY ? '✓ Configurada' : '✗ No configurada' },
    { key: 'ADMIN_EMAIL', value: process.env.ADMIN_EMAIL ?? '—' },
  ]

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Ajustes</h1>
        <p className="text-muted text-sm mt-1">Configuración del sistema y perfil de administrador</p>
      </div>

      {/* Profile */}
      <section className="border border-border p-6 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Perfil</h2>
        {admin && (
          <div className="text-sm text-muted mono mb-2">{admin.email}</div>
        )}
        <ProfileForm currentName={admin?.name ?? null} />
      </section>

      {/* Password */}
      <section className="border border-border p-6 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Cambiar contraseña</h2>
        <PasswordForm />
      </section>

      {/* Test email */}
      <section className="border border-border p-6 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Email de prueba</h2>
        <TestEmailButton />
      </section>

      {/* Env vars */}
      <section className="border border-border p-6 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Variables de entorno</h2>
        {envVars.map(({ key, value }) => (
          <div key={key} className="flex items-center justify-between gap-4 text-sm border-b border-border pb-3 last:border-0 last:pb-0">
            <span className="mono text-xs text-muted">{key}</span>
            <span className={`mono text-xs ${value.startsWith('✗') ? 'text-red-400' : value.startsWith('✓') ? 'text-neon' : ''}`}>
              {value}
            </span>
          </div>
        ))}
      </section>
    </div>
  )
}
