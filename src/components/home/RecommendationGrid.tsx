const RECOMMENDATIONS = [
  {
    id: 'chatgpt-plus',
    title: 'ChatGPT Plus',
    price: 18.4,
    description:
      'Advanced AI capabilities with GPT-4 access and faster response times.',
    discount: '15% MAX',
    rating: 4.9,
    promo: true,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvY70SIXTcsqY9y1AT8I9-TvqMWB4md80ZrxEAKdR6PbvwGZPMzwcJtlmwlriwL_R-gg7UMdw5UM3iXHaV96x9_hYJcy1yqBOlboPzvPOl_v0VCv9sL7OPSBqFC0xOhoDVnQzaHZ0iWVt8s38t8Bmgr-x3YYDAoqZ9gqRqUgakey9RzeB9uap3ea1RfaLwPM7hoW-S0ZxBu8jg-V_CssDjX1U6Hz1heVKiiBVLLq8PfPSRECtWGQKyf6gA854J62ZcNJvxrrdyRV8',
  },
  {
    id: 'midjourney',
    title: 'Midjourney',
    price: 9.0,
    description:
      'State-of-the-art generative AI for high-fidelity images and digital art.',
    discount: '10% MAX',
    rating: 4.8,
    promo: false,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcnifs9Byr04EPLr4woi7TrEPZ57nHBop-eXjIIlC43bDZ1Irpvro0uOme8lrbQxoKX1dVDjq9f1R_6fLWQUEerzXKOnOysq1qnN-GgWyzz6anIrlYD603_c3jG8E4Eux9cTdRESYOawAKv585bbBIjqRgKTbAI-Av6kZXsdeyIAFA7LaI8hrUhKxe_9-FL2ZnGrHEkDPGPjf-hwOrb2J4AA1EOGcTfVzSWfOyOkTVv4H-MwKtOQMugGXAUIlshlUz-1eIeRJYVhk',
  },
  {
    id: 'netflix-premium',
    title: 'Netflix Premium',
    price: 15.99,
    description:
      'Ultra HD streaming on multiple screens with spatial audio support.',
    discount: '20% MAX',
    rating: 4.7,
    promo: false,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNnFsKnB2TA8nUR9SZzgo0vQGo0aPlAhk0hSsMJpDqpP9oUfRNwxPN6f3dgV8u-dlALb5OvKD1w2E8_7bjsRMiC_UnT-BFlMNz1U_dh1YtE6riwg8tIRYdYZLT5HeVlQM-YwaT0lM03hSXRAl0yZe0waIbHiaqlbPnDJRr4yZOqmsBqeNDPVz3ZZEpK4-HSmmLkkvvNr9cHVthyX9EHco4ysGqjc0fQsDaqK_Ptvh1hOoRhEHWTMAiUfIxWpYWOCY4_3C9v4crAiE',
  },
]

export default function RecommendationGrid() {
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
        {RECOMMENDATIONS.map((item) => (
          <div
            key={item.id}
            className="group relative flex cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-brand-primary dark:border-slate-800 dark:bg-background-dark dark:hover:border-brand-primary"
          >
            {item.promo && (
              <div className="absolute right-0 top-0 bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-white">
                Active Promo
              </div>
            )}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center border border-slate-100 bg-slate-50 transition-colors duration-300 group-hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:group-hover:bg-slate-800">
                <img
                  alt={item.title}
                  className="h-10 w-10 transition-all group-hover:filter-none dark:filter dark:group-hover:filter-none"
                  src={item.logo}
                />
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] uppercase text-slate-500">
                  Starting Price
                </span>
                <p className="font-display text-2xl font-bold transition-colors duration-300 dark:text-white">
                  ${item.price.toFixed(2)}
                  <span className="text-sm font-normal text-slate-500">
                    /mo
                  </span>
                </p>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold transition-colors duration-300 dark:text-white">
              {item.title}
            </h3>
            <p className="mb-6 flex-grow text-sm text-slate-500">
              {item.description}
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <span className="bg-brand-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                DISCOUNT: {item.discount}
              </span>
              <div className="flex gap-1">
                <span className="material-symbols-outlined text-sm text-yellow-500 fill-1">
                  star
                </span>
                <span className="text-xs font-bold dark:text-white">
                  {item.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
