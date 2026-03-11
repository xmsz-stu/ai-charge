import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AdminSidebar } from '../components/admin/AdminSidebar'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
