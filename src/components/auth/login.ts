'use client'

import { createClient } from '@/lib/client'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: userData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw error
  }

  const profile = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single()

  return { user: { ...userData.user, ...profile.data } }

  // revalidatePath('/', 'page')
  // redirect('/')
}
