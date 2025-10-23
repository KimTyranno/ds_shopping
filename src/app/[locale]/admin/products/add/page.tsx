import AddProductPage from '@/components/admin/products/AddProduct'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { Categories } from '@/types/tables'

export default async function AdminAddProductPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description, status, created_at')
    .eq('status', true)
    .order('id', { ascending: true })

  if (error) {
    logger.error('관리자페이지 카테고리 불러오기에서 에러발생', error)
    throw error
  }

  const categories: Categories[] = data ?? []
  const categoryList = categories.map(category => ({
    value: category.id.toString(),
    label: category.name,
  }))
  return <AddProductPage categories={categoryList} />
}
