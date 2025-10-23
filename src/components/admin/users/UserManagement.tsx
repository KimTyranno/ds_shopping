'use client'

import { UserProps } from '@/app/[locale]/admin/users/page'
import UserCard from '@/components/admin/users/UserCard'
import UserTable from '@/components/admin/users/UserTable'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dispatch, SetStateAction } from 'react'
import UserTabs from './UserTabs'
import UserAccordion from './UserAccordion'
import UserPagination from '../UserPagination'
import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ITEMS_PER_PAGE } from '@/constants'

type TabsProps = {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  allCount: number
  newCount: number
  suspendedCount: number
  deletedCount: number
  userList: UserProps[]
  viewMode: string
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  handleFilterChange: () => void
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: Dispatch<SetStateAction<string>>
}

export default function UserManagement({
  activeTab,
  setActiveTab,
  allCount,
  newCount,
  suspendedCount,
  deletedCount,
  userList,
  viewMode,
  currentPage,
  setCurrentPage,
  handleFilterChange,
  searchValue,
  setSearchValue,
  selectedStatus,
  setSelectedStatus,
}: TabsProps) {
  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(userList.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentUsers = userList.slice(startIndex, endIndex)

  return (
    <Card>
      <CardHeader>
        <UserTabs
          {...{
            activeTab,
            setActiveTab,
            allCount,
            newCount,
            suspendedCount,
            deletedCount,
            handleFilterChange,
          }}
        />
      </CardHeader>
      <CardContent>
        {/* 모바일에서는 항상 카드 뷰, 데스크톱에서는 선택 가능 */}
        <div className="sm:hidden">
          {currentUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                회원이 없습니다
              </h3>
              <p className="text-gray-500 mb-4">
                {searchValue || selectedStatus !== '전체'
                  ? '검색 조건에 맞는 회원이 없습니다.'
                  : '등록된 회원이 없습니다.'}
              </p>
              {(searchValue || selectedStatus !== '전체') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchValue('')
                    setSelectedStatus('전체')
                    setActiveTab('all')
                    setCurrentPage(1)
                  }}>
                  필터 초기화
                </Button>
              )}
            </div>
          ) : (
            <UserAccordion userList={currentUsers} />
          )}
        </div>

        {/* 데스크톱 뷰 */}
        <div className="hidden sm:block">
          {currentUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                회원이 없습니다
              </h3>
              <p className="text-gray-500 mb-6 max-w-md whitespace-pre-line">
                {searchValue || selectedStatus !== '전체'
                  ? '검색 조건에 맞는 회원이 없습니다. 다른 조건으로 검색해보세요.'
                  : '아직 등록된 회원이 없습니다. \n첫 번째 회원이 가입하면 여기에 표시됩니다.'}
              </p>
              {(searchValue || selectedStatus !== '전체') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchValue('')
                    setSelectedStatus('전체')
                    setActiveTab('all')
                    setCurrentPage(1)
                  }}>
                  모든 필터 초기화
                </Button>
              )}
            </div>
          ) : viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentUsers.map(user => (
                <UserCard {...{ ...user }} key={user.userNo} />
              ))}
            </div>
          ) : (
            <UserTable userList={currentUsers} />
          )}
        </div>

        {currentUsers.length > 0 && (
          <UserPagination
            {...{
              currentPage,
              setCurrentPage,
              startIndex,
              endIndex,
              totalPages,
              userList,
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
