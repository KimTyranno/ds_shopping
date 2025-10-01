'use client'

import { ProductsStatCounts } from '@/app/[locale]/admin/products/list/page'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, Package } from 'lucide-react'

type ProductListStatsProps = {
  productsCounts: ProductsStatCounts
}

export default function ProductListStats({
  productsCounts: { totalCount, activeCount, soldOutCount, lowStockCount },
}: ProductListStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 상품</p>
              <p className="text-2xl font-bold">{totalCount}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">판매중</p>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
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
              <p className="text-sm text-gray-600">품절</p>
              <p className="text-2xl font-bold text-red-600">{soldOutCount}</p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-red-500 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">재고 부족</p>
              <p className="text-2xl font-bold text-orange-600">
                {lowStockCount}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
