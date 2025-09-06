import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { AlertCircle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function AuthCodeErrorPage() {
  const t = await getTranslations('auth_code_error')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl">
              {t('error_verification_title')}
            </CardTitle>
            <CardDescription>
              {t('error_verification_description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center whitespace-pre-line">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('error_verification_details')}
              </p>
              <Button asChild className="w-full">
                <Link href="/login">{t('button_back_to_login')}</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent">
                <Link href="/">{t('button_go_home')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
