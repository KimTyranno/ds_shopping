import CategoriesPage from '@/components/admin/categories'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'

export type Category = {
  id: number
  name: string
  description: string
  status: boolean
}

export type CategoryWithProductsCount = Category & {
  products: {
    count: number
  }[]
}

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description, status, products(count)')
    .order('id', { ascending: true })

  if (error) {
    logger.error('관리자페이지 카테고리목록 불러오기에서 에러발생', error)
    throw error
  }

  const categories: CategoryWithProductsCount[] = data ?? []

  return <CategoriesPage categories={categories} />
}
