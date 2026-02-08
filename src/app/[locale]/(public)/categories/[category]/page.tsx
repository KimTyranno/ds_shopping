import ProductsComponent from '@/components/products'
import { createClient } from '@/lib/server'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const locale = await getLocale()

  if (!category) {
    notFound()
  }

  const supabase = await createClient()

  // 카테고리 정보 가져오기
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select(`id, name_${locale}`)
    .eq('slug', category)
    .single<{ id: string; [key: string]: string }>()
  if (categoryError) throw categoryError

  const categoryName = categoryData[`name_${locale}`]

  return (
    <ProductsComponent {...{ categoryName, categoryId: categoryData.id }} />
  )
}
