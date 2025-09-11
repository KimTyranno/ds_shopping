'use client'

import type React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, Eye, ImageIcon, Plus, Save, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const categories = [
  { value: 'electronics', label: '전자제품' },
  { value: 'clothing', label: '의류' },
  { value: 'shoes', label: '신발' },
  { value: 'books', label: '도서' },
  { value: 'sports', label: '스포츠' },
]

const brands = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
]

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // 실제로는 파일을 서버에 업로드하고 URL을 받아와야 함
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              목록으로
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              상품 등록
            </h1>
            <p className="text-gray-600 mt-1">새로운 상품을 등록하세요</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            미리보기
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 메인 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">상품명 *</Label>
                <Input id="name" placeholder="상품명을 입력하세요" />
              </div>
              <div>
                <Label htmlFor="description">상품 설명</Label>
                <Textarea
                  id="description"
                  placeholder="상품에 대한 자세한 설명을 입력하세요"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brand">브랜드</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="브랜드 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 가격 및 재고 */}
          <Card>
            <CardHeader>
              <CardTitle>가격 및 재고</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">판매가격 *</Label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="comparePrice">정가</Label>
                  <Input id="comparePrice" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">재고 수량 *</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="상품 코드" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 상품 이미지 */}
          <Card>
            <CardHeader>
              <CardTitle>상품 이미지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`Product image ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 text-xs">
                          메인
                        </Badge>
                      )}
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">이미지 추가</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">
                  첫 번째 이미지가 메인 이미지로 사용됩니다. 최대 10개까지
                  업로드 가능합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>SEO 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">메타 제목</Label>
                <Input id="metaTitle" placeholder="검색 결과에 표시될 제목" />
              </div>
              <div>
                <Label htmlFor="metaDescription">메타 설명</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="검색 결과에 표시될 설명"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="tags">태그</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    placeholder="태그 입력"
                    onKeyPress={e => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 상품 상태 */}
          <Card>
            <CardHeader>
              <CardTitle>상품 상태</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">판매 상태</Label>
                <Switch
                  id="published"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">추천 상품</Label>
                <Switch
                  id="featured"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
              </div>
            </CardContent>
          </Card>

          {/* 배송 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>배송 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="weight">무게 (kg)</Label>
                <Input id="weight" type="number" step="0.1" placeholder="0.0" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="length">길이</Label>
                  <Input id="length" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="width">너비</Label>
                  <Input id="width" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="height">높이</Label>
                  <Input id="height" type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="shippingFee">배송비</Label>
                <Input id="shippingFee" type="number" placeholder="0" />
              </div>
            </CardContent>
          </Card>

          {/* 추가 옵션 */}
          <Card>
            <CardHeader>
              <CardTitle>추가 옵션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="minOrder">최소 주문 수량</Label>
                <Input id="minOrder" type="number" placeholder="1" />
              </div>
              <div>
                <Label htmlFor="maxOrder">최대 주문 수량</Label>
                <Input id="maxOrder" type="number" placeholder="999" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
