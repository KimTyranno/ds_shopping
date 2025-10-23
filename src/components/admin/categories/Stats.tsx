'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Grid3X3 } from 'lucide-react'

type CategoriesStatsProps = {
  total: number
  active: number
  inactive: number
}

export default function CategoriesStats({
  total,
  active,
  inactive,
}: CategoriesStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 카테고리</p>
              <p className="text-2xl font-bold">{total}</p>
            </div>
            <Grid3X3 className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">활성 카테고리</p>
              <p className="text-2xl font-bold text-green-600">{active}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-500 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">비활성 카테고리</p>
              <p className="text-2xl font-bold text-gray-600">{inactive}</p>
            </div>
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-gray-500 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
