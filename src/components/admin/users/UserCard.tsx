'use client'

import { AdminUserStatueChangeAction } from '@/app/[locale]/admin/users/[id]/actions'
import { UserProps } from '@/app/[locale]/admin/users/page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { USER_ROLE, USER_STATUS } from '@/types/enums'
import { Ban, Check, Eye, MoreHorizontal } from 'lucide-react'
import UserRoleBadge from './UserRoleBadge'
import UserStatusBadge from './UserStatusBadge'

export default function UserCard(user: UserProps) {
  const pathname = usePathname()

  return (
    <Card key={user.userNo} className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar || ''} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/users/${user.userNo}`}>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                상세보기
              </DropdownMenuItem>
            </Link>
            {/* TODO: 이메일 발송은 추후에 업데이트 */}
            {/* <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              이메일 발송
            </DropdownMenuItem> */}
            {/* TODO: 등급은 추후에 업데이트 */}
            {/* <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              등급 변경
            </DropdownMenuItem> */}
            {user.userRole !== USER_ROLE.ADMIN && (
              <form action={AdminUserStatueChangeAction}>
                <input type="hidden" name="currentPath" value={pathname} />
                <input type="hidden" name="userNo" value={user.userNo} />
                <input
                  type="hidden"
                  name="status"
                  value={
                    user.status === USER_STATUS.ACTIVE
                      ? USER_STATUS.SUSPENDED
                      : USER_STATUS.ACTIVE
                  }
                />
                <DropdownMenuItem
                  className={cn(
                    user.status === USER_STATUS.ACTIVE
                      ? 'text-red-600'
                      : 'text-green-600',
                  )}>
                  <button
                    type="submit"
                    className="flex items-center gap-2 cursor-pointer">
                    {user.status === USER_STATUS.ACTIVE ? (
                      <>
                        <Ban className="mr-2 h-4 w-4" />
                        계정 정지
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        계정 활성
                      </>
                    )}
                  </button>
                </DropdownMenuItem>
              </form>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">연락처</span>
          <span className="text-sm">{user.phone}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">상태</span>
          <UserStatusBadge status={user.status} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">역할</span>
          <UserRoleBadge role={user.userRole} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">가입일</span>
          <span className="text-sm">{user.createdAt}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">최근 로그인</span>
          <span className="text-sm">{user.lastLoginAt}</span>
        </div>
      </div>
    </Card>
  )
}
