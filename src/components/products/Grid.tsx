'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { ImageOff, ShoppingCart, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ProductByCategory } from '.'

type ProductGridProps = {
  products: ProductByCategory[]
  observerRef: React.RefObject<HTMLDivElement | null>
  isLoading: boolean
  hasMore: boolean
}

/** 상품목록표시 (그리드) */
export default function ProductsGrid({
  products,
  isLoading,
  hasMore,
  observerRef,
}: ProductGridProps) {
  const t = useTranslations('category')
  const tCommon = useTranslations('common')

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Card
            key={product.productId}
            className="group hover:shadow-lg transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Link href={`/products/${product.productId}`}>
                  {product.imgUrl ? (
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-t-lg">
                      <ImageOff className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  {/* <Image
                        src={product.imgUrl || ''}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                      /> */}
                </Link>
                {/* {product.badge && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant={
                          product.badge === 'BEST' ? 'default' : 'secondary'
                        }>
                        {product.badge}
                      </Badge>
                    )} */}
              </div>

              <div className="p-4">
                <Link href={`/products/${product.productId}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground ml-1">
                      1000
                      {/* {product.rating} ({product.reviews}) */}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-primary">
                      {product.price.toLocaleString() + tCommon('currency')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {product.originalPrice.toLocaleString() +
                          tCommon('currency')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  asChild>
                  <Link href={`/products/${product.productId}`}>
                    {t('view_detail')}
                  </Link>
                </Button>
                <Button size="sm" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('add_to_cart')}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 로딩 표시 */}
      {isLoading && (
        <p className="text-center my-4 text-gray-500">{t('loading')}</p>
      )}

      {/* 관찰용 div (스크롤 끝 감지) */}
      <div ref={observerRef} className="h-10" />

      {!hasMore && (
        <p className="text-center text-gray-400 my-6">{t('noMoreProducts')}</p>
      )}

      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">
            {t('empty.title')}
          </p>
          <Button asChild>
            <Link href="/">{t('empty.button')}</Link>
          </Button>
        </div>
      )}
    </>
  )
}
