'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ArrowLeft, CircleAlert, Mail, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useActionState } from 'react'
import { sendPasswordResetEmailAction } from './actions'

export default function ForgotPasswordPage() {
  const t = useTranslations('forgot_password')
  const [state, formAction] = useActionState(
    sendPasswordResetEmailAction,
    undefined,
  )
  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          {/* 알림 메시지 */}
          {state?.error && (
            <Alert className={cn('text-white bg-red-600 mb-5')}>
              <CircleAlert />
              <AlertDescription className="text-inherit">
                {t(`messages.${state.error}`)}
              </AlertDescription>
            </Alert>
          )}
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('back_to_login')}
          </Link>

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
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">
              {t('forgot_password_title')}
            </CardTitle>
            <CardDescription className="whitespace-pre-line">
              {t('forgot_password_description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email_label')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('email_placeholder')}
                  required
                  className="text-center"
                />
                <p className="text-sm text-muted-foreground text-center">
                  {t('email_input_helper')}
                </p>
              </div>

              <Button formAction={formAction} className="w-full" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                {t('send_reset_email_button')}
              </Button>
            </form>

            {/* 추가 정보 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                {t('info_title')}
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('info_check_spam')}</li>
                <li>{t('info_link_expiry')}</li>
                <li>{t('info_contact_support')}</li>
              </ul>
            </div>

            {/* 하단 링크 */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t('forgot_email_question')}{' '}
                <Link href="/support" className="text-primary hover:underline">
                  {t('contact_support_link')}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                {t('no_account_question')}{' '}
                <Link href="/signup" className="text-primary hover:underline">
                  {t('signup_link')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
