import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              최고의 상품을
              <br />
              <span className="text-yellow-300">특별한 가격</span>으로
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              엄선된 상품들을 합리적인 가격에 만나보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">쇼핑하기</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild>
                <Link href="/best">베스트 상품 보기</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://picsum.photos/seed/shopping/500/400"
              alt="쇼핑 이미지"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
