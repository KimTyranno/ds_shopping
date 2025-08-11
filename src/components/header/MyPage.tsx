'use client'

import useStore from '@/lib/store'
import { Heart, Package, ShoppingCart, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const MyPage = () => {
  const t = useTranslations()
  const user = useStore(state => state.user)

  if (!user) return null

  return (
    <div className="space-y-1">
      <Link
        href="/mypage"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <User className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{t('user.mypage')}</span>
      </Link>

      <Link
        href="/orders"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <Package className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{t('user.orders')}</span>
      </Link>

      <Link
        href="/cart"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{t('user.cart')}</span>
      </Link>

      <Link
        href="/wishlist"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <Heart className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{t('user.wishlist')}</span>
      </Link>
    </div>
  )
}

export default MyPage
