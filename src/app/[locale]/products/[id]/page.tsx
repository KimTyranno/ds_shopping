'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@/i18n/navigation'
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { use, useState } from 'react'
import { getProductById, products } from '../action'

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const t = useTranslations()

  if (!product) {
    notFound()
  }

  // 관련 상품 (같은 카테고리의 다른 상품들)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          {t('navigation.home')}
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${product.category}`}
          className="hover:text-primary">
          {t(`categories.${product.category}.title`)}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* 상품 이미지 */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <Badge
                className="absolute top-4 left-4"
                variant={product.badge === 'BEST' ? 'default' : 'secondary'}>
                {product.badge}
              </Badge>
            )}
          </div>

          {/* 썸네일 이미지들 */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}>
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.brand}</p>
          </div>

          {/* 평점 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} (
              {t('product.reviews', { count: product.reviews })})
            </span>
          </div>

          {/* 가격 */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                {product.price.toLocaleString() + t('common.currency')}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString() +
                    t('common.currency')}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-red-600">
                {t('product.discount', {
                  percent: Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  ),
                })}
              </div>
            )}
          </div>

          {/* 상품 설명 */}
          <p className="text-muted-foreground">{product.description}</p>

          {/* 주요 특징 */}
          <div>
            <h3 className="font-semibold mb-2">{t('product.features')}</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 수량 선택 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">{t('product.quantity')}</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                ({t('product.stock', { count: product.stockCount })})
              </span>
            </div>

            {/* 총 가격 */}
            <div className="text-xl font-bold">
              {t('product.totalPrice', {
                price: (product.price * quantity).toLocaleString(),
              }) + t('common.currency')}
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t('product.addToCart')}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <Button size="lg" variant="secondary" className="w-full">
              {t('product.buyNow')}
            </Button>
          </div>

          {/* 배송 정보 */}
          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <span>{t('product.freeShipping')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span>{t('product.authentic')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
              <span>{t('product.return')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 탭 */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">
            {t('product.tabs.description')}
          </TabsTrigger>
          <TabsTrigger value="reviews">
            {t('product.tabs.description', { count: product.reviews })}
          </TabsTrigger>
          <TabsTrigger value="qna">{t('product.tabs.qna')}</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {t('product.details.title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">
                      {t('product.details.brand')}
                    </h4>
                    <p className="text-muted-foreground">{product.brand}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      {t('product.details.stockStatus')}
                    </h4>
                    <p className="text-muted-foreground">
                      {product.inStock
                        ? t('product.details.inStock', {
                            count: product.stockCount,
                          })
                        : t('product.details.soldOut')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  리뷰 기능은 준비 중입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qna" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  문의 기능은 준비 중입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 관련 상품 */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('product.related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <Image
                        src={relatedProduct.image || '/placeholder.svg'}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    {relatedProduct.badge && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant={
                          relatedProduct.badge === 'BEST'
                            ? 'default'
                            : 'secondary'
                        }>
                        {relatedProduct.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>

                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground ml-1">
                        {relatedProduct.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {relatedProduct.price.toLocaleString() +
                          t('common.currency')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
