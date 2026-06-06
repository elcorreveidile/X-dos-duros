'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sendTestEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'

export async function updateAdminProfile(data: { name: string }) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  await prisma.user.update({
    where: { id: session.user.id as string },
    data: { name: data.name || null },
  })

  revalidatePath('/admin/ajustes')
}

export async function changeAdminPassword(data: { current: string; next: string }) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  const user = await prisma.user.findUnique({ where: { id: session.user.id as string } })
  if (!user?.password) throw new Error('Esta cuenta no tiene contraseña configurada')

  const valid = await bcrypt.compare(data.current, user.password)
  if (!valid) throw new Error('Contraseña actual incorrecta')

  const hashed = await bcrypt.hash(data.next, 12)
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } })
}

export async function triggerTestEmail() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')
  await sendTestEmail()
}
