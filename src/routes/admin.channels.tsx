import { createFileRoute, Link } from '@tanstack/react-router'
import { AdminHeader } from '../components/admin/AdminHeader'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/admin/channels')({
  component: ChannelsPage,
})

function ChannelsPage() {
  return (
    <>
      <AdminHeader title="Channel & Promo Management" />
      <div className="flex-1 p-8 overflow-auto bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-brand-primary">share_windows</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-display">Channel Management Coming Soon</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              Establishing direct associations between promotional codes and distribution channels for better tracking and attribution.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/admin">
                <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 h-12 rounded-none font-bold uppercase tracking-wider transition-transform active:scale-95">
                  BACK TO CATALOG
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { title: 'Distribution Channels', desc: 'Manage your direct and indirect sales channels.', icon: 'hub' },
              { title: 'Promo & Discounts', desc: 'Create and track channel-specific promo codes.', icon: 'sell' },
              { title: 'Attribution Analytics', desc: 'Performance insights by distribution source.', icon: 'analytics' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-brand-primary mb-3">{feature.icon}</span>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-normal">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
