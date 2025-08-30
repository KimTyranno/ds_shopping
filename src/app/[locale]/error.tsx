'use client'

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
import { useTranslations } from 'next-intl'

export default function Error({ error }: { error: Error }) {
  const t = useTranslations('error')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>
              {/* NOTE: 국제화 하려면 "messages.키" 형식으로 보내야함*/}
              {error.message
                ? error.message.startsWith('messages.')
                  ? t(error.message)
                  : error.message
                : t('messages.default')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">{t('back_to_login')}</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent">
                <Link href="/">{t('go_home')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
