import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'

interface BillingCycleInfo {
  name: string
  maxDiscount: number
}

interface BillingSelectorProps {
  cycles: BillingCycleInfo[]
  selectedCycle: string | null
  onSelect: (cycle: string) => void
}

export function BillingSelector({ cycles, selectedCycle, onSelect }: BillingSelectorProps) {
  if (cycles.length === 0) return null

  return (
    <section className="mb-10">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Select Billing Cycle</h3>
      <div className="flex flex-wrap gap-2 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg inline-flex border border-slate-200 dark:border-slate-700">
        {cycles.map((cycle) => (
          <Button
            key={cycle.name}
            variant={selectedCycle === cycle.name ? 'secondary' : 'ghost'}
            className={cn(
              "px-6 py-2 rounded text-sm font-medium transition-all flex items-center gap-2",
              selectedCycle === cycle.name 
                ? "bg-white dark:bg-brand-primary text-brand-primary dark:text-white shadow-sm font-bold border border-brand-primary/10" 
                : "hover:bg-white/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            )}
            onClick={() => onSelect(cycle.name)}
          >
            {cycle.name}
            {cycle.maxDiscount > 0 && (
              <Badge variant="default" className="bg-brand-primary text-white text-[10px] px-1.5 py-0.5 rounded">
                -{cycle.maxDiscount}%
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </section>
  )
}
