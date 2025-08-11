'use client'

import useStore from '@/lib/store'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/input'

const MobileSearchBar = () => {
  const t = useTranslations()
  const isMobileSearchOpen = useStore(state => state.isMobileSearchOpen)

  if (!isMobileSearchOpen) return null

  return (
    <div className="md:hidden py-3 border-t">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder={t('search.placeholder')} className="pl-10" />
      </div>
    </div>
  )
}

export default MobileSearchBar
