import { Verified } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import type { Service } from '#/db/queries'
import Price from '../ui/Price'

interface DetailHeroProps {
  service: Service
}

export function DetailHero({ service }: DetailHeroProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
      <div className="md:col-span-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
            {service.logoUrl ? (
              <img
                src={service.logoUrl}
                alt={service.title}
                className="w-16 h-16 object-contain"
              />
            ) : (
              <span className="material-symbols-outlined text-5xl text-slate-300">apps</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-4xl font-bold tracking-tight">{service.title}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>
      <div className="md:col-span-4 flex flex-col items-end gap-2">
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Starting at</p>
          <p className="text-3xl font-bold text-brand-primary">
            <Price usdPrice={service.startingPrice ?? 0} />
            <span className="text-sm font-normal text-slate-400">/mo</span>
          </p>
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
