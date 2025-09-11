'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Link } from '@/i18n/navigation'
import useStore from '@/lib/store'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Package,
  Percent,
  Settings,
  Shield,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navigation = [
  {
    name: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: '상품 관리',
    href: '/admin/products',
    icon: Package,
    children: [
      { name: '상품 목록', href: '/admin/products/list' },
      { name: '상품 등록', href: '/admin/products/new' },
      { name: '재고 관리', href: '/admin/products/inventory' },
    ],
  },
  {
    name: '카테고리 관리',
    href: '/admin/categories',
    icon: Grid3X3,
  },
  {
    name: '주문 관리',
    href: '/admin/orders',
    icon: ShoppingCart,
    children: [
      { name: '주문 목록', href: '/admin/orders' },
      { name: '배송 관리', href: '/admin/orders/shipping' },
      { name: '반품/교환', href: '/admin/orders/returns' },
    ],
  },
  {
    name: '회원 관리',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: '할인/쿠폰',
    href: '/admin/coupons',
    icon: Percent,
  },
  {
    name: '리뷰/Q&A',
    href: '/admin/reviews',
    icon: MessageSquare,
    children: [
      { name: '리뷰 관리', href: '/admin/reviews' },
      { name: 'Q&A 관리', href: '/admin/qna' },
    ],
  },
  {
    name: '통계/분석',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: '공지사항',
    href: '/admin/notices',
    icon: Bell,
  },
  {
    name: '문의 관리',
    href: '/admin/inquiries',
    icon: HelpCircle,
  },
  {
    name: '시스템 설정',
    href: '/admin/settings',
    icon: Settings,
    children: [
      { name: '기본 설정', href: '/admin/settings' },
      { name: '관리자 계정', href: '/admin/settings/admins' },
      { name: '시스템 로그', href: '/admin/settings/logs' },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const isSidebarOpen = useStore(state => state.isAdminSidebar)
  const setMobileMenuOpen = useStore(state => state.setIsAdminSidebar)

  // 모바일에서 경로 변경시 사이드바 닫기
  // useEffect(() => {
  //   if (onMobileClose) {
  //     console.log('?tq')
  //     onMobileClose()
  //   }
  // }, [pathname, onMobileClose])

  // 화면 크기 변경시 collapsed 상태 초기화
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name],
    )
  }

  return (
    <>
      {/* 모바일 백드롭 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-xs lg:hidden"
          // 백드롭 클릭시 사이브메뉴 닫음
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div
        className={cn(
          'z-50 bg-white border-r border-gray-200 transition-all duration-300 w-48',
          // 반응형 min-width
          'min-w-64 max-md:min-w-48',
          collapsed && 'min-w-16 lg:w-16',
          // 모바일
          isSidebarOpen
            ? 'fixed inset-y-0 left-0 translate-x-0'
            : 'fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0',

          // 데스크톱: 기본 static
          'lg:static',

          // 모바일: 슬라이드 애니메이션
          'transition-transform',

          // 데스크톱에서는 항상 표시
          'lg:block',
        )}>
        <div
          className={cn(
            'flex h-16 items-center justify-between px-4 border-b',
            collapsed && 'justify-center',
          )}>
          {!collapsed && (
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  S
                </span>
              </div>
              <span className="font-bold text-xl">관리자</span>
            </Link>
          )}

          <div className="flex items-center space-x-2">
            {/* 데스크톱 접기/펼치기 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(prev => !prev)}
              className="hidden lg:flex h-8 w-6 p-0 m-0">
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            {/* 모바일 닫기 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden h-8 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map(item => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/')
              const isExpanded = expandedItems.includes(item.name)
              const hasChildren = item.children && item.children.length > 0

              return (
                <div key={item.name}>
                  <div className="flex items-center">
                    {hasChildren ? (
                      // 하위 메뉴가 있는 경우엔 버튼으로 처리
                      <div
                        onClick={() => toggleExpanded(item.name)}
                        className={cn(
                          'h-9 flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full justify-between pr-0 cursor-pointer',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-gray-700 hover:bg-gray-100',
                        )}>
                        <div className="flex">
                          <item.icon
                            className={cn('h-5 w-5', collapsed ? '' : 'mr-3')}
                          />
                          {!collapsed && <span>{item.name}</span>}
                        </div>

                        {!collapsed && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 ml-1">
                            <ChevronRight
                              className={cn(
                                'h-4 w-4 transition-transform',
                                isExpanded && 'rotate-90',
                              )}
                            />
                          </Button>
                        )}
                      </div>
                    ) : (
                      // 하위 메뉴가 없으면 링크로 이동
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-gray-700 hover:bg-gray-100',
                        )}>
                        <item.icon
                          className={cn('h-5 w-5', collapsed ? '' : 'mr-3')}
                        />
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    )}
                  </div>

                  {hasChildren && !collapsed && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children?.map(child => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'block px-3 py-2 text-sm rounded-md transition-colors',
                            pathname === child.href
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-gray-600 hover:bg-gray-50',
                          )}>
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="flex border-t px-3 py-4">
          <Link
            href="/"
            className={cn(
              'flex flex-1 items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors',
              collapsed ? 'justify-center' : '',
            )}>
            <Shield className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
            {!collapsed && <span>사이트로 이동</span>}
          </Link>
        </div>
      </div>
    </>
  )
}
