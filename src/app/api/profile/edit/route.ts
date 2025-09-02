import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { Profile } from '@/types/tables'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const formData = await req.formData()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const avatar = formData.get('avatar') as File | null
  const address = formData.get('address') as string
  const detailAddress = formData.get('detailAddress') as string
  const zipCode = formData.get('zipCode') as string
  // 에러수집용
  const errors: Record<string, string> = {}

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 })
  }

  // 이름 체크
  if (!name.trim()) {
    errors.name = 'required_name'
  }

  // 우편번호 체크
  if (zipCode && !/^\d{5}$/.test(zipCode)) {
    errors.zipCode = 'invalid_zip_code'
  }

  // 비밀번호가 있는경우만 갱신
  if (password) {
    // 현재 비밀번호 확인
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    const isSignInError = signInError || !signInData.user
    const isInValidConfirmPassword = newPassword !== confirmPassword
    if (isSignInError) {
      errors.password = 'wrong_password'
    }

    // 새로운 비밀번호 확인
    if (isInValidConfirmPassword) {
      errors.confirmPassword = 'password_mismatch'
    }

    if (!isSignInError && !isInValidConfirmPassword) {
      // 비밀번호 변경
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (updateError) {
        logger.error('유저 비밀번호 변경 실패', updateError)
        errors.password = 'password_update_error'
      }
    }
  }

  // 프로필 사진
  if (avatar && avatar.size > 0) {
    const bucket = 'avatars'

    if (!avatar.name.includes('.')) {
      errors.avatar = 'extension_not_found'
    } else {
      // 검증에러가 있으면 이미지 체크까지는 하지 않도록함
      if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors })
      }

      const extension = avatar.name.split('.').pop()?.toLowerCase() || 'jpg'
      let filename = `${uuidv4()}.${extension}`
      const inputBuffer = Buffer.from(await avatar.arrayBuffer())
      let uploadBuffer: Buffer
      let contentType = avatar.type

      const isHeifOrHeic =
        ['image/heic', 'image/heif'].includes(avatar.type) ||
        ['heic', 'heif'].includes(extension)

      // HEIF 혹은 HEIC → JPEG 변환 (2MB가 넘는것도 대상)
      if (isHeifOrHeic || avatar.size > 2 * 1024 * 1024) {
        try {
          uploadBuffer = await sharp(inputBuffer)
            .resize({
              width: 1024,
              fit: 'inside',
              withoutEnlargement: true, // 원본보다 작으면 그대로 둠
            })
            .jpeg()
            .toBuffer()
          filename = filename.replace(/\.(heic|heif)$/i, '.jpg')
          contentType = 'image/jpeg'
        } catch (error) {
          logger.error('HEIC to JPEG 변환 실패', error)
          errors.avatar = 'upload_error'
          return NextResponse.json({ errors })
        }
      } else {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
        if (!allowedExtensions.includes(extension)) {
          errors.avatar = 'invalid_file_type'
          return NextResponse.json({ errors })
        }
        uploadBuffer = inputBuffer
      }

      // storage에 업로드
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, uploadBuffer, {
          contentType,
          upsert: true,
        })

      if (error) {
        logger.error('프로필 사진 업로드 실패', error)
        errors.avatar = 'upload_error'
        return NextResponse.json({ errors })
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
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors })
  }

  const { error } = await supabase
    .from('profiles')
    .update({ name, address, detail_address: detailAddress, zip_code: zipCode })
    .eq('id', user.id)

  if (error) {
    logger.error('프로필 수정 에러', error)
    return NextResponse.json({ error: 'fail' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
