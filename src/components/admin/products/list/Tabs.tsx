'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dispatch, SetStateAction } from 'react'

type ProductListTabsProps = {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  handleFilterChange: () => void
}

export default function ProductListTabs({
  activeTab,
  setActiveTab,
  handleFilterChange,
}: ProductListTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={value => {
        setActiveTab(value)
        handleFilterChange()
      }}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">전체 상품</TabsTrigger>
        <TabsTrigger value="low-stock">재고 부족</TabsTrigger>
        <TabsTrigger value="out-of-stock">품절 상품</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
