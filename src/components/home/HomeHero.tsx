export default function HomeHero() {
  return (
    <section className="bg-white py-16 transition-colors duration-300 dark:bg-background-dark md:py-24 border-b border-brand-primary/10">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
          Data-Driven <span className="text-brand-primary">Proxy Top-ups</span>.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          Compare real-time rates for global subscriptions. AI-powered cost
          analysis for ChatGPT, Midjourney, and 200+ other services.
        </p>
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center border-2 border-slate-900 p-1 dark:border-white">
            <span className="material-symbols-outlined ml-4 text-slate-400">
              search
            </span>
            <input
              className="w-full border-none bg-transparent px-4 py-3 font-sans text-lg focus:ring-0 dark:text-white"
              placeholder="Search services (e.g. 'Netflix', 'OpenAI API')..."
              type="text"
            />
            <button className="bg-brand-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:opacity-90">
              Analyze Rates
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Trending:
            </span>
            <a
              className="font-mono text-xs text-brand-primary underline-offset-4 hover:underline"
              href="#"
            >
              #ChatGPT_Plus
            </a>
            <a
              className="font-mono text-xs text-brand-primary underline-offset-4 hover:underline"
              href="#"
            >
              #Midjourney_V6
            </a>
            <a
              className="font-mono text-xs text-brand-primary underline-offset-4 hover:underline"
              href="#"
            >
              #Claude_3
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
