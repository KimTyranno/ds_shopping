'use client'

import { useTranslations } from 'next-intl'

type ProductHeaderProps = {
  title: string
  count: number
  description?: string
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function ProductsHeader({
  title,
  count,
  description,
  Icon,
}: ProductHeaderProps) {
  const t = useTranslations('category')
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
      <p className="text-muted-foreground">{t('count', { count })}</p>
    </div>
  )
}
