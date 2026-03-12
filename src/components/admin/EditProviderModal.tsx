import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useState, useEffect } from "react"
import { upsertProvider } from "../../db/queries"
import { useRouter } from "@tanstack/react-router"

interface EditProviderModalProps {
  isOpen: boolean
  onClose: () => void
  provider: any
}

export function EditProviderModal({ isOpen, onClose, provider }: EditProviderModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    url: "",
    logoUrl: "",
    rating: "0.0",
    reviewCount: 0,
    isPartner: false,
    isTopPick: false,
    iconType: "rocket",
    paymentMethods: [],
  })

  useEffect(() => {
    if (provider) {
      setFormData({
        id: provider.id,
        name: provider.name,
        url: provider.url,
        logoUrl: provider.logoUrl || "",
        rating: provider.rating || "0.0",
        reviewCount: provider.reviewCount || 0,
        isPartner: provider.isPartner ?? false,
        isTopPick: provider.isTopPick ?? false,
        iconType: provider.iconType || "rocket",
        paymentMethods: provider.paymentMethods || [],
      })
    } else {
      setFormData({
        id: "",
        name: "",
        url: "",
        logoUrl: "",
        rating: "0.0",
        reviewCount: 0,
        isPartner: false,
        isTopPick: false,
        iconType: "rocket",
        paymentMethods: [],
      })
    }
  }, [provider, isOpen])

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await upsertProvider({ data: formData });
      await router.invalidate();
      onClose();
    } catch (error) {
      console.error("Failed to save provider:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 border-slate-200 dark:border-slate-800 rounded-none bg-white dark:bg-slate-950">
        <DialogHeader className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-1 text-left">
            <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              {provider ? 'Edit Provider' : 'Add New Provider'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. ProxyProvider"
                className="rounded-none bg-slate-50 dark:bg-slate-900" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">URL</Label>
              <Input 
                value={formData.url} 
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://..."
                className="rounded-none bg-slate-50 dark:bg-slate-900" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Logo URL</Label>
            <Input 
              value={formData.logoUrl} 
              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              placeholder="https://..."
              className="rounded-none bg-slate-50 dark:bg-slate-900" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Rating</Label>
              <Input 
                type="number"
                step="0.1"
                value={formData.rating} 
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                className="rounded-none bg-slate-50 dark:bg-slate-900" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Review Count</Label>
              <Input 
                type="number"
                value={formData.reviewCount} 
                onChange={(e) => setFormData({...formData, reviewCount: parseInt(e.target.value) || 0})}
                className="rounded-none bg-slate-50 dark:bg-slate-900" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">Top Pick</p>
                <p className="text-[10px] text-slate-500">Highlight in lists</p>
              </div>
              <Switch 
                checked={formData.isTopPick}
                onCheckedChange={(v) => setFormData({...formData, isTopPick: v})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">Partner</p>
                <p className="text-[10px] text-slate-500">Official partner status</p>
              </div>
              <Switch 
                checked={formData.isPartner}
                onCheckedChange={(v) => setFormData({...formData, isPartner: v})}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <Button variant="ghost" onClick={onClose} className="uppercase text-xs font-bold tracking-widest rounded-none">
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading || !formData.name || !formData.url}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-2 text-sm font-bold uppercase tracking-widest rounded-none min-w-[120px]"
          >
            {isLoading ? "Saving..." : "Save Provider"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
