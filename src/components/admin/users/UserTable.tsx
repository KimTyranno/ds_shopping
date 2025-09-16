'use client'

import { AdminUserStatueChangeAction } from '@/app/[locale]/admin/users/[id]/actions'
import { UserProps } from '@/app/[locale]/admin/users/page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { USER_ROLE, USER_STATUS } from '@/types/enums'
import { Ban, Check, Eye, MoreHorizontal } from 'lucide-react'
import UserRoleBadge from './UserRoleBadge'
import UserStatusBadge from './UserStatusBadge'

export default function UserTable({ userList }: { userList: UserProps[] }) {
  const pathname = usePathname()

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>회원정보</TableHead>
            <TableHead>연락처</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>역할</TableHead>
            <TableHead className="hidden lg:table-cell">가입일</TableHead>
            <TableHead className="hidden lg:table-cell">최근 로그인</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map(user => (
            <TableRow key={user.userNo}>
              {/* 회원정보 */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || ''} />
                    <AvatarFallback>{user.name!.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              {/* 연락처 */}
              <TableCell>{user.phone}</TableCell>
              {/* 상태 */}
              <TableCell>
                <UserStatusBadge status={user.status!} />
              </TableCell>
              {/* 역할 */}
              <TableCell>
                <UserRoleBadge role={user.userRole!} />
              </TableCell>
              {/* 가입일 */}
              <TableCell className="hidden lg:table-cell">
                {user.createdAt}
              </TableCell>
              {/* 최근 로그인 */}
              <TableCell className="hidden lg:table-cell">
                {user.lastLoginAt}
              </TableCell>
              {/* 액션버튼 */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/admin/users/${user.userNo}`}>
                      <DropdownMenuItem className="cursor-pointer">
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
                        <input
                          type="hidden"
                          name="currentPath"
                          value={pathname}
                        />
                        <input
                          type="hidden"
                          name="userNo"
                          value={user.userNo!}
                        />
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
