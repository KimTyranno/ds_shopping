'use client'

import AuthButton from '@/components/AuthButton'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Link } from '@/i18n/navigation'
import { CategoryItem } from '@/lib/api/category'
import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { PWAInstallButton } from '../PWAInstallButton'
import LanguageSwitch from './LanguageSwich'
import MobileMenus from './MobileMenus'
import MobileSearchBar from './MobileSearchBar'
import MobileSearchButton from './MobileSearchButton'
import PcSearchBar from './PcSearchBar'

type HeaderProps = {
  categories: CategoryItem[]
}

export default function Header({ categories }: HeaderProps) {
  const t = useTranslations()
  const pathname = usePathname()

  if (pathname.includes('/admin')) return null
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
          <PWAInstallButton />

          {/* 데스크톱 네비게이션 */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t('navigation.categories')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-4">
                    <div className="grid grid-cols-3 gap-6">
                      {categories.map(category => (
                        <div key={category.id} className="space-y-3">
                          <Link
                            href={`/categories/${category.slug}`}
                            className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors">
                            {/* <span className="text-xl">{category.icon}</span> */}
                            {category.name}
                          </Link>
                          {/* <div className="space-y-1">
                            {category.items.map(item => (
                              <Link
                                key={item.key}
                                href={item.href}
                                className="block px-2 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                                {t(
                                  `categories.${category.key}.items.${item.key}`,
                                )}
                              </Link>
                            ))}
                          </div> */}
                        </div>
                      ))}
                    </div>
                  </div>
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
          <PcSearchBar />

          {/* 우측 아이콘들 */}
          <div className="flex items-center space-x-2">
            {/* 모바일 검색 */}
            <MobileSearchButton />

            {/* 언어 전환 */}
            <LanguageSwitch />

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
