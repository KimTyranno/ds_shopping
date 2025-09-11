'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  ChevronRight,
  Edit,
  Eye,
  Grid3X3,
  ImageIcon,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Category = {
  id: number
  name: string
  slug: string
  description: string
  productCount: number
  status: string
  parentId: number | null
  level: number
  image: string
  createdAt: string
  children: {
    id: number
    name: string
    slug: string
    description: string
    productCount: number
    status: string
    parentId: number | null
    level: number
    image: string
    createdAt: string
  }[]
}

const categoriesData = [
  {
    id: 1,
    name: '전자제품',
    slug: 'electronics',
    description: '스마트폰, 노트북, 태블릿 등 전자기기',
    productCount: 156,
    status: '활성',
    parentId: null,
    level: 0,
    image: '/placeholder.svg?height=40&width=40&text=전자',
    createdAt: '2024-01-01',
    children: [
      {
        id: 11,
        name: '스마트폰',
        slug: 'smartphones',
        description: 'iPhone, 갤럭시 등 스마트폰',
        productCount: 45,
        status: '활성',
        parentId: 1,
        level: 1,
        image: '/placeholder.svg?height=40&width=40&text=폰',
        createdAt: '2024-01-01',
      },
      {
        id: 12,
        name: '노트북',
        slug: 'laptops',
        description: '맥북, 윈도우 노트북',
        productCount: 32,
        status: '활성',
        parentId: 1,
        level: 1,
        image: '/placeholder.svg?height=40&width=40&text=노트북',
        createdAt: '2024-01-01',
      },
    ],
  },
  {
    id: 2,
    name: '의류',
    slug: 'clothing',
    description: '남성, 여성, 아동 의류',
    productCount: 234,
    status: '활성',
    parentId: null,
    level: 0,
    image: '/placeholder.svg?height=40&width=40&text=의류',
    createdAt: '2024-01-01',
    children: [
      {
        id: 21,
        name: '남성의류',
        slug: 'mens-clothing',
        description: '남성용 셔츠, 바지, 아우터',
        productCount: 89,
        status: '활성',
        parentId: 2,
        level: 1,
        image: '/placeholder.svg?height=40&width=40&text=남성',
        createdAt: '2024-01-01',
      },
      {
        id: 22,
        name: '여성의류',
        slug: 'womens-clothing',
        description: '여성용 원피스, 블라우스, 스커트',
        productCount: 145,
        status: '활성',
        parentId: 2,
        level: 1,
        image: '/placeholder.svg?height=40&width=40&text=여성',
        createdAt: '2024-01-01',
      },
    ],
  },
  {
    id: 3,
    name: '신발',
    slug: 'shoes',
    description: '운동화, 구두, 부츠 등',
    productCount: 78,
    status: '활성',
    parentId: null,
    level: 0,
    image: '/placeholder.svg?height=40&width=40&text=신발',
    createdAt: '2024-01-01',
    children: [],
  },
  {
    id: 4,
    name: '도서',
    slug: 'books',
    description: '소설, 에세이, 전문서적',
    productCount: 45,
    status: '비활성',
    parentId: null,
    level: 0,
    image: '/placeholder.svg?height=40&width=40&text=도서',
    createdAt: '2024-01-01',
    children: [],
  },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 2])

  const flattenCategories = (categories: Category[]): Category[] => {
    const result: Category[] = []

    const flatten = (cats: Category[], level = 0) => {
      cats.forEach(cat => {
        result.push({ ...cat, level })
        if (
          cat.children &&
          cat.children.length > 0 &&
          expandedCategories.includes(cat.id)
        ) {
          console.log('뭐냐 이거')
          // flatten(cat.children, level + 1)
        }
      })
    }

    flatten(categories)
    return result
  }

  const filteredCategories = flattenCategories(categoriesData).filter(
    category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '활성':
        return <Badge className="bg-green-100 text-green-800">활성</Badge>
      case '비활성':
        return <Badge className="bg-gray-100 text-gray-800">비활성</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const toggleExpanded = (categoryId: number) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId],
    )
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setDialogOpen(true)
  }

  const categoryStats = {
    total: categoriesData.length,
    active: categoriesData.filter(cat => cat.status === '활성').length,
    inactive: categoriesData.filter(cat => cat.status === '비활성').length,
    totalProducts: categoriesData.reduce(
      (sum, cat) => sum + cat.productCount,
      0,
    ),
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            카테고리 관리
          </h1>
          <p className="text-gray-600 mt-1">
            상품 카테고리를 체계적으로 관리하세요
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">카테고리 추가</span>
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 카테고리</p>
                <p className="text-2xl font-bold">{categoryStats.total}</p>
              </div>
              <Grid3X3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 카테고리</p>
                <p className="text-2xl font-bold text-green-600">
                  {categoryStats.active}
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
                <p className="text-sm text-gray-600">비활성 카테고리</p>
                <p className="text-2xl font-bold text-gray-600">
                  {categoryStats.inactive}
                </p>
              </div>
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-gray-500 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 상품 수</p>
                <p className="text-2xl font-bold text-purple-600">
                  {categoryStats.totalProducts}
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="카테고리명으로 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 카테고리 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">카테고리 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">이미지</TableHead>
                  <TableHead>카테고리명</TableHead>
                  <TableHead className="hidden sm:table-cell">설명</TableHead>
                  <TableHead>상품 수</TableHead>
                  <TableHead className="hidden lg:table-cell">슬러그</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="w-16">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Image
                        src={category.image || '/placeholder.svg'}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div style={{ marginLeft: `${category.level * 20}px` }}>
                          {category.children &&
                            category.children.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(category.id)}
                                className="h-6 w-6 p-0 mr-2">
                                <ChevronRight
                                  className={`h-4 w-4 transition-transform ${
                                    expandedCategories.includes(category.id)
                                      ? 'rotate-90'
                                      : ''
                                  }`}
                                />
                              </Button>
                            )}
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="max-w-xs truncate text-sm text-gray-600">
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {category.productCount}
                        </span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell>{getStatusBadge(category.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            상품 보기
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

      {/* 카테고리 추가/수정 다이얼로그 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? '카테고리 수정' : '카테고리 추가'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">카테고리명 *</Label>
              <Input
                id="categoryName"
                placeholder="카테고리명을 입력하세요"
                defaultValue={editingCategory?.name || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categorySlug">슬러그 *</Label>
              <Input
                id="categorySlug"
                placeholder="category-slug"
                defaultValue={editingCategory?.slug || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryDescription">설명</Label>
              <Textarea
                id="categoryDescription"
                placeholder="카테고리에 대한 설명을 입력하세요"
                defaultValue={editingCategory?.description || ''}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentCategory">상위 카테고리</Label>
              <select
                id="parentCategory"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={editingCategory?.parentId || ''}>
                <option value="">최상위 카테고리</option>
                {categoriesData
                  .filter(cat => cat.level === 0)
                  .map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryImage">카테고리 이미지</Label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  이미지 선택
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="categoryStatus">활성 상태</Label>
              <Switch
                id="categoryStatus"
                defaultChecked={
                  editingCategory?.status === '활성' || !editingCategory
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                {editingCategory ? '수정' : '추가'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
