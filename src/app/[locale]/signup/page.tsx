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
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { signupAction } from './actions'

export default function SignupPage() {
  const tSignup = useTranslations('signup')
  const tCommon = useTranslations('common')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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
                  placeholder={tSignup('passwordPlaceholder')}
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
                  placeholder={tSignup('confirmPasswordPlaceholder')}
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
                  {tSignup('alreadyHaveAccount')}{' '}
                  <Link href="/login" className="text-primary hover:underline">
                    {tSignup('loginLink')}
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
