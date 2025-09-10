'use server'

import { redirect } from '@/i18n/navigation'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

type LoginState = {
  error?: string
}

export async function login(
  _prevState: LoginState | undefined,
  formData: FormData,
) {
  const supabase = await createClient()
  const locale = (formData.get('locale') as string) || 'ko'
  logger.info(process.env.NEXT_RUNTIME)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  try {
    const { data: loginData, error } =
      await supabase.auth.signInWithPassword(data)

    if (error || !loginData.user || !loginData.session) {
      logger.error('로그인 실패', error)
      return {
        error: 'invalid_credentials',
      }
    }
  } catch (error) {
    logger.error('로그인시도중 에러', error)
    return {
      error: 'login_fail',
    }
  }

  revalidatePath('/', 'layout')
  redirect({ href: '/', locale })
}
