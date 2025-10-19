import UserDetailPage from '@/components/admin/users/detail'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getPublicUrls } from '@/lib/storage/getPublicUrls'
import { formatDate } from '@/lib/utils'
import { BucketName } from '@/types/enums'
import { Profile } from '@/types/tables'
import { UserProps } from '../page'

export type UserDetailType = {
  zipCode: Profile['zip_code']
  address: Profile['address']
  detailAddress: Profile['detail_address']
} & UserProps

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: userData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_no', id)
    .single<Profile>()

  if (!userData || error) {
    logger.error('관리자에서 유저정보 불러오기 실패', error)
    throw new Error('유저정보 불러오기 실패')
  }

  let avatar = ['']
  if (userData.avatar) {
    avatar = getPublicUrls(supabase, BucketName.Avatars, [userData.avatar])
  }

  const user: UserDetailType = {
    ...userData,
    userNo: userData.user_no,
    userRole: userData.user_role,
    createdAt: formatDate(userData.created_at, 'yyyy-MM-dd'),
    lastLoginAt: formatDate(userData.last_sign_in_at, 'yyyy-MM-dd'),
    zipCode: userData.zip_code,
    address: userData.address,
    detailAddress: userData.detail_address,
    avatar: avatar[0],
  }

  return <UserDetailPage user={user} />
}
