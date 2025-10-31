import { Database } from '@/types/supabase'

/** 상품과 상품이미지 하나를 가져오는 함수타입 */
export type ProductsWithImageResult =
  Database['public']['Functions']['get_products_with_main_image_paginated']['Returns']
/** 상품 재고별 수량을 가져오는 함수타입 */
export type ProductsStatCountsResult =
  Database['public']['Functions']['get_products_count_stats']['Returns']
