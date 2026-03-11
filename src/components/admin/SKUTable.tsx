import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import type { AdminSku } from "../../db/queries"

interface SKUTableProps {
  skus: AdminSku[]
  onEdit: (sku: AdminSku) => void
}

export function SKUTable({ skus, onEdit }: SKUTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service Name & Logo</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Provider Name</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">SKU Dimensions</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Price</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
          {skus.map((sku) => (
            <TableRow key={sku.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-200 dark:border-slate-800">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {sku.service.logoUrl ? (
                      <img src={sku.service.logoUrl} alt={sku.service.title} className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">apps</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{sku.service.title}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">{sku.service.category}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{sku.provider.name}</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  {sku.name} / {sku.billingCycle}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-sm font-bold text-brand-primary">${Number(sku.price).toFixed(2)}</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    sku.provider.isPartner ? 'bg-green-500' : 'bg-yellow-500'
                  )}></span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {sku.provider.isPartner ? 'Partner' : 'External'}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-slate-200 dark:border-slate-800"
                    onClick={() => onEdit(sku)}
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </Button>
                  <Button variant="outline" className="h-8 px-3 border-brand-primary text-brand-primary text-xs font-bold hover:bg-brand-primary hover:text-white transition-all rounded-none">
                    SYNC NOW
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          Showing {skus.length} of {skus.length} Services
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 px-3 border-slate-200 dark:border-slate-800 text-xs font-bold rounded-none">PREV</Button>
          <Button variant="outline" className="h-8 px-3 border-slate-200 dark:border-slate-800 text-xs font-bold rounded-none">NEXT</Button>
        </div>
      </div>
    </div>
  )
}
