import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Headphones, Gift } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Truck,
    title: "무료배송",
    description: "5만원 이상 구매시 무료배송",
  },
  {
    icon: Shield,
    title: "안전결제",
    description: "100% 안전한 결제 시스템",
  },
  {
    icon: Headphones,
    title: "24시간 고객지원",
    description: "언제든지 문의하세요",
  },
  {
    icon: Gift,
    title: "적립혜택",
    description: "구매금액의 1% 적립",
  },
]

export default function FeaturedSection() {
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
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA 섹션 */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 가입하고 특별 혜택을 받아보세요!</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            신규 회원 가입시 10% 할인 쿠폰과 무료배송 혜택을 드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">회원가입하기</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/products">상품 둘러보기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
