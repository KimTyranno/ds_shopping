'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dispatch, SetStateAction } from 'react'

type TabsProps = {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  allCount: number
  newCount: number
  suspendedCount: number
  deletedCount: number
}

export default function UserTabs({
  activeTab,
  setActiveTab,
  allCount,
  newCount,
  suspendedCount,
  deletedCount,
}: TabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">전체 ({allCount})</TabsTrigger>
        <TabsTrigger value="new">신규 ({newCount})</TabsTrigger>
        <TabsTrigger value="suspended">비활성 ({suspendedCount})</TabsTrigger>
        <TabsTrigger value="deleted">탈퇴 ({deletedCount})</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
