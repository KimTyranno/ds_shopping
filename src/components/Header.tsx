"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl">심플몰</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              전체상품
            </Link>
            <Link href="/best" className="text-sm font-medium hover:text-primary transition-colors">
              베스트
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              카테고리
            </Link>
          </nav>

          {/* 검색바 (데스크톱) */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="상품을 검색해보세요..." className="pl-10" />
            </div>
          </div>

          {/* 우측 아이콘들 */}
          <div className="flex items-center space-x-2">
            {/* 모바일 검색 */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* 장바구니 */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">장바구니</span>
              </Link>
            </Button>

            {/* 로그인/회원가입 */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">로그인</span>
              </Link>
            </Button>

            {/* 모바일 메뉴 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link href="/products" className="text-lg font-medium">
                    전체상품
                  </Link>
                  <Link href="/best" className="text-lg font-medium">
                    베스트
                  </Link>
                  <Link href="/categories" className="text-lg font-medium">
                    카테고리
                  </Link>
                  <Link href="/mypage" className="text-lg font-medium">
                    마이페이지
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* 모바일 검색바 */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="상품을 검색해보세요..." className="pl-10" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
