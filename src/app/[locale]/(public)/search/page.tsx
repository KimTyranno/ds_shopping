'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Filter,
  Grid,
  List,
  Search,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Product, searchProducts } from '../products/action'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || 'all'
  const t = useTranslations('search')
  const tCategory = useTranslations('category')
  const tCommon = useTranslations('common')

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [executedQuery, setExecutedQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchResults, setSearchResults] = useState(
    searchProducts(initialQuery, initialCategory),
  )

  // 검색 실행
  const handleSearch = (
    query: string = searchQuery,
    category: string = selectedCategory,
  ) => {
    const results = searchProducts(query, category)
    setSearchResults(results)
    setExecutedQuery(query)

    // URL 업데이트
    const url = new URL(window.location.href)
    if (query) url.searchParams.set('q', query)
    else url.searchParams.delete('q')
    if (category !== 'all') url.searchParams.set('category', category)
    else url.searchParams.delete('category')
    window.history.replaceState({}, '', url.toString())
  }

  // 정렬 적용
  const getSortedResults = () => {
    let sorted = [...searchResults]

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        sorted.sort((a, b) => b.reviews - a.reviews)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // relevance
        break
    }

    // 가격 필터 적용
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-50000':
          sorted = sorted.filter(product => product.price < 50000)
          break
        case '50000-100000':
          sorted = sorted.filter(
            product => product.price >= 50000 && product.price < 100000,
          )
          break
        case '100000-500000':
          sorted = sorted.filter(
            product => product.price >= 100000 && product.price < 500000,
          )
          break
        case 'over-500000':
          sorted = sorted.filter(product => product.price >= 500000)
          break
      }
    }

    return sorted
  }

  const sortedResults = getSortedResults()

  // 카테고리별 상품 수 계산
  const getCategoryCount = (category: string) => {
    if (category === 'all') return searchProducts(searchQuery).length
    return searchProducts(searchQuery, category).length
  }

  useEffect(() => {
    setSearchQuery(initialQuery)
    setExecutedQuery(initialQuery)
    setSelectedCategory(initialCategory)
    const results = searchProducts(initialQuery, initialCategory)
    setSearchResults(results)
  }, [initialQuery, initialCategory])

  const ProductCard = ({
    product,
    isListView = false,
  }: {
    product: Product
    isListView?: boolean
  }) => (
    <Card
      className={`group hover:shadow-lg transition-shadow ${isListView ? 'flex' : ''}`}>
      <CardContent className={`p-0 ${isListView ? 'flex w-full' : ''}`}>
        <div className={`relative ${isListView ? 'w-48 flex-shrink-0' : ''}`}>
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              width={300}
              height={300}
              className={`object-cover group-hover:scale-105 transition-transform ${
                isListView ? 'w-48 h-32' : 'w-full h-64 rounded-t-lg'
              }`}
            />
          </Link>
          {product.badge && (
            <Badge
              className="absolute top-3 left-3"
              variant={product.badge === 'BEST' ? 'default' : 'secondary'}>
              {product.badge}
            </Badge>
          )}
        </div>

        <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground ml-1">
                {product.rating} ({product.reviews.toLocaleString()})
              </span>
            </div>
          </div>

          <div
            className={`flex items-center justify-between ${isListView ? 'mb-0' : 'mb-4'}`}>
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
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    {t('discount')}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {isListView && (
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                asChild>
                <Link href={`/products/${product.id}`}>
                  {t('buttons.view_details')}
                </Link>
              </Button>
              <Button size="sm" className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t('buttons.add_to_cart')}
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {!isListView && (
        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              asChild>
              <Link href={`/products/${product.id}`}>
                {t('buttons.view_details')}
              </Link>
            </Button>
            <Button size="sm" className="flex-1">
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t('buttons.add_to_cart')}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            {executedQuery && (
              <p className="text-muted-foreground">
                {t('results_header', {
                  query: executedQuery,
                  count: sortedResults.length,
                })}
              </p>
            )}
          </div>
        </div>

        {/* 검색바 */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('placeholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={() => handleSearch()}>
            <Search className="w-4 h-4 mr-2" />
            {t('search_button')}
          </Button>
        </div>

        {/* 카테고리 탭 */}
        <Tabs
          value={selectedCategory}
          onValueChange={value => {
            setSelectedCategory(value)
            handleSearch(searchQuery, value)
          }}
          className="mb-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="all">
              {tCategory('all')} ({getCategoryCount('all')})
            </TabsTrigger>
            <TabsTrigger value="electronics">
              {tCategory('categories.electronics')} (
              {getCategoryCount('electronics')})
            </TabsTrigger>
            <TabsTrigger value="fashion">
              {tCategory('categories.fashion')} ({getCategoryCount('fashion')})
            </TabsTrigger>
            <TabsTrigger value="home">
              {tCategory('categories.home')} ({getCategoryCount('home')})
            </TabsTrigger>
            <TabsTrigger value="books">
              {tCategory('categories.books')} ({getCategoryCount('books')})
            </TabsTrigger>
            <TabsTrigger value="sports">
              {tCategory('categories.sports')} ({getCategoryCount('sports')})
            </TabsTrigger>
            <TabsTrigger value="beauty">
              {tCategory('categories.beauty')} ({getCategoryCount('beauty')})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 필터 및 정렬 */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">
              {t('filter_sort.label')}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 flex-1">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="가격대" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tCategory('all')}</SelectItem>
                <SelectItem value="under-50000">
                  {tCategory('under-50000')}
                </SelectItem>
                <SelectItem value="50000-100000">
                  {tCategory('50000-100000')}
                </SelectItem>
                <SelectItem value="100000-500000">
                  {tCategory('100000-500000')}
                </SelectItem>
                <SelectItem value="over-500000">
                  {tCategory('over-500000')}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={tCategory('sort')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">
                  {tCategory('relevance')}
                </SelectItem>
                <SelectItem value="popular">{tCategory('popular')}</SelectItem>
                <SelectItem value="price-low">
                  {tCategory('price-low')}
                </SelectItem>
                <SelectItem value="price-high">
                  {tCategory('price-high')}
                </SelectItem>
                <SelectItem value="rating">{tCategory('rating')}</SelectItem>
                <SelectItem value="reviews">{tCategory('reviews')}</SelectItem>
                <SelectItem value="name">{tCategory('name')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 보기 모드 전환 */}
          <div className="flex gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}>
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 검색 결과 */}
        {sortedResults.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {t('noResults.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {executedQuery
                ? t('noResults.withQuery', {
                    query: executedQuery,
                  })
                : t('noResults.prompt')}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {t('noResults.suggestion')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  t('suggestions.galaxy'),
                  t('suggestions.iphone'),
                  t('suggestions.laptop'),
                  t('suggestions.shirt'),
                  t('suggestions.sneakers'),
                ].map(suggestion => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(suggestion)
                      handleSearch(suggestion)
                    }}
                    className="bg-transparent">
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 결과 요약 */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {t('total')}
                <span className="font-semibold text-foreground">
                  {sortedResults.length}
                </span>
                {t('products_found')}
                {executedQuery && (
                  <>
                    {' '}
                    - "
                    <span className="font-semibold text-foreground">
                      {executedQuery}
                    </span>
                    "
                  </>
                )}
              </p>
            </div>

            {/* 상품 목록 */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
              {sortedResults.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isListView={viewMode === 'list'}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
