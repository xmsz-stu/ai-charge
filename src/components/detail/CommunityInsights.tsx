import * as React from 'react'
import { MessageSquare, Loader2 } from 'lucide-react'
import { PostIntelModal } from './PostIntelModal'
import { type Intel } from '#/db/actions/types'
import { getIntelsByServiceId } from '#/db/queries'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface CommunityInsightsProps {
  serviceId: string
}

export function CommunityInsights({ serviceId }: CommunityInsightsProps) {
  const [intels, setIntels] = React.useState<Intel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchIntels = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getIntelsByServiceId({ data: serviceId })
      setIntels(data)
    } catch (error) {
      console.error('Failed to fetch intels:', error)
    } finally {
      setIsLoading(false)
    }
  }, [serviceId])

  React.useEffect(() => {
    fetchIntels()
  }, [fetchIntels])

  return (
    <section className="mt-12 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-brand-primary w-5 h-5" />
          <h3 className="text-lg font-bold tracking-tight">Community Insights</h3>
        </div>
        <PostIntelModal 
          serviceId={serviceId}
          onSuccess={fetchIntels}
          trigger={
            <button className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline cursor-pointer">
              Post Update
            </button>
          } 
        />
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800 min-h-[100px] flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
          </div>
        ) : intels.length > 0 ? (
          intels.map((intel) => (
            <div key={intel.id} className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-slate-900 dark:text-white">@{intel.username}</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                  • {dayjs(intel.createdAt).fromNow()}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {intel.content}
              </p>
            </div>
          ))
        ) : (
          <div className="px-6 py-12 text-center flex-1">
            <p className="text-sm text-slate-400 italic">No community insights yet. Be the first to share!</p>
          </div>
        )}
      </div>
      {!isLoading && intels.length > 5 && (
        <button className="w-full py-3 text-[10px] font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 cursor-pointer">
          Load older insights
        </button>
      )}
    </section>
  )
}
