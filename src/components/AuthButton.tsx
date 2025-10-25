'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/client'
import useStore from '@/lib/store'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import AuthMenu from './AuthMenu'

export default function AuthButton() {
  const t = useTranslations()
  const router = useRouter()
  const user = useStore(state => state.user)

  const signOut = async () => {
    // 'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/login">
          <User className="h-5 w-5" />
          <span className="sr-only">{t('user.login')}</span>
        </Link>
      </Button>
    )
  }

  const isAdmin = user.user_role === 'admin'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">{t('user.menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm">{user.name || user.email}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <AuthMenu signOut={signOut} isAdmin={isAdmin} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
