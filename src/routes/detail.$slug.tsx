import { useMemo, useState } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { MainLayout } from '../components/MainLayout'
import { DetailBreadcrumb } from '../components/detail/DetailBreadcrumb'
import { DetailHero } from '../components/detail/DetailHero'
import { BillingSelector } from '../components/detail/BillingSelector'
import { ProviderTable } from '../components/detail/ProviderTable'
import { getServiceBySlug, getSkusByServiceId, type SkuWithProvider } from '../db/queries'

export const Route = createFileRoute('/detail/$slug')({
  loader: async ({ params }) => {
    const service = await getServiceBySlug({ data: params.slug })
    if (!service) throw notFound()

    const skus = await getSkusByServiceId({ data: service.id })
    return { service, skus }
  },
  component: DetailPage,
})

function DetailPage() {
  const { service, skus } = Route.useLoaderData()

  // Extract unique billing cycles and their max discounts from SKUs
  const cycleInfo = useMemo(() => {
    const cycleMap = new Map<string, number>()
    
    skus.forEach((sku: SkuWithProvider) => {
      const discount = parseFloat(sku.discount || '0')
      const currentMax = cycleMap.get(sku.billingCycle) || 0
      if (discount > currentMax) {
        cycleMap.set(sku.billingCycle, discount)
      } else if (!cycleMap.has(sku.billingCycle)) {
        cycleMap.set(sku.billingCycle, 0)
      }
    })

    const uniqueCycles = Array.from(cycleMap.keys())
    
    // Sort them
    return uniqueCycles.sort((a, b) => {
      const order = { '1 Month': 1, '3 Months': 2, '6 Months': 3, '1 Year': 4 }
      return (order[a as keyof typeof order] || 99) - (order[b as keyof typeof order] || 99)
    }).map(cycle => ({
      name: cycle,
      maxDiscount: cycleMap.get(cycle) || 0
    }))
  }, [skus])

  const [selectedCycle, setSelectedCycle] = useState<string | null>(cycleInfo[0]?.name || null)

  // Filter SKUs based on selected cycle
  const filteredSkus = useMemo(() => {
    if (!selectedCycle) return skus
    return skus.filter((sku: SkuWithProvider) => sku.billingCycle === selectedCycle)
  }, [skus, selectedCycle])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        <DetailBreadcrumb service={service} />
        <DetailHero service={service} />
        <BillingSelector 
          cycles={cycleInfo} 
          selectedCycle={selectedCycle} 
          onSelect={setSelectedCycle} 
        />
        <ProviderTable skus={filteredSkus} allSkus={skus} />
      </div>
    </MainLayout>
  )
}
