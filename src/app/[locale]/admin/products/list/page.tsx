import ProductsPage from '@/components/admin/products/list'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getPublicUrlRecord } from '@/lib/storage/getPublicUrls'
import { BucketName, PRODUCT_STATUS_TYPE } from '@/types/enums'
import {
  ProductsStatCountsResult,
  ProductsWithImageResult,
} from '@/types/functions'
import { PostgrestError } from '@supabase/supabase-js'

export type ProductWithImage = {
  productId: string
  name: string
  categoryName: string
  originalPrice: number
  discountRate: number
  price: number
  stock: number
  status: PRODUCT_STATUS_TYPE
  imgUrl: string | null
}

export type ProductsStatCounts = {
  totalCount: number
  activeCount: number
  soldOutCount: number
  lowStockCount: number
}

type RpcResponse<T> = {
  data: T | null
  error: PostgrestError | null
}

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const page = 1
  const pageSize = 10

  const { data, error } = (await supabase.rpc(
    'get_products_with_main_image_paginated',
    {
      limit_count: pageSize,
      offset_count: (page - 1) * pageSize,
    },
  )) as RpcResponse<ProductsWithImageResult>

  if (error) {
    logger.error('관리자페이지 상품목록 불러오기에서 에러발생', error)
    throw error
  }

  const { data: counts, error: countError } = (await supabase.rpc(
    'get_products_count_stats',
  )) as RpcResponse<ProductsStatCountsResult>

  if (countError) {
    logger.error(
      '관리자페이지 상품목록 총 갯수 불러오기에서 에러발생',
      countError,
    )
    throw countError
  }

  if (!counts || counts.length === 0) {
    logger.error(
      '관리자페이지 상품목록 총 갯수 불러오기에서 에러발생',
      countError,
    )
    throw new Error('상품통계를 불러오지 못했습니다.')
  }
  const productMainImagePaths = data
    ?.map(product => product.main_img_url)
    .filter(path => typeof path === 'string')

  // 공개 URL 매핑 생성
  const productMainImageUrlMap = getPublicUrlRecord(
    supabase,
    BucketName.ProductImages,
    productMainImagePaths ?? [],
  )

  const products: ProductWithImage[] =
    data?.map(product => ({
      productId: String(product.product_id),
      name: product.name,
      categoryName: product.category_name,
      originalPrice: product.original_price,
      price: product.price,
      stock: product.stock,
      status: product.status as PRODUCT_STATUS_TYPE,
      imgUrl: product.main_img_url
        ? productMainImageUrlMap[product.main_img_url]
        : null,
      discountRate: Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100,
      ),
    })) ?? []

  const productsCounts: ProductsStatCounts = {
    totalCount: counts[0].total_count,
    activeCount: counts[0].active_count,
    soldOutCount: counts[0].sold_out_count,
    lowStockCount: counts[0].low_stock_count,
  }

  return <ProductsPage products={products} productsCounts={productsCounts} />
}
