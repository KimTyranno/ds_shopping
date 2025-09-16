'use server'

import { redirect } from '@/i18n/navigation'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getLocale } from 'next-intl/server'
import { revalidatePath } from 'next/cache'

export type UserEditState = {
  errors?: {
    name?: boolean
  }
}

/** 유저의 기본정보를 변경하는 액션 */
export async function AdminUserEditAction(
  prevState: UserEditState | undefined,
  formData: FormData,
) {
  const supabase = await createClient()
  const locale = await getLocale()

  const userNo = formData.get('userNo') as string
  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const detailAddress = formData.get('detailAddress') as string
  const zipCode = formData.get('zipCode') as string

  // 이름 체크
  if (!name.trim()) {
    return {
      ...prevState,
      errors: {
        name: true,
      },
    }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ name, address, detail_address: detailAddress, zip_code: zipCode })
    .eq('user_no', userNo)

  if (error) {
    logger.error('관리자에서 프로필 수정 에러', error)
    throw new Error('프로필 수정중 에러가 발생하였습니다.')
  }

  redirect({ href: `/admin/users/${userNo}`, locale })
}

/** 유저의 상태만 변경하는 액션 */
export async function AdminUserStatueChangeAction(formData: FormData) {
  const supabase = await createClient()

  const userNo = formData.get('userNo') as string
  const status = formData.get('status') as string
  const currentPath = formData.get('currentPath') as string

  const { error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('user_no', userNo)

  if (error) {
    logger.error('관리자에서 유저상태 변경 에러', error)
    throw new Error('유저상태 변경중 에러가 발생하였습니다.')
  }

  revalidatePath(currentPath)
}
