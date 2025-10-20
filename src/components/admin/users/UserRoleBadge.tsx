'use client'

import { Badge } from '@/components/ui/badge'
import { USER_ROLE, USER_ROLE_TYPE } from '@/types/enums'
import { ShieldCheck, ShoppingCart, User } from 'lucide-react'

export default function UserRoleBadge({ role }: { role: USER_ROLE_TYPE }) {
  switch (role) {
    case USER_ROLE.ADMIN:
      return (
        <Badge className="bg-blue-100 text-blue-800 flex items-center">
          <ShieldCheck className="h-3 w-3 mr-1" />
          관리자
        </Badge>
      )
    case USER_ROLE.SELLER:
      return (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center">
          <ShoppingCart className="h-3 w-3 mr-1" />
          판매자
        </Badge>
      )
    case USER_ROLE.CUSTOMER:
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center">
          <User className="h-3 w-3 mr-1" />
          고객
        </Badge>
      )
    default:
      return <Badge variant="outline">{role}</Badge>
  }
}
