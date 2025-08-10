'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@radix-ui/react-separator'
import {
  Award,
  Grid3X3,
  Headphones,
  Home,
  Menu,
  Sparkles,
  Tag,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import LogoutButton from './LogoutButton'
import MyPage from './MyPage'
import UserInfo from './UserInfo'

type category = {
  title: string
  href: string
  description: string
  icon: string
  items: {
    title: string
    href: string
  }[]
}

const MobileMenus = ({ categories }: { categories: category[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[350px] overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                S
              </span>
            </div>
            심플몰
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* 사용자 정보 */}
          <UserInfo handleClose={handleClose} />

          {/* 메인 메뉴 */}
          <div className="flex-1 mt-6">
            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                <Home className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">홈</span>
              </Link>

              <Link
                href="/best"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">베스트</span>
              </Link>

              <Link
                href="/new"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">신상품</span>
              </Link>

              <Link
                href="/sale"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">할인상품</span>
              </Link>
            </div>

            <Separator className="my-4" />

            {/* 카테고리 */}
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2">
                <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold text-sm">카테고리</span>
              </div>

              {categories.map(category => (
                <div key={category.title} className="ml-2">
                  <Link
                    href={category.href}
                    onClick={handleClose}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                    <span className="text-lg">{category.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{category.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </Link>

                  {/* 서브카테고리 */}
                  <div className="ml-8 mt-1 space-y-1">
                    {category.items.map(item => (
                      <Link
                        key={item.title}
                        onClick={handleClose}
                        href={item.href}
                        className="block px-3 py-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* 마이페이지 메뉴 */}
            <MyPage />
          </div>

          {/* 하단 메뉴 */}
          <div className="border-t pt-4 mt-4">
            <Link
              href="/support"
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
              <Headphones className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">고객지원</span>
            </Link>

            <LogoutButton handleClose={handleClose} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenus
