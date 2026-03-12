import * as React from 'react'
import { Megaphone, UploadCloud, Info, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "#/components/ui/dialog"
import { Button } from "#/components/ui/button"
import { Label } from "#/components/ui/label"
import { Textarea } from "#/components/ui/textarea"
import { createIntel } from '#/db/queries'

interface PostIntelModalProps {
  trigger: React.ReactElement
  serviceId: string
  onSuccess?: () => void
}

export function PostIntelModal({ trigger, serviceId, onSuccess }: PostIntelModalProps) {
  const [content, setContent] = React.useState('')
  const [isPending, setIsPending] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsPending(true)
    try {
      await createIntel({
        data: {
          serviceId,
          username: 'anonymous', // Default for now
          content: content.trim(),
        }
      })
      setContent('')
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to post intel:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-white dark:bg-slate-900 border-slate-900 dark:border-brand-primary/30 shadow-[8px_8px_0px_0px_rgba(6,6,249,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 space-y-0">
          <div className="flex items-center gap-3">
            <Megaphone className="text-brand-primary w-5 h-5" />
            <DialogTitle className="text-xl font-bold uppercase tracking-tight font-display">
              Post New Intel
            </DialogTitle>
          </div>
          <DialogClose render={
            <button className="hover:bg-slate-100 dark:hover:bg-slate-800 p-1 transition-colors cursor-pointer rounded-none">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          } />
        </DialogHeader>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Detailed Content */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Intel Description</Label>
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 rounded-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none font-sans text-sm min-h-[200px] resize-none" 
                placeholder="Provide detailed steps, provider names, or observed patterns..." 
                required
              />
            </div>

            {/* Evidence Upload (Placeholder for UI consistency) */}
            <div className="space-y-2 opacity-50 grayscale cursor-not-allowed">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Supporting Evidence (Coming Soon)</Label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 flex flex-col items-center justify-center gap-2 rounded-none">
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <p className="text-sm text-slate-500">
                  Drop screenshots here or <span className="text-brand-primary font-medium underline underline-offset-2">browse files</span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900">
            <DialogClose render={
              <Button type="button" variant="outline" className="px-6 py-2 h-10 text-sm font-bold uppercase tracking-wider text-slate-500 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors rounded-none shadow-none">
                Cancel
              </Button>
            } />
            <Button 
              type="submit"
              disabled={isPending || !content.trim()}
              className="px-8 py-2 h-10 text-sm font-bold uppercase tracking-wider bg-brand-primary text-white border-brand-primary hover:brightness-110 active:scale-[0.98] transition-all shadow-[4px_4px_0px_0px_rgba(6,6,249,0.2)] rounded-none"
            >
              {isPending ? 'Posting...' : 'Post Intel'}
            </Button>
          </footer>
        </form>

        {/* Status Bar / Toast (Optional Preview) */}
        {/* <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-3 bg-slate-900 text-white px-4 py-2 border-l-4 border-brand-primary text-[10px] font-medium tracking-wide">
          <Info className="w-3.5 h-3.5" />
          <span>DRAFT AUTO-SAVED {new Date().toLocaleTimeString()}</span>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}
