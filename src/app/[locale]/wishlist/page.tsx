'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Heart, ShoppingCart, Star, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { products } from '../products/action'

interface WishlistItem {
  id: string
  addedAt: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const t = useTranslations('wishlist')
  const tCommon = useTranslations('common')

  // 더미 찜목록 데이터 (실제로는 로컬스토리지나 서버에서 가져와야 함)
  useEffect(() => {
    const dummyWishlist: WishlistItem[] = [
      { id: '1', addedAt: '2024-01-20' },
      { id: '3', addedAt: '2024-01-18' },
      { id: '6', addedAt: '2024-01-15' },
      { id: '8', addedAt: '2024-01-12' },
    ]
    setWishlistItems(dummyWishlist)
  }, [])

  // 찜목록에 있는 상품들 가져오기
  const wishlistProducts = products
    .filter(product => wishlistItems.some(item => item.id === product.id))
    .map(product => {
      const wishlistItem = wishlistItems.find(item => item.id === product.id)
      return {
        ...product,
        addedAt: wishlistItem?.addedAt || '',
      }
    })

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(wishlistProducts.map(product => product.id))
    } else {
      setSelectedItems([])
    }
  }

  // 개별 선택/해제
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  // 찜목록에서 제거
  const handleRemoveItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(item => item !== id))
  }

  // 선택된 상품들 제거
  const handleRemoveSelected = () => {
    setWishlistItems(prev =>
      prev.filter(item => !selectedItems.includes(item.id)),
    )
    setSelectedItems([])
  }

  // 선택된 상품들 장바구니에 추가
  const handleAddToCart = () => {
    // 실제로는 장바구니 API 호출
    alert(t('actions', { count: selectedItems.length }))
  }

  const allSelected =
    wishlistProducts.length > 0 &&
    selectedItems.length === wishlistProducts.length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/mypage">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <span className="text-muted-foreground">
            ({t('count', { count: wishlistProducts.length })})
          </span>
        </div>

        {wishlistProducts.length === 0 ? (
          // 빈 찜목록
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('empty.title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('empty.description')}
            </p>
            <Button asChild>
              <Link href="/">{t('empty.button')}</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* 상단 액션 바 */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                      />
                      <label
                        htmlFor="select-all"
                        className="font-medium cursor-pointer">
                        {t('actions.selectAll', {
                          selected: selectedItems.length,
                          total: wishlistProducts.length,
                        })}
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToCart}
                      disabled={selectedItems.length === 0}
                      className="bg-transparent">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t('actions.addToCart')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveSelected}
                      disabled={selectedItems.length === 0}
                      className="bg-transparent">
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t('actions.removeSelected')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 찜목록 상품 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map(product => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute top-3 left-3 z-10">
                        <Checkbox
                          checked={selectedItems.includes(product.id)}
                          onCheckedChange={checked =>
                            handleSelectItem(product.id, checked as boolean)
                          }
                          className="bg-white/80 backdrop-blur-sm"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="absolute top-3 right-3 z-10 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      </button>

                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      {product.badge && (
                        <Badge
                          className="absolute bottom-3 left-3"
                          variant={
                            product.badge === 'BEST' ? 'default' : 'secondary'
                          }>
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground mb-2">
                        {product.brand}
                      </p>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground ml-1">
                            {product.rating} ({product.reviews.toLocaleString()}
                            )
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xl font-bold text-primary">
                            {product.price.toLocaleString() +
                              tCommon('currency')}
                          </span>
                          {product.originalPrice && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground line-through">
                                {product.originalPrice.toLocaleString() +
                                  tCommon('currency')}
                              </span>
                              <Badge variant="destructive" className="text-xs">
                                {t('discount', {
                                  percent: Math.round(
                                    ((product.originalPrice - product.price) /
                                      product.originalPrice) *
                                      100,
                                  ),
                                })}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {t('addedAt', {
                          date: new Date(product.addedAt).toLocaleDateString(
                            'ko-KR',
                          ),
                        })}
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        asChild>
                        <Link href={`/products/${product.id}`}>
                          {t('detail')}
                        </Link>
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('cart')}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
