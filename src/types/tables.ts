import { Database, Tables } from '@/types/supabase'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Products = Database['public']['Tables']['products']['Row']
export type Categories = Tables<'categories'>
export type AdminUserListView =
  Database['public']['Views']['admin_user_list']['Row']
