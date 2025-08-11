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
import { Search, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import ListItem from './ListItem'
import MobileMenus from './MobileMenus'
import MobileSearchBar from './MobileSearchBar'
import MobileSearchButton from './MobileSearchButton'

export default function Header() {
  const t = useTranslations()

  const categories = [
    {
      key: 'electronics',
      href: '/categories/electronics',
      description: '스마트폰, 노트북, 태블릿 등',
      icon: '📱',
      items: [
        { key: 'smartphones', href: '/categories/electronics/smartphones' },
        { key: 'laptops', href: '/categories/electronics/laptops' },
        { key: 'tablets', href: '/categories/electronics/tablets' },
        { key: 'earphones', href: '/categories/electronics/earphones' },
        { key: 'smartwatch', href: '/categories/electronics/smartwatch' },
      ],
    },
    {
      key: 'fashion',
      href: '/categories/fashion',
      icon: '👕',
      items: [
        { key: 'mens', href: '/categories/fashion/mens' },
        { key: 'womens', href: '/categories/fashion/womens' },
        { key: 'shoes', href: '/categories/fashion/shoes' },
        { key: 'bags', href: '/categories/fashion/bags' },
        { key: 'accessories', href: '/categories/fashion/accessories' },
      ],
    },
    {
      key: 'home',
      href: '/categories/home',
      icon: '🏠',
      items: [
        { key: 'furniture', href: '/categories/home/furniture' },
        { key: 'interior', href: '/categories/home/interior' },
        { key: 'kitchen', href: '/categories/home/kitchen' },
        { key: 'living', href: '/categories/home/living' },
        { key: 'bedding', href: '/categories/home/bedding' },
      ],
    },
    {
      key: 'books',
      href: '/categories/books',
      icon: '📚',
      items: [
        { key: 'novel', href: '/categories/books/novel' },
        { key: 'self-help', href: '/categories/books/self-help' },
        { key: 'computer', href: '/categories/books/computer' },
        { key: 'cooking', href: '/categories/books/cooking' },
        { key: 'travel', href: '/categories/books/travel' },
      ],
    },
    {
      key: 'sports',
      href: '/categories/sports',
      icon: '⚽',
      items: [
        { key: 'sportswear', href: '/categories/sports/sportswear' },
        { key: 'sneakers', href: '/categories/sports/sneakers' },
        { key: 'fitness', href: '/categories/sports/fitness' },
        { key: 'outdoor', href: '/categories/sports/outdoor' },
        { key: 'swimming', href: '/categories/sports/swimming' },
      ],
    },
    {
      key: 'beauty',
      href: '/categories/beauty',
      icon: '💄',
      items: [
        { key: 'skincare', href: '/categories/beauty/skincare' },
        { key: 'makeup', href: '/categories/beauty/makeup' },
        { key: 'haircare', href: '/categories/beauty/haircare' },
        { key: 'perfume', href: '/categories/beauty/perfume' },
        { key: 'mens', href: '/categories/beauty/mens' },
      ],
    },
  ]
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
            <span className="font-bold text-xl">{t('common.logo')}</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t('navigation.categories')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map(category => (
                      <ListItem
                        key={category.key}
                        title={t(`categories.${category.key}.title`)}
                        href={category.href}>
                        {t(`categories.${category.key}.description`)}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/best"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  {t('navigation.best')}
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/new"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  {t('navigation.new')}
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/sale"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  {t('navigation.sale')}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* 검색바 (데스크톱) */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder={t('search.placeholder')} className="pl-10" />
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
                <span className="sr-only">{t('user.cart')}</span>
              </Link>
            </Button>

            {/* 로그인/회원가입 */}
            <AuthButton />

            {/* 모바일 메뉴 */}
            <MobileMenus categories={categories} />
          </div>
        </div>

        {/* 모바일 검색바 */}
        <MobileSearchBar />
      </div>
    </header>
  )
}
