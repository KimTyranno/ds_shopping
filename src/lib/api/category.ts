import { Categories } from '@/types/tables'
import { PostgrestError } from '@supabase/supabase-js'
import { getLocale } from 'next-intl/server'
import { createClient } from '../server'

export type CategoryItem = {
  id: number
  slug: string
  name: string
  description: string | null
}

/** 언어에 맞는 카테고리 목록을 가져옴 (없으면 한국어) */
export async function getCategories() {
  const supabase = await createClient()
  const locale = await getLocale()
  const { data, error } = (await supabase
    .from('categories')
    .select('*')
    .eq('status', true)
    .order('id', { ascending: true })) as {
    data: Categories[]
    error: PostgrestError | null
  }

  if (error) throw error

  // locale별 필드 선택
  const nameField = `name_${locale}` as keyof (typeof data)[0]
  const descriptionField = `description_${locale}` as keyof (typeof data)[0]

  // 해당 언어 이름만 추출
  return data.map(category => {
    return {
      id: category.id,
      slug: category.slug,
      name: String(category[nameField] || category.name_ko),
      description: String(
        category[descriptionField] || category.description_ko,
      ),
    }
  })
}
