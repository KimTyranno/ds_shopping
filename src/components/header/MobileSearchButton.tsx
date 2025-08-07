'use client'

import useStore from '@/lib/store'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'

const MobileSearchButton = () => {
  const toggleMobileSearch = useStore(state => state.toggleMobileSearch)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleMobileSearch}>
      <Search className="h-5 w-5" />
    </Button>
  )
}

export default MobileSearchButton
