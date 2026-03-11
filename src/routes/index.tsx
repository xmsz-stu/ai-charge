import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '../components/MainLayout'
import HomeHero from '../components/home/HomeHero'
import RecommendationGrid from '../components/home/RecommendationGrid'
import HomeServiceList from '../components/home/HomeServiceList'
import { getServices, getFeaturedServices } from '../db/queries'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [services, featuredServices] = await Promise.all([
      getServices(),
      getFeaturedServices(),
    ])
    return { services, featuredServices }
  },
  component: App,
})

function App() {
  const { services, featuredServices } = Route.useLoaderData()

  return (
    <MainLayout>
      <HomeHero />
      <RecommendationGrid services={featuredServices} />
      <HomeServiceList services={services} />
    </MainLayout>
  )
}
