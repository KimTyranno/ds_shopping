import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/navigation'
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Truck,
  XCircle,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  options?: string
  brand: string
}

interface OrderDetail {
  id: string
  date: string
  status:
    | '주문완료'
    | '배송준비'
    | '배송중'
    | '배송완료'
    | '주문취소'
    | '반품완료'
  items: OrderItem[]

  // 결제 정보
  subtotal: number
  discount: number
  deliveryFee: number
  total: number
  paymentMethod: string
  paymentDate: string

  // 배송 정보
  trackingNumber?: string
  deliveryAddress: {
    recipient: string
    phone: string
    address: string
    detailAddress: string
    zipCode: string
    memo?: string
  }

  // 주문자 정보
  orderer: {
    name: string
    phone: string
    email: string
  }
}

// 더미 주문 상세 데이터
const getOrderDetail = (id: string): OrderDetail | null => {
  const orders: Record<string, OrderDetail> = {
    'ORD-2024-001': {
      id: 'ORD-2024-001',
      date: '2024-01-20',
      status: '배송완료',
      items: [
        {
          id: '1',
          name: '갤럭시 S24 Ultra',
          price: 1590000,
          quantity: 1,
          image: 'https://picsum.photos/seed/galaxy-s24-ultra/300/300',
          options: '색상: 티타늄 그레이, 용량: 256GB',
          brand: '삼성',
        },
        {
          id: '4',
          name: '프리미엄 코튼 셔츠',
          price: 89000,
          quantity: 1,
          image: 'https://picsum.photos/seed/premium-cotton-shirt/300/300',
          options: '색상: 화이트, 사이즈: L',
          brand: '유니클로',
        },
      ],
      subtotal: 1679000,
      discount: 0,
      deliveryFee: 0,
      total: 1679000,
      paymentMethod: '신용카드',
      paymentDate: '2024-01-20 14:30:25',
      trackingNumber: '123456789',
      deliveryAddress: {
        recipient: '홍길동',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123',
        detailAddress: '456호',
        zipCode: '06234',
        memo: '부재시 경비실에 맡겨주세요',
      },
      orderer: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com',
      },
    },
    'ORD-2024-002': {
      id: 'ORD-2024-002',
      date: '2024-01-18',
      status: '배송중',
      items: [
        {
          id: '7',
          name: '나이키 에어맥스 270',
          price: 159000,
          quantity: 1,
          image: 'https://picsum.photos/seed/nike-airmax-270/300/300',
          options: '색상: 블랙, 사이즈: 270mm',
          brand: '나이키',
        },
      ],
      subtotal: 189000,
      discount: 30000,
      deliveryFee: 0,
      total: 159000,
      paymentMethod: '카카오페이',
      paymentDate: '2024-01-18 10:15:42',
      trackingNumber: '987654321',
      deliveryAddress: {
        recipient: '홍길동',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123',
        detailAddress: '456호',
        zipCode: '06234',
      },
      orderer: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com',
      },
    },
    'ORD-2024-003': {
      id: 'ORD-2024-003',
      date: '2024-01-15',
      status: '주문완료',
      items: [
        {
          id: '8',
          name: '히알루론산 세럼',
          price: 45000,
          quantity: 1,
          image: 'https://picsum.photos/seed/hyaluronic-serum/300/300',
          options: '용량: 30ml',
          brand: '더마토리',
        },
      ],
      subtotal: 45000,
      discount: 0,
      deliveryFee: 0,
      total: 45000,
      paymentMethod: '무통장입금',
      paymentDate: '2024-01-15 09:45:00',
      trackingNumber: '',
      deliveryAddress: {
        recipient: '홍길동',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123',
        detailAddress: '456호',
        zipCode: '06234',
      },
      orderer: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com',
      },
    },
    'ORD-2024-004': {
      id: 'ORD-2024-004',
      date: '2024-01-10',
      status: '주문취소',
      items: [
        {
          id: '5',
          name: '모던 소파 3인용',
          price: 450000,
          quantity: 1,
          image: 'https://picsum.photos/seed/modern-sofa/300/300',
          options: '색상: 그레이',
          brand: '리바트',
        },
      ],
      subtotal: 450000,
      discount: 0,
      deliveryFee: 0,
      total: 450000,
      paymentMethod: '신용카드',
      paymentDate: '2024-01-10 12:00:00',
      trackingNumber: '',
      deliveryAddress: {
        recipient: '홍길동',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123',
        detailAddress: '456호',
        zipCode: '06234',
        memo: '배송 전 연락주세요',
      },
      orderer: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong@example.com',
      },
    },
  }

  return orders[id] || null
}

const getStatusColor = (status: OrderDetail['status']) => {
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

const getStatusIcon = (status: OrderDetail['status']) => {
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

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const order = getOrderDetail(id)
  const t = useTranslations('orders.detail')
  const tStatus = useTranslations('orders.status')
  const tCommon = useTranslations('common')

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">
              {t('order_number', { id: order.id })}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 주문 상태 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t('status_title')}
                </CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{tStatus(order.status)}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('order_date')}
                  </p>
                  <p className="font-medium">
                    {new Date(order.date).toLocaleDateString('ko-KR')}{' '}
                    {new Date(order.paymentDate).toLocaleTimeString('ko-KR')}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t('tracking_number')}
                    </p>
                    <p className="font-medium">{order.trackingNumber}</p>
                  </div>
                )}
              </div>

              {order.status === '배송중' && order.trackingNumber && (
                <div className="mt-4">
                  <Button variant="outline" className="bg-transparent">
                    <Truck className="w-4 h-4 mr-2" />
                    {t('tracking_button')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 주문 상품 */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t('items_title', { count: order.items.length })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg">
                    <Link href={`/products/${item.id}`}>
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.brand}
                      </p>
                      {item.options && (
                        <p className="text-sm text-muted-foreground">
                          {item.options}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium">
                          {item.price.toLocaleString() + tCommon('currency')} ×{' '}
                          {item.quantity}
                        </span>
                        <span className="font-bold text-primary">
                          {(item.price * item.quantity).toLocaleString() +
                            tCommon('currency')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 배송 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t('delivery_info')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('recipient')}
                  </p>
                  <p className="font-medium">
                    {order.deliveryAddress.recipient}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('phone')}</p>
                  <p className="font-medium">{order.deliveryAddress.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('address')}
                  </p>
                  <p className="font-medium">
                    ({order.deliveryAddress.zipCode}){' '}
                    {order.deliveryAddress.address}{' '}
                    {order.deliveryAddress.detailAddress}
                  </p>
                </div>
                {order.deliveryAddress.memo && (
                  <div>
                    <p className="text-sm text-muted-foreground">{t('memo')}</p>
                    <p className="font-medium">{order.deliveryAddress.memo}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 결제 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('payment_info')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>
                    {order.subtotal.toLocaleString() + tCommon('currency')}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>{t('discount')}</span>
                    <span>
                      -{order.discount.toLocaleString() + tCommon('currency')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t('delivery_fee')}</span>
                  <span>
                    {order.deliveryFee === 0
                      ? t('delivery_free')
                      : order.deliveryFee.toLocaleString() +
                        tCommon('currency')}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{t('total')}</span>
                  <span className="text-primary">
                    {order.total.toLocaleString() + tCommon('currency')}
                  </span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>{t('payment_method')}</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>{t('payment_date')}</span>
                    <span>
                      {new Date(order.paymentDate).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 주문자 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {t('orderer_info')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">{t('name')}</p>
                  <p className="font-medium">{order.orderer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('phone')}</p>
                  <p className="font-medium">{order.orderer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('email')}</p>
                  <p className="font-medium">{order.orderer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-3">
            {order.status === '배송완료' && (
              <>
                <Button variant="outline" className="bg-transparent">
                  {t('actions.write_review')}
                </Button>
                <Button variant="outline" className="bg-transparent">
                  {t('actions.reorder')}
                </Button>
                <Button variant="outline" className="bg-transparent">
                  {t('actions.request_return')}
                </Button>
              </>
            )}
            {order.status === '주문완료' && (
              <Button variant="outline" className="bg-transparent">
                {t('actions.cancel_order')}
              </Button>
            )}
            <Button variant="outline" className="bg-transparent">
              {t('actions.print_receipt')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
