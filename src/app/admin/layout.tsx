import type { Metadata } from 'next'
import { AdminNav } from '@/components/admin/AdminNav'
import { AutoRefresh } from '@/components/admin/AutoRefresh'

export const metadata: Metadata = {
  title: 'Admin — Por 2 Duros',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AutoRefresh />
      <AdminNav />
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
