'use server'

import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export type CategoryEditState = {
  success: boolean
  errors?: {
    slug?: string
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
  const slug = formData.get('slug') as string
  const status = formData.get('status') === 'on'
  const currentPath = formData.get('currentPath') as string

  const names = {
    ko: (formData.get('name_ko') as string)?.trim() || '',
    en: (formData.get('name_en') as string)?.trim() || '',
    ja: (formData.get('name_ja') as string)?.trim() || '',
  }

  const descriptions = {
    ko: (formData.get('description_ko') as string)?.trim() || '',
    en: (formData.get('description_en') as string)?.trim() || '',
    ja: (formData.get('description_ja') as string)?.trim() || '',
  }

  // 이름 체크
  if (!names.ko) {
    return {
      ...prevState,
      success: false,
      errors: {
        ...prevState?.errors,
        name: '카테고리명을 입력해주세요.',
      },
    }
  }

  // 이름 중복 체크 (기본언어인 ko만 체크)
  const { data: existingCategoryByName, error: existingNameError } =
    await supabase
      .from('categories')
      .select('id')
      .eq('name_ko', names.ko)
      .maybeSingle()

  if (existingNameError) {
    logger.error('카테고리명 중복 체크 에러', existingNameError)
    throw new Error('카테고리명 중복 체크 중 오류가 발생했습니다.')
  }
  // 다른 카테고리에서 동일한 이름이 존재할 경우 에러 반환
  if (existingCategoryByName && existingCategoryByName.id !== Number(id)) {
    return {
      ...prevState,
      success: false,
      errors: {
        ...prevState?.errors,
        name: '이미 존재하는 카테고리명입니다.',
      },
    }
  }

  // 슬러그 중복 체크
  const { data: existingCategoryBySlug, error: existingSlugError } =
    await supabase
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

  if (existingSlugError) {
    logger.error('카테고리 슬러그 중복 체크 에러', existingSlugError)
    throw new Error('카테고리 슬러그 중복 체크 중 오류가 발생했습니다.')
  }
  // 다른 카테고리에서 동일한 슬러그가 존재할 경우 에러 반환
  if (existingCategoryBySlug && existingCategoryBySlug.id !== Number(id)) {
    return {
      ...prevState,
      success: false,
      errors: {
        ...prevState?.errors,
        slug: '이미 존재하는 슬러그입니다.',
      },
    }
  }

  const upsertData = {
    ...(id && { id }),
    slug,
    name_ko: names.ko,
    name_en: names.en,
    name_ja: names.ja,
    description_ko: descriptions.ko,
    description_en: descriptions.en,
    description_ja: descriptions.ja,
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
