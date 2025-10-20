'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  AlertTriangle,
  Download,
  Edit,
  Filter,
  Minus,
  MoreHorizontal,
  Package,
  Plus,
  RotateCcw,
  Search,
  TrendingDown,
  TrendingUp,
  Upload,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Inventory = {
  id: number
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  price: number
  location: string
  lastUpdated: string
  status: string
  image: string
  supplier: string
}

const inventoryData: Inventory[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    sku: 'IPH15P-128-BLK',
    category: '전자제품',
    currentStock: 3,
    minStock: 10,
    maxStock: 100,
    price: 1290000,
    location: 'A-01-001',
    lastUpdated: '2024-01-15',
    status: '부족',
    image: '/modern-smartphone.png',
    supplier: 'Apple Korea',
  },
  {
    id: 2,
    name: '삼성 갤럭시 S24',
    sku: 'SGS24-256-WHT',
    category: '전자제품',
    currentStock: 25,
    minStock: 15,
    maxStock: 80,
    price: 1100000,
    location: 'A-01-002',
    lastUpdated: '2024-01-14',
    status: '정상',
    image: '/samsung-galaxy-smartphone.png',
    supplier: '삼성전자',
  },
  {
    id: 3,
    name: '나이키 에어맥스',
    sku: 'NK-AM270-BLK-280',
    category: '신발',
    currentStock: 0,
    minStock: 20,
    maxStock: 150,
    price: 159000,
    location: 'B-02-015',
    lastUpdated: '2024-01-13',
    status: '품절',
    image: '/athletic-shoes.png',
    supplier: '나이키코리아',
  },
  {
    id: 4,
    name: '아디다스 후드티',
    sku: 'AD-HD-GRY-L',
    category: '의류',
    currentStock: 45,
    minStock: 30,
    maxStock: 200,
    price: 89000,
    location: 'C-03-025',
    lastUpdated: '2024-01-12',
    status: '정상',
    image: '/adidas-hoodie.jpg',
    supplier: '아디다스코리아',
  },
  {
    id: 5,
    name: '맥북 프로 M3',
    sku: 'MBP-M3-14-SLV',
    category: '전자제품',
    currentStock: 8,
    minStock: 5,
    maxStock: 30,
    price: 2490000,
    location: 'A-01-010',
    lastUpdated: '2024-01-11',
    status: '정상',
    image: '/silver-macbook-pro-desk.png',
    supplier: 'Apple Korea',
  },
]

const categories = ['전체', '전자제품', '의류', '신발', '도서', '스포츠']
const statusOptions = ['전체', '정상', '부족', '품절', '과재고']
const locations = ['전체', 'A동', 'B동', 'C동']

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [selectedLocation, setSelectedLocation] = useState('전체')
  const [activeTab, setActiveTab] = useState('all')
  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Inventory | null>(null)

  const getStatusBadge = (
    status: string,
    currentStock: number,
    minStock: number,
  ) => {
    if (currentStock === 0) {
      return <Badge className="bg-red-100 text-red-800">품절</Badge>
    } else if (currentStock < minStock) {
      return <Badge className="bg-orange-100 text-orange-800">부족</Badge>
    } else if (currentStock > minStock * 3) {
      return <Badge className="bg-blue-100 text-blue-800">과재고</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800">정상</Badge>
    }
  }

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100
    return Math.min(percentage, 100)
  }

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === '전체' || item.category === selectedCategory
    const matchesStatus =
      selectedStatus === '전체' || item.status === selectedStatus
    const matchesLocation =
      selectedLocation === '전체' ||
      item.location.startsWith(selectedLocation.charAt(0))

    if (activeTab === 'low-stock') {
      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesLocation &&
        item.currentStock < item.minStock
      )
    }
    if (activeTab === 'out-of-stock') {
      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesLocation &&
        item.currentStock === 0
      )
    }
    if (activeTab === 'overstock') {
      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesLocation &&
        item.currentStock > item.minStock * 3
      )
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation
  })

  const inventoryStats = {
    total: inventoryData.length,
    lowStock: inventoryData.filter(
      item => item.currentStock < item.minStock && item.currentStock > 0,
    ).length,
    outOfStock: inventoryData.filter(item => item.currentStock === 0).length,
    overstock: inventoryData.filter(
      item => item.currentStock > item.minStock * 3,
    ).length,
  }

  const handleStockAdjustment = (product: Inventory) => {
    setSelectedProduct(product)
    setAdjustmentDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            재고 관리
          </h1>
          <p className="text-gray-600 mt-1">
            상품 재고를 실시간으로 모니터링하고 관리하세요
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">재고 업로드</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">재고 리포트</span>
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 상품</p>
                <p className="text-2xl font-bold">{inventoryStats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">재고 부족</p>
                <p className="text-2xl font-bold text-orange-600">
                  {inventoryStats.lowStock}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">품절</p>
                <p className="text-2xl font-bold text-red-600">
                  {inventoryStats.outOfStock}
                </p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-red-500 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">과재고</p>
                <p className="text-2xl font-bold text-blue-600">
                  {inventoryStats.overstock}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
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
                  placeholder="상품명 또는 SKU로 검색..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="상태" />
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
                value={selectedLocation}
                onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="창고" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
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

      {/* 탭 및 재고 목록 */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체 재고</TabsTrigger>
              <TabsTrigger value="low-stock">재고 부족</TabsTrigger>
              <TabsTrigger value="out-of-stock">품절</TabsTrigger>
              <TabsTrigger value="overstock">과재고</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">이미지</TableHead>
                  <TableHead>상품정보</TableHead>
                  <TableHead className="hidden sm:table-cell">SKU</TableHead>
                  <TableHead>현재고</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    최소재고
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">위치</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="w-16">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.category}
                        </div>
                        <div className="text-sm text-gray-500 sm:hidden">
                          {item.sku}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {item.sku}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div
                          className={`font-medium ${
                            item.currentStock === 0
                              ? 'text-red-600'
                              : item.currentStock < item.minStock
                                ? 'text-orange-600'
                                : 'text-green-600'
                          }`}>
                          {item.currentStock}개
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full ${
                              item.currentStock === 0
                                ? 'bg-red-500'
                                : item.currentStock < item.minStock
                                  ? 'bg-orange-500'
                                  : 'bg-green-500'
                            }`}
                            style={{
                              width: `${getStockLevel(item.currentStock, item.minStock, item.maxStock)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item.minStock}개
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item.location}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(
                        item.status,
                        item.currentStock,
                        item.minStock,
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleStockAdjustment(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            재고 조정
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            입고 처리
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingDown className="mr-2 h-4 w-4" />
                            출고 처리
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

      {/* 재고 조정 다이얼로그 */}
      <Dialog
        open={adjustmentDialogOpen}
        onOpenChange={setAdjustmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>재고 조정</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={selectedProduct.image || '/placeholder.svg'}
                  alt={selectedProduct.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <div className="font-medium">{selectedProduct.name}</div>
                  <div className="text-sm text-gray-500">
                    {selectedProduct.sku}
                  </div>
                  <div className="text-sm text-gray-500">
                    현재 재고: {selectedProduct.currentStock}개
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustment">조정 수량</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="adjustment"
                    type="number"
                    placeholder="0"
                    className="text-center"
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">조정 사유</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="사유 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="damaged">상품 손상</SelectItem>
                    <SelectItem value="lost">분실</SelectItem>
                    <SelectItem value="returned">반품</SelectItem>
                    <SelectItem value="inventory">재고 실사</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setAdjustmentDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setAdjustmentDialogOpen(false)}>
                  조정 완료
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
