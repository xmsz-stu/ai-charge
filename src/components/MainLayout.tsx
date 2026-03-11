import type { ReactNode } from 'react'
import { DetailHeader } from './detail/DetailHeader'
import { DetailFooter } from './detail/DetailFooter'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f8] text-slate-900 font-display transition-colors duration-300">
      <DetailHeader />
      <main>
        {children}
      </main>
      <DetailFooter />
    </div>
  )
}
