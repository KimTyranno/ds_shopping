'use client'

import { UserProps } from '@/app/[locale]/admin/users/page'
import UserCard from '@/components/admin/users/UserCard'
import UserTable from '@/components/admin/users/UserTable'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dispatch, SetStateAction } from 'react'
import UserTabs from './UserTabs'

type TabsProps = {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  allCount: number
  newCount: number
  suspendedCount: number
  deletedCount: number
  userList: UserProps[]
  viewMode: string
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
}: TabsProps) {
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
          }}
        />
      </CardHeader>
      <CardContent>
        {/* 모바일에서는 항상 카드 뷰, 데스크톱에서는 선택 가능 */}
        <div className="sm:hidden">
          <div className="grid gap-4">
            {userList.map(user => (
              <UserCard {...{ ...user }} key={user.userNo} />
            ))}
          </div>
        </div>

        {/* 데스크톱 뷰 */}
        <div className="hidden sm:block">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userList.map(user => (
                <UserCard {...{ ...user }} key={user.userNo} />
              ))}
            </div>
          ) : (
            <UserTable userList={userList} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
