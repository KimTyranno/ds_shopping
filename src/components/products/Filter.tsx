'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

type ProductsFilterProps = {
  selectedPrice?: string
  setSelectedPrice?: Dispatch<SetStateAction<string>>
  selectedSort?: string
  setSelectedSort?: Dispatch<SetStateAction<string>>
  selectedCategory?: string
  setSelectedCategory?: Dispatch<SetStateAction<string>>
}

export default function ProductsFilter({}: ProductsFilterProps) {
  const t = useTranslations('category')

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">{t('filter')}:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={t('price')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="under-50000">{t('under-50000')}</SelectItem>
            <SelectItem value="50000-100000">{t('50000-100000')}</SelectItem>
            <SelectItem value="100000-500000">{t('100000-500000')}</SelectItem>
            <SelectItem value="over-500000">{t('over-500000')}</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={t('sort')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">{t('popular')}</SelectItem>
            <SelectItem value="price-low">{t('price-low')}</SelectItem>
            <SelectItem value="price-high">{t('price-high')}</SelectItem>
            <SelectItem value="rating">{t('rating')}</SelectItem>
            <SelectItem value="newest">{t('newest')}</SelectItem>
            <SelectItem value="reviews">{t('reviews')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
