/* eslint-disable no-unused-vars */
import { Database } from '@/types/supabase'

export type USER_ROLE_TYPE = Database['public']['Enums']['user_role_enum']
export type USER_STATUS_TYPE = Database['public']['Enums']['user_status']
export type PRODUCT_STATUS_TYPE = Database['public']['Enums']['product_status']

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

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  SOLD_OUT: 'sold_out',
  PAUSED: 'paused',
  DELETED: 'deleted',
} as const satisfies Record<string, PRODUCT_STATUS_TYPE>

export enum BucketName {
  Avatars = 'avatars',
  ProductImages = 'product-images',
}
