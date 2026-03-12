import * as React from 'react'
import { Megaphone, Search, Plus, UploadCloud, Info, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "#/components/ui/dialog"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import { Label } from "#/components/ui/label"
import { Textarea } from "#/components/ui/textarea"
import { Checkbox } from "#/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select"

interface PostIntelModalProps {
  trigger: React.ReactElement
}

export function PostIntelModal({ trigger }: PostIntelModalProps) {
  return (
    <Dialog>
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Product</Label>
            <Select>
              <SelectTrigger className="w-full h-12 px-4 border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 rounded-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none font-sans text-sm">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <SelectValue placeholder="Select product (e.g. ChatGPT, Midjourney)" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-none border-slate-900 dark:border-brand-primary/30">
                <SelectItem value="chatgpt">ChatGPT Plus</SelectItem>
                <SelectItem value="midjourney">Midjourney Pro</SelectItem>
                <SelectItem value="claude">Claude Pro</SelectItem>
                <SelectItem value="netflix">Netflix Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Intel Headline</Label>
            <Input 
              className="w-full h-12 px-4 border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 rounded-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none font-sans text-sm" 
              placeholder="e.g. Unusual 15% price drop on Turkish region" 
            />
          </div>

          {/* Tags Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Categories</Label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 text-xs font-medium border border-brand-primary bg-brand-primary/5 text-brand-primary cursor-pointer transition-all">
                Flash Sale
              </button>
              <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer">
                Price Drop
              </button>
              <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer">
                New Provider
              </button>
              <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-600 hover:border-red-500 hover:text-red-500 transition-all cursor-pointer">
                Scam Alert
              </button>
              <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-400 border-dashed hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer flex items-center gap-1">
                <Plus className="w-3 h-3" /> Custom
              </button>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Intel Description</Label>
            <Textarea 
              className="w-full px-4 py-3 border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 rounded-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none font-sans text-sm min-h-[120px] resize-none" 
              placeholder="Provide detailed steps, provider names, or observed patterns..." 
            />
          </div>

          {/* Evidence Upload */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Supporting Evidence</Label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 flex flex-col items-center justify-center gap-2 hover:bg-brand-primary/5 hover:border-brand-primary transition-all cursor-pointer group rounded-none">
              <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-brand-primary" />
              <p className="text-sm text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                Drop screenshots here or <span className="text-brand-primary font-medium underline underline-offset-2">browse files</span>
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">JPG, PNG or PDF (MAX. 5MB)</p>
            </div>
          </div>

          {/* Privacy/Disclaimer */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <Checkbox id="anon" className="mt-1 rounded-none border-slate-400 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <Label htmlFor="anon" className="text-xs text-slate-500 leading-tight font-normal cursor-pointer">
              Post this intel anonymously. Your username will be hidden but your credibility score will still be affected by the community's verification.
            </Label>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900">
          <DialogClose render={
            <Button variant="outline" className="px-6 py-2 h-10 text-sm font-bold uppercase tracking-wider text-slate-500 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors rounded-none shadow-none">
              Cancel
            </Button>
          } />
          <Button className="px-8 py-2 h-10 text-sm font-bold uppercase tracking-wider bg-brand-primary text-white border-brand-primary hover:brightness-110 active:scale-[0.98] transition-all shadow-[4px_4px_0px_0px_rgba(6,6,249,0.2)] rounded-none">
            Post Intel
          </Button>
        </footer>
      </DialogContent>

      {/* Status Bar / Toast (Optional Preview) */}
      {/* Note: This logic for visibility would be managed via Toast component, but placed here as requested by design */}
      <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-3 bg-slate-900 text-white px-4 py-2 border-l-4 border-brand-primary text-[10px] font-medium tracking-wide">
        <Info className="w-3.5 h-3.5" />
        <span>DRAFT AUTO-SAVED {new Date().toLocaleTimeString()}</span>
      </div>
    </Dialog>
  )
}
