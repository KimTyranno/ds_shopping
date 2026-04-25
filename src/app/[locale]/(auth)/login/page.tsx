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
import { Separator } from '@/components/ui/separator'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/client'
import Toast, { getToastType } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { CircleAlert, MailCheck } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Suspense, useActionState } from 'react'
import { login } from './action'

function LoginMessage() {
  const t = useTranslations('login.messages')
  const searchParams = useSearchParams()
  const alertMessage = searchParams.get('alertMessage')
  const alertType = searchParams.get('alertType')
  if (!alertMessage) return null

  return (
    <Alert
      className={cn('text-white bg-slate-600', {
        'bg-yellow-600': alertType === 'info',
        'bg-green-600': alertType === 'success',
      })}>
      {alertType === 'success' && <MailCheck />}
      {alertType === 'info' && <CircleAlert />}
      <AlertDescription className="text-inherit">
        {t(alertMessage)}
      </AlertDescription>
    </Alert>
  )
}

export default function LoginPage() {
  const tLogin = useTranslations('login')
  const tCommon = useTranslations('common')
  const currentLocale = useLocale()
  const [state, formAction] = useActionState(login, undefined)
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const messageType = searchParams.get('messageType')
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  /** 카카오 로그인 */
  const loginWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    })

    if (error) console.error(error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {state?.error && <Toast message={tLogin(state.error)} type="error" />}
      {message && (
        <Toast
          className="whitespace-pre-line"
          message={tLogin(`messages.${message}`)}
          type={getToastType(messageType)}
          callback={() => {
            // 쿼리스트링이 없는 /login 경로로 다시 대체
            router.replace(pathname)
          }}
        />
      )}
      <div className="max-w-md w-full space-y-8">
        <Suspense>
          <LoginMessage />
        </Suspense>
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-bold text-2xl">{tCommon('logo')}</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {tLogin('title')}
            </CardTitle>
            <CardDescription className="text-center">
              {tLogin('description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <input type="hidden" name="locale" value={currentLocale} />
              <div className="space-y-2">
                <Label htmlFor="email">{tLogin('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{tLogin('password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={tLogin('email_placeholder')}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button formAction={formAction} className="w-full">
                  {tLogin('submit')}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <Separator />
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {tLogin('no_account')}{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    {tLogin('signup')}
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline">
                    {tLogin('forgot_password')}
                  </Link>
                </p>
              </div>

              {/* Kakao 로그인 버튼 추가 */}
              <div className="mt-6 flex justify-center items-center">
                <Button
                  onClick={() => void loginWithKakao()}
                  className="p-0 bg-transparent" // 이미지 크기 맞추고 스타일 없애기
                >
                  <img
                    src="/icons/kakao_login_medium_wide_ko.png"
                    alt="kakao_login_button"
                    className="w-full h-auto"
                  />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
