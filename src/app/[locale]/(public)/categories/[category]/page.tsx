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
import { Filter, ShoppingCart, Star } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductsByCategory } from '../actions'

const categoryNames: Record<string, string> = {
  electronics: '전자제품',
  fashion: '패션',
  home: '홈&리빙',
  books: '도서',
  sports: '스포츠',
  beauty: '뷰티',
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const t = await getTranslations('category')
  const tCategories = await getTranslations('categories')
  const tCommon = await getTranslations('common')

  if (!categoryNames[category]) {
    notFound()
  }

  const products = getProductsByCategory(category)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {tCategories(`${category}.title`)}
        </h1>
        <p className="text-muted-foreground">
          {t('count', { count: products.length })}
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
              <SelectItem value="price-low">{t('price-low')}</SelectItem>
              <SelectItem value="price-high">{t('price-high')}</SelectItem>
              <SelectItem value="rating">{t('rating')}</SelectItem>
              <SelectItem value="newest">{t('newest')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
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
                {product.badge && (
                  <Badge
                    className="absolute top-3 left-3"
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

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.rating} ({product.reviews})
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
    </div>
  )
}
