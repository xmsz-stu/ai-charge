import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState, useEffect } from "react"
import { upsertService } from "../../db/queries"
import { useRouter } from "@tanstack/react-router"

interface EditServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: any
}

export function EditServiceModal({ isOpen, onClose, service }: EditServiceModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    id: "",
    title: "",
    category: "",
    logoUrl: "",
    description: "",
  })

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id,
        title: service.title,
        category: service.category,
        logoUrl: service.logoUrl || "",
        description: service.description || "",
      })
    } else {
      setFormData({
        id: "",
        title: "",
        category: "",
        logoUrl: "",
        description: "",
      })
    }
  }, [service, isOpen])

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await upsertService({ data: formData });
      await router.invalidate();
      onClose();
    } catch (error) {
      console.error("Failed to save service:", error);
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
              {service ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Title</Label>
              <Input 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. ChatGPT Plus"
                className="rounded-none bg-slate-50 dark:bg-slate-900" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Category</Label>
              <Input 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g. AI Content"
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

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Description</Label>
            <Input 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="rounded-none bg-slate-50 dark:bg-slate-900" 
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <Button variant="ghost" onClick={onClose} className="uppercase text-xs font-bold tracking-widest rounded-none">
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading || !formData.title || !formData.category}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-2 text-sm font-bold uppercase tracking-widest rounded-none min-w-[120px]"
          >
            {isLoading ? "Saving..." : "Save Service"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
