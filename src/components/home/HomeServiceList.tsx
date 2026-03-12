import { Link } from '@tanstack/react-router'
import type { Service } from '../../db/queries'
import Price from '../ui/Price'

interface HomeServiceListProps {
  services: Service[]
}

export default function HomeServiceList({ services }: HomeServiceListProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-8">
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              Filter Categories
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Artificial Intelligence', count: services.filter(s => s.category === 'Artificial Intelligence').length },
                { name: 'Streaming Services', count: services.filter(s => s.category === 'Streaming Services').length, checked: true },
                { name: 'Developer Tools', count: services.filter(s => s.category === 'Developer Tools').length },
                { name: 'Creative', count: services.filter(s => s.category === 'Creative').length },
              ].map((cat) => (
                <label
                  key={cat.name}
                  className="group flex cursor-pointer items-center gap-3"
                >
                  <input
                    className="h-4 w-4 rounded-none border-slate-300 text-brand-primary focus:ring-brand-primary dark:border-slate-700 dark:bg-slate-900"
                    type="checkbox"
                    defaultChecked={cat.checked}
                  />
                  <span className="text-sm transition-colors group-hover:text-brand-primary dark:text-slate-300">
                    {cat.name}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-slate-500">
                    {cat.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              Billing Cycle
            </h4>
            <div className="flex flex-wrap gap-2">
              <button className="bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase text-white transition-colors">
                All
              </button>
              <button className="border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase hover:border-brand-primary dark:border-slate-800 dark:bg-background-dark dark:text-slate-300 transition-all">
                Monthly
              </button>
              <button className="border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase hover:border-brand-primary dark:border-slate-800 dark:bg-background-dark dark:text-slate-300 transition-all">
                Annual
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
              Price Range
            </h4>
            <input
              className="w-full accent-brand-primary transition-all"
              type="range"
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500">
              <span>$0</span>
              <span>$500+</span>
            </div>
          </div>

          <div className="bg-brand-primary p-4 text-white">
            <h5 className="mb-2 font-bold">Need a custom proxy?</h5>
            <p className="mb-4 text-xs leading-relaxed text-blue-100">
              We can source specific enterprise licenses for your global team
              needs.
            </p>
            <button className="w-full bg-white py-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary transition-colors hover:bg-slate-100">
              Contact Sales
            </button>
          </div>
        </aside>

        {/* List View */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
            <span className="text-sm font-bold uppercase tracking-widest dark:text-white">
              Showing {services.length} Results
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-slate-500">
                Sort By:
              </span>
              <select className="border-none bg-transparent pr-8 text-sm font-bold focus:ring-0 dark:text-white transition-colors">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Discount Percentage</option>
                <option>Recently Added</option>
              </select>
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {services.map((item) => (
              <div
                key={item.id}
                className="group border border-slate-200 bg-white p-4 transition-all hover:border-brand-primary dark:border-slate-800 dark:bg-background-dark"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-slate-100 bg-slate-50 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 self-start group-hover:bg-white dark:group-hover:bg-slate-800">
                    {item.logoUrl ? (
                      <img
                        alt={item.title}
                        className="h-8 w-8 opacity-50 transition-all group-hover:opacity-100"
                        src={item.logoUrl}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">apps</span>
                    )}
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-bold group-hover:text-brand-primary transition-colors dark:text-white dark:group-hover:text-brand-primary">
                        {item.title}
                      </h4>
                      <div className="flex gap-2">
                        <span className="bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:bg-slate-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <p className="max-w-xl text-xs text-slate-500 transition-colors">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between border-l-0 border-slate-100 pt-4 dark:border-slate-800 md:w-48 md:border-l md:pl-6 md:pt-0">
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold transition-colors dark:text-white">
                        <Price amount={item.startingPrice ?? 0} fromCurrency={item.startingCurrency ?? 'USD'} />
                      </p>
                      <p className="font-mono text-[10px] text-slate-500">
                        EST. STARTING PRICE
                      </p>
                    </div>
                    <Link
                      to="/detail/$slug"
                      params={{ slug: item.slug }}
                      className="mt-4 w-full border border-slate-900 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white dark:border-white dark:group-hover:border-brand-primary dark:text-white text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
