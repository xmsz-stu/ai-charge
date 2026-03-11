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

const MOCK_DATA = [
  {
    id: '1',
    serviceName: 'ChatGPT Plus',
    group: 'Proxy Group A',
    providerName: 'OpenAI Global',
    dimensions: 'Proxy / Plus / 1 Month',
    price: 20.00,
    lastUpdated: '2 mins ago',
    status: 'online',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7QP1PaCFYdZN73Np-cbZu9h81HaT3sJA29sgH8ZFwsMdyKrDOl_sjOMQTHJKz1Xs16NZysyyvGvPQur5C-cfiOu23yzus5DbXtMmUlV53XXuE34IMgKxn-uHjaOoAVOY859irx62Eu2wErXHehP5wYErdEruVFBUgOUq7xsEkPTcOZbI8rUypDqK4w8DG1qH4EkO3XUlxEzitcv3os0ImjNWLB2UWCJRlbFN7FxOH9SS7q_MhgreFCX-852tXdksggPz11RL0_dU'
  },
  {
    id: '2',
    serviceName: 'Midjourney Standard',
    group: 'Visual Proxy',
    providerName: 'Midjourney Inc.',
    dimensions: 'Standard / Yearly',
    price: 30.00,
    lastUpdated: '14 mins ago',
    status: 'warning',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7rCDFw7q3l69F-EqQCYseSW3BKwplPUTm34VClnSjpXwoQyjfLWv0ASV184omdj26s57Ye4ZsPy-O9wkApv9cT-nONqVWlmWXbuio3RY1yp4rWc-lDWh3mD48F_Nn3whQfqv_I19mBpx0vAKqKNt3JmPR2Gd1FL3Br78Iabvii_AuhVjcjLp8n0nhhf8YiXePtIMLPUKLUA5V-aYfVUyLOUZizWI9Koxm29OaBNDzO9-nWJwvdTM3ZOoTrz_K5LgaVT1pFcERXbQ'
  },
  {
    id: '3',
    serviceName: 'Netflix Premium',
    group: 'Entertainment',
    providerName: 'Netflix Retail',
    dimensions: '4K / Monthly',
    price: 15.50,
    lastUpdated: '1 min ago',
    status: 'online',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFgvU06-uvyr1Ko0Nbbh1vyKLeOV13r4VPoafzUHENFYz9BaL4slHxO18j1um_4BrEuRNcH6VSGC_W261J7UALeaerZ9kLtd7fEvccHX_4vVfbslF1EO8TwArwAtvqmbAcqcv4pOqPZ7rGN2XYk2giXL0dMvL2OMhpFr0kZ3x1qMpWZi_ulWbXnsKlbmShJ68DZwOMFWrPiovXf-6qDG3dRWHvPLsarolazPZpf6ruGd3YIoQ-p8FFIp6cX1fX6SzcTMxJixboSW8'
  },
  {
    id: '4',
    serviceName: 'Claude Pro',
    group: 'Proxy Group B',
    providerName: 'Anthropic Direct',
    dimensions: 'Individual / Monthly',
    price: 20.00,
    lastUpdated: '1 hour ago',
    status: 'warning',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiYYMdvQqVt7f4PrZ_VNYlCWqN6CeImet1a-6jwpno5prBaEdyPkLDkaXYK_uD5Wm9WzvUmxCQe2nUDd6fgxstTQbqWye_-91WWSGK0JTWAXvxiHJYKK_t8BQgbXYBStsCoSlti9jjaPsJc0DmHd159x2D8x_SW2pZ_M4MqS7vtseth5C_3OHW3q2XM0w0XGFMScK9-6YaRwN6Zsub5UgnLe6uLhyDC3fLYMdbpAdLFuvtksnnEitfRscni7OkGcf8W-eTHHAlNH4'
  }
]

interface SKUTableProps {
  onEdit: (sku: any) => void
}

export function SKUTable({ onEdit }: SKUTableProps) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service Name & Logo</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Provider Name</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">SKU Dimensions</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Price</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Last Updated</TableHead>
            <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
          {MOCK_DATA.map((sku) => (
            <TableRow key={sku.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-200 dark:border-slate-800">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <img src={sku.logo} alt={sku.serviceName} className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{sku.serviceName}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">{sku.group}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{sku.providerName}</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  {sku.dimensions}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="text-sm font-bold text-brand-primary">${sku.price.toFixed(2)}</span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    sku.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  )}></span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">{sku.lastUpdated}</span>
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
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Showing 1-4 of 124 Services</p>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 px-3 border-slate-200 dark:border-slate-800 text-xs font-bold rounded-none">PREV</Button>
          <Button variant="outline" className="h-8 px-3 border-slate-200 dark:border-slate-800 text-xs font-bold rounded-none">NEXT</Button>
        </div>
      </div>
    </div>
  )
}


