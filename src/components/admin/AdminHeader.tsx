'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import useStore from '@/lib/store'
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  User,
} from 'lucide-react'
import { useState } from 'react'

export default function AdminHeader() {
  const setMobileMenuOpen = useStore(state => state.setIsAdminSidebar)
  const [notifications] = useState([
    {
      id: 1,
      message: '새로운 주문이 들어왔습니다',
      time: '5분 전',
      unread: true,
    },
    {
      id: 2,
      message: '재고가 부족한 상품이 있습니다',
      time: '1시간 전',
      unread: true,
    },
    {
      id: 3,
      message: '새로운 회원이 가입했습니다',
      time: '2시간 전',
      unread: false,
    },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* 왼쪽: 모바일 메뉴 버튼 + 검색 */}
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="검색..."
            className="pl-10 bg-gray-50 border-0 focus:bg-white"
          />
        </div>
      </div>

      {/* 오른쪽: 알림 + 프로필 */}
      <div className="flex items-center gap-3">
        {/* 알림 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-semibold">알림</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map(notification => (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-3 border-b last:border-0">
                  <div className="flex items-start gap-3 w-full">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 프로필 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <span className="hidden sm:inline text-sm font-medium">
                관리자
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              프로필
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              설정
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              사이트로 이동
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
