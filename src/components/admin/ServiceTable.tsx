import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import type { Service } from "../../db/queries"

interface ServiceTableProps {
  services: Service[]
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
}

export function ServiceTable({ services, onEdit, onDelete }: ServiceTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-[80px]">Logo</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service Name</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
          {services.map((service) => (
            <TableRow key={service.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-200 dark:border-slate-800">
              <TableCell className="px-6 py-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden">
                  {service.logoUrl ? (
                    <img src={service.logoUrl} alt={service.title} className="w-6 h-6 object-contain" />
                  ) : (
                    <span className="material-symbols-outlined text-slate-400">apps</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <p className="text-sm font-bold">{service.title}</p>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  {service.category}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-slate-200 dark:border-slate-800"
                    onClick={() => onEdit(service)}
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-500 transition-colors"
                    onClick={() => {
                        if (confirm(`Are you sure you want to delete ${service.title}?`)) {
                            onDelete(service.id);
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
