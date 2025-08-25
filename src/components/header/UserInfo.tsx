'use client'

import { Link } from '@/i18n/navigation'
import useStore from '@/lib/store'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

type UserInfoProps = {
  handleClose: () => void
}

const UserInfo = (props: UserInfoProps) => {
  const t = useTranslations()
  const user = useStore(state => state.user)

  if (!user)
    return (
      <div className="p-4 bg-muted/50 rounded-lg mt-6">
        <p className="text-sm text-muted-foreground mb-3">
          {t('user.loginPrompt')}
        </p>
        <Button asChild className="w-full">
          <Link href="/login" onClick={props.handleClose}>
            {t('user.login')}
          </Link>
        </Button>
      </div>
    )

  return (
    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mt-6">
      <Avatar>
        <AvatarImage src={user.avatar || ''} />
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
