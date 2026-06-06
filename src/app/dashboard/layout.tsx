import type { Metadata } from 'next'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { AutoRefresh } from '@/components/admin/AutoRefresh'

export const metadata: Metadata = {
  title: 'Mi Proyecto — Por 2 Duros',
  description: 'Panel de cliente Por 2 Duros',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AutoRefresh />
      <DashboardNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
