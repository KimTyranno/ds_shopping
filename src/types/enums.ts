import { Database } from '@/types/supabase'

export type USER_ROLE_TYPE = Database['public']['Enums']['user_role_enum']
export type USER_STATUS_TYPE = Database['public']['Enums']['user_status']

export const USER_ROLE = {
  ADMIN: 'admin',
  SELLER: 'seller',
  CUSTOMER: 'customer',
} as const satisfies Record<string, USER_ROLE_TYPE>

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const satisfies Record<string, USER_STATUS_TYPE>
