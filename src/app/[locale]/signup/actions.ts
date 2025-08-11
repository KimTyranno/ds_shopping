'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function signupAction(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // 비밀번호 확인
  if (password !== confirmPassword) {
    redirect(
      `/signup?error=${encodeURIComponent('비밀번호가 일치하지 않습니다')}`,
    )
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${baseUrl}/login?messageType=success`,
    },
  })

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      name,
    })
  }

  revalidatePath('/', 'layout')
  redirect(`/login?messageType=info`)
}
