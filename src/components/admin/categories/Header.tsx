'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

type CategoriesHeaderProps = {
  onAdd: () => void
}

export default function CategoriesHeader({ onAdd }: CategoriesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          카테고리 관리
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">카테고리 추가</span>
        </Button>
      </div>
    </div>
  )
}
