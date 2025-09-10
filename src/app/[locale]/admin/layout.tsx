import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { getCurrentUser } from '@/lib/auth'
import { USER_ROLE } from '@/types/enums'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || user.user_role !== USER_ROLE.ADMIN) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 모바일 사이드바 */}
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminHeader />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
