
import dayjs from 'dayjs'
import { useState } from 'react'
import { type Provider, triggerProviderSync } from '@/db/queries'

interface SyncFeedsTableProps {
  providers: Provider[]
}

export function SyncFeedsTable({ providers }: SyncFeedsTableProps) {
  const [syncingId, setSyncingId] = useState<string | null>(null)

  const handleTrigger = async (providerId: string) => {
    try {
      setSyncingId(providerId)
      const result = await triggerProviderSync({ data: providerId })
      console.log('Sync result:', result)
      if (result.success) {
        alert(`Sync success for ${result.provider}!\nFound ${result.results?.length} items.`)
      } else {
        alert(`Sync failed: ${result.message}`)
      }
    } catch (error) {
      console.error('Trigger error:', error)
      alert('Failed to trigger sync. Check console for details.')
    } finally {
      setSyncingId(null)
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Active Sync Feeds</h3>
        <div className="flex items-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 transition-colors">
          <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          <input
            className="border-none focus:ring-0 text-xs w-48 bg-transparent outline-none ml-2"
            placeholder="Filter providers..."
            type="text"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto transition-colors">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-slate-500">Provider Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-slate-500">API Endpoint</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-slate-500">Frequency</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-slate-500">Last Sync</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-slate-500">Success Rate</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-mono divide-y divide-slate-200 dark:divide-slate-800">
            {providers.map((provider) => (
              <tr key={provider.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-none border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 shrink-0">
                      {provider.logoUrl ? (
                        <img
                          src={provider.logoUrl}
                          alt={provider.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[8px] text-white">
                          {provider.name.substring(0, 3).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-slate-100 font-display">
                      {provider.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs" title={provider.url}>
                  {provider.url}
                </td>
                <td className="px-6 py-4 text-xs">30m</td>
                <td className="px-6 py-4 text-xs">
                  {dayjs(provider.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 w-24">
                      <div
                        className="bg-green-500 h-full transition-all"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-green-500">
                      100%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    onClick={() => handleTrigger(provider.id)}
                    disabled={syncingId === provider.id}
                    className="text-brand-primary hover:underline text-xs font-bold font-display uppercase tracking-wider disabled:opacity-50 disabled:no-underline"
                  >
                    {syncingId === provider.id ? 'Syncing...' : 'Trigger'}
                  </button>
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 material-symbols-outlined text-lg align-middle transition-colors">
                    settings
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
