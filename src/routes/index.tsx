import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '../components/MainLayout'
import HomeHero from '../components/home/HomeHero'
import RecommendationGrid from '../components/home/RecommendationGrid'
import HomeServiceList from '../components/home/HomeServiceList'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <MainLayout>
      <HomeHero />
      <RecommendationGrid />
      <HomeServiceList />
    </MainLayout>
  )
}
