import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Headphones, Shield, Truck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function FeaturedSection() {
  const tFeatcured = useTranslations('featuredSection')
  const tCommon = useTranslations('common')

  const features = [
    {
      icon: Truck,
      title: tFeatcured('features.freeShipping.title'),
      description: tFeatcured('features.freeShipping.description'),
    },
    {
      icon: Shield,
      title: tFeatcured('features.securePayment.title'),
      description: tFeatcured('features.securePayment.description'),
    },
    {
      icon: Headphones,
      title: tFeatcured('features.support.title'),
      description: tFeatcured('features.support.description'),
    },
    {
      icon: Gift,
      title: tFeatcured('features.points.title'),
      description: tFeatcured('features.points.description'),
    },
  ]
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 서비스 특징 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA 섹션 */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {tFeatcured('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            {tFeatcured('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">{tCommon('signup')}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              asChild>
              <Link href="/products">{tFeatcured('cta.browse')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
