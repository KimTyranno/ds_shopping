import AuthButton from '@/components/AuthButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import ListItem from './ListItem'
import MobileSearchBar from './MobileSearchBar'
import MobileSearchButton from './MobileSearchButton'

const categories = [
  {
    title: '전자제품',
    href: '/categories/electronics',
    description: '스마트폰, 노트북, 태블릿 등',
    items: [
      { title: '스마트폰', href: '/categories/electronics/smartphones' },
      { title: '노트북', href: '/categories/electronics/laptops' },
      { title: '태블릿', href: '/categories/electronics/tablets' },
      { title: '이어폰', href: '/categories/electronics/earphones' },
      { title: '스마트워치', href: '/categories/electronics/smartwatch' },
    ],
  },
  {
    title: '패션',
    href: '/categories/fashion',
    description: '의류, 신발, 액세서리',
    items: [
      { title: '남성의류', href: '/categories/fashion/mens' },
      { title: '여성의류', href: '/categories/fashion/womens' },
      { title: '신발', href: '/categories/fashion/shoes' },
      { title: '가방', href: '/categories/fashion/bags' },
      { title: '액세서리', href: '/categories/fashion/accessories' },
    ],
  },
  {
    title: '홈&리빙',
    href: '/categories/home',
    description: '가구, 인테리어, 생활용품',
    items: [
      { title: '가구', href: '/categories/home/furniture' },
      { title: '인테리어', href: '/categories/home/interior' },
      { title: '주방용품', href: '/categories/home/kitchen' },
      { title: '생활용품', href: '/categories/home/living' },
      { title: '침구', href: '/categories/home/bedding' },
    ],
  },
  {
    title: '도서',
    href: '/categories/books',
    description: '소설, 자기계발, 전문서적',
    items: [
      { title: '소설', href: '/categories/books/novel' },
      { title: '자기계발', href: '/categories/books/self-help' },
      { title: '컴퓨터', href: '/categories/books/computer' },
      { title: '요리', href: '/categories/books/cooking' },
      { title: '여행', href: '/categories/books/travel' },
    ],
  },
  {
    title: '스포츠',
    href: '/categories/sports',
    description: '운동복, 운동화, 헬스용품',
    items: [
      { title: '운동복', href: '/categories/sports/sportswear' },
      { title: '운동화', href: '/categories/sports/sneakers' },
      { title: '헬스용품', href: '/categories/sports/fitness' },
      { title: '아웃도어', href: '/categories/sports/outdoor' },
      { title: '수영용품', href: '/categories/sports/swimming' },
    ],
  },
  {
    title: '뷰티',
    href: '/categories/beauty',
    description: '스킨케어, 메이크업, 향수',
    items: [
      { title: '스킨케어', href: '/categories/beauty/skincare' },
      { title: '메이크업', href: '/categories/beauty/makeup' },
      { title: '헤어케어', href: '/categories/beauty/haircare' },
      { title: '향수', href: '/categories/beauty/perfume' },
      { title: '남성화장품', href: '/categories/beauty/mens' },
    ],
  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                S
              </span>
            </div>
            <span className="font-bold text-xl">심플몰</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>카테고리</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map(category => (
                      <ListItem
                        key={category.title}
                        title={category.title}
                        href={category.href}>
                        {category.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/best"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  베스트
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/new"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  신상품
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/sale"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  할인상품
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
            <MobileSearchButton />

            {/* 장바구니 */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">장바구니</span>
              </Link>
            </Button>

            {/* 로그인/회원가입 */}
            <AuthButton />

            {/* 모바일 메뉴 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">카테고리</h3>
                    {categories.map(category => (
                      <div key={category.title} className="pl-4">
                        <Link
                          href={category.href}
                          className="block py-2 text-base hover:text-primary">
                          {category.title}
                        </Link>
                        <div className="pl-4 space-y-1">
                          {category.items.map(item => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="block py-1 text-sm text-muted-foreground hover:text-primary">
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <Link
                      href="/best"
                      className="block py-2 text-base font-medium hover:text-primary">
                      베스트
                    </Link>
                    <Link
                      href="/new"
                      className="block py-2 text-base font-medium hover:text-primary">
                      신상품
                    </Link>
                    <Link
                      href="/sale"
                      className="block py-2 text-base font-medium hover:text-primary">
                      할인상품
                    </Link>
                    <Link
                      href="/mypage"
                      className="block py-2 text-base font-medium hover:text-primary">
                      마이페이지
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* 모바일 검색바 */}
        <MobileSearchBar />
      </div>
    </header>
  )
}
