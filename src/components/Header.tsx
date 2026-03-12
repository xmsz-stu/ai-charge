import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import CurrencySelector from './CurrencySelector'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white px-4 transition-colors duration-300 dark:border-slate-800 dark:bg-background-dark">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="bg-primary p-1.5">
              <span className="material-symbols-outlined text-xl text-white">
                analytics
              </span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              PROXY<span className="text-primary">INDEX</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary dark:text-slate-300"
            >
              Marketplace
            </Link>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary dark:text-slate-300"
            >
              Price Tracker
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary dark:text-slate-300"
            >
              API Docs
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-primary dark:text-slate-300"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CurrencySelector />
          <button className="bg-primary px-6 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
