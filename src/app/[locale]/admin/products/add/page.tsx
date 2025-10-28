import AddProductPage from '@/components/admin/products/AddProduct'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { PostgrestError } from '@supabase/supabase-js'

export type CategoryName = {
  id: number
  name_ko: string
  status: boolean
}

export default async function AdminAddProductPage() {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('categories')
    .select('id, name_ko, status')
    .eq('status', true)
    .order('id', { ascending: true })) as {
    data: CategoryName[]
    error: PostgrestError | null
  }

  if (error) {
    logger.error('관리자페이지 카테고리 불러오기에서 에러발생', error)
    throw error
  }

  const categoryList = data.map(category => ({
    value: category.id.toString(),
    label: category.name_ko,
  }))
  return <AddProductPage categories={categoryList} />
}
