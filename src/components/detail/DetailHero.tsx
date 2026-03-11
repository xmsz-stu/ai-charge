import { Zap, Verified } from 'lucide-react'
import { Badge } from '#/components/ui/badge'

export function DetailHero({ id }: { id: string }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
      <div className="md:col-span-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-600/20">
            <Zap className="w-12 h-12 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-4xl font-bold tracking-tight">ChatGPT Plus</h2>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Official API</Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl text-lg leading-relaxed">
              Get priority access to GPT-4, faster response times, and early access to new features. 
              Compare the best global providers for instant top-ups. (ID: {id})
            </p>
          </div>
        </div>
      </div>
      <div className="md:col-span-4 flex flex-col items-end gap-2">
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Starting at</p>
          <p className="text-3xl font-bold text-brand-primary">$18.50<span className="text-sm font-normal text-slate-400">/mo</span></p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1 text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-1 rounded font-bold uppercase border border-brand-primary/20">
            <Verified className="w-3 h-3" /> Trusted Providers
          </Badge>
        </div>
      </div>
    </section>
  )
}
