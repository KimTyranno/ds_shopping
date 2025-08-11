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
import useStore from '@/lib/store'
import { cn } from '@/lib/utils'
import { CircleAlert, MailCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { login } from '../../../components/auth/login'

function LoginMessage() {
  const t = useTranslations('login.messages')
  const searchParams = useSearchParams()
  const messageType = searchParams.get('messageType')
  if (!messageType) return null

  return (
    <Alert
      className={cn('text-white', {
        'bg-yellow-600': messageType === 'info',
        'bg-green-600': messageType === 'success',
      })}>
      {messageType === 'success' && <MailCheck />}
      {messageType === 'info' && <CircleAlert />}
      <AlertDescription className="text-inherit">
        {t(messageType)}
      </AlertDescription>
    </Alert>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const setUser = useStore(state => state.setUser)
  const tLogin = useTranslations('login')
  const tCommon = useTranslations('common')
  const handleLogin = async (formData: FormData) => {
    try {
      const { user } = await login(formData)
      if (user) {
        setUser(user)
        router.push('/')
      }
    } catch {
      toast(tLogin('loginFail'), {
        position: 'top-center',
        style: { background: '#e25c5c', color: '#fff' },
      })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
            <form className="space-y-4" action={handleLogin}>
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
                  placeholder={tLogin('emailPlaceholder')}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full" type="submit">
                  {tLogin('submit')}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <Separator />
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {tLogin('noAccount')}{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    {tLogin('signup')}
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
