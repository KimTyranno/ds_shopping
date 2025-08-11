'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  CheckCircle,
  Package,
  RotateCcw,
  Search,
  Truck,
  XCircle,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  options?: string
}

interface Order {
  id: string
  date: string
  status:
    | '주문완료'
    | '배송준비'
    | '배송중'
    | '배송완료'
    | '주문취소'
    | '반품완료'
  total: number
  items: OrderItem[]
  trackingNumber?: string
  deliveryAddress: string
}

// 더미 주문 데이터
const dummyOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-20',
    status: '배송완료',
    total: 1679000,
    trackingNumber: '123456789',
    deliveryAddress: '서울시 강남구 테헤란로 123',
    items: [
      {
        id: '1',
        name: '갤럭시 S24 Ultra',
        price: 1590000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Galaxy+S24',
        options: '색상: 티타늄 그레이, 용량: 256GB',
      },
      {
        id: '4',
        name: '프리미엄 코튼 셔츠',
        price: 89000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Cotton+Shirt',
        options: '색상: 화이트, 사이즈: L',
      },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-18',
    status: '배송중',
    total: 159000,
    trackingNumber: '987654321',
    deliveryAddress: '서울시 강남구 테헤란로 123',
    items: [
      {
        id: '7',
        name: '나이키 에어맥스 270',
        price: 159000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Nike+AirMax',
        options: '색상: 블랙, 사이즈: 270mm',
      },
    ],
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-15',
    status: '주문완료',
    total: 45000,
    deliveryAddress: '서울시 강남구 테헤란로 123',
    items: [
      {
        id: '8',
        name: '히알루론산 세럼',
        price: 45000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Serum',
        options: '용량: 30ml',
      },
    ],
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-10',
    status: '주문취소',
    total: 450000,
    deliveryAddress: '서울시 강남구 테헤란로 123',
    items: [
      {
        id: '5',
        name: '모던 소파 3인용',
        price: 450000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Modern+Sofa',
        options: '색상: 그레이',
      },
    ],
  },
]

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case '배송완료':
      return 'bg-green-100 text-green-800'
    case '배송중':
      return 'bg-blue-100 text-blue-800'
    case '배송준비':
      return 'bg-yellow-100 text-yellow-800'
    case '주문완료':
      return 'bg-purple-100 text-purple-800'
    case '주문취소':
      return 'bg-red-100 text-red-800'
    case '반품완료':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case '배송완료':
      return <CheckCircle className="h-4 w-4" />
    case '배송중':
      return <Truck className="h-4 w-4" />
    case '배송준비':
      return <Package className="h-4 w-4" />
    case '주문완료':
      return <Package className="h-4 w-4" />
    case '주문취소':
      return <XCircle className="h-4 w-4" />
    case '반품완료':
      return <RotateCcw className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>(dummyOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const t = useTranslations('orders')
  const tCommon = useTranslations('common')

  // 필터링된 주문 목록
  const getFilteredOrders = (status?: Order['status']) => {
    let filtered = orders

    if (status) {
      filtered = filtered.filter(order => order.status === status)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        order =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    }

    // 정렬
    if (sortBy === 'latest') {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    } else if (sortBy === 'oldest') {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
    }

    return filtered
  }

  const allOrders = getFilteredOrders()
  const completedOrders = getFilteredOrders('배송완료')
  const shippingOrders = getFilteredOrders('배송중')
  const cancelledOrders = getFilteredOrders('주문취소')

  const OrderCard = ({ order }: { order: Order }) => (
    <Card key={order.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold">{order.id}</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              <span className="ml-1">{t(`status.${order.status}`)}</span>
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">{order.date}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 주문 상품들 */}
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex gap-3">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                {item.options && (
                  <p className="text-xs text-muted-foreground">
                    {item.options}
                  </p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">
                    {item.price.toLocaleString() + tCommon('currency')} ×{' '}
                    {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 배송 정보 */}
        <div className="text-sm text-muted-foreground">
          <p>
            {t('card.deliveryAddress')}: {order.deliveryAddress}
          </p>
          {order.trackingNumber && (
            <p>
              {t('card.trackingNumber')}: {order.trackingNumber}
            </p>
          )}
        </div>

        {/* 총 금액 및 액션 버튼 */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="font-bold text-primary">
            {t('card.totalAmount', { amount: order.total.toLocaleString() })}
          </span>

          <div className="flex gap-2">
            {order.status === '배송완료' && (
              <>
                <Button variant="outline" size="sm" className="bg-transparent">
                  {t('card.buttons.writeReview')}
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  {t('card.buttons.reorder')}
                </Button>
              </>
            )}
            {order.status === '배송중' && order.trackingNumber && (
              <Button variant="outline" size="sm" className="bg-transparent">
                {t('card.buttons.trackDelivery')}
              </Button>
            )}
            {order.status === '주문완료' && (
              <Button variant="outline" size="sm" className="bg-transparent">
                {t('card.buttons.cancelOrder')}
              </Button>
            )}
            <Button variant="outline" size="sm" className="bg-transparent">
              {t('card.buttons.viewDetails')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/mypage">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
        </div>

        {/* 검색 및 정렬 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">{t('sortLatest')}</SelectItem>
              <SelectItem value="oldest">{t('sortOldest')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 주문 내역 탭 */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {t('tabs.all', { count: allOrders.length })}
            </TabsTrigger>
            <TabsTrigger value="shipping">
              {t('tabs.shipping', { count: shippingOrders.length })}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t('tabs.completed', { count: completedOrders.length })}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {t('tabs.cancelled', { count: cancelledOrders.length })}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {allOrders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {t('emptyAll.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('emptyAll.description')}
                </p>
                <Button asChild>
                  <Link href="/">{t('emptyAll.button')}</Link>
                </Button>
              </div>
            ) : (
              <div>
                {allOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            {shippingOrders.length === 0 ? (
              <div className="text-center py-16">
                <Truck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('empty.shipping')}</p>
              </div>
            ) : (
              <div>
                {shippingOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedOrders.length === 0 ? (
              <div className="text-center py-16">
                <CheckCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('empty.completed')}</p>
              </div>
            ) : (
              <div>
                {completedOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            {cancelledOrders.length === 0 ? (
              <div className="text-center py-16">
                <XCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('empty.cancelled')}</p>
              </div>
            ) : (
              <div>
                {cancelledOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
