'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const baseUrl = process.env.BASE_URL

export async function signupAction(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const locale = (formData.get('locale') as string) || 'ko'

  // 비밀번호 확인
  if (password !== confirmPassword) {
    redirect(`/${locale}/signup?error=password_mismatch`)
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${baseUrl}/${locale}/login?alertMessage=success&alertType=success`,
    },
  })

  // 이미 가입된 이메일 (이메일 인증 미완료 상태)
  if (data?.user && data.user.identities?.length === 0) {
    redirect(`/${locale}/signup?error=email_already_registered`)
  }

  if (error) {
    redirect(`/${locale}/signup?message=` + encodeURIComponent(error.message))
  }

  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      name,
    })
  }

  revalidatePath('/', 'layout')
  redirect(`/${locale}/login?alertMessage=info&alertType=info`)
}
