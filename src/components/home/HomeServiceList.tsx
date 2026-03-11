const SERVICES = [
  {
    id: 'youtube-premium-family',
    title: 'YouTube Premium Family',
    category: 'Entertainment',
    region: 'Global',
    description:
      'Ad-free YouTube and Music for up to 5 family members. Includes background play and offline downloads.',
    price: 17.5,
    originalPrice: 19.99,
    discount: '-12% OFF',
    features: ['Monthly/Yearly', 'Instant Activation', 'API Support'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACdqhUpf_uRUO7U1__Om4OSVuxy6YdPwnsNggaKNBIy_aE7mpJjzxqZtf3d5VO8h7rAf7guewpJxkwKjFFsgaN5aqSQhF5XCE-YT-An27q3PmIi8e8m9lX8CFcpd-t3Psu6J22TkfolMj5w8XGRel_X4nlK6oVAvPRm0PjrTZRQm8xpxKJJIU-NOYxEM2Nk1IkQO50g486xehmCtPHZibV-E1UAEWNHl1EzujPMjy-JnKbwo8M1KgPtksIQn1T8Z7-JyK5hhpkPJg',
  },
  {
    id: 'github-copilot',
    title: 'GitHub Copilot Individual',
    category: 'DevTools',
    region: 'AI',
    description:
      'Your AI pair programmer. Suggests code in real-time right from your editor.',
    price: 10.0,
    discount: 'NO REBATE',
    features: ['Monthly', 'Manual Top-up'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKGTHMz9lJfMBSfoVLE3xBPfNjQEw9KeLxKa4Gtu3HEv5X5O65cLvRh5Q_jpMn-2mf415snc8aEZ64lCd9jTwixbA1pBJ_NQ8hrVXwiN6hbKNWaoYmdXFAPwBBUOd4v4tN5I6lw9nJQ-RVetGfgCiTA0My91Zlxyv6MMGT1Z-F_JebgeSEyxo2XpQSwQj46R6sGFwuvy4emp_4A1FyiNjh25SDF-BlHjR2lU33Zo5rikAjhM5Luuq3mCeO0Y8K26Xw-K2GI_y2Ktc',
  },
  {
    id: 'adobe-creative-cloud',
    title: 'Adobe Creative Cloud',
    category: 'Creative',
    region: 'Enterprise',
    description:
      'Full suite of 20+ creative desktop and mobile apps including Photoshop, Illustrator, and Premiere Pro.',
    price: 35.75,
    originalPrice: 54.99,
    discount: '-35% OFF',
    features: ['Annual Only', 'Priority Support'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZIXWVNbX_jZRPxO9BymUhd9MmLHGzMkdazZF5ZGtPm_miLE6C1mvFP3ft23e8posQbBQfQIa8oqQIiHarmIOHTD_VPVQz8plyaO_SRfCn8D9BgRucWk2JPYcpLgthk-SQuCgmE7fQ7YwYTXRu49TGCggdH6UZj7un-Y59WRVaVGyDH0wzrK__3uwc8nN73BjinTOPNWYP3kKadncwy4zWm-L3Lw2SpgOJvGAAWWI95j6cWT6Z2oQmufLuwnCadnyIHWXxbNRH_No',
  },
]

export default function HomeServiceList() {
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
                { name: 'Artificial Intelligence', count: 12 },
                { name: 'Streaming Services', count: 45, checked: true },
                { name: 'Developer Tools', count: 28 },
                { name: 'Social Media Ads', count: 14 },
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
              Showing 24 Results
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
            {SERVICES.map((item) => (
              <div
                key={item.id}
                className="group border border-slate-200 bg-white p-4 transition-all hover:border-brand-primary dark:border-slate-800 dark:bg-background-dark"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-slate-100 bg-slate-50 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 self-start group-hover:bg-white dark:group-hover:bg-slate-800">
                    <img
                      alt={item.title}
                      className="h-8 w-8 opacity-50 transition-all group-hover:opacity-100"
                      src={item.logo}
                    />
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
                        <span className="bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:bg-slate-800">
                          {item.region}
                        </span>
                      </div>
                    </div>
                    <p className="max-w-xl text-xs text-slate-500 transition-colors">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase text-slate-500 transition-colors">
                      {item.features.map((f) => (
                        <span key={f} className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            {f.includes('Activation') ? 'bolt' : f.includes('API') ? 'verified' : 'calendar_today'}
                          </span>{' '}
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between border-l-0 border-slate-100 pt-4 dark:border-slate-800 md:w-48 md:border-l md:pl-6 md:pt-0">
                    <div className="text-right">
                      <div className="mb-1 flex items-center justify-end gap-2">
                        <span className={`${item.discount === 'NO REBATE' ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-green-500 text-white'} px-2 py-0.5 font-bold text-[10px]`}>
                          {item.discount}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="font-display text-2xl font-bold transition-colors dark:text-white">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="font-mono text-[10px] text-slate-500">
                        EST. STARTING PRICE
                      </p>
                    </div>
                    <button className="mt-4 w-full border border-slate-900 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white dark:border-white dark:group-hover:border-brand-primary dark:text-white">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-1">
            <button className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-400 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-800">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center border-2 border-brand-primary bg-brand-primary text-xs font-bold text-white transition-all">
              1
            </button>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-200 text-xs font-bold transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-800 dark:text-slate-300">
              2
            </button>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-200 text-xs font-bold transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-800 dark:text-slate-300">
              3
            </button>
            <span className="px-2 font-mono text-slate-400">...</span>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-200 text-xs font-bold transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-800 dark:text-slate-300">
              12
            </button>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-400 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-800">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
