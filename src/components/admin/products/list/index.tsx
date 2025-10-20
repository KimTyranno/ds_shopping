'use client'

import {
  ProductsStatCounts,
  ProductWithImage,
} from '@/app/[locale]/admin/products/list/page'
import { useState } from 'react'
import ProductListFilters from './Filters'
import ProductListHeader from './Header'
import ProductListManagement from './Management'
import ProductListStats from './Stats'

type ListProductProps = {
  products: ProductWithImage[]
  productsCounts: ProductsStatCounts
}

export default function ProductsPage({
  products,
  productsCounts,
}: ListProductProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // 페이지 변경 시 첫 페이지로 리셋
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
    const matchesCategory =
      selectedCategory === '전체' || product.categoryName === selectedCategory
    const matchesStatus =
      selectedStatus === 'all' || product.status === selectedStatus

    if (activeTab === 'low-stock') {
      return (
        matchesSearch && matchesCategory && matchesStatus && product.stock <= 5
      )
    }
    if (activeTab === 'out-of-stock') {
      return (
        matchesSearch && matchesCategory && matchesStatus && product.stock === 0
      )
    }

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <ProductListHeader />

      {/* 통계 카드 */}
      <ProductListStats {...{ productsCounts }} />

      {/* 필터 및 검색 */}
      <ProductListFilters
        {...{
          searchValue,
          selectedCategory,
          selectedStatus,
          setSearchValue,
          setSelectedCategory,
          setSelectedStatus,
          handleFilterChange,
        }}
      />

      {/* 탭 및 상품 목록 */}
      <ProductListManagement
        {...{
          activeTab,
          setActiveTab,
          handleFilterChange,
          currentPage,
          setCurrentPage,
          searchValue,
          selectedStatus,
          setSearchValue,
          setSelectedStatus,
          products: filteredProducts,
          productsCounts,
        }}
      />
    </div>
  )
}
