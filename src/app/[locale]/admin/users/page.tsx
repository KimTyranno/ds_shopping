import UsersPage from '@/components/admin/users'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getPublicUrlRecord } from '@/lib/storage/getPublicUrls'
import { formatDate } from '@/lib/utils'
import { BucketName } from '@/types/enums'
import { Profile } from '@/types/tables'
import { PostgrestError } from '@supabase/supabase-js'

export type UserProps = {
  userNo: Profile['user_no']
  avatar: Profile['avatar']
  name: Profile['name']
  email: Profile['email']
  phone: Profile['phone']
  status: Profile['status']
  userRole: Profile['user_role']
  createdAt: Profile['created_at']
  lastLoginAt: Profile['last_sign_in_at']
}

type RpcResponse<T> = {
  data: T | null
  error: PostgrestError | null
}

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('profiles')
    .select(
      `
      user_no,
      avatar,
      name,
      status,
      user_role,
      phone,
      email,
      created_at,
      last_sign_in_at
    `,
    )
    .order('created_at', { ascending: false })) as RpcResponse<Profile[]>

  if (error) {
    logger.error('관리자페이지 유저정보목록 불러오기에서 에러발생', error)
    throw error
  }

  const users: Profile[] = data ?? []

  // avatar 경로 목록 추출
  const avatarPaths = users
    .map(user => user.avatar)
    .filter(path => typeof path === 'string')

  // avatar 공개 URL 매핑 생성
  const avatarUrlMap = getPublicUrlRecord(
    supabase,
    BucketName.Avatars,
    avatarPaths,
  )

  const userList = users.map(user => ({
    userNo: user.user_no,
    avatar: user.avatar ? avatarUrlMap[user.avatar] : null,
    name: user.name,
    phone: user.phone || '-',
    status: user.status,
    userRole: user.user_role,
    email: user.email,
    createdAt: formatDate(user.created_at, 'yyyy-MM-dd'),
    lastLoginAt: formatDate(user.last_sign_in_at, 'yyyy-MM-dd'),
  }))

  return <UsersPage userList={userList} />
}
