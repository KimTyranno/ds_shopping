'use client'

import { Badge } from '@/components/ui/badge'
import { USER_STATUS, USER_STATUS_TYPE } from '@/types/enums'
import { Ban, CheckCircle } from 'lucide-react'

export default function UserStatusBadge({
  status,
}: {
  status: USER_STATUS_TYPE
}) {
  switch (status) {
    case USER_STATUS.ACTIVE:
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          활성
        </Badge>
      )
    case USER_STATUS.SUSPENDED:
      return (
        <Badge className="bg-red-100 text-red-800">
          <Ban className="h-3 w-3 mr-1" />
          정지
        </Badge>
      )
    case USER_STATUS.DELETED:
      return <Badge className="bg-gray-100 text-gray-800">탈퇴</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
