import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { ArrowRight, ShoppingBag, Star, Users, Zap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Hero() {
  const t = await getTranslations('hero')
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fillRule='evenodd'%3e%3cg fill='%23ffffff' fillOpacity='0.1'%3e%3ccircle cx='30' cy='30' r='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
            backgroundSize: '60px 60px',
          }}></div>
      </div>

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽 콘텐츠 */}
          <div className="space-y-8 text-white">
            {/* 배지 */}
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                {t('badge')}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-purple-200">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{t('satisfaction')}</span>
              </div>
            </div>

            {/* 메인 헤딩 */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {t('heading_line1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('heading_line2')}
                </span>
                <br />
                <span className="text-white">{t('heading_line3')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-lg">
                {t('subheading')}
              </p>
            </div>

            {/* 통계 */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-purple-200">
                    {t('satisfied_customers')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-pink-400" />
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-purple-200">
                    {t('product_count_label')}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                asChild>
                <Link href="/new" className="group">
                  {t('cta_shop_now')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold bg-white/5"
                asChild>
                <Link href="/best">{t('cta_best_products')}</Link>
              </Button>
            </div>

            {/* 특별 혜택 안내 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-300">
                  {t('special_offer_title')}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-purple-100">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  {t('offer_new_member')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  {t('offer_free_shipping')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  {t('offer_point')}
                </li>
              </ul>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="relative">
            {/* 메인 이미지 */}
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/hero_image.svg"
                  alt="쇼핑 이미지"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />

                {/* 이미지 위 오버레이 카드들 */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {t('today_special')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {t('today_discount')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">1,000+</div>
                      <div className="text-sm text-gray-600">
                        {t('satisfied_customers')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 배경 장식 요소들 */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>

            {/* 플로팅 요소들 */}
            <div className="absolute top-1/4 -left-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl rotate-12 opacity-80 animate-bounce"></div>
            <div className="absolute bottom-1/3 -right-6 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-70 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
