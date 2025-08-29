import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { CheckCircle, Home, Mail, RefreshCw } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function DeleteSuccessPage() {
  const t = await getTranslations('mypage.profile_delete.success')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-center">
              {t('description')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 완료 메시지 */}
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('thankYou')}
                <br />
                {t('data_deleted')}
              </p>
            </div>

            {/* 처리 완료 안내 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">
                {t('summary_title')}
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  {t('summary_personal')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  {t('summary_orders')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  {t('summary_cart')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  {t('summary_rewards')}
                </li>
              </ul>
            </div>

            {/* 재가입 안내 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                {t('rejoin_title')}
              </h3>
              <p className="text-sm text-blue-700">
                {t('rejoin_description_line1')}
                <br />
                {t('rejoin_description_line2')}
              </p>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  {t('button_home')}
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent">
                <Link href="/signup">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('button_signup')}
                </Link>
              </Button>
            </div>

            {/* 고객지원 안내 */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                {t('support_ask')}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{t('support_phone')}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('support_hours')}
                </div>
              </div>
            </div>

            {/* 마지막 인사 */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground italic">
                {t('goodbye_message')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {t('goodbye_team')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
