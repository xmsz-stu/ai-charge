import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'

import type { Service } from '../../db/queries'

export function DetailBreadcrumb({ service }: { service: Service }) {
  return (
    <Breadcrumb className="mb-8 uppercase tracking-wider">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="hover:text-brand-primary">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator><ChevronRight className="w-3 h-3" /></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="hover:text-brand-primary">Digital Services</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator><ChevronRight className="w-3 h-3" /></BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-slate-900 dark:text-slate-200">{service.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
