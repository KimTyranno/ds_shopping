'use client'

import useStore from '@/lib/store'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'

const MobileSearchBar = () => {
  const isMobileSearchOpen = useStore(state => state.isMobileSearchOpen)

  if (!isMobileSearchOpen) return null

  return (
    <div className="md:hidden py-3 border-t">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="상품을 검색해보세요..." className="pl-10" />
      </div>
    </div>
  )
}

export default MobileSearchBar
