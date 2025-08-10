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
  Search,
  ShoppingCart,
  Sparkles,
  Tag,
} from 'lucide-react'
import Link from 'next/link'
import ListItem from './ListItem'
import LogoutButton from './LogoutButton'
import MobileSearchBar from './MobileSearchBar'
import MobileSearchButton from './MobileSearchButton'
import MyPage from './MyPage'
import UserInfo from './UserInfo'

const categories = [
  {
    title: '전자제품',
    href: '/categories/electronics',
    description: '스마트폰, 노트북, 태블릿 등',
    icon: '📱',
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
    icon: '👕',
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
    icon: '🏠',
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
    icon: '📚',
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
    icon: '⚽',
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
    icon: '💄',
    items: [
      { title: '스킨케어', href: '/categories/beauty/skincare' },
      { title: '메이크업', href: '/categories/beauty/makeup' },
      { title: '헤어케어', href: '/categories/beauty/haircare' },
      { title: '향수', href: '/categories/beauty/perfume' },
      { title: '남성화장품', href: '/categories/beauty/mens' },
    ],
  },
]

// 더미 사용자 정보 (실제로는 인증 상태에서 가져와야 함)
// const dummyUser = {
//   name: '홍길동',
//   email: 'hong@example.com',
//   isLoggedIn: true, // 실제로는 인증 상태 확인
// }

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
                  <UserInfo />

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
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                            <span className="text-lg">{category.icon}</span>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {category.title}
                              </p>
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

                    <LogoutButton />
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
