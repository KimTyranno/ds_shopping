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
import { Link } from '@/i18n/navigation'
import { Award, Filter, ShoppingCart, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { getBestProducts } from '../products/action'

export default function BestPage() {
  const bestProducts = getBestProducts()
  const t = useTranslations('category')
  const tBest = useTranslations('bestProducts')
  const tCommon = useTranslations('common')
  const tNav = useTranslations('navigation')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{tBest('title')}</h1>
        </div>
        <p className="text-muted-foreground">{tBest('pageDescription')}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {t('count', { count: bestProducts.length })}
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
              <SelectValue placeholder={t('price')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="under-50000">{t('under-50000')}</SelectItem>
              <SelectItem value="50000-100000">{t('50000-100000')}</SelectItem>
              <SelectItem value="100000-500000">
                {t('100000-500000')}
              </SelectItem>
              <SelectItem value="over-500000">{t('over-500000')}</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t('sort')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">{t('popular')}</SelectItem>
              <SelectItem value="rating">{t('rating')}</SelectItem>
              <SelectItem value="price-low">{t('price-low')}</SelectItem>
              <SelectItem value="price-high">{t('price-high')}</SelectItem>
              <SelectItem value="reviews">{t('reviews')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 베스트 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bestProducts.map((product, index) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow relative">
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

                {/* 순위 배지 */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {product.badge && (
                  <Badge className="absolute top-3 right-3" variant="secondary">
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

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-primary">
                      {product.price.toLocaleString() + tCommon('currency')}
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
        ))}
      </div>

      {bestProducts.length === 0 && (
        <div className="text-center py-16">
          <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            {t('empty.noBestProducts')}
          </p>
          <Button asChild>
            <Link href="/">{t('empty.button')}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
