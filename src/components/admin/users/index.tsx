'use client'

import { UserProps } from '@/app/[locale]/admin/users/page'
import UserManagement from '@/components/admin/users/UserManagement'
import UsersFilters from '@/components/admin/users/UsersFilters'
import UserHeader from '@/components/admin/users/UsersHeader'
import UsersStats from '@/components/admin/users/UsersStats'
import { useState } from 'react'

type UserPageProps = {
  userList: UserProps[]
}

export default function UsersPage({ userList }: UserPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUsers = userList.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email!.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.phone!.includes(searchValue)
    const matchesStatus =
      selectedStatus === '전체' || user.status === selectedStatus

    if (activeTab === 'suspended') {
      return matchesSearch && matchesStatus && user.status === 'suspended'
    }
    // NOTE: createAt은 null로 안오는데 혹시몰라 타입가드 사용
    if (activeTab === 'new' && user.createdAt) {
      const joinDate = new Date(user.createdAt)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return matchesSearch && matchesStatus && joinDate > thirtyDaysAgo
    }
    if (activeTab === 'deleted') {
      return matchesSearch && matchesStatus && user.status === 'deleted'
    }

    return matchesSearch && matchesStatus
  })

  const getUserCounts = () => {
    return {
      all: userList.length,
      suspended: userList.filter(u => u.status === 'suspended').length,
      new: userList.filter(u => {
        // NOTE: createAt은 null로 안오는데 혹시몰라 타입가드 사용
        if (!u.createdAt) return false
        const joinDate = new Date(u.createdAt)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return joinDate > thirtyDaysAgo
      }).length,
      deleted: userList.filter(u => u.status === 'deleted').length,
    }
  }

  const counts = getUserCounts()

  // 페이지 변경 시 첫 페이지로 리셋
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <UserHeader />

      {/* 통계 카드 */}
      <UsersStats
        {...{
          allCount: counts.all,
          newCount: counts.new,
          suspendedCount: counts.suspended,
        }}
      />

      {/* 필터 및 검색 */}
      <UsersFilters
        {...{
          searchValue,
          setSearchValue,
          selectedStatus,
          setSelectedStatus,
          viewMode,
          setViewMode,
          handleFilterChange,
        }}
      />

      {/* 탭 및 회원 목록 */}
      <UserManagement
        {...{
          activeTab,
          setActiveTab,
          allCount: counts.all,
          newCount: counts.new,
          suspendedCount: counts.suspended,
          deletedCount: counts.deleted,
          userList: filteredUsers,
          viewMode,
          currentPage,
          setCurrentPage,
          handleFilterChange,
          searchValue,
          setSearchValue,
          selectedStatus,
          setSelectedStatus,
        }}
      />
    </div>
  )
}
