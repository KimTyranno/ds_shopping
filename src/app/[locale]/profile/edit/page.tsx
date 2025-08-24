import ProfileEditForm from '@/components/ProfileEditForm'
import { Button } from '@/components/ui/button'
import { Link, redirect } from '@/i18n/navigation'
import { getFullUser } from '@/lib/auth'
import { ArrowLeft } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function ProfileEditPage() {
  const user = await getFullUser()
  const t = await getTranslations('mypage.profileEdit')
  const locale = await getLocale()

  if (!user) {
    return redirect({ href: '/login', locale })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/mypage">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
        </div>
        <ProfileEditForm user={user} />
      </div>
    </div>
  )
}
