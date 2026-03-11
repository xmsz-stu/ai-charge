export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-custom-900 pb-8 pt-16 text-white transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 border-b border-slate-800 pb-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <div className="bg-primary p-1.5">
                <span className="material-symbols-outlined text-xl text-white">
                  analytics
                </span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                PROXY<span className="text-primary">INDEX</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-custom-500">
              The ultimate benchmarking tool for global subscription proxies. We
              scan 150+ providers daily to ensure you get the most accurate
              pricing data.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-custom-200">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-slate-custom-200">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Price History Tool
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Market Report 2024
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
              Newsletter
            </h4>
            <p className="mb-4 text-xs text-slate-custom-500">
              Get weekly alerts on major price drops.
            </p>
            <div className="flex border border-slate-700">
              <input
                className="w-full border-none bg-transparent px-3 py-2 text-sm focus:ring-0"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-primary px-4 hover:bg-blue-700 transition-colors">
                <span className="material-symbols-outlined text-sm text-white">
                  send
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-custom-500">
            © {year} ProxyIndex Data Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-slate-custom-500 no-underline transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-slate-custom-500 no-underline transition-colors hover:text-white"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-slate-custom-500 no-underline transition-colors hover:text-white"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
