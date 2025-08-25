'use client'

import { useRouter } from '@/i18n/navigation'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/input'

const PcSearchBar = () => {
  const t = useTranslations()
  const router = useRouter()
  return (
    <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-6">
      <form
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const query = formData.get('search') as string
          if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
          }
        }}
        className="relative flex-1">
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

export default PcSearchBar
