'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type ProductListFiltersProps = {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: Dispatch<SetStateAction<string>>
  handleFilterChange: () => void
}

const statusOptions = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '판매중' },
  { value: 'sold_out', label: '품절' },
  { value: 'paused', label: '판매중지' },
]
const categories = ['전체', '전자제품', '의류', '신발', '도서', '스포츠']

export default function ProductListFilters({
  searchValue,
  setSearchValue,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  handleFilterChange,
}: ProductListFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="상품명으로 검색..."
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.target.value)
                  handleFilterChange()
                }}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={selectedCategory}
              onValueChange={value => {
                setSelectedCategory(value)
                handleFilterChange()
              }}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
