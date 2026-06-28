export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { User } from 'lucide-react'

export default async function PerfilPage() {
  const session = await auth()

  const user = await prisma.user.findUnique({
    where: { id: session!.user!.id },
    select: { name: true, email: true, phone: true, company: true, createdAt: true },
  })

  if (!user) return null

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 border border-neon flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-neon" />
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Mi perfil</h1>
          <p className="text-muted text-sm">
            Cliente desde{' '}
            {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(user.createdAt)}
          </p>
        </div>
      </div>

      <div className="border border-border p-6">
        <ProfileForm
          name={user.name}
          email={user.email!}
          phone={user.phone}
          company={user.company}
        />
      </div>
    </div>
  )
}
