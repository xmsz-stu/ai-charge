import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '../components/MainLayout'
import { DetailBreadcrumb } from '../components/detail/DetailBreadcrumb'
import { DetailHero } from '../components/detail/DetailHero'
import { BillingSelector } from '../components/detail/BillingSelector'
import { ProviderTable } from '../components/detail/ProviderTable'

export const Route = createFileRoute('/detail/$id')({
  component: DetailPage,
})

function DetailPage() {
  const { id } = Route.useParams()

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        <DetailBreadcrumb id={id} />
        <DetailHero id={id} />
        <BillingSelector />
        <ProviderTable />
      </div>
    </MainLayout>
  )
}
