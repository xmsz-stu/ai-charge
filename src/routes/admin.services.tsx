import { createFileRoute } from '@tanstack/react-router'
import { AdminHeader } from '../components/admin/AdminHeader'
import { ServiceTable } from '../components/admin/ServiceTable'
import { EditServiceModal } from '../components/admin/EditServiceModal'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { getServices, deleteService, type Service } from '../db/queries'

export const Route = createFileRoute('/admin/services')({
  loader: async () => {
    const services = await getServices()
    return { services }
  },
  component: ServiceManagement,
})

function ServiceManagement() {
  const { services } = Route.useLoaderData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingService(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
        await deleteService({ data: id });
        window.location.reload(); // Simple reload for now, or use router.invalidate()
    } catch (error) {
        console.error("Delete failed:", error);
    }
  }

  return (
    <>
      <AdminHeader title="Service Management" />
      
      <div className="flex-1 overflow-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <Input
              className="pl-10 h-10 border-slate-200 dark:border-slate-800 rounded-none bg-white dark:bg-slate-900"
              placeholder="Search services..."
            />
          </div>
          <Button 
            onClick={handleAdd}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold h-10 px-6 rounded-none flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            ADD SERVICE
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <ServiceTable 
            services={services} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
          />
        </div>
      </div>

      <EditServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={editingService}
      />
    </>
  )
}
