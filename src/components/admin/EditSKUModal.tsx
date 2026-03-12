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
import { getServicesForSelect, upsertSku } from "../../db/queries"
import { useRouter } from "@tanstack/react-router"
import { ProviderSelect } from "./ProviderSelect"

interface EditSKUModalProps {
  isOpen: boolean
  onClose: () => void
  sku: any
}

export function EditSKUModal({ isOpen, onClose, sku }: EditSKUModalProps) {
  const router = useRouter()
  const [services, setServices] = useState<{id: string, title: string}[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    id: "",
    serviceId: "",
    providerId: "",
    topUpType: "Proxy",
    version: "Plus",
    billingCycle: "1 Month",
    basePrice: 20.00,
    currency: "USD",
    processingFee: 0,
    discount: 0,
    autoSync: true,
  })

  // Load select options
  useEffect(() => {
    const loadOptions = async () => {
      const s = await getServicesForSelect()
      setServices(s)
    }
    loadOptions()
  }, [])

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'CNY', symbol: '¥' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'HKD', symbol: 'HK$' },
  ]

  const currentCurrency = currencies.find(c => c.code === formData.currency) || currencies[0]

  useEffect(() => {
    if (sku) {
      setFormData({
        id: sku.id,
        serviceId: sku.serviceId,
        providerId: sku.providerId,
        topUpType: sku.topUpType || "Proxy",
        version: sku.version || "Plus",
        billingCycle: sku.billingCycle,
        basePrice: parseFloat(sku.price) || 0,
        currency: sku.currency || "USD",
        processingFee: parseFloat(sku.processingFee) || 0,
        discount: parseFloat(sku.discount) || 0,
        autoSync: sku.autoSync ?? true,
      })
    } else {
      // Reset for "Add New"
      setFormData({
        id: "",
        serviceId: "",
        providerId: "",
        topUpType: "Proxy",
        version: "Plus",
        billingCycle: "1 Month",
        basePrice: 0,
        currency: "USD",
        processingFee: 0,
        discount: 0,
        autoSync: true,
      })
    }
  }, [sku, isOpen])

  const netPrice = (formData.basePrice * (1 + formData.processingFee / 100) * (1 - formData.discount / 100)).toFixed(2)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl  p-0 gap-0 border-slate-200 dark:border-slate-800 rounded-none bg-white dark:bg-slate-950">
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
                    {services.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
                <ProviderSelect 
                  value={formData.providerId} 
                  onValueChange={(v: string) => setFormData({...formData, providerId: v})}
                />
            </div>
          </div>

          {/* Section 2: SKU Dimensions */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-primary mb-4">Section 02 / SKU Dimensions</h3>
            <div className="space-y-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Top-up Type</Label>
                <div className="flex border border-slate-200 dark:border-slate-800">
                  {['Proxy', 'Family', 'Private','Reference'].map((type) => (
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
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Base Price</Label>
                <div className="flex">
                  <Select  value={formData.currency} onValueChange={(v) => setFormData({...formData, currency: v})}>
                    <SelectTrigger  className="w-[80px] h-10! bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800 rounded-none border-r-0  text-xs font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-slate-200 dark:border-slate-800">
                      {currencies.map(c => (
                        <SelectItem key={c.code} value={c.code} className="text-xs">{c.code} ({c.symbol})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    type="number" 
                    value={formData.basePrice} 
                    onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none h-10"
                  />
                </div>
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
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                <span className="text-lg mr-1 text-slate-400 font-normal">{currentCurrency.symbol}</span>
                {netPrice}
              </span>
            </div>
          </div>


          {/* Section 4: Settings */}
          <div className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-primary mb-4">Section 04 / Settings</h3>
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
            onClick={async () => {
              try {
                setIsLoading(true)
                await upsertSku({ data: formData })
                await router.invalidate()
                onClose()
              } catch (error) {
                console.error("Save failed:", error)
              } finally {
                setIsLoading(false)
              }
            }}
            disabled={isLoading || !formData.serviceId || !formData.providerId}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-2 text-sm font-bold transition-colors uppercase tracking-widest rounded-none min-w-[140px]"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


