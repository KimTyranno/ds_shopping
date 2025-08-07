import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/server'
import { Mail, Package, ShoppingBag, Truck, User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// 더미 주문 데이터
const dummyOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-20',
    status: '배송완료',
    total: 89000,
    items: [{ name: '무선 블루투스 이어폰', quantity: 1, price: 89000 }],
  },
  {
    id: 'ORD-002',
    date: '2024-01-18',
    status: '배송중',
    total: 65000,
    items: [{ name: '프리미엄 백팩', quantity: 1, price: 65000 }],
  },
  {
    id: 'ORD-003',
    date: '2024-01-15',
    status: '주문완료',
    total: 199000,
    items: [{ name: '스마트 워치', quantity: 1, price: 199000 }],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case '배송완료':
      return 'bg-green-100 text-green-800'
    case '배송중':
      return 'bg-blue-100 text-blue-800'
    case '주문완료':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case '배송완료':
      return <Package className="h-4 w-4" />
    case '배송중':
      return <Truck className="h-4 w-4" />
    case '주문완료':
      return <ShoppingBag className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default async function MyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
          <p className="text-muted-foreground">
            계정 정보와 주문 내역을 관리하세요
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 프로필 정보 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  프로필 정보
                </CardTitle>
                <CardDescription>
                  개인 정보를 확인하고 수정할 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={user.user_metadata?.name || ''}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" value={user.email || ''} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joined">가입일</Label>
                  <Input
                    id="joined"
                    value={new Date(user.created_at).toLocaleDateString(
                      'ko-KR',
                    )}
                    readOnly
                  />
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  프로필 수정
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 주문 내역 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  주문 내역
                </CardTitle>
                <CardDescription>최근 주문 내역을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyOrders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {order.date}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>{item.price.toLocaleString()}원</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <span className="font-semibold">총 결제금액</span>
                        <span className="font-bold text-primary">
                          {order.total.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href="/orders">전체 주문내역 보기</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">빠른 링크</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/orders">
                <ShoppingBag className="h-6 w-6 mb-2" />
                주문내역
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/cart">
                <ShoppingBag className="h-6 w-6 mb-2" />
                장바구니
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/wishlist">
                <User className="h-6 w-6 mb-2" />
                찜목록
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/support">
                <Mail className="h-6 w-6 mb-2" />
                고객지원
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
