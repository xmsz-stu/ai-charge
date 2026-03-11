import { createFileRoute } from '@tanstack/react-router'
import { AdminHeader } from '../components/admin/AdminHeader'
import { SKUTable } from '../components/admin/SKUTable'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { EditSKUModal } from '../components/admin/EditSKUModal'
import { getAllSkus, type AdminSku } from '../db/queries'

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    const allSkus = await getAllSkus()
    return { allSkus }
  },
  component: AdminDashboard,
})

function AdminDashboard() {
  const { allSkus } = Route.useLoaderData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSku, setEditingSku] = useState<AdminSku | null>(null)

  const handleEdit = (sku: AdminSku) => {
    setEditingSku(sku)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingSku(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <AdminHeader title="Service SKU Management" />
      
      <div className="flex-1 overflow-auto p-8">
        {/* Search & Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <Input
              className="pl-10 h-10 border-slate-200 dark:border-slate-800 rounded-none bg-white dark:bg-slate-900"
              placeholder="Search service, provider, or SKU..."
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 rounded-none border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </Button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <SKUTable skus={allSkus} onEdit={handleEdit} />
        </div>

        {/* Floating Action Button */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleAdd}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white h-14 px-8 font-bold flex items-center gap-3 transition-transform active:scale-95 rounded-none"
          >
            <span className="material-symbols-outlined">add</span>
            ADD NEW SKU
          </Button>
        </div>
      </div>

      <EditSKUModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        sku={editingSku}
      />
    </>
  )
}
