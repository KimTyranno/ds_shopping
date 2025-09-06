'use server'

import { redirect } from '@/i18n/navigation'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getLocale } from 'next-intl/server'
import { cookies } from 'next/headers'

export type ForgotPasswordState = {
  error?: string
}

export async function sendPasswordResetEmailAction(
  _: ForgotPasswordState | undefined,
  formData: FormData,
) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const locale = await getLocale()

  if (!email) {
    return {
      error: 'enter_email',
    }
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      error: 'invalid_email_format',
    }
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.BASE_URL}/${locale}`,
    })

    if (error) {
      logger.error('비밀번호 초기화중 에러발생:', error)
      return {
        error: 'password_reset_email_failed',
      }
    }

    const cookieStore = await cookies()
    cookieStore.set('forgot_password_verified', 'true', {
      maxAge: 60, // 60초 동안 유효
      httpOnly: true, // 클라이언트 측 접근을 차단함
      secure: true, // HTTPS 연결을 통해서만 쿠키가 전송되도록함
    })

    // 성공시 확인 페이지로 리다이렉트
    redirect({
      href: `/forgot-password/sent?email=${encodeURIComponent(email)}`,
      locale,
    })
  } catch (error) {
    // NOTE: redirect는 에러를 Throw 하는방식으로 동작하므로 try안에서 사용할 경우 catch에서 제외하도록 해야함
    if (error instanceof Error && error.message == 'NEXT_REDIRECT') throw error

    logger.error('비밀번호 초기화중 예상치 못한 에러발생 :', error)
    throw new Error()
  }
}
