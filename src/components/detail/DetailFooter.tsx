import { ShieldCheck, Rocket, ArrowUpDown, Layers } from 'lucide-react'
import { Button } from '#/components/ui/button'

export function DetailFooter() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg">
            <ShieldCheck className="text-brand-primary w-8 h-8 mb-4" />
            <h4 className="font-bold mb-2">Safe & Secure</h4>
            <p className="text-sm text-slate-500 leading-relaxed">We only list verified official providers and distributors. Your account credentials are never required for top-ups.</p>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg">
            <Rocket className="text-brand-primary w-8 h-8 mb-4" />
            <h4 className="font-bold mb-2">Instant Delivery</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Most providers deliver your Plus status within 5 minutes of payment confirmation. Automation at its best.</p>
          </div>
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg">
            <ArrowUpDown className="text-brand-primary w-8 h-8 mb-4" />
            <h4 className="font-bold mb-2">Best Price Guarantee</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Our aggregator scans daily to ensure you get the lowest possible price across the entire digital marketplace.</p>
          </div>
        </section>
      </div>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-brand-primary mb-6">
                <Layers className="w-6 h-6 font-bold" />
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">TopUp Hub</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                The ultimate destination for digital service top-ups. Compare, save, and enjoy your premium subscriptions without the hassle.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Services</h5>
              <ul className="flex flex-col gap-3 text-sm text-slate-500">
                <li><a className="hover:text-brand-primary" href="#">AI & Productivity</a></li>
                <li><a className="hover:text-brand-primary" href="#">Gaming Credits</a></li>
                <li><a className="hover:text-brand-primary" href="#">Streaming Services</a></li>
                <li><a className="hover:text-brand-primary" href="#">Cloud Storage</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Support</h5>
              <ul className="flex flex-col gap-3 text-sm text-slate-500">
                <li><a className="hover:text-brand-primary" href="#">Help Center</a></li>
                <li><a className="hover:text-brand-primary" href="#">Merchant Portal</a></li>
                <li><a className="hover:text-brand-primary" href="#">API Documentation</a></li>
                <li><a className="hover:text-brand-primary" href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Connect</h5>
              <div className="flex gap-4 mb-6">
                <Button variant="outline" size="icon" className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-brand-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">public</span>
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-brand-primary transition-colors">
                   <span className="material-symbols-outlined text-sm">alternate_email</span>
                </Button>
              </div>
              <p className="text-xs text-slate-400 italic">© 2024 TopUp Hub Ltd. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
