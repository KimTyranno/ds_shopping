'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Edit,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Truck,
  User,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

// 더미 주문 데이터
const orderData = {
  'ORD-001': {
    id: 'ORD-001',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: '배송완료',
    paymentStatus: '결제완료',
    items: [
      {
        id: '1',
        name: '스마트폰 케이스',
        price: 29000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Phone+Case',
        options: '색상: 블랙, 모델: iPhone 15',
        brand: '애플',
      },
      {
        id: '2',
        name: '무선 이어폰',
        price: 45000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Earphones',
        options: '색상: 화이트',
        brand: '삼성',
      },
      {
        id: '3',
        name: '충전기',
        price: 15000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Charger',
        options: '타입: USB-C',
        brand: '애플',
      },
    ],
    subtotal: 89000,
    discount: 0,
    deliveryFee: 0,
    total: 89000,
    paymentMethod: '신용카드',
    paymentDate: '2024-01-15 14:30:25',
    trackingNumber: '123456789',
    deliveryCompany: 'CJ대한통운',
    estimatedDelivery: '2024-01-17',
    actualDelivery: '2024-01-16',

    // 주문자 정보
    customer: {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      grade: 'VIP',
    },

    // 배송 정보
    delivery: {
      recipient: '김철수',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: '456호',
      zipCode: '06234',
      memo: '부재시 경비실에 맡겨주세요',
    },

    // 주문 히스토리
    history: [
      {
        date: '2024-01-16 15:30',
        status: '배송완료',
        description: '상품이 배송 완료되었습니다.',
        location: '서울시 강남구',
      },
      {
        date: '2024-01-16 09:00',
        status: '배송중',
        description: '상품이 배송 중입니다.',
        location: '서울 물류센터',
      },
      {
        date: '2024-01-15 18:00',
        status: '배송준비',
        description: '상품 포장이 완료되어 배송 준비 중입니다.',
        location: '경기 물류센터',
      },
      {
        date: '2024-01-15 14:30',
        status: '주문완료',
        description: '주문이 접수되었습니다.',
        location: '온라인',
      },
    ],
  },
  'ORD-002': {
    id: 'ORD-002',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-10',
    status: '배송중',
    paymentStatus: '결제완료',
    items: [
      {
        id: '4',
        name: '노트북 가방',
        price: 89000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Laptop+Bag',
        options: '색상: 블랙, 사이즈: 15인치',
        brand: '삼소나이트',
      },
      {
        id: '5',
        name: '마우스 패드',
        price: 25000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80&text=Mouse+Pad',
        options: '색상: 그레이, 사이즈: 대형',
        brand: '로지텍',
      },
    ],
    subtotal: 114000,
    discount: 0,
    deliveryFee: 3000,
    total: 117000,
    paymentMethod: '카카오페이',
    paymentDate: '2024-01-10 10:15:42',
    trackingNumber: '987654321',
    deliveryCompany: '한진택배',
    estimatedDelivery: '2024-01-12',
    actualDelivery: '',

    customer: {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      grade: 'VIP',
    },

    delivery: {
      recipient: '김철수',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: '456호',
      zipCode: '06234',
      memo: '',
    },

    history: [
      {
        date: '2024-01-11 14:20',
        status: '배송중',
        description: '상품이 배송 중입니다.',
        location: '서울 강남구',
      },
      {
        date: '2024-01-11 09:00',
        status: '배송준비',
        description: '상품 포장이 완료되어 배송 준비 중입니다.',
        location: '경기 물류센터',
      },
      {
        date: '2024-01-10 10:15',
        status: '주문완료',
        description: '주문이 접수되었습니다.',
        location: '온라인',
      },
    ],
  },
}

interface OrderData {
  id: string
  orderNumber: string
  date: string
  status: string
  paymentStatus: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  subtotal: number
  discount: number
  deliveryFee: number
  total: number
  paymentMethod: string
  paymentDate: string
  trackingNumber?: string
  deliveryCompany?: string
  estimatedDelivery?: string
  actualDelivery?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delivery: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any[]
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const order = orderData[orderId as keyof typeof orderData]

  const [statusChangeOpen, setStatusChangeOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [statusChangeReason, setStatusChangeReason] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  if (!order) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            주문을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">
            요청하신 주문 정보가 존재하지 않습니다.
          </p>
          <Link href="/admin/orders">
            <Button>주문 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '배송완료':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            배송완료
          </Badge>
        )
      case '배송중':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Truck className="h-3 w-3 mr-1" />
            배송중
          </Badge>
        )
      case '배송준비':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Package className="h-3 w-3 mr-1" />
            배송준비
          </Badge>
        )
      case '주문완료':
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Clock className="h-3 w-3 mr-1" />
            주문완료
          </Badge>
        )
      case '주문취소':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            주문취소
          </Badge>
        )
      case '환불완료':
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <RefreshCw className="h-3 w-3 mr-1" />
            환불완료
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case '결제완료':
        return <Badge className="bg-green-100 text-green-800">결제완료</Badge>
      case '결제대기':
        return <Badge className="bg-yellow-100 text-yellow-800">결제대기</Badge>
      case '결제실패':
        return <Badge className="bg-red-100 text-red-800">결제실패</Badge>
      case '환불완료':
        return <Badge className="bg-gray-100 text-gray-800">환불완료</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleStatusChange = async () => {
    if (!newStatus || !statusChangeReason.trim()) {
      // toast({
      //   title: '오류',
      //   description: '상태와 변경 사유를 모두 입력해주세요.',
      //   variant: 'destructive',
      // })
      return
    }

    setIsUpdating(true)
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 상태 변경 히스토리 추가
      const newHistory = {
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: newStatus,
        description: `관리자에 의해 상태가 변경되었습니다: ${statusChangeReason}`,
        location: '관리자',
      }

      order.history.unshift(newHistory)
      order.status = newStatus

      setStatusChangeOpen(false)
      setNewStatus('')
      setStatusChangeReason('')

      // toast({
      //   title: '성공',
      //   description: '주문 상태가 성공적으로 변경되었습니다.',
      // })
    } catch (error) {
      // toast({
      //   title: '오류',
      //   description: '상태 변경에 실패했습니다.',
      //   variant: 'destructive',
      // })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">주문 상세정보</h1>
            <p className="text-gray-600">주문번호: {order.orderNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={statusChangeOpen} onOpenChange={setStatusChangeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                상태 변경
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>주문 상태 변경</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>현재 상태</Label>
                  <div className="mt-1">{getStatusBadge(order.status)}</div>
                </div>
                <div>
                  <Label>변경할 상태</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="주문완료">주문완료</SelectItem>
                      <SelectItem value="배송준비">배송준비</SelectItem>
                      <SelectItem value="배송중">배송중</SelectItem>
                      <SelectItem value="배송완료">배송완료</SelectItem>
                      <SelectItem value="주문취소">주문취소</SelectItem>
                      <SelectItem value="환불완료">환불완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>변경 사유</Label>
                  <Textarea
                    className="mt-1"
                    placeholder="상태 변경 사유를 입력하세요"
                    value={statusChangeReason}
                    onChange={e => setStatusChangeReason(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={void handleStatusChange()}
                    disabled={isUpdating}>
                    {isUpdating ? '변경 중...' : '변경'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setStatusChangeOpen(false)
                      setNewStatus('')
                      setStatusChangeReason('')
                    }}>
                    취소
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            영수증 출력
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 주문 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 주문 상태 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  주문 상태
                </span>
                <div className="flex gap-2">
                  {getStatusBadge(order.status)}
                  {getPaymentStatusBadge(order.paymentStatus)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">주문일시</p>
                  <p className="font-medium">
                    {new Date(order.date).toLocaleDateString('ko-KR')}{' '}
                    {new Date(order.paymentDate).toLocaleTimeString('ko-KR')}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-gray-600">운송장번호</p>
                    <p className="font-medium">{order.trackingNumber}</p>
                  </div>
                )}
                {order.deliveryCompany && (
                  <div>
                    <p className="text-sm text-gray-600">택배사</p>
                    <p className="font-medium">{order.deliveryCompany}</p>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-gray-600">
                      {order.actualDelivery ? '실제 배송일' : '예상 배송일'}
                    </p>
                    <p className="font-medium">
                      {new Date(
                        order.actualDelivery || order.estimatedDelivery,
                      ).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 주문 상품 */}
          <Card>
            <CardHeader>
              <CardTitle>주문 상품 ({order.items.length}개)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      {item.options && (
                        <p className="text-sm text-gray-600">{item.options}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium">
                          {item.price.toLocaleString()}원 × {item.quantity}
                        </span>
                        <span className="font-bold text-primary">
                          {(item.price * item.quantity).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 주문 히스토리 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                주문 진행 상황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.history.map((history, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1 pb-4 border-b last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{history.status}</span>
                        <span className="text-sm text-gray-500">
                          {history.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {history.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        위치: {history.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 정보 */}
        <div className="space-y-6">
          {/* 주문자 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                주문자 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {order.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/admin/users/${order.customer.id}`}>
                    <p className="font-medium hover:text-primary transition-colors cursor-pointer">
                      {order.customer.name}
                    </p>
                  </Link>
                  <Badge variant="outline" className="text-xs">
                    {order.customer.grade}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{order.customer.phone}</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  고객에게 이메일 발송
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 배송 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                배송 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">받는 분</p>
                <p className="font-medium">{order.delivery.recipient}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">연락처</p>
                <p className="font-medium">{order.delivery.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">배송 주소</p>
                <p className="font-medium">
                  ({order.delivery.zipCode}) {order.delivery.address}{' '}
                  {order.delivery.detailAddress}
                </p>
              </div>
              {order.delivery.memo && (
                <div>
                  <p className="text-sm text-gray-600">배송 메모</p>
                  <p className="font-medium">{order.delivery.memo}</p>
                </div>
              )}
              {order.trackingNumber && (
                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent">
                    <Truck className="h-4 w-4 mr-2" />
                    배송 추적
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 결제 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                결제 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>상품금액</span>
                <span>{order.subtotal.toLocaleString()}원</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>할인금액</span>
                  <span>-{order.discount.toLocaleString()}원</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>배송비</span>
                <span>
                  {order.deliveryFee === 0
                    ? '무료'
                    : `${order.deliveryFee.toLocaleString()}원`}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>총 결제금액</span>
                <span className="text-primary">
                  {order.total.toLocaleString()}원
                </span>
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>결제방법</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>결제일시</span>
                  <span>
                    {new Date(order.paymentDate).toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>

              {order.paymentStatus === '결제완료' &&
                order.status !== '환불완료' && (
                  <div className="pt-2 border-t space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      환불 처리
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      결제 상세
                    </Button>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* 관리 액션 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                관리 액션
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {order.status === '주문완료' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent">
                  주문 취소
                </Button>
              )}
              {order.status === '배송완료' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent">
                  반품/교환 처리
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                메모 추가
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                배송일 변경
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
