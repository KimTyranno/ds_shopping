'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  selected: boolean
  brand: string
  options?: string
}

// 더미 장바구니 데이터
const dummyCartItems: CartItem[] = [
  {
    id: '1',
    name: '갤럭시 S24 Ultra',
    price: 1590000,
    originalPrice: 1690000,
    image: 'https://picsum.photos/seed/galaxy-s24-ultra/300/300',
    quantity: 1,
    selected: true,
    brand: '삼성',
    options: '색상: 티타늄 그레이, 용량: 256GB',
  },
  {
    id: '4',
    name: '프리미엄 코튼 셔츠',
    price: 89000,
    originalPrice: 120000,
    image: 'https://picsum.photos/seed/premium-cotton-shirt/300/300',
    quantity: 2,
    selected: true,
    brand: '유니클로',
    options: '색상: 화이트, 사이즈: L',
  },
  {
    id: '7',
    name: '나이키 에어맥스 270',
    price: 159000,
    originalPrice: 189000,
    image: 'https://picsum.photos/seed/nike-airmax-270/300/300',
    quantity: 1,
    selected: false,
    brand: '나이키',
    options: '색상: 블랙, 사이즈: 270mm',
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(dummyCartItems)
  const [selectAll, setSelectAll] = useState(false)
  const t = useTranslations('cart')
  const tCommon = useTranslations('common')

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    setCartItems(items => items.map(item => ({ ...item, selected: checked })))
  }

  // 개별 상품 선택/해제
  const handleSelectItem = (id: string, checked: boolean) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: checked } : item,
      ),
    )
  }

  // 수량 변경
  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  // 상품 삭제
  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  // 선택된 상품들의 총 금액 계산
  const selectedItems = cartItems.filter(item => item.selected)
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const totalOriginalPrice = selectedItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0,
  )
  const totalDiscount = totalOriginalPrice - totalPrice
  const deliveryFee = totalPrice >= 50000 ? 0 : 3000
  const finalPrice = totalPrice + deliveryFee

  // 전체 선택 상태 업데이트
  useEffect(() => {
    const allSelected =
      cartItems.length > 0 && cartItems.every(item => item.selected)
    setSelectAll(allSelected)
  }, [cartItems])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <span className="text-muted-foreground">
            ({t('itemsCount', { count: cartItems.length })})
          </span>
        </div>

        {cartItems.length === 0 ? (
          // 빈 장바구니
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('empty.title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('empty.description')}
            </p>
            <Button asChild>
              <Link href="/">{t('empty.continue')}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 장바구니 상품 목록 */}
            <div className="lg:col-span-2 space-y-4">
              {/* 전체 선택 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={selectAll}
                        onCheckedChange={handleSelectAll}
                      />
                      <label
                        htmlFor="select-all"
                        className="font-medium cursor-pointer">
                        (
                        {t('selectAll', {
                          selected: selectedItems.length,
                          total: cartItems.length,
                        })}
                        )
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const selectedIds = selectedItems.map(item => item.id)
                        setCartItems(items =>
                          items.filter(item => !selectedIds.includes(item.id)),
                        )
                      }}
                      disabled={selectedItems.length === 0}>
                      {t('deleteSelected')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 상품 목록 */}
              {cartItems.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={checked =>
                          handleSelectItem(item.id, checked as boolean)
                        }
                      />

                      <Link
                        href={`/products/${item.id}`}
                        className="flex-shrink-0">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      </Link>

                      <div className="flex-1 space-y-2">
                        <div>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.brand}
                          </p>
                          {item.options && (
                            <p className="text-sm text-muted-foreground">
                              {item.options}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-primary">
                              {item.price.toLocaleString() +
                                tCommon('currency')}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                {item.originalPrice.toLocaleString() +
                                  tCommon('currency')}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* 수량 조절 */}
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                disabled={item.quantity <= 1}>
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-3 py-1 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(item.id, 1)
                                }>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* 삭제 버튼 */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>{t('summary.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{t('summary.productPrice')}</span>
                      <span>
                        {totalOriginalPrice.toLocaleString() +
                          tCommon('currency')}
                      </span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>{t('summary.discount')}</span>
                        <span>
                          -
                          {totalDiscount.toLocaleString() + tCommon('currency')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>{t('summary.shipping')}</span>
                      <span>
                        {deliveryFee === 0
                          ? t('free')
                          : t('price', { price: deliveryFee.toLocaleString() })}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('summary.total')}</span>
                    <span className="text-primary">
                      {finalPrice.toLocaleString() + tCommon('currency')}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {t('summary.freeShippingThreshold', {
                        amount: (50000 - totalPrice).toLocaleString(),
                      })}
                    </p>
                  )}

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={selectedItems.length === 0}>
                      {t('summary.order', { count: selectedItems.length })}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild>
                      <Link href="/">{t('summary.continue')}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
