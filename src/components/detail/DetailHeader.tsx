import { Search, ShoppingCart, User, Layers } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

export function DetailHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-brand-primary">
            <Layers className="w-8 h-8 font-bold" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TopUp Hub</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-medium hover:text-brand-primary transition-colors" href="#">Explore</a>
            <a className="text-sm font-medium hover:text-brand-primary transition-colors" href="#">Deals</a>
            <a className="text-sm font-medium hover:text-brand-primary transition-colors" href="#">Compare</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded text-sm w-64 focus:ring-1 focus:ring-brand-primary" 
              placeholder="Search services..." 
              type="text"
            />
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
