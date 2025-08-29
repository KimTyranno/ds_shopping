'use server'

import { redirect } from '@/i18n/navigation'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { Profile } from '@/types/tables'
import { getLocale } from 'next-intl/server'

export type ProfileDeleteState = {
  errors?: {
    agreements?: boolean
    confirmText?: boolean
  }
}

export async function profileDeleteAction(
  prevState: ProfileDeleteState | undefined,
  formData: FormData,
) {
  const dataDelete = formData.get('dataDelete') === 'on'
  const orderHistory = formData.get('orderHistory') === 'on'
  const noRefund = formData.get('noRefund') === 'on'
  const confirmText = formData.get('confirmText') as string
  const locale = await getLocale()

  const isAgreeChecked = dataDelete && orderHistory && noRefund

  if (!isAgreeChecked) {
    return {
      ...prevState,
      errors: {
        agreements: true,
      },
    }
  }

  if (
    (locale === 'ko' && confirmText !== '계정삭제') ||
    (locale !== 'ko' && confirmText !== 'DELETE')
  ) {
    return {
      ...prevState,
      errors: {
        confirmText: true,
      },
    }
  }

  try {
    const supabase = await createClient()

    // 현재 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      logger.error('일치하는 User 정보가 없습니다.', userError)
      throw new Error('messages.user_not_found')
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single<Profile>()

    if (!profile) {
      logger.error('일치하는 Profile 정보가 없습니다.', profileError)
      throw new Error('messages.user_not_found')
    }

    // TODO: 사용자 데이터 삭제 (관련 테이블들도 삭제해야 함)
    // 예: 주문 내역, 장바구니, 찜목록 등

    // 저장되어있는 프로필사진 삭제
    if (profile.avatar) {
      const bucket = 'avatars'
      await supabase.storage.from(bucket).remove([profile.avatar])
    }

    // Profile 데이터 삭제
    const { error: profileDeleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id)

    // Supabase Auth에서 사용자 삭제
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

    if (deleteError || profileDeleteError) {
      logger.error('User 삭제중 에러발생', deleteError ?? profileDeleteError)
      throw new Error('messages.deletion_failed')
    }

    // 로그아웃 및 홈페이지로 리다이렉트
    await supabase.auth.signOut()
    redirect({
      href: '/profile/delete/success',
      locale,
    })
  } catch (error: unknown) {
    // NOTE: redirect는 에러를 Throw 하는방식으로 동작하므로 try안에서 사용할 경우 catch에서 제외하도록 해야함
    if (error instanceof Error && error.message == 'NEXT_REDIRECT') throw error

    logger.error('User 삭제처리중 예기치 않은 에러발생', error)
    throw new Error('messages.deletion_failed')
  }
}
