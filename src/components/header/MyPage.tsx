'use client'

import useStore from '@/lib/store'
import { Heart, Package, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'

const MyPage = () => {
  const user = useStore(state => state.user)

  if (!user) return null

  return (
    <div className="space-y-1">
      <Link
        href="/mypage"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <User className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">마이페이지</span>
      </Link>

      <Link
        href="/orders"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <Package className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">주문내역</span>
      </Link>

      <Link
        href="/cart"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">장바구니</span>
      </Link>

      <Link
        href="/wishlist"
        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors">
        <Heart className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">찜목록</span>
      </Link>
    </div>
  )
}

export default MyPage
