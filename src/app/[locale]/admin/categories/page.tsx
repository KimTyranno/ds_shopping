import CategoriesPage from '@/components/admin/categories'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { Categories } from '@/types/tables'
import { PostgrestError } from '@supabase/supabase-js'

export type CategoryWithProductsCount = Categories & {
  products: {
    count: number
  }[]
}

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data: categories, error } = (await supabase
    .from('categories')
    .select('*, products(count)')
    .order('id', { ascending: true })) as {
    data: CategoryWithProductsCount[]
    error: PostgrestError | null
  }

  if (error) {
    logger.error('관리자페이지 카테고리목록 불러오기에서 에러발생', error)
    throw error
  }

  return <CategoriesPage categories={categories} />
}
