'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  Search,
  Truck,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

const orders = [
  {
    id: 'ORD-2024-001',
    customer: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    amount: 125000,
    status: '배송중',
    paymentStatus: '결제완료',
    items: 2,
    createdAt: '2024-01-15 14:30',
    shippingAddress: '서울시 강남구 테헤란로 123',
  },
  {
    id: 'ORD-2024-002',
    customer: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    amount: 89000,
    status: '결제완료',
    paymentStatus: '결제완료',
    items: 1,
    createdAt: '2024-01-15 12:15',
    shippingAddress: '부산시 해운대구 센텀로 456',
  },
  {
    id: 'ORD-2024-003',
    customer: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    amount: 234000,
    status: '주문확인',
    paymentStatus: '결제완료',
    items: 3,
    createdAt: '2024-01-15 10:45',
    shippingAddress: '대구시 중구 동성로 789',
  },
  {
    id: 'ORD-2024-004',
    customer: '정수진',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    amount: 67000,
    status: '배송완료',
    paymentStatus: '결제완료',
    items: 1,
    createdAt: '2024-01-14 16:20',
    shippingAddress: '인천시 남동구 구월로 321',
  },
  {
    id: 'ORD-2024-005',
    customer: '최민호',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    amount: 156000,
    status: '취소',
    paymentStatus: '환불완료',
    items: 2,
    createdAt: '2024-01-14 09:30',
    shippingAddress: '광주시 서구 상무로 654',
  },
]

const statusOptions = [
  '전체',
  '주문확인',
  '결제완료',
  '배송중',
  '배송완료',
  '취소',
  '반품',
]
const paymentStatusOptions = [
  '전체',
  '결제대기',
  '결제완료',
  '결제실패',
  '환불완료',
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('전체')
  const [activeTab, setActiveTab] = useState('all')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '주문확인':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            주문확인
          </Badge>
        )
      case '결제완료':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            결제완료
          </Badge>
        )
      case '배송중':
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Truck className="h-3 w-3 mr-1" />
            배송중
          </Badge>
        )
      case '배송완료':
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Package className="h-3 w-3 mr-1" />
            배송완료
          </Badge>
        )
      case '취소':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            취소
          </Badge>
        )
      case '반품':
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            반품
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === '전체' || order.status === selectedStatus
    const matchesPaymentStatus =
      selectedPaymentStatus === '전체' ||
      order.paymentStatus === selectedPaymentStatus

    if (activeTab === 'pending') {
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentStatus &&
        (order.status === '주문확인' || order.status === '결제완료')
      )
    }
    if (activeTab === 'shipping') {
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentStatus &&
        order.status === '배송중'
      )
    }
    if (activeTab === 'completed') {
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentStatus &&
        order.status === '배송완료'
      )
    }

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const getOrderCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(
        o => o.status === '주문확인' || o.status === '결제완료',
      ).length,
      shipping: orders.filter(o => o.status === '배송중').length,
      completed: orders.filter(o => o.status === '배송완료').length,
    }
  }

  const counts = getOrderCounts()

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            주문 관리
          </h1>
          <p className="text-gray-600 mt-1">
            고객 주문을 관리하고 배송 상태를 업데이트하세요
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">엑셀 다운로드</span>
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 주문</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">처리 대기</p>
                <p className="text-2xl font-bold text-orange-600">
                  {counts.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">배송중</p>
                <p className="text-2xl font-bold text-purple-600">
                  {counts.shipping}
                </p>
              </div>
              <Truck className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">배송완료</p>
                <p className="text-2xl font-bold text-green-600">
                  {counts.completed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="주문번호, 고객명, 이메일로 검색..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="주문상태" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedPaymentStatus}
                onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="결제상태" />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatusOptions.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 및 주문 목록 */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체 ({counts.all})</TabsTrigger>
              <TabsTrigger value="pending">
                처리대기 ({counts.pending})
              </TabsTrigger>
              <TabsTrigger value="shipping">
                배송중 ({counts.shipping})
              </TabsTrigger>
              <TabsTrigger value="completed">
                완료 ({counts.completed})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객정보</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    주문일시
                  </TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead className="hidden sm:table-cell">상품수</TableHead>
                  <TableHead>주문상태</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    결제상태
                  </TableHead>
                  <TableHead className="w-16">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                        <div className="text-sm text-gray-500 lg:hidden">
                          {order.createdAt}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {order.createdAt}
                    </TableCell>
                    <TableCell>₩{order.amount.toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.items}개
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            상세보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            배송처리
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            송장입력
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
