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
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { CircleAlert } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { signupAction } from './actions'

export default async function SignupPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ error: string; message: string }>
  params: Promise<{ locale: string }>
}) {
  const { error, message } = await searchParams
  const tSignup = await getTranslations('signup')
  const tCommon = await getTranslations('common')
  const { locale } = await params

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {(error || message) && (
          <Alert className={cn('text-white bg-orange-500')}>
            <CircleAlert />
            <AlertDescription className="text-inherit">
              {error ? tSignup(error) : message}
            </AlertDescription>
          </Alert>
        )}
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
              {tSignup('title')}
            </CardTitle>
            <CardDescription className="text-center">
              {tSignup('subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <input type="hidden" name="locale" value={locale} />
              <div className="space-y-2">
                <Label htmlFor="name">{tSignup('name')}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={tSignup('placeholder')}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{tSignup('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{tSignup('password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={tSignup('password_placeholder')}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {tSignup('confirmPassword')}
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder={tSignup('confirm_password_placeholder')}
                  required
                />
              </div>
              <Button formAction={signupAction} className="w-full">
                {tSignup('submit')}
              </Button>
            </form>

            <div className="mt-6">
              <Separator />
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {tSignup('already_have_account')}{' '}
                  <Link href="/login" className="text-primary hover:underline">
                    {tSignup('login_link')}
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
