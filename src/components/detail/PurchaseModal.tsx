import { Star, CheckCircle2, Copy, ArrowRight, Zap, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import Price from '../ui/Price'

interface Provider {
  id: string
  name: string
  rating: number
  reviews: string
  price: number
  currency?: string
}

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  provider: Provider | null
}

export function PurchaseModal({ isOpen, onClose, provider }: PurchaseModalProps) {
  if (!provider) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[640px] p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 space-y-0">
          <div className="flex items-center gap-4">
            <div className="size-12 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center bg-white">
              <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-white">
                <Zap className="w-6 h-6 fill-current" />
              </div>
            </div>
            <div className="text-left">
              <DialogTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">
                {provider.name}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400 text-sm">by {provider.name.split(' ')[0]}</span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="text-slate-900 dark:text-slate-100 text-sm font-medium">{provider.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">({provider.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh]">
          {/* Product SKUs Section */}
          <section className="p-6">
            <div className="space-y-6">
              {/* Top-up Type Selector */}
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-xs font-bold uppercase tracking-wider mb-3">Select Top-up Type</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 border-2 border-brand-primary bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase transition-all">
                    Proxy Top-up
                  </button>
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase hover:border-brand-primary/50 transition-all">
                    Family Account
                  </button>
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase hover:border-brand-primary/50 transition-all">
                    Private Account
                  </button>
                </div>
              </div>

              {/* Version Selector */}
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-xs font-bold uppercase tracking-wider mb-3">Select Version</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 border-2 border-brand-primary bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase transition-all">
                    Plus
                  </button>
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase hover:border-brand-primary/50 transition-all">
                    Pro
                  </button>
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase hover:border-brand-primary/50 transition-all">
                    Ultra
                  </button>
                </div>
              </div>

              {/* Billing Cycle Selector */}
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-brand-primary"></span>
                  Select Billing Cycle
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Plan Card (Selected) */}
                  <div className="border-2 border-brand-primary p-4 relative cursor-pointer bg-brand-primary/5 group transition-all">
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-tight">1 Month</p>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold mt-1"><Price amount={provider.price} fromCurrency={provider.currency ?? 'USD'} /></p>
                    <div className="mt-2 pt-2 border-t border-brand-primary/20">
                      <p className="text-brand-primary text-[10px] font-bold uppercase">Standard Plan</p>
                    </div>
                  </div>
                  {/* Plan Card */}
                  <div className="border border-slate-200 dark:border-slate-700 p-4 hover:border-brand-primary/50 transition-all cursor-pointer bg-white dark:bg-slate-800/50 group">
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-tight">3 Months</p>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold mt-1"><Price amount={provider.price * 2.7} fromCurrency={provider.currency ?? 'USD'} /></p>
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">Save 10%</p>
                    </div>
                  </div>
                  {/* Plan Card */}
                  <div className="border border-slate-200 dark:border-slate-700 p-4 hover:border-brand-primary/50 transition-all cursor-pointer bg-white dark:bg-slate-800/50 group">
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-tight">1 Year</p>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold mt-1"><Price amount={provider.price * 10} fromCurrency={provider.currency ?? 'USD'} /></p>
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">Save 16%</p>
                    </div>
                  </div>
                  {/* Plan Card */}
                  <div className="border border-slate-200 dark:border-slate-700 p-4 hover:border-brand-primary/50 transition-all cursor-pointer bg-white dark:bg-slate-800/50 group">
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-tight">Lifetime</p>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold mt-1"><Price amount={599} fromCurrency="USD" /></p>
                    <div className="mt-2">
                      <span className="inline-block bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] px-2 py-0.5 font-bold uppercase">Best Value</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="mx-6 border-slate-100 dark:border-slate-800" />

          {/* Discount Ledger Section */}
          <section className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-wider">Available Promo Codes</h3>
              <span className="text-brand-primary text-xs font-medium cursor-pointer hover:underline">View all</span>
            </div>
            <div className="space-y-3">
              {/* Promo Code 1 */}
              <div className="flex items-center justify-between border border-dashed border-slate-300 dark:border-slate-600 p-3 bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-primary/10 p-2 text-brand-primary">
                    <Copy className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">SAVE10</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">10% off any monthly plan</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all uppercase text-[10px] font-bold flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
              </div>
              {/* Promo Code 2 */}
              <div className="flex items-center justify-between border border-dashed border-slate-300 dark:border-slate-600 p-3 bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-primary/10 p-2 text-brand-primary">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">YEARLY20</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">20% off annual subscriptions</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all uppercase text-[10px] font-bold flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Action Area */}
        <footer className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            <Button className="w-full bg-brand-primary text-white py-6 font-bold text-base uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-none">
              Buy Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 py-6 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-none flex items-center justify-center gap-2">
              Go to Provider Website
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          {/* Minimalist Footer */}
          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-slate-400 dark:text-slate-500 uppercase font-medium tracking-tight">
            <a className="hover:text-brand-primary transition-colors cursor-pointer">Secure Checkout</a>
            <a className="hover:text-brand-primary transition-colors cursor-pointer">Terms of Service</a>
            <a className="hover:text-brand-primary transition-colors cursor-pointer">Privacy Policy</a>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
