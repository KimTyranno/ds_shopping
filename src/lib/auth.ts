import { createClient } from '@/lib/server'
import { Profile } from '@/types/tables'
import type { User as AuthUser } from '@supabase/supabase-js'
import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

export type User = AuthUser & Profile

export async function getAuthUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  return user
}

export async function getProfile() {
  const user = await getAuthUser()
  if (!user) return null

  const supabase = await createClient()
  const currentLocale = await getLocale()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile) {
    redirect(`/${currentLocale}/login?message=profileLoadFailed`)
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

export async function getFullUser(): Promise<User | null> {
  const user = await getAuthUser()
  if (!user) return null

  const profile = await getProfile()
  if (!profile) return null

  return { ...user, ...profile }
}
