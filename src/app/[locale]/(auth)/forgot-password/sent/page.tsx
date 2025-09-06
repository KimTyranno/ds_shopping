import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link, redirect } from '@/i18n/navigation'
import { ArrowLeft, CheckCircle, Mail, RefreshCw } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'

export default async function PasswordResetSentPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams
  const t = await getTranslations('forgot_password.sent')
  const locale = await getLocale()
  const cookieStore = await cookies()
  const cookie = cookieStore.get('forgot_password_verified')

  if (!cookie || cookie.value !== 'true') {
    redirect({ href: '/', locale })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-bold text-2xl">{t('site_name')}</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              {t('email_sent_title')}
            </CardTitle>
            <CardDescription>{t('email_sent_description')}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 성공 메시지 */}
            <Alert className="border-green-200 bg-green-50">
              <Mail className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 whitespace-pre-line">
                <strong>{email}</strong>
                {t('email_sent_alert')}
              </AlertDescription>
            </Alert>

            {/* 다음 단계 안내 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t('next_steps_title')}</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>{t('step_check_email_title')}</strong>
                    <p className="text-muted-foreground">
                      {t('step_check_email_desc')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>{t('step_click_link_title')}</strong>
                    <p className="text-muted-foreground">
                      {t('step_click_link_desc')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>{t('step_set_new_password_title')}</strong>
                    <p className="text-muted-foreground">
                      {t('step_set_new_password_desc')}
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* 주의사항 */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">
                {t('note_title')}
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>{t('note_check_spam')}</li>
                <li>{t('note_link_expire')}</li>
                <li>{t('note_one_time_use')}</li>
              </ul>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('back_to_login')}
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent">
                <Link href="/forgot-password">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('resend_email')}
                </Link>
              </Button>
            </div>

            {/* 도움말 */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {t('email_not_received')}{' '}
                <Link href="/support" className="text-primary hover:underline">
                  {t('contact_support')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
