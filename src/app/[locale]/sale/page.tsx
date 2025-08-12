import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, Percent, ShoppingCart, Star, Tag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { getSaleProducts } from '../products/action'

export default function SalePage() {
  const saleProducts = getSaleProducts()
  const t = useTranslations('category')
  const tSale = useTranslations('sale')
  const tNav = useTranslations('navigation')
  const tCommon = useTranslations('common')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{tSale('title')}</h1>
        </div>
        <p className="text-muted-foreground">{tSale('description')}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {t('count', { count: saleProducts.length })}
        </p>
      </div>

      {/* 할인 안내 배너 */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Percent className="h-6 w-6" />
          <h2 className="text-xl font-bold">{tSale('banner.title')}</h2>
        </div>
        <p className="text-red-100">
          {tSale('banner.description', { percent: 50 })}
        </p>
      </div>

      {/* 필터 및 정렬 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">{t('filter')}:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={tNav('categories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="electronics">
                {t('categories.electronics')}
              </SelectItem>
              <SelectItem value="fashion">{t('categories.fashion')}</SelectItem>
              <SelectItem value="home">{t('categories.home')}</SelectItem>
              <SelectItem value="books">{t('categories.books')}</SelectItem>
              <SelectItem value="sports">{t('categories.sports')}</SelectItem>
              <SelectItem value="beauty">{t('categories.beauty')}</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t('sort')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount-high">
                {t('discount-high')}
              </SelectItem>
              <SelectItem value="discount-low">{t('discount-low')}</SelectItem>
              <SelectItem value="price-low">{t('price-low')}</SelectItem>
              <SelectItem value="price-high">{t('price-high')}</SelectItem>
              <SelectItem value="popular">{t('popular')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 할인상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {saleProducts.map(product => {
          const discountRate = product.originalPrice
            ? Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )
            : 0

          return (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* 할인율 배지 */}
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                    <Percent className="w-3 h-3 mr-1" />
                    {t('discount', { percent: discountRate })}
                  </Badge>

                  {product.badge && (
                    <Badge
                      className="absolute top-3 right-3"
                      variant="secondary">
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
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        {product.price.toLocaleString() + tCommon('currency')}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        {t('discount', { percent: discountRate })}
                      </Badge>
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString() +
                            tCommon('currency')}
                        </span>
                        <span className="text-sm text-red-600 font-medium">
                          {tSale('saved', {
                            amount: (
                              product.originalPrice - product.price
                            ).toLocaleString(),
                          })}
                        </span>
                      </div>
                    )}
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
                    <Link href={`/products/${product.id}`}>
                      {t('viewDetail')}
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('addToCart')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {saleProducts.length === 0 && (
        <div className="text-center py-16">
          <Tag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            {t('empty.noSaleProducts')}
          </p>
          <Button asChild>
            <Link href="/">{t('empty.button')}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
