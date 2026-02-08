'use client'

import { createClient } from '@/lib/client'
import { logger } from '@/lib/logger'
import { getPublicUrlRecord } from '@/lib/storage/getPublicUrls'
import { useProductsStore } from '@/lib/store'
import { BucketName } from '@/types/enums'
import { ProductsWithImageCursorResult } from '@/types/functions'
import { PostgrestError } from '@supabase/supabase-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import ProductsFilter from './Filter'
import ProductsGrid from './Grid'
import ProductsHeader from './Header'

export type ProductByCategory = {
  imgUrl: string | null
  name: string
  originalPrice: number
  price: number
  productId: number
  discountRate: number
}

type ProductsComponentProps = {
  categoryId: string
  categoryName: string
}

export default function ProductsComponent({
  categoryId,
  categoryName,
}: ProductsComponentProps) {
  const observerRef = useRef<HTMLDivElement | null>(null)
  // product store
  const { categories, setCategoryData, clearExpiredCache } = useProductsStore()

  // 캐시된 데이터 확인
  const cachedData = categories[categoryId] ?? {
    products: [],
    lastId: null,
    hasMore: true,
    timestamp: 0,
  }

  const [products, setProducts] = useState<ProductByCategory[]>(
    cachedData.products,
  )
  const [lastId, setLastId] = useState<number | null>(cachedData.lastId)
  const [hasMore, setHasMore] = useState(cachedData.hasMore)
  const [isLoading, setIsLoading] = useState(false)

  /** 상품 불러오기 함수 */
  const fetchProducts = useCallback(async () => {
    if (isLoading || !hasMore) return
    const supabase = createClient()
    setIsLoading(true)

    const { data: productInDB, error } = (await supabase.rpc(
      'get_products_with_main_image_cursor',
      {
        last_id: lastId,
        limit_count: 8,
        category_id: categoryId,
      },
    )) as {
      data: ProductsWithImageCursorResult | null
      error: PostgrestError | null
    }

    if (error) {
      logger.error('카테고리별 상품 데이터 불러오기중 에러발생', error)
      setIsLoading(false)
      return
    }

    if (!productInDB || productInDB.length === 0) {
      setHasMore(false)
      setIsLoading(false)
      return
    }

    const productMainImagePaths = productInDB
      ?.map(product => product.main_img_url)
      .filter(path => typeof path === 'string')

    // 공개 URL 매핑 생성
    const productMainImageUrlMap = getPublicUrlRecord(
      supabase,
      BucketName.ProductImages,
      productMainImagePaths ?? [],
    )

    const data: ProductByCategory[] = productInDB.map(product => {
      const originalPrice = product.original_price
      const price = product.price
      const discountAmount = originalPrice - price
      const discountRate = (discountAmount / originalPrice) * 100

      return {
        imgUrl: product.main_img_url
          ? productMainImageUrlMap[product.main_img_url]
          : null,
        name: product.name,
        originalPrice,
        price,
        discountRate,
        productId: product.product_id,
      }
    })

    const merged = lastId === null ? data : [...products, ...data]
    const unique = Array.from(
      new Map(merged.map(p => [p.productId, p])).values(),
    )
    const newLastId = productInDB[productInDB.length - 1].product_id

    setProducts(unique)
    setLastId(newLastId)
    setIsLoading(false)

    setCategoryData(categoryId, {
      products: unique,
      lastId: newLastId,
      hasMore,
    })
  }, [lastId, categoryId, isLoading, hasMore, products, setCategoryData])

  /** 처음 로드 시 캐시가 없으면 데이터 첫 요청 */
  useEffect(() => {
    if (cachedData.products.length === 0) {
      void fetchProducts()
    }
  }, [categoryId])

  useEffect(() => {
    clearExpiredCache()
  }, [])

  /** 스크롤 감지 (IntersectionObserver) */
  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          void fetchProducts()
        }
      },
      { threshold: 1.0 },
    )

    const current = observerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [fetchProducts, hasMore, isLoading])

  // 카테고리가 변경될때 로컬state 동기화라는데 아직 차이를 모르겠어서 주석처리
  // useEffect(() => {
  //   setProducts(cachedData.products)
  //   setLastId(cachedData.lastId)
  //   setHasMore(cachedData.hasMore)
  // }, [categoryId])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <ProductsHeader {...{ title: categoryName, count: products.length }} />

      {/* 필터 및 정렬 */}
      <ProductsFilter />

      {/* 상품 그리드 */}
      <ProductsGrid {...{ products, isLoading, hasMore, observerRef }} />
    </div>
  )
}
