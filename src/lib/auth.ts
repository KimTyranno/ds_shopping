import { createClient } from '@/lib/server'
import { Profile } from '@/types/tables'
import type { User as AuthUser } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export type User = AuthUser & Profile

export async function getAuthUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return user
}

export async function getProfile() {
  const user = await getAuthUser()
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile) {
    redirect('/login?message=profileLoadFailed')
  }

  let avatar = ''
  if (profile?.avatar) {
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(profile?.avatar)
    avatar = publicUrl
  }
  return { ...profile, avatar }
}

export async function getFullUser(): Promise<User> {
  const user = await getAuthUser()
  const profile = await getProfile()
  return { ...user, ...profile }
}
