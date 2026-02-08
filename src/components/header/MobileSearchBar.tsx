'use client'

import { useRouter } from '@/i18n/navigation'
import { useStore } from '@/lib/store'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/input'

const MobileSearchBar = () => {
  const t = useTranslations()
  const isMobileSearchOpen = useStore(state => state.isMobileSearchOpen)
  const router = useRouter()

  if (!isMobileSearchOpen) return null

  return (
    <div className="md:hidden py-3 border-t">
      <form
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const query = formData.get('search') as string
          if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
          }
        }}
        className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          name="search"
          placeholder={t('search.placeholder')}
          className="pl-10"
        />
      </form>
    </div>
  )
}

export default MobileSearchBar
