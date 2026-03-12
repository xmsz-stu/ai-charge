import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { 
  Filter, 
  ArrowUpDown, 
  Rocket, 
  Star, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  ChevronRight,
  Coins,
  Wallet 
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import { PurchaseModal } from './PurchaseModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import Price from '../ui/Price'
import type { SkuWithProvider } from '#/db/queries'

// --- Icon Maps ---

type ProviderIconType = 'rocket' | 'zap'

const PROVIDER_ICONS: Record<ProviderIconType, React.ReactNode> = {
  rocket: <Rocket className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6 fill-current" />,
}

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  speed: <Zap className="w-3 h-3 text-emerald-500" />,
  safety: <ShieldCheck className="w-3 h-3 text-emerald-500" />,
  support: <Zap className="w-3 h-3 text-emerald-500" />,
}

const PAYMENT_ICONS: Record<string, React.ReactNode> = {
  visa: <CreditCard className="w-4 h-4" />,
  crypto: <Coins className="w-4 h-4" />,
  paypal: <Wallet className="w-4 h-4" />,
  star: <Star className="w-4 h-4" />,
}

// Helper to pick a feature icon
function getFeatureIcon(label: string): React.ReactNode {
  if (label.toLowerCase().includes('instant') || label.toLowerCase().includes('fast')) {
    return FEATURE_ICONS['speed']
  }
  if (label.toLowerCase().includes('support') || label.toLowerCase().includes('24')) {
    return FEATURE_ICONS['support']
  }
  return FEATURE_ICONS['safety']
}

// --- Column Definitions ---

function getColumns(onPurchase: (sku: SkuWithProvider) => void): ColumnDef<SkuWithProvider>[] {
  return [
    {
      accessorKey: 'provider.name',
      header: 'Provider Identity',
      cell: ({ row }) => {
        const sku = row.original
        const provider = sku.provider
        const iconType = (provider.iconType as ProviderIconType) ?? 'rocket'
        return (
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded flex items-center justify-center border transition-colors ${
              provider.isTopPick 
                ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                : 'bg-brand-primary/5 text-brand-primary border-brand-primary/10'
            }`}>
              {PROVIDER_ICONS[iconType]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-900 dark:text-white leading-tight">{provider.name}</p>
                {provider.isTopPick && (
                  <Badge className="bg-brand-primary text-[8px] text-white px-1 rounded uppercase font-bold tracking-tighter shadow-none border-none">
                    Top Pick
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span className="text-xs font-bold">{Number(provider.rating ?? 0).toFixed(1)}</span>
                <span className="text-[10px] text-slate-400">({provider.reviewCount?.toLocaleString()} reviews)</span>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'features',
      header: 'Features',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          {(row.original.features ?? []).map((feature, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-1.5 text-[11px] ${
                row.original.provider.isTopPick && i === 0 ? 'text-slate-500 font-bold' : 'text-slate-500'
              }`}
            >
              {getFeatureIcon(feature)}
              {feature}
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'provider.paymentMethods',
      header: () => <div className="text-center">Payment Methods</div>,
      cell: ({ row }) => {
        const provider = row.original.provider
        const methods = provider.paymentMethods ?? []
        return (
          <div className="flex justify-center gap-3">
            {methods.map((method, i) => (
              <div 
                key={i} 
                className={`w-8 h-8 rounded border flex items-center justify-center transition-all cursor-help ${
                  provider.isTopPick 
                    ? 'border-brand-primary/20 bg-white dark:bg-slate-800 shadow-sm text-brand-primary' 
                    : 'border-slate-200 dark:border-slate-700 grayscale hover:grayscale-0 opacity-70 hover:opacity-100'
                }`}
                title={method.toUpperCase()}
              >
                {PAYMENT_ICONS[method] || <CreditCard className="w-4 h-4" />}
              </div>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: 'price',
      header: () => <div className="text-right">Pricing & Discount</div>,
      cell: ({ row }) => {
        const sku = row.original
        const isTopPick = sku.provider.isTopPick
        return (
          <div className="text-right">
            <p className={`text-xl font-bold leading-none ${
              isTopPick ? 'text-brand-primary' : 'text-slate-900 dark:text-white'
            }`}>
              <Price amount={sku.price} fromCurrency={sku.currency ?? 'USD'} />
            </p>
            {sku.discountLabel && (
              <Badge 
                variant="default" 
                className={`mt-1 px-1.5 py-0.5 text-[9px] font-bold rounded uppercase shadow-none border-none ${
                  isTopPick ? 'bg-emerald-500 text-white' : 'bg-brand-primary text-white'
                }`}
              >
                {sku.discountLabel}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Button 
            size="sm" 
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-5 py-2 text-xs font-bold rounded transition-all uppercase tracking-wider shadow-none border-none"
            onClick={() => onPurchase(row.original)}
          >
            Go to Site
          </Button>
        </div>
      ),
    },
  ]
}

// --- Main Component ---

interface ProviderTableProps {
  skus: SkuWithProvider[]
}

export function ProviderTable({ skus }: ProviderTableProps) {
  const [selectedSku, setSelectedSku] = React.useState<SkuWithProvider | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handlePurchase = (sku: SkuWithProvider) => {
    setSelectedSku(sku)
    setIsModalOpen(true)
  }

  const columns = React.useMemo(() => getColumns(handlePurchase), [])

  const table = useReactTable({
    data: skus,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalProviders = skus.length

  // Derive modal provider shape from selected SKU
  const modalProvider = selectedSku ? {
    id: selectedSku.provider.id,
    name: selectedSku.provider.name,
    rating: Number(selectedSku.provider.rating ?? 0),
    reviews: `${selectedSku.provider.reviewCount?.toLocaleString()} reviews`,
    price: Number(selectedSku.price),
    currency: selectedSku.currency ?? 'USD',
  } : null

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight">
          Available Providers ({totalProviders})
        </h3>
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-bold flex items-center gap-1 text-slate-500 hover:text-brand-primary transition-colors h-auto p-0 hover:bg-transparent"
          >
            <Filter className="w-4 h-4" /> FILTER
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-bold flex items-center gap-1 text-slate-500 hover:text-brand-primary transition-colors h-auto p-0 hover:bg-transparent"
          >
            <ArrowUpDown className="w-4 h-4" /> SORT BY PRICE
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-background-dark">
        <Table>
          <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-6 py-4 h-auto">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${
                    row.original.provider.isTopPick 
                      ? 'bg-brand-primary/[0.03] hover:bg-brand-primary/[0.05]' 
                      : 'hover:bg-brand-primary/[0.02]'
                  }`}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell 
                      key={cell.id} 
                      className={`px-6 py-5 relative ${
                        row.original.provider.isTopPick && index === 0 
                          ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-brand-primary before:z-10' 
                          : ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No providers available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button 
          variant="ghost" 
          className="w-full py-4 text-xs font-bold text-brand-primary hover:bg-brand-primary/5 transition-all border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 rounded-none"
        >
          VIEW ALL {totalProviders} PROVIDERS <ChevronRight className="w-4 h-4 rotate-90" />
        </Button>
      </div>

      <PurchaseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        provider={modalProvider}
      />
    </section>
  )
}
