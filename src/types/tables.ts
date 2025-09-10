import { Database } from '@/types/supabase'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type AdminUserListView =
  Database['public']['Views']['admin_user_list']['Row']
