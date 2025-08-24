import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, redirect } from '@/i18n/navigation'
import { getFullUser } from '@/lib/auth'
import { createClient } from '@/lib/server'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getLocale } from 'next-intl/server'
import AuthMenu from './AuthMenu'

export default async function AuthButton() {
  const t = useTranslations()
  const currentLocale = await getLocale()

  const user = await getFullUser()

  const signOut = async () => {
    'use server'

    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect({ href: '/login', locale: currentLocale })
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
        <AuthMenu signOut={signOut} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
