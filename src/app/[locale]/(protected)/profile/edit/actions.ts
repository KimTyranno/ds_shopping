'use server'

import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { Profile } from '@/types/tables'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export type ProfileEditState = {
  name: string
  avatar: string
  email: string
  address: string
  detailAddress: string
  zipCode: string
  errors?: {
    name?: string
    avatar?: string
    password?: string
    confirmPassword?: string
    zipCode?: string
  }
}

export async function profileEditAction(
  prevState: ProfileEditState,
  formData: FormData,
) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const avatar = formData.get('avatar') as File | null
  const address = formData.get('address') as string
  const detailAddress = formData.get('detailAddress') as string
  const zipCode = formData.get('zipCode') as string
  const locale = (formData.get('locale') as string) || 'ko'

  const t = await getTranslations('mypage.profile_edit.form.error')

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/${locale}/login`)
  }

  // 이름 체크
  if (!name.trim()) {
    return {
      ...prevState,
      errors: { name: t('required_name') },
    }
  }

  // 우편번호 체크
  if (zipCode && !/^\d{5}$/.test(zipCode)) {
    return {
      ...prevState,
      errors: { zipCode: t('invalid_zip_code') },
    }
  }

  // 프로필 사진
  if (avatar && avatar.size > 0) {
    const bucket = 'avatars'
    const filename = `${uuidv4()}-${avatar.name}`

    // storage에 업로드
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, avatar, {
        upsert: true,
      })

    if (error) {
      logger.error('프로필 사진 업로드 실패', error)
      return {
        ...prevState,
        errors: {
          avatar: t('upload_error'),
        },
      }
    }

    // 이전 사진 삭제
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar')
      .eq('id', user.id)
      .single<Profile>()
    if (profile?.avatar) {
      await supabase.storage.from(bucket).remove([profile.avatar])
    }

    // profiles에 저장
    await supabase
      .from('profiles')
      .update({ avatar: data.path })
      .eq('id', user.id)
  }

  // 비밀번호가 있는경우만 갱신
  if (password) {
    // 현재 비밀번호 확인
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    if (signInError || !signInData.user) {
      return {
        ...prevState,
        errors: { password: t('wrong_password') },
      }
    }

    // 새로운 비밀번호 확인
    if (newPassword !== confirmPassword) {
      return {
        ...prevState,
        errors: { confirmPassword: t('password_mismatch') },
      }
    }

    // 비밀번호 변경
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (updateError) {
      logger.error('유저 비밀번호 변경 실패', updateError)
      return {
        ...prevState,
        errors: { password: t('password_update_error') },
      }
    }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ name, address, detail_address: detailAddress, zip_code: zipCode })
    .eq('id', user.id)

  if (error) {
    logger.error('프로필 수정 에러', error)
  }

  revalidatePath(`/${locale}/mypage`, 'page')
  redirect(`/${locale}/mypage?messageType=success`)
}
