import { Card, CardContent } from '@/components/ui/card'
import { Book, Dumbbell, Heart, Home, Shirt, Smartphone } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: '전자제품',
    icon: Smartphone,
    href: '/categories/electronics',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    name: '패션',
    icon: Shirt,
    href: '/categories/fashion',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 3,
    name: '홈&리빙',
    icon: Home,
    href: '/categories/home',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 4,
    name: '도서',
    icon: Book,
    href: '/categories/books',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 5,
    name: '운동',
    icon: Dumbbell,
    href: '/categories/sports',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 6,
    name: '뷰티',
    icon: Heart,
    href: '/categories/beauty',
    color: 'bg-red-100 text-red-600',
  },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">카테고리</h2>
          <p className="text-lg text-muted-foreground">
            다양한 카테고리의 상품을 둘러보세요
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
