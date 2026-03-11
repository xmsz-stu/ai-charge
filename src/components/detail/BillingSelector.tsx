import { PencilLine } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'

export function BillingSelector() {
  return (
    <section className="mb-10">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Select Billing Cycle</h3>
      <div className="flex flex-wrap gap-2 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg inline-flex border border-slate-200 dark:border-slate-700">
        <Button variant="secondary" className="px-6 py-2 bg-white dark:bg-brand-primary text-brand-primary dark:text-white rounded shadow-sm text-sm font-bold border border-brand-primary/10">1 Month</Button>
        <Button variant="ghost" className="px-6 py-2 hover:bg-white/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-sm font-medium">3 Months</Button>
        <Button variant="ghost" className="px-6 py-2 hover:bg-white/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-sm font-medium">6 Months</Button>
        <Button variant="ghost" className="px-6 py-2 hover:bg-white/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-sm font-medium flex items-center gap-2">
          1 Year <Badge variant="default" className="bg-brand-primary text-white text-[10px] px-1.5 py-0.5 rounded">-15%</Badge>
        </Button>
        <Button variant="ghost" className="px-6 py-2 hover:bg-white/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-sm font-medium flex items-center gap-2 border-l border-slate-300 dark:border-slate-600 ml-2">
          <PencilLine className="w-4 h-4" /> Custom
        </Button>
      </div>
    </section>
  )
}
