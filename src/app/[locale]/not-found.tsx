'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { Compass, Home, Search, ShoppingBag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect } from 'react'

export default function NotFound() {
  const t = useTranslations('not_found')

  // 여기에는 pathname이 변경되지 않으므로 scrollToTop 사용못하고 따로 처리
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 왼쪽 이미지 영역 */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/404_error.svg"
                alt="404 에러 이미지"
                width={400}
                height={400}
                className="w-full max-w-md mx-auto"
              />

              {/* 플로팅 요소들 */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute top-1/2 left-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-40 animate-bounce delay-300"></div>
            </div>
          </div>

          {/* 오른쪽 콘텐츠 영역 */}
          <div className="space-y-6">
            {/* 404 텍스트 */}
            <div className="space-y-4">
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                404
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('description_1')}
                <br />
                {t('description_2')}
              </p>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/" className="flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  {t('button.home')}
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent">
                <Link href="/search" className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  {t('button.search')}
                </Link>
              </Button>
            </div>

            {/* 추천 링크들 */}
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">
                  {t('recommendation.title')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/best"
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/70 transition-colors group">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm group-hover:text-purple-600 transition-colors">
                        {t('recommendation.best_title')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('recommendation.best_description')}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/new"
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/70 transition-colors group">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <Compass className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm group-hover:text-purple-600 transition-colors">
                        {t('recommendation.new_title')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('recommendation.new_description')}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/sale"
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/70 transition-colors group">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">%</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm group-hover:text-purple-600 transition-colors">
                        {t('recommendation.sale_title')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('recommendation.sale_description')}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/categories"
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/70 transition-colors group">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm group-hover:text-purple-600 transition-colors">
                        {t('recommendation.categories_title')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t('recommendation.categories_description')}
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 도움말 */}
            <div className="text-sm text-gray-500">
              <p>
                {t('help_message')}
                <Link
                  href="/support"
                  className="text-purple-600 hover:underline">
                  {t('help_link')}
                </Link>
                {t('help_after')}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 검색 바 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-4">{t('search_prompt')}</p>
            <form
              onSubmit={e => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const query = formData.get('search') as string
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                }
              }}
              className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                name="search"
                type="text"
                placeholder={t('search_placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
