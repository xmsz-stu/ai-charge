import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import type { Provider } from "../../db/queries"

interface ProviderTableProps {
  providers: Provider[]
  onEdit: (provider: Provider) => void
  onDelete: (id: string) => void
}

export function ProviderTable({ providers, onEdit, onDelete }: ProviderTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[80px]">Logo</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Provider Name</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">URL</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Rating</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Promo Codes</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
          {providers.map((provider) => (
            <TableRow key={provider.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-200 dark:border-slate-800">
              <TableCell className="px-6 py-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden">
                  {provider.logoUrl ? (
                    <img src={provider.logoUrl} alt={provider.name} className="w-6 h-6 object-contain" />
                  ) : (
                    <span className="material-symbols-outlined text-slate-400">corporate_fare</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{provider.name}</p>
                  {provider.isTopPick && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1 py-0.5 font-bold uppercase">Top Pick</span>
                  )}
                  {provider.isPartner && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1 py-0.5 font-bold uppercase">Partner</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <a href={provider.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline font-mono">
                  {provider.url}
                </a>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-yellow-500 fill-yellow-500">star</span>
                  <span className="text-sm font-bold">{provider.rating}</span>
                  <span className="text-[10px] text-slate-400">({provider.reviewCount})</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {provider.promoCodes && (provider.promoCodes as any[]).length > 0 ? (
                    <span className="text-xs px-2 py-0.5 bg-brand-primary/10 text-brand-primary font-bold">
                      {(provider.promoCodes as any[]).length} Codes
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">None</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-slate-200 dark:border-slate-800"
                    onClick={() => onEdit(provider)}
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-500 transition-colors"
                    onClick={() => {
                        if (confirm(`Are you sure you want to delete ${provider.name}?`)) {
                            onDelete(provider.id);
                        }
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
