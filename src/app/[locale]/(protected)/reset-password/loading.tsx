import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Lock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations('reset_password')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-bold text-2xl">{t('site_name')}</span>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Lock className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            <div className="space-y-3">
              {/* 제목 스켈레톤 */}
              <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto animate-pulse"></div>
              {/* 설명 스켈레톤 */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 폼 스켈레톤 */}
            <div className="space-y-4">
              {/* 새 비밀번호 필드 */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="relative">
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* 비밀번호 강도 표시 스켈레톤 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-gray-300 rounded-full w-1/3 animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* 비밀번호 확인 필드 */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                <div className="relative">
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* 버튼 스켈레톤 */}
              <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* 보안 안내 스켈레톤 */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="h-5 bg-blue-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="space-y-1">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="h-3 bg-blue-200 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* 로딩 메시지 */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">{t('loading')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 추가 로딩 인디케이터 */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
