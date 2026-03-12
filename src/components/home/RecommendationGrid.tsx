import { Link } from '@tanstack/react-router'
import type { Service } from '../../db/queries'
import Price from '../ui/Price'

interface RecommendationGridProps {
  services: Service[]
}

export default function RecommendationGrid({ services }: RecommendationGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between border-l-4 border-brand-primary pl-4">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight dark:text-white">
            Hot Recommendations
          </h2>
          <p className="font-mono text-sm text-slate-500">
            Real-time priority index based on volume
          </p>
        </div>
        <button className="text-sm font-bold text-brand-primary hover:underline transition-colors hover:opacity-80">
          View All Metrics
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((item) => (
          <Link
            key={item.id}
            to="/detail/$id"
            params={{ id: item.id }}
            className="group relative flex cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-brand-primary dark:border-slate-800 dark:bg-background-dark dark:hover:border-brand-primary"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center border border-slate-100 bg-slate-50 transition-colors duration-300 group-hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:group-hover:bg-slate-800">
                {item.logoUrl ? (
                  <img
                    alt={item.title}
                    className="h-10 w-10 transition-all group-hover:filter-none dark:filter dark:group-hover:filter-none"
                    src={item.logoUrl}
                  />
                ) : (
                  <span className="material-symbols-outlined text-3xl text-slate-400">apps</span>
                )}
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Starting Price
                </span>
                <p className="font-display text-2xl font-bold transition-colors duration-300 dark:text-white">
                  <Price usdPrice={item.startingPrice ?? 0} />
                  <span className="text-sm font-normal text-slate-500">
                    /mo
                  </span>
                </p>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold transition-colors duration-300 dark:text-white group-hover:text-brand-primary">
              {item.title}
            </h3>
            <p className="mb-2 flex-grow text-sm text-slate-500">
              {item.description}
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <span className="bg-brand-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                {item.category}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary opacity-0 transition-opacity group-hover:opacity-100">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
