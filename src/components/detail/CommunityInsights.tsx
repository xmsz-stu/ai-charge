
import { MessageSquare } from 'lucide-react'
import { PostIntelModal } from './PostIntelModal'

export function CommunityInsights() {
  return (
    <section className="mt-12 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-brand-primary w-5 h-5" />
          <h3 className="text-lg font-bold tracking-tight">Community Insights</h3>
        </div>
        <PostIntelModal 
          trigger={
            <button className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline cursor-pointer">
              Post Update
            </button>
          } 
        />
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {/* Entry 1 */}
        <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">@crypto_king</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">• 2 hours ago</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            FastFill Digital just updated their nodes, speed is much better now. Received my Plus activation in under 2 mins.
          </p>
        </div>
        {/* Entry 2 */}
        <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">@sub_hunter</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">• 5 hours ago</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Found a working 5% off code for InstantGPT: <span className="font-mono font-bold text-brand-primary">SAVE5</span>. Applied correctly at checkout.
          </p>
        </div>
        {/* Entry 3 */}
        <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">@ai_enthusiast</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">• 12 hours ago</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            TrustNode Subs supports local bank transfers in SEA region now. Very convenient for those without crypto.
          </p>
        </div>
        {/* Entry 4 */}
        <div className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">@topup_pro</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">• Yesterday</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Keep an eye on the 1-year billing cycle for InstantGPT, they occasionally drop it to 20% off during weekends.
          </p>
        </div>
      </div>
      <button className="w-full py-3 text-[10px] font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 cursor-pointer">
        Load older insights
      </button>
    </section>
  )
}
