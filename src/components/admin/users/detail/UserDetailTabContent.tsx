import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package } from 'lucide-react'

export default function UserDetailTabContent() {
  // 더미 데이터
  const userDummy = {
    grade: 'VIP',
    totalOrders: 15,
    totalSpent: 1250000,
    address: '서울시 강남구 테헤란로 123',
    birthDate: '1985-03-15',
    gender: '남성',
    marketingConsent: true,
    orders: [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: '배송완료',
        amount: 89000,
        items: 3,
        products: ['스마트폰 케이스', '무선 이어폰', '충전기'],
      },
      {
        id: 'ORD-002',
        date: '2024-01-10',
        status: '배송중',
        amount: 156000,
        items: 2,
        products: ['노트북 가방', '마우스 패드'],
      },
      {
        id: 'ORD-003',
        date: '2024-01-05',
        status: '주문취소',
        amount: 45000,
        items: 1,
        products: ['블루투스 스피커'],
      },
    ],
    activities: [
      {
        date: '2024-01-15 14:30',
        action: '로그인',
        details: '웹사이트 로그인',
      },
      {
        date: '2024-01-15 14:25',
        action: '주문완료',
        details: '주문번호: ORD-001',
      },
      {
        date: '2024-01-14 16:20',
        action: '장바구니 추가',
        details: '스마트폰 케이스 추가',
      },
      {
        date: '2024-01-14 16:15',
        action: '상품조회',
        details: '스마트폰 액세서리 카테고리',
      },
    ],
    gradeHistory: [
      {
        date: '2024-01-01',
        from: '골드',
        to: 'VIP',
        reason: '연간 구매액 100만원 달성',
        admin: '관리자',
      },
      {
        date: '2023-09-15',
        from: '실버',
        to: '골드',
        reason: '누적 주문 10회 달성',
        admin: '시스템',
      },
      {
        date: '2023-06-15',
        from: '일반',
        to: '실버',
        reason: '첫 구매 완료',
        admin: '시스템',
      },
    ],
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case '배송완료':
        return <Badge className="bg-green-100 text-green-800">배송완료</Badge>
      case '배송중':
        return <Badge className="bg-blue-100 text-blue-800">배송중</Badge>
      case '주문취소':
        return <Badge className="bg-red-100 text-red-800">주문취소</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="lg:col-span-2">
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="orders">주문 내역</TabsTrigger>
          {/* TODO: 활동로그는 추후에 업데이트 */}
          {/* <TabsTrigger value="activity">활동 로그</TabsTrigger> */}
          {/* TODO: 등급은 추후에 업데이트 */}
          {/* <TabsTrigger value="grade-history">등급 변경 이력</TabsTrigger> */}
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                주문 내역 ({userDummy.orders.length}건)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDummy.orders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{order.id}</span>
                        {getOrderStatusBadge(order.status)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {order.date}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">주문 금액</span>
                        <p className="font-medium">
                          ₩{order.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">상품 수량</span>
                        <p className="font-medium">{order.items}개</p>
                      </div>
                      <div>
                        <span className="text-gray-600">주문 상품</span>
                        <p className="font-medium">
                          {order.products.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Button variant="outline" size="sm">
                        주문 상세보기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* TODO: 활동로그는 추후에 업데이트 */}
        {/* <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    활동 로그
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userDummy.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {activity.action}
                            </span>
                            <span className="text-sm text-gray-500">
                              {activity.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}

        {/* TODO: 등급은 추후에 업데이트 */}
        {/* <TabsContent value="grade-history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    등급 변경 이력
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userDummy.gradeHistory.map((history, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getGradeBadge(history.from)}
                            <span className="text-gray-400">→</span>
                            {getGradeBadge(history.to)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {history.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {history.reason}
                        </p>
                        <p className="text-xs text-gray-500">
                          변경자: {history.admin}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
      </Tabs>
    </div>
  )
}
