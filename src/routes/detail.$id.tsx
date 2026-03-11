import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '../components/MainLayout'
import { DetailBreadcrumb } from '../components/detail/DetailBreadcrumb'
import { DetailHero } from '../components/detail/DetailHero'
import { BillingSelector } from '../components/detail/BillingSelector'
import { ProviderTable } from '../components/detail/ProviderTable'
import { getServiceBySlug, getSkusByServiceId } from '../db/queries'
import { notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/detail/$id')({
  loader: async ({ params }) => {
    const service = await getServiceBySlug({ data: params.id })
    if (!service) throw notFound()

    const skus = await getSkusByServiceId({ data: service.id })
    return { service, skus }
  },
  component: DetailPage,
})

function DetailPage() {
  const { id } = Route.useParams()
  const { service, skus } = Route.useLoaderData()

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        <DetailBreadcrumb id={id} />
        <DetailHero service={service} />
        <BillingSelector />
        <ProviderTable skus={skus} />
      </div>
    </MainLayout>
  )
}
