import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { cn } from "../../lib/utils"
import { useState, useEffect } from "react"

interface EditSKUModalProps {
  isOpen: boolean
  onClose: () => void
  sku: any
}

export function EditSKUModal({ isOpen, onClose, sku }: EditSKUModalProps) {
  const [formData, setFormData] = useState<any>({
    serviceId: "",
    providerId: "",
    topUpType: "Proxy",
    version: "Plus",
    billingCycle: "1 Month",
    basePrice: 20.00,
    processingFee: 2.5,
    discount: 0,
    autoSync: true,
  })

  useEffect(() => {
    if (sku) {
      setFormData({
        ...formData,
        serviceId: sku.serviceName,
        providerId: sku.providerName,
        basePrice: sku.price,
      })
    }
  }, [sku])

  const netPrice = (formData.basePrice * (1 + formData.processingFee / 100) * (1 - formData.discount / 100)).toFixed(2)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 border-slate-200 dark:border-slate-800 rounded-none bg-white dark:bg-slate-950">
        <DialogHeader className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-1 text-left">
            <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              {sku ? 'Edit Service SKU' : 'Add New Service SKU'}
            </DialogTitle>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {sku ? `SKU ID: SKU-9284-0${sku.id}` : 'Create a new catalog item'}
            </p>
          </div>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Section 1: Basic Info */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-primary mb-4">Section 01 / Basic Info</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Service Name</Label>
                <Select value={formData.serviceId} onValueChange={(v) => setFormData({...formData, serviceId: v})}>
                  <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none h-10 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-slate-200 dark:border-slate-800">
                    <SelectItem value="ChatGPT Plus">ChatGPT Plus</SelectItem>
                    <SelectItem value="Midjourney">Midjourney</SelectItem>
                    <SelectItem value="Claude Pro">Claude Pro</SelectItem>
                    <SelectItem value="Perplexity Pro">Perplexity Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Provider Name</Label>
                <Select value={formData.providerId} onValueChange={(v) => setFormData({...formData, providerId: v})}>
                  <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none h-10 px-3 py-2 text-sm">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-slate-200 dark:border-slate-800">
                    <SelectItem value="OpenAI Global">OpenAI Global</SelectItem>
                    <SelectItem value="Proxy Group A">Proxy Group A</SelectItem>
                    <SelectItem value="Reseller Tier 1">Reseller Tier 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 2: SKU Dimensions */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-primary mb-4">Section 02 / SKU Dimensions</h3>
            <div className="space-y-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Top-up Type</Label>
                <div className="flex border border-slate-200 dark:border-slate-800">
                  {['Proxy', 'Family', 'Private'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, topUpType: type})}
                      className={cn(
                        "flex-1 py-2 text-xs font-medium border-r last:border-r-0 border-slate-200 dark:border-slate-800 transition-colors",
                        formData.topUpType === type 
                          ? "bg-brand-primary text-white" 
                          : "bg-white dark:bg-slate-900 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5 text-left">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Version</Label>
                  <Select value={formData.version} onValueChange={(v) => setFormData({...formData, version: v})}>
                    <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-slate-200 dark:border-slate-800">
                      <SelectItem value="Plus">Plus</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Ultra">Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 text-left">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Billing Cycle</Label>
                  <Select value={formData.billingCycle} onValueChange={(v) => setFormData({...formData, billingCycle: v})}>
                    <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-slate-200 dark:border-slate-800">
                      <SelectItem value="1 Month">1 Month</SelectItem>
                      <SelectItem value="3 Months">3 Months</SelectItem>
                      <SelectItem value="6 Months">6 Months</SelectItem>
                      <SelectItem value="1 Year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Pricing */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-primary mb-4">Section 03 / Pricing & Calculation</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Base Price ($)</Label>
                <Input 
                  type="number" 
                  value={formData.basePrice} 
                  onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Fee (%)</Label>
                <Input 
                  type="number" 
                  value={formData.processingFee} 
                  onChange={(e) => setFormData({...formData, processingFee: parseFloat(e.target.value) || 0})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Discount (%)</Label>
                <Input 
                  type="number" 
                  value={formData.discount} 
                  onChange={(e) => setFormData({...formData, discount: parseFloat(e.target.value) || 0})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none"
                />
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center transition-colors">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Calculated Net Price</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-display">${netPrice}</span>
            </div>
          </div>

          {/* Section 4: Promo Codes */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-primary">Section 04 / Promo Codes</h3>
              <span className="text-[10px] text-slate-400">Press Enter to add tag</span>
            </div>
            <div className="min-h-[80px] w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 flex flex-wrap gap-2 content-start">
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 px-2 py-1">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">WINTER24</span>
                <span className="material-symbols-outlined text-sm cursor-pointer text-slate-400">close</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 px-2 py-1">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">LAUNCH10</span>
                <span className="material-symbols-outlined text-sm cursor-pointer text-slate-400">close</span>
              </div>
              <input className="flex-1 min-w-[60px] bg-transparent border-none text-xs focus:ring-0 p-1" placeholder="Add..." />
            </div>
          </div>

          {/* Section 5: Settings */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Enable Auto-Sync</h3>
                <p className="text-xs text-slate-500 mt-0.5">Automatically update inventory based on provider status.</p>
              </div>
              <Switch 
                checked={formData.autoSync} 
                onCheckedChange={(v) => setFormData({...formData, autoSync: v})}
                className="bg-slate-200 data-[state=checked]:bg-brand-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest rounded-none"
          >
            Cancel
          </Button>
          <Button 
            onClick={onClose}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-2 text-sm font-bold transition-colors uppercase tracking-widest rounded-none"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


