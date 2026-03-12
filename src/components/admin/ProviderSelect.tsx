import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Plus } from "lucide-react"
import { getProvidersForSelect } from "../../db/queries"
import { EditProviderModal } from "./EditProviderModal"

interface ProviderSelectProps {
  value: string
  onValueChange: (value: string) => void
  label?: string
  placeholder?: string
}

export function ProviderSelect({ 
  value, 
  onValueChange, 
  label = "Provider Name",
  placeholder = "Select provider"
}: ProviderSelectProps) {
  const [providers, setProviders] = useState<{ id: string; name: string }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadProviders = async () => {
    try {
      const data = await getProvidersForSelect()
      setProviders(data as { id: string; name: string }[])
    } catch (error) {
      console.error("Failed to load providers:", error)
    }
  }

  useEffect(() => {
    loadProviders()
  }, [])

  return (
    <div className="space-y-1.5 text-left">
      <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </Label>
      <div className="flex gap-2">
        <Select 
          value={value} 
          onValueChange={(val: string | null) => {
            if (val !== null) onValueChange(val)
          }}
        >
          <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-none h-10 px-3 py-2 text-sm">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-none border-slate-200 dark:border-slate-800">
            {providers.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
            {providers.length === 0 && (
              <div className="p-2 text-xs text-slate-500 text-center">No providers found</div>
            )}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 border-slate-200 dark:border-slate-800 rounded-none bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setIsModalOpen(true)}
          title="Quick Add Provider"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <EditProviderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          loadProviders()
        }}
        provider={null}
      />
    </div>
  )
}
