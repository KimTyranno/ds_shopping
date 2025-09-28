'use client'

import type React from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
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
import { Link, useRouter } from '@/i18n/navigation'
import { AlertCircle, ArrowLeft, Eye, ImageIcon, Save, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// const subCategories = {
//   electronics: [
//     { smartphones: '스마트폰' },
//     { laptops: '노트북' },
//     { tablets: '태블릿' },
//     { earphones: '이어폰' },
//     { smartwatch: '스마트워치' },
//   ],
//   fashion: [
//     { mens: '남성의류' },
//     { womens: '여성의류' },
//     { shoes: '신발' },
//     { bags: '이어가방폰' },
//     { accessories: '액세서리' },
//   ],
//   home: [
//     { furniture: '가구' },
//     { interior: '인테리어' },
//     { kitchen: '주방용품' },
//     { living: '생활용품' },
//     { bedding: '침구' },
//   ],
//   books: [
//     { novel: '소설' },
//     { 'self-help': '자기계발' },
//     { computer: '컴퓨터' },
//     { cooking: '요리' },
//     { travel: '여행' },
//   ],
//   sports: [
//     { sportswear: '운동복' },
//     { sneakers: '운동화' },
//     { fitness: '헬스용품' },
//     { outdoor: '아웃도어' },
//     { swimming: '수영용품' },
//   ],
//   beauty: [
//     { skincare: '스킨케어' },
//     { makeup: '메이크업' },
//     { haircare: '헤어케어' },
//     { perfume: '향수' },
//     { mens: '남성화장품' },
//   ],
// }

type ProductAddResponse = {
  success?: false
  error?: string
  errors?: Record<string, string>
}

type AddProductProps = {
  categories: { value: string; label: string }[]
}

export default function AddProductPage({ categories }: AddProductProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  // const [tags, setTags] = useState<string[]>([])
  // const [newTag, setNewTag] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  // const [isFeatured, setIsFeatured] = useState(false)
  const [originalPrice, setOriginalPrice] = useState<string>('0')
  const [price, setPrice] = useState<string>('0')
  const [sameAsOriginal, setSameAsOriginal] = useState(true)
  const [sku, setSku] = useState('')
  const [autoGenerate, setAutoGenerate] = useState(true)
  const [shippingFee, setShippingFee] = useState<string>('0')
  const [isFending, setIsFending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // const formData = new FormData()
  // for (let i = 0; i < files.length; i++) {
  //   formData.append('files', files[i]) // key 동일하게 넣기(배열 형식)
  // }

  /** 콤마 포맷 함수 */
  const formatWithCommas = (value: string) => {
    // 숫자만 남게함
    const number = value.replaceAll(',', '').replace(/\D/g, '')

    // 세 자리마다 콤마
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFending(true)

    const formDataToSend = new FormData(e.currentTarget)

    const fieldsToParse = ['originalPrice', 'price', 'shippingFee']
    fieldsToParse.forEach(field => {
      const rawValue = formDataToSend.get(field) as string | null
      if (rawValue) {
        const cleaned = rawValue.replaceAll(',', '') // 콤마 제거
        formDataToSend.set(field, cleaned) // 다시 세팅
      }
    })

    // if (avatarFile) {
    //   formDataToSend.set('avatar', avatarFile) // 기존 파일 덮어쓰기
    // }

    try {
      const res = await fetch('/api/admin/product', {
        method: 'POST',
        body: formDataToSend,
      })
      const result = (await res.json()) as ProductAddResponse

      // status가 200~299가 아닌경우
      if (!res.ok) {
        switch (result.error) {
          case 'session_expired':
          case 'forbidden':
            router.push(`/login?message=${result.error}`)
            break
          default:
            throw new Error('상품 등록 실패')
        }
      }

      // 에러설정
      if (!result.success && result.errors) {
        setErrors(result.errors)
        return
      }

      router.push('/admin/products/list')
    } catch (error) {
      console.error('에러 발생:', error)
      throw error
    } finally {
      setIsFending(false)
    }
  }

  // const addTag = () => {
  //   if (newTag.trim() && !tags.includes(newTag.trim())) {
  //     setTags([...tags, newTag.trim()])
  //     setNewTag('')
  //   }
  // }

  // const removeTag = (tagToRemove: string) => {
  //   setTags(tags.filter(tag => tag !== tagToRemove))
  // }

  return (
    <div className="space-y-6">
      <form onSubmit={e => void handleSubmit(e)}>
        {/* 알림 메시지 */}
        {errors && Object.keys(errors).length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              잘못된 입력이 있습니다.
            </AlertDescription>
          </Alert>
        )}
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
            <Button size="sm" disabled={isFending}>
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
                  <Input
                    id="name"
                    name="name"
                    placeholder="상품명을 입력하세요"
                    className={errors?.name ? 'border-red-500' : ''}
                  />
                  {errors?.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">상품 설명</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="상품에 대한 자세한 설명을 입력하세요"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">카테고리 *</Label>
                    <Select name="category">
                      <SelectTrigger
                        className={errors?.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem
                            key={category.value}
                            value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors?.category && (
                      <p className="text-sm text-red-500">{errors.category}</p>
                    )}
                  </div>
                  {/* <div>
                  <Label htmlFor="subCategory">서브카테고리</Label>
                  <Select
                    onValueChange={value => setSelectedSubCategory(value)}
                    disabled={
                      !selectedCategory ||
                      !subCategories[selectedCategory]?.length
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="서브카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories.map(brand => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
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
                    <Label htmlFor="originalPrice">정가 *</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      inputMode="numeric"
                      placeholder="0"
                      value={originalPrice}
                      onChange={e => {
                        const formatted = formatWithCommas(e.target.value)
                        setOriginalPrice(formatted)

                        if (sameAsOriginal) setPrice(formatted)
                      }}
                      className={errors?.originalPrice ? 'border-red-500' : ''}
                    />
                    {errors?.originalPrice && (
                      <p className="text-sm text-red-500">
                        {errors.originalPrice}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="price">판매가격 *</Label>
                      <Input
                        id="price"
                        name="price"
                        placeholder="0"
                        min="0"
                        value={price}
                        onChange={e =>
                          setPrice(formatWithCommas(e.target.value))
                        }
                        disabled={sameAsOriginal}
                        className={errors?.price ? 'border-red-500' : ''}
                      />
                      {errors?.price && (
                        <p className="text-sm text-red-500">{errors.price}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="sameAsOriginal"
                        className="text-sm text-gray-700">
                        정가와 동일
                      </Label>
                      <Switch
                        id="sameAsOriginal"
                        name="sameAsOriginal"
                        checked={sameAsOriginal}
                        onCheckedChange={checked => {
                          setSameAsOriginal(checked)
                          if (checked && originalPrice !== '') {
                            setPrice(originalPrice)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock">재고 수량 *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="0"
                      min="0"
                      // ...value/onChange 추가 가능
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        name="sku"
                        placeholder="직접 입력"
                        value={sku}
                        onChange={e => setSku(e.target.value)}
                        disabled={autoGenerate}
                        className={errors?.sku ? 'border-red-500' : ''}
                      />
                      {errors?.sku && (
                        <p className="text-sm text-red-500">{errors.sku}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoGenerateSku">SKU 자동 생성</Label>
                      <Switch
                        id="autoGenerateSku"
                        name="autoGenerateSku"
                        checked={autoGenerate}
                        onCheckedChange={setAutoGenerate}
                      />
                    </div>
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
                        name="productImages"
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
            {/* <Card>
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
          </Card> */}
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
                  <Label htmlFor="status">판매 상태</Label>
                  <Switch
                    id="status"
                    name="status"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>
                {/* <div className="flex items-center justify-between">
                <Label htmlFor="featured">추천 상품</Label>
                <Switch
                  id="featured"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
              </div> */}
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
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.01"
                    placeholder="0.0"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="length">길이</Label>
                    <Input
                      id="length"
                      name="length"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">너비</Label>
                    <Input
                      id="width"
                      name="width"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">높이</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shippingFee">배송비</Label>
                  <Input
                    id="shippingFee"
                    name="shippingFee"
                    placeholder="0"
                    min="0"
                    value={shippingFee}
                    onChange={e =>
                      setShippingFee(formatWithCommas(e.target.value))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* 추가 옵션 */}
            {/* <Card>
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
          </Card> */}
          </div>
        </div>
      </form>
    </div>
  )
}
