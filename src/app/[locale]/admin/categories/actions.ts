'use server'

import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export type CategoryEditState = {
  success: boolean
  errors?: {
    name?: string
  }
}

/** 카테고리 정보를 추가/변경하는 액션 */
export async function saveCategoryAction(
  prevState: CategoryEditState | undefined,
  formData: FormData,
) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const status = formData.get('status') === 'on'
  const currentPath = formData.get('currentPath') as string

  // 이름 체크
  if (!name.trim()) {
    return {
      ...prevState,
      success: false,
      errors: {
        name: '카테고리명을 입력해주세요.',
      },
    }
  }

  // 이름 중복 체크
  const { data: existingCategory, error: existingError } = await supabase
    .from('categories')
    .select('id')
    .eq('name', name)
    .maybeSingle()

  if (existingError) {
    logger.error('카테고리 중복 체크 에러', existingError)
    throw new Error('카테고리 중복 체크 중 오류가 발생했습니다.')
  }

  // 다른 카테고리에서 동일한 이름이 존재할 경우 에러 반환
  if (existingCategory && existingCategory.id !== Number(id)) {
    return {
      ...prevState,
      success: false,
      errors: {
        name: '이미 존재하는 카테고리명입니다.',
      },
    }
  }

  const upsertData = {
    ...(id && { id }),
    name,
    description,
    status,
  }

  const { error } = await supabase.from('categories').upsert(upsertData)

  if (error) {
    logger.error('관리자에서 카테고리 추가/수정 에러', error)
    throw new Error('카테고리 추가/수정중 에러가 발생하였습니다.')
  }

  revalidatePath(currentPath)

  return {
    success: true,
  }
}

/** 카테고리를 삭제하는 액션 */
export async function deleteCategoryAction(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const currentPath = formData.get('currentPath') as string

  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) {
    logger.error('관리자에서 카테고리 삭제 에러', error)
    throw new Error('카테고리 삭제중 에러가 발생하였습니다.')
  }

  revalidatePath(currentPath)
}
