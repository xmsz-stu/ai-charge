import { Star, CheckCircle2, Copy, ArrowRight, Zap, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import Price from '../ui/Price'

import { type SkuWithProvider } from '#/db/actions/types'
import { useState, useMemo, useEffect } from 'react'
import { cn } from '#/lib/utils'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  initialSku: SkuWithProvider | null
  allProviderSkus: SkuWithProvider[]
}

export function PurchaseModal({ isOpen, onClose, initialSku, allProviderSkus }: PurchaseModalProps) {
  const [selectedTopUpType, setSelectedTopUpType] = useState<string>('')
  const [selectedVersion, setSelectedVersion] = useState<string>('')
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<string>('')

  // Initialize state when initialSku changes or modal opens
  useEffect(() => {
    if (initialSku && isOpen) {
      setSelectedTopUpType(initialSku.topUpType)
      setSelectedVersion(initialSku.version)
      setSelectedBillingCycle(initialSku.billingCycle)
    }
  }, [initialSku, isOpen])

  const provider = initialSku?.provider

  // Extract unique options from allProviderSkus
  const options = useMemo(() => {
    const topUpTypes = Array.from(new Set(allProviderSkus.map(s => s.topUpType)))
    const versions = Array.from(new Set(allProviderSkus.map(s => s.version)))
    const billingCycles = Array.from(new Set(allProviderSkus.map(s => s.billingCycle)))
    
    // Sort billing cycles
    const cycleOrder = { '1 Month': 1, '3 Months': 2, '6 Months': 3, '1 Year': 4 }
    billingCycles.sort((a, b) => (cycleOrder[a as keyof typeof cycleOrder] || 99) - (cycleOrder[b as keyof typeof cycleOrder] || 99))

    return { topUpTypes, versions, billingCycles }
  }, [allProviderSkus])

  // Find active SKU based on selections
  const activeSku = useMemo(() => {
    return allProviderSkus.find(s => 
      s.topUpType === selectedTopUpType && 
      s.version === selectedVersion && 
      s.billingCycle === selectedBillingCycle
    ) || initialSku
  }, [allProviderSkus, selectedTopUpType, selectedVersion, selectedBillingCycle, initialSku])

  if (!provider) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[640px] p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 space-y-0">
          <div className="flex items-center gap-4 text-left">
            <div className="size-12 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center bg-white">
              {provider.logoUrl ? (
                <img src={provider.logoUrl} alt={provider.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-white">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
              )}
            </div>
            <div>
              <DialogTitle className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">
                {provider.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Official Provider</span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="text-slate-900 dark:text-slate-100 text-sm font-medium">{Number(provider.rating || 0).toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">({provider.reviewCount?.toLocaleString()} reviews)</span>
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
                  {options.topUpTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedTopUpType(type)}
                      className={cn(
                        "px-4 py-2 border-2 text-xs font-bold uppercase transition-all",
                        selectedTopUpType === type
                          ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                          : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-brand-primary/50"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Version Selector */}
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-xs font-bold uppercase tracking-wider mb-3">Select Version</h3>
                <div className="flex flex-wrap gap-2">
                  {options.versions.map((ver) => (
                    <button
                      key={ver}
                      onClick={() => setSelectedVersion(ver)}
                      className={cn(
                        "px-4 py-2 border-2 text-xs font-bold uppercase transition-all",
                        selectedVersion === ver
                          ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                          : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-brand-primary/50"
                      )}
                    >
                      {ver}
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing Cycle Selector */}
              <div>
                <h3 className="text-slate-900 dark:text-slate-100 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-left">
                  <span className="w-1 h-4 bg-brand-primary"></span>
                  Select Billing Cycle
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {options.billingCycles.map((cycle) => {
                    const skuInCycle = allProviderSkus.find(s => 
                      s.topUpType === selectedTopUpType && 
                      s.version === selectedVersion && 
                      s.billingCycle === cycle
                    )
                    const isSelected = selectedBillingCycle === cycle
                    
                    return (
                      <div 
                        key={cycle}
                        onClick={() => setSelectedBillingCycle(cycle)}
                        className={cn(
                          "p-4 relative cursor-pointer group transition-all border-2 text-left",
                          isSelected 
                            ? "border-brand-primary bg-brand-primary/5" 
                            : "border-slate-200 dark:border-slate-700 hover:border-brand-primary/50 bg-white dark:bg-slate-800/50"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                          </div>
                        )}
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-tight">{cycle}</p>
                        <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold mt-1">
                          {skuInCycle ? (
                            <Price amount={skuInCycle.price} fromCurrency={skuInCycle.currency || 'USD'} />
                          ) : (
                            <span className="text-slate-300 text-lg italic">N/A</span>
                          )}
                        </p>
                        {skuInCycle?.discountLabel && (
                          <div className={cn(
                            "mt-2 pt-2 border-t",
                            isSelected ? "border-brand-primary/20" : "border-slate-100 dark:border-slate-700"
                          )}>
                            <p className={cn(
                              "text-[10px] font-bold uppercase",
                              isSelected ? "text-brand-primary" : "text-emerald-600 dark:text-emerald-400"
                            )}>
                              {skuInCycle.discountLabel}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
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
            <Button 
              className="w-full bg-brand-primary text-white py-6 font-bold text-base uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-none"
              onClick={() => activeSku?.externalUrl && window.open(activeSku.externalUrl, '_blank')}
              disabled={!activeSku?.externalUrl}
            >
              Buy Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 py-6 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-none flex items-center justify-center gap-2"
              onClick={() => provider.url && window.open(provider.url, '_blank')}
            >
              Go to Provider Website
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          {/* Minimalist Footer */}
          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-slate-400 dark:text-slate-500 uppercase font-medium tracking-tight">
            <span className="hover:text-brand-primary transition-colors cursor-pointer">Secure Checkout</span>
            <span className="hover:text-brand-primary transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-primary transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
