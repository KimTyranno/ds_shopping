'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from '@/i18n/navigation'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  DollarSign,
  Eye,
  MessageSquare,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// 더미 데이터
const salesData = [
  { name: '1월', revenue: 4200000, orders: 240, customers: 180 },
  { name: '2월', revenue: 3800000, orders: 198, customers: 165 },
  { name: '3월', revenue: 5100000, orders: 300, customers: 220 },
  { name: '4월', revenue: 4700000, orders: 278, customers: 195 },
  { name: '5월', revenue: 6200000, orders: 389, customers: 280 },
  { name: '6월', revenue: 5800000, orders: 349, customers: 245 },
]

const categoryData = [
  { name: '전자제품', value: 35, color: '#8884d8', sales: 15600000 },
  { name: '의류', value: 25, color: '#82ca9d', sales: 11200000 },
  { name: '신발', value: 20, color: '#ffc658', sales: 8900000 },
  { name: '도서', value: 15, color: '#ff7c7c', sales: 6700000 },
  { name: '기타', value: 5, color: '#8dd1e1', sales: 2200000 },
]

const recentOrders = [
  {
    id: 'ORD-001',
    customer: '김철수',
    amount: 125000,
    status: '배송중',
    time: '2분 전',
    items: 2,
  },
  {
    id: 'ORD-002',
    customer: '이영희',
    amount: 89000,
    status: '결제완료',
    time: '5분 전',
    items: 1,
  },
  {
    id: 'ORD-003',
    customer: '박민수',
    amount: 234000,
    status: '주문확인',
    time: '12분 전',
    items: 3,
  },
  {
    id: 'ORD-004',
    customer: '정수진',
    amount: 67000,
    status: '배송완료',
    time: '18분 전',
    items: 1,
  },
  {
    id: 'ORD-005',
    customer: '최민호',
    amount: 156000,
    status: '결제완료',
    time: '25분 전',
    items: 2,
  },
]

const topProducts = [
  { name: 'iPhone 15 Pro', sales: 234, revenue: 301860000, trend: 'up' },
  { name: '삼성 갤럭시 S24', sales: 189, revenue: 207900000, trend: 'up' },
  { name: '나이키 에어맥스', sales: 156, revenue: 24804000, trend: 'down' },
  { name: '맥북 프로 M3', sales: 89, revenue: 221610000, trend: 'up' },
  { name: '아디다스 후드티', sales: 123, revenue: 10947000, trend: 'up' },
]

const alerts = [
  {
    type: 'stock',
    message: 'iPhone 15 Pro 재고 부족 (3개 남음)',
    priority: 'high',
  },
  { type: 'order', message: '처리 대기 주문 15건', priority: 'medium' },
  { type: 'review', message: '새로운 리뷰 8개', priority: 'low' },
  { type: 'user', message: '신규 회원 가입 12명', priority: 'low' },
]

const monthlyGoals = [
  { name: '매출 목표', current: 28500000, target: 35000000, percentage: 81 },
  { name: '주문 목표', current: 1754, target: 2000, percentage: 88 },
  { name: '신규 회원', current: 245, target: 300, percentage: 82 },
]

export default function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case '배송중':
        return <Badge className="bg-purple-100 text-purple-800">배송중</Badge>
      case '결제완료':
        return <Badge className="bg-green-100 text-green-800">결제완료</Badge>
      case '주문확인':
        return <Badge className="bg-blue-100 text-blue-800">주문확인</Badge>
      case '배송완료':
        return <Badge className="bg-gray-100 text-gray-800">배송완료</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-orange-600'
      case 'low':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            대시보드
          </h1>
          <p className="text-gray-600 mt-1">
            심플몰 운영 현황을 한눈에 확인하세요
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          마지막 업데이트: 방금 전
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 매출</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">₩28,500,000</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-gray-500 ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 주문</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">1,754</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+8.2%</span>
              <span className="text-gray-500 ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 회원</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">12,847</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+5.7%</span>
              <span className="text-gray-500 ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">등록 상품</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">2,341</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              <span className="text-red-600">-2.1%</span>
              <span className="text-gray-500 ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 월간 목표 달성률 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">이번 달 목표 달성률</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-500">
                    {goal.percentage}%
                  </span>
                </div>
                <Progress value={goal.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{goal.current.toLocaleString()}</span>
                  <span>{goal.target.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 매출 추이 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">매출 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    formatter={(value, name) => [
                      name === 'revenue'
                        ? `₩${Number(value).toLocaleString()}`
                        : value,
                      name === 'revenue' ? '매출' : '주문수',
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 카테고리별 매출 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">카테고리별 매출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {categoryData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">
                    ₩{item.sales.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 하단 정보 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 주문 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">최근 주문</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                <Eye className="h-4 w-4 mr-2" />
                전체보기
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.customer} • {order.items}개 상품
                    </div>
                    <div className="text-sm font-medium">
                      ₩{order.amount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{order.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 인기 상품 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">인기 상품</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">
                <Eye className="h-4 w-4 mr-2" />
                전체보기
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.sales}개 판매
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {product.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 알림 및 할 일 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              알림 및 할 일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.priority === 'high'
                        ? 'bg-red-500'
                        : alert.priority === 'medium'
                          ? 'bg-orange-500'
                          : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${getPriorityColor(alert.priority)}`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 빠른 액션 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">빠른 액션</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild>
              <Link href="/admin/products/new">
                <Package className="h-6 w-6" />
                <span className="text-xs">상품 등록</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild>
              <Link href="/admin/orders">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-xs">주문 처리</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild>
              <Link href="/admin/inventory">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-xs">재고 관리</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild>
              <Link href="/admin/users">
                <Users className="h-6 w-6" />
                <span className="text-xs">회원 관리</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild>
              <Link href="/admin/reviews">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xs">리뷰 관리</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild>
              <Link href="/admin/analytics">
                <TrendingUp className="h-6 w-6" />
                <span className="text-xs">매출 분석</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
