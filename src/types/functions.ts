import { Database } from '@/types/supabase'

export type FunctionProductsWithImageReturns =
  Database['public']['Functions']['get_products_with_main_image_paginated']['Returns']
export type FunctionProductsStatCountsReturns =
  Database['public']['Functions']['get_products_count_stats']['Returns']
