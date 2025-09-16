'use client'

import { UserProps } from '@/app/[locale]/admin/users/page'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import UserStatusBadge from './UserStatusBadge'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
import { Ban, Check, Eye, Mail, MoreHorizontal, Star } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserRoleBadge from './UserRoleBadge'
import { USER_ROLE, USER_STATUS } from '@/types/enums'
import { AdminUserStatueChangeAction } from '@/app/[locale]/admin/users/[id]/actions'
import { cn } from '@/lib/utils'

type UserAccordionProps = {
  userList: UserProps[]
}
export default function UserAccordion({ userList }: UserAccordionProps) {
  const pathname = usePathname()

  return (
    <Accordion type="single" collapsible className="w-full">
      {userList.map(user => (
        <AccordionItem key={user.userNo} value={`user-${user.userNo}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3 w-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {user.name!.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <UserStatusBadge status={user.status!} />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">연락처</span>
                  <div className="font-medium">{user.phone}</div>
                </div>
                <div className="text-gray-500">
                  <span className="font-medium">상태</span>
                  <div className="font-medium">
                    <UserStatusBadge status={user.status!} />
                  </div>
                </div>
                <div className="text-gray-500">
                  <span className="font-medium">역할</span>
                  <div className="font-medium">
                    <UserRoleBadge role={user.userRole!} />
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">가입일</span>
                  <div className="font-medium">{user.createdAt}</div>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">최근 로그인</span>
                <div className="font-medium">{user.lastLoginAt}</div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent">
                  <Link href={`/admin/users/${user.userNo}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    상세보기
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
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
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
