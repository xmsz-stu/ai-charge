import { createFileRoute } from '@tanstack/react-router'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { SyncStats } from '@/components/admin/sync/SyncStats'
import { SyncFeedsTable } from '@/components/admin/sync/SyncFeedsTable'
import { SyncLogs } from '@/components/admin/sync/SyncLogs'

import { getAllProviders } from '@/db/queries'

export const Route = createFileRoute('/admin/sync')({
  loader: async () => {
    const providers = await getAllProviders()
    return { providers }
  },
  component: AdminSyncPage,
})

function AdminSyncPage() {
  const { providers } = Route.useLoaderData()

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background-light dark:bg-background-dark transition-colors">
      <AdminHeader title="Provider Sync Management" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-12 max-w-7xl mx-auto">
          {/* Overview Stats */}
          <SyncStats />

          {/* Table Section */}
          <SyncFeedsTable providers={providers} />

          {/* Logs Section */}
          <SyncLogs />
        </div>
      </div>
    </div>
  )
}
