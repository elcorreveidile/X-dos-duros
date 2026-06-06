'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import type { PortfolioCategory } from '@prisma/client'

export async function createPortfolioItem(data: {
  title: string
  category: PortfolioCategory
  description: string
  imageUrl: string
  demoUrl?: string
  tags: string[]
  order: number
}) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  await prisma.portfolioItem.create({ data })
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
}

export async function updatePortfolioItem(
  id: string,
  data: {
    title?: string
    category?: PortfolioCategory
    description?: string
    imageUrl?: string
    demoUrl?: string | null
    tags?: string[]
    order?: number
    active?: boolean
  }
) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  await prisma.portfolioItem.update({ where: { id }, data })
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
}

export async function deletePortfolioItem(id: string) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('No autorizado')

  await prisma.portfolioItem.delete({ where: { id } })
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
}
