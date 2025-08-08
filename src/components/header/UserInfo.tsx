'use client'

import useStore from '@/lib/store'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'

const UserInfo = () => {
  const user = useStore(state => state.user)

  if (!user)
    return (
      <div className="p-4 bg-muted/50 rounded-lg mt-6">
        <p className="text-sm text-muted-foreground mb-3">
          로그인하고 더 많은 혜택을 받아보세요
        </p>
        <Button asChild className="w-full">
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    )

  return (
    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mt-6">
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">
          {user.name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium text-sm">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}

export default UserInfo
