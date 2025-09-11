'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Link } from '@/i18n/navigation'
import {
  Download,
  Edit,
  Eye,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Package,
  Search,
  Star,
  Trash2,
  Upload,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const productsData = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    sku: 'IPH15P-128-BLK',
    category: '전자제품',
    brand: 'Apple',
    price: 1290000,
    comparePrice: 1390000,
    stock: 25,
    sales: 234,
    rating: 4.8,
    reviews: 156,
    status: '판매중',
    featured: true,
    image: '/modern-smartphone.png',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    tags: ['신제품', '인기', '프리미엄'],
  },
  {
    id: 2,
    name: '삼성 갤럭시 S24',
    sku: 'SGS24-256-WHT',
    category: '전자제품',
    brand: 'Samsung',
    price: 1100000,
    comparePrice: 1200000,
    stock: 18,
    sales: 189,
    rating: 4.6,
    reviews: 98,
    status: '판매중',
    featured: false,
    image: '/samsung-galaxy-smartphone.png',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18',
    tags: ['신제품', '안드로이드'],
  },
  {
    id: 3,
    name: '나이키 에어맥스',
    sku: 'NK-AM270-BLK-280',
    category: '신발',
    brand: 'Nike',
    price: 159000,
    comparePrice: 179000,
    stock: 0,
    sales: 456,
    rating: 4.7,
    reviews: 234,
    status: '품절',
    featured: true,
    image: '/athletic-shoes.png',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    tags: ['베스트셀러', '운동화'],
  },
  {
    id: 4,
    name: '아디다스 후드티',
    sku: 'AD-HD-GRY-L',
    category: '의류',
    brand: 'Adidas',
    price: 89000,
    comparePrice: 99000,
    stock: 45,
    sales: 123,
    rating: 4.4,
    reviews: 67,
    status: '판매중',
    featured: false,
    image: '/adidas-hoodie.jpg',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12',
    tags: ['캐주얼', '편안함'],
  },
  {
    id: 5,
    name: '맥북 프로 M3',
    sku: 'MBP-M3-14-SLV',
    category: '전자제품',
    brand: 'Apple',
    price: 2490000,
    comparePrice: 2590000,
    stock: 8,
    sales: 67,
    rating: 4.9,
    reviews: 45,
    status: '판매중',
    featured: true,
    image: '/silver-macbook-pro-desk.png',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
    tags: ['프리미엄', '노트북', 'M3'],
  },
]

const categories = ['전체', '전자제품', '의류', '신발', '도서', '스포츠']
const brands = ['전체', 'Apple', 'Samsung', 'Nike', 'Adidas', '기타']
const statusOptions = ['전체', '판매중', '품절', '판매중지', '임시저장']

export default function ProductsListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedBrand, setSelectedBrand] = useState('전체')
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [sortBy, setSortBy] = useState('name')

  const filteredProducts = productsData.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    const matchesCategory =
      selectedCategory === '전체' || product.category === selectedCategory
    const matchesBrand =
      selectedBrand === '전체' || product.brand === selectedBrand
    const matchesStatus =
      selectedStatus === '전체' || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '판매중':
        return <Badge className="bg-green-100 text-green-800">판매중</Badge>
      case '품절':
        return <Badge className="bg-red-100 text-red-800">품절</Badge>
      case '판매중지':
        return <Badge className="bg-gray-100 text-gray-800">판매중지</Badge>
      case '임시저장':
        return <Badge className="bg-yellow-100 text-yellow-800">임시저장</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const productStats = {
    total: productsData.length,
    active: productsData.filter(p => p.status === '판매중').length,
    outOfStock: productsData.filter(p => p.status === '품절').length,
    featured: productsData.filter(p => p.featured).length,
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            상품 목록
          </h1>
          <p className="text-gray-600 mt-1">
            등록된 모든 상품을 한눈에 확인하고 관리하세요
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none">
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none">
              <Grid className="h-4 w-4" />
            </Button>
          </div>
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
              <Package className="h-4 w-4" />
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
                <p className="text-2xl font-bold">{productStats.total}</p>
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
                  {productStats.active}
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
                  {productStats.outOfStock}
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
                <p className="text-sm text-gray-600">추천 상품</p>
                <p className="text-2xl font-bold text-purple-600">
                  {productStats.featured}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
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
                  placeholder="상품명, SKU, 태그로 검색..."
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
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="브랜드" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">이름순</SelectItem>
                  <SelectItem value="price">가격순</SelectItem>
                  <SelectItem value="sales">판매량순</SelectItem>
                  <SelectItem value="rating">평점순</SelectItem>
                  <SelectItem value="created">등록일순</SelectItem>
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

      {/* 일괄 작업 */}
      {selectedProducts.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedProducts.length}개 상품 선택됨
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  일괄 수정
                </Button>
                <Button variant="outline" size="sm">
                  상태 변경
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 bg-transparent">
                  일괄 삭제
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 상품 목록 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">상품 목록</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedProducts.length === filteredProducts.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">전체 선택</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleSelectProduct(product.id)}
                  />
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">
                            {product.name}
                          </h3>
                          {product.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <span>{product.brand}</span>
                          <span>•</span>
                          <span>{product.category}</span>
                          <span>•</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {product.sku}
                          </code>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                            <span className="text-gray-600">
                              ({product.reviews})
                            </span>
                          </div>
                          <span className="text-gray-600">
                            판매량: {product.sales}
                          </span>
                          <span className="text-gray-600">
                            재고: {product.stock}개
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold">
                            ₩{product.price.toLocaleString()}
                          </span>
                          {product.comparePrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₩{product.comparePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(product.status)}
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
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                      className="absolute top-2 left-2 z-10"
                    />
                    {product.featured && (
                      <Star className="absolute top-2 right-2 h-5 w-5 text-yellow-500 fill-current" />
                    )}
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.brand} • {product.category}
                    </p>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold">
                          ₩{product.price.toLocaleString()}
                        </span>
                        {product.comparePrice > product.price && (
                          <span className="text-xs text-gray-500 line-through ml-1">
                            ₩{product.comparePrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {getStatusBadge(product.status)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>재고: {product.stock}개</span>
                      <span>판매: {product.sales}개</span>
                    </div>
                    <div className="flex justify-end mt-3">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
