import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

// 임시 베스트 상품 데이터
const bestProducts = [
  {
    id: 1,
    name: "무선 블루투스 이어폰",
    price: 89000,
    originalPrice: 120000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 1234,
    badge: "BEST",
  },
  {
    id: 2,
    name: "프리미엄 백팩",
    price: 65000,
    originalPrice: 85000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 856,
    badge: "HOT",
  },
  {
    id: 3,
    name: "스마트 워치",
    price: 199000,
    originalPrice: 250000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 2341,
    badge: "NEW",
  },
  {
    id: 4,
    name: "휴대용 스피커",
    price: 45000,
    originalPrice: 60000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 678,
    badge: "SALE",
  },
]

export default function BestProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">베스트 상품</h2>
          <p className="text-lg text-muted-foreground">고객들이 가장 많이 선택한 인기 상품들</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3" variant={product.badge === "BEST" ? "default" : "secondary"}>
                    {product.badge}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-primary">{product.price.toLocaleString()}원</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {product.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/products/${product.id}`}>상세보기</Link>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    장바구니
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/best">베스트 상품 더보기</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
