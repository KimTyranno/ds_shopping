import { createClient } from '@/lib/server'
import { Profile } from '@/types/tables'
import type { User as AuthUser } from '@supabase/supabase-js'

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
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile) {
    await supabase.auth.signOut()
    return null
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

export async function getCurrentUser(): Promise<User | null> {
  const user = await getAuthUser()
  if (!user) return null

  const profile = await getProfile()
  if (!profile) return null

  return { ...user, ...profile }
}
