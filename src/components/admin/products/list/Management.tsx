'use client'

import {
  ProductsStatCounts,
  ProductWithImage,
} from '@/app/[locale]/admin/products/list/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Package } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import ProductListPagination from './Pagination'
import ProductListTable from './Table'
import ProductListTabs from './Tabs'

type ProductListManagementProps = {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  handleFilterChange: () => void
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: Dispatch<SetStateAction<string>>
  products?: ProductWithImage[]
  productsCounts: ProductsStatCounts
  onDeleteProduct: (_id: number) => Promise<void>
}

// TODO: constants에서 가져와야함
const ITEMS_PER_PAGE = 10

export default function ProductListManagement({
  activeTab,
  setActiveTab,
  currentPage,
  setCurrentPage,
  handleFilterChange,
  searchValue,
  setSearchValue,
  selectedStatus,
  setSelectedStatus,
  products,
  productsCounts: { totalCount },
  onDeleteProduct,
}: ProductListManagementProps) {
  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = products?.slice(startIndex, endIndex) ?? []

  return (
    <Card>
      <CardHeader>
        <ProductListTabs {...{ activeTab, setActiveTab, handleFilterChange }} />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {currentProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                상품이 없습니다
              </h3>
              <p className="text-gray-500 mb-6 max-w-md whitespace-pre-line">
                {searchValue || selectedStatus !== '전체'
                  ? '검색 조건에 맞는 상품이 없습니다. 다른 조건으로 검색해보세요.'
                  : '아직 등록된 상품이 없습니다. \n첫 번째 상품이 등록되면 여기에 표시됩니다.'}
              </p>
              {(searchValue || selectedStatus !== '전체') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchValue('')
                    setSelectedStatus('all')
                    setActiveTab('all')
                    setCurrentPage(1)
                  }}>
                  모든 필터 초기화
                </Button>
              )}
            </div>
          ) : (
            <ProductListTable
              {...{ products: currentProducts, onDeleteProduct }}
            />
          )}
        </div>

        {currentProducts.length > 0 && (
          <ProductListPagination
            {...{
              currentPage,
              setCurrentPage,
              endIndex,
              totalPages,
              products: currentProducts,
              totalCount,
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
