import UsersPage from '@/components/admin/users'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getPublicUrlRecord } from '@/lib/storage/getPublicUrls'
import { formatDate } from '@/lib/utils'
import { BucketName } from '@/types/enums'
import { AdminUserListView } from '@/types/tables'

export type UserProps = {
  userNo: AdminUserListView['user_no']
  avatar: AdminUserListView['avatar']
  name: AdminUserListView['name']
  email: AdminUserListView['email']
  phone: AdminUserListView['phone']
  status: AdminUserListView['status']
  userRole: AdminUserListView['user_role']
  createdAt: AdminUserListView['created_at']
  lastLoginAt: AdminUserListView['last_sign_in_at']
}

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('admin_user_list')
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
    .order('created_at', { ascending: false })

  if (error) {
    logger.error('관리자페이지 유저정보 불러오기에서 에러발생', error)
    throw error
  }

  const users: AdminUserListView[] = data ?? []

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

  const userList = users?.map(user => ({
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
