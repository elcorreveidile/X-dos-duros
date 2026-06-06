import type { Metadata } from 'next'
import { AdminNavWrapper } from '@/components/admin/AdminNavWrapper'
import { AutoRefresh } from '@/components/admin/AutoRefresh'
import { Suspense } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata: Metadata = {
  title: 'Admin — Por 2 Duros',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AutoRefresh />
      <Suspense fallback={<AdminNav />}>
        <AdminNavWrapper />
      </Suspense>
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
