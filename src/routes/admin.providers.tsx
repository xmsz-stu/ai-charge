import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AdminHeader } from '../components/admin/AdminHeader'
import { ProviderTable } from '../components/admin/ProviderTable'
import { EditProviderModal } from '../components/admin/EditProviderModal'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { getAllProviders, deleteProvider } from '../db/queries'
import { useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/providers')({
  loader: async () => {
    const providersList = await getAllProviders()
    return { providersList }
  },
  component: ProviderManagementPage,
})

function ProviderManagementPage() {
  const { providersList } = Route.useLoaderData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<any>(null)
  const router = useRouter()

  const handleEdit = (provider: any) => {
    setSelectedProvider(provider)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedProvider(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProvider({ data: id })
      await router.invalidate()
    } catch (error) {
      console.error('Failed to delete provider:', error)
    }
  }

  return (
    <>
      <AdminHeader title="Provider Management" />

      <div className="flex-1 overflow-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              search
            </span>
            <Input
              className="pl-10 h-10 border-slate-200 dark:border-slate-800 rounded-none bg-white dark:bg-slate-900"
              placeholder="Search providers..."
            />
          </div>
          <Button 
            onClick={handleAdd}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold h-10 px-6 rounded-none flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            ADD PROVIDER
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <ProviderTable 
            providers={providersList} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
          />
        </div>
      </div>

      <EditProviderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        provider={selectedProvider} 
      />
    </>
  )
}
