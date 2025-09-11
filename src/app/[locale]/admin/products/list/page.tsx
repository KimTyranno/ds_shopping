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
import { Link } from '@/i18n/navigation'
import {
  AlertTriangle,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: '전자제품',
    price: 1290000,
    stock: 15,
    status: '판매중',
    image: '/modern-smartphone.png',
    sales: 234,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: '삼성 갤럭시 S24',
    category: '전자제품',
    price: 1100000,
    stock: 3,
    status: '판매중',
    image: '/samsung-galaxy-smartphone.png',
    sales: 189,
    createdAt: '2024-01-12',
  },
  {
    id: 3,
    name: '나이키 에어맥스',
    category: '신발',
    price: 159000,
    stock: 0,
    status: '품절',
    image: '/athletic-shoes.png',
    sales: 456,
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    name: '아디다스 후드티',
    category: '의류',
    price: 89000,
    stock: 25,
    status: '판매중',
    image: '/adidas-hoodie.jpg',
    sales: 123,
    createdAt: '2024-01-08',
  },
  {
    id: 5,
    name: '맥북 프로 M3',
    category: '전자제품',
    price: 2490000,
    stock: 8,
    status: '판매중',
    image: '/silver-macbook-pro-desk.png',
    sales: 67,
    createdAt: '2024-01-05',
  },
]

const categories = ['전체', '전자제품', '의류', '신발', '도서', '스포츠']
const statusOptions = ['전체', '판매중', '품절', '판매중지']

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [activeTab, setActiveTab] = useState('all')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '판매중':
        return <Badge className="bg-green-100 text-green-800">판매중</Badge>
      case '품절':
        return <Badge className="bg-red-100 text-red-800">품절</Badge>
      case '판매중지':
        return <Badge className="bg-gray-100 text-gray-800">판매중지</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return '품절'
    if (stock <= 5) return '부족'
    return '정상'
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === '전체' || product.category === selectedCategory
    const matchesStatus =
      selectedStatus === '전체' || product.status === selectedStatus

    if (activeTab === 'low-stock') {
      return (
        matchesSearch && matchesCategory && matchesStatus && product.stock <= 5
      )
    }
    if (activeTab === 'out-of-stock') {
      return (
        matchesSearch && matchesCategory && matchesStatus && product.stock === 0
      )
    }

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            상품 관리
          </h1>
          <p className="text-gray-600 mt-1">
            등록된 상품을 관리하고 새로운 상품을 추가하세요
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">일괄 업로드</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">엑셀 다운로드</span>
          </Button>
          <Link href="/admin/products/new">
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">상품 등록</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 상품</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">판매중</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === '판매중').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">품절</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.stock === 0).length}
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
                <p className="text-sm text-gray-600">재고 부족</p>
                <p className="text-2xl font-bold text-orange-600">
                  {products.filter(p => p.stock > 0 && p.stock <= 5).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
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
                  placeholder="상품명으로 검색..."
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
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 및 상품 목록 */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">전체 상품</TabsTrigger>
              <TabsTrigger value="low-stock">재고 부족</TabsTrigger>
              <TabsTrigger value="out-of-stock">품절 상품</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">이미지</TableHead>
                  <TableHead>상품명</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    카테고리
                  </TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>재고</TableHead>
                  <TableHead className="hidden lg:table-cell">판매량</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="w-16">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 sm:hidden">
                          {product.category}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {product.category}
                    </TableCell>
                    <TableCell>₩{product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            product.stock <= 5 ? 'text-red-600 font-medium' : ''
                          }>
                          {product.stock}
                        </span>
                        {product.stock <= 5 && product.stock > 0 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {product.sales}
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            삭제
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
