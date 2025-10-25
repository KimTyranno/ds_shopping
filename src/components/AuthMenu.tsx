'use client'

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Link } from '@/i18n/navigation'
import { LogOut, Settings, ShieldUser, ShoppingBag } from 'lucide-react'
import { useTranslations } from 'next-intl'

type AuthMenuProps = {
  signOut: () => Promise<void>
  isAdmin: boolean
}

// next-intl의 Link로 변경하니, 뭔가 호환성 이슈때문에 표시되지 않아서 따로 분리함
export default function AuthMenu({ signOut, isAdmin }: AuthMenuProps) {
  const t = useTranslations()

  return (
    <>
      {isAdmin && (
        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex items-center">
            <ShieldUser className="mr-2 h-4 w-4" />
            {t('user.admin')}
          </Link>
        </DropdownMenuItem>
      )}
      <DropdownMenuItem asChild>
        <Link href="/mypage" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          {t('user.mypage')}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/orders" className="flex items-center">
          <ShoppingBag className="mr-2 h-4 w-4" />
          {t('user.orders')}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <form action={signOut}>
          <button className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            {t('user.logout')}
          </button>
        </form>
      </DropdownMenuItem>
    </>
  )
}
