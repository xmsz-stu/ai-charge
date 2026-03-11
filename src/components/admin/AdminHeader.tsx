import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  title: string
}

export function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold font-display uppercase tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Last Global Update: 2 mins ago
        </div>
        <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-5 py-2 text-sm font-bold flex items-center gap-2 transition-colors rounded-none">
          <span className="material-symbols-outlined text-sm">sync</span>
          SYNC ALL
        </Button>
      </div>
    </header>
  )
}
