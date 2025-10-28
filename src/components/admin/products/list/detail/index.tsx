'use client'

import { CategoryName } from '@/app/[locale]/admin/products/add/page'
import { ChangeProductStatusAction } from '@/app/[locale]/admin/products/list/[id]/actions'
import { ProductDetailType } from '@/app/[locale]/admin/products/list/[id]/page'
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
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { MAX_UPLOAD_IMAGES } from '@/constants'
import { logger } from '@/lib/logger'
import Toast, { ToastTypes } from '@/lib/toast'
import { formatWithCommas } from '@/lib/utils'
import { PRODUCT_STATUS } from '@/types/enums'
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  ImageIcon,
  Images,
  MessageSquare,
  Package,
  Save,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ImagesEditor from '../../../../ImagesEditor'
import ProductStatusBadge from '../StatusBadge'

// 판매 통계 더미 데이터
const salesData = [
  { date: '2024-01-01', sales: 12, revenue: 15480000 },
  { date: '2024-01-02', sales: 8, revenue: 10320000 },
  { date: '2024-01-03', sales: 15, revenue: 19350000 },
  { date: '2024-01-04', sales: 10, revenue: 12900000 },
  { date: '2024-01-05', sales: 18, revenue: 23220000 },
]

// 리뷰 더미 데이터
const reviewsData = [
  {
    id: 1,
    user: '김철수',
    rating: 5,
    comment: '정말 만족스러운 제품입니다. 카메라 화질이 뛰어나요!',
    date: '2024-01-20',
    helpful: 12,
  },
  {
    id: 2,
    user: '이영희',
    rating: 4,
    comment: '배터리 지속시간이 좋습니다. 다만 가격이 조금 비싸네요.',
    date: '2024-01-19',
    helpful: 8,
  },
  {
    id: 3,
    user: '박민수',
    rating: 5,
    comment: '디자인이 세련되고 성능도 우수합니다.',
    date: '2024-01-18',
    helpful: 15,
  },
]

// 재고부족표시 임계값
const lowStockThreshold = 5

type ProductUpdateResponse = {
  success?: false
  error?: string
  errors?: Record<string, string>
}

export default function ProductDetailPage({
  product,
  categories,
}: {
  product: ProductDetailType
  categories: Omit<CategoryName, 'status'>[]
}) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState<ProductDetailType>(product)
  const [loading, setLoading] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [images, setImages] = useState<string[]>(
    product.images.map(img => img.url),
  )
  /** 이미지가 최대 갯수내인지 확인 */
  const isImageCountValid = MAX_UPLOAD_IMAGES > images.length
  const [uploadedFiles, setUploadedFiles] = useState<
    { file: File; blobUrl: string }[]
  >([])

  const [toast, setToast] = useState<{
    message: string
    type: ToastTypes
  } | null>(null)

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            상품을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">
            요청하신 상품이 존재하지 않거나 삭제되었습니다.
          </p>
          <Link href="/admin/products-list">
            <Button>상품 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleCancel = () => {
    setEditedProduct({ ...product })
    setIsEditing(false)
  }

  const productStatusLabel: Record<string, string> = {
    active: '판매중',
    sold_out: '품절',
    paused: '판매중지',
    deleted: '삭제',
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      await ChangeProductStatusAction(product.productId, newStatus)
      setToast({
        message: `상품 상태가 "${productStatusLabel[newStatus]}"${newStatus === 'active' ? '으' : ''}로 변경되었습니다.`,
        type: 'success',
      })
    } catch (error) {
      logger.error('상품 상태 변경 중 요류발생', error)
      setToast({
        message: `상품 상태 변경 중 오류가 발생했습니다.`,
        type: 'error',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setToast({
      message: `상품 정보를 업데이트 하는중입니다.`,
      type: 'loading',
    })

    const formDataToSend = new FormData(e.currentTarget)

    const fieldsToParse = ['originalPrice', 'price', 'shippingFee']
    fieldsToParse.forEach(field => {
      const rawValue = formDataToSend.get(field) as string | null
      if (rawValue) {
        const cleaned = rawValue.replaceAll(',', '') // 콤마 제거
        formDataToSend.set(field, cleaned) // 다시 세팅
      }
    })

    // 이미지들 formData에 추가
    images.forEach(img => {
      // 새롭게 업로드된 이미지
      if (img.startsWith('blob:')) {
        const matched = uploadedFiles.find(entry => entry.blobUrl === img)
        if (matched) {
          formDataToSend.append('productImages', matched.file)
        }
      } else {
        // 기존 이미지는 그대로 추가
        formDataToSend.append('productImages', img)
      }
    })

    try {
      const res = await fetch(`/api/admin/product/${product.productId}`, {
        method: 'PATCH',
        body: formDataToSend,
      })
      const result = (await res.json()) as ProductUpdateResponse

      // status가 200~299가 아닌경우
      if (!res.ok) {
        switch (result.error) {
          case 'session_expired':
          case 'forbidden':
            router.push(`/login?message=${result.error}`)
            break
          default:
            throw new Error('상품 업데이트 실패')
        }
      }

      // 에러설정
      if (!result.success && result.errors) {
        setErrors(result.errors)
        return
      }

      setToast({
        message: `상품 정보가 성공적으로 업데이트되었습니다.`,
        type: 'success',
      })
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      logger.error('에러 발생:', error)
      setToast({
        message: `상품 정보 업데이트중 오류가 발생하였습니다.`,
        type: 'error',
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  // TODO: 판매량, 매출액은 추후
  // const profitMargin = (
  //   ((product.price - product.costPrice) / product.price) *
  //   100
  // ).toFixed(1)
  // const totalRevenue = product.sales * product.price
  // const totalProfit = product.sales * (product.price - product.costPrice)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    try {
      const newFiles = Array.from(files)

      // 이미지 개수가 10개 초과할 경우 자르기
      const isImageLimitExceeded =
        MAX_UPLOAD_IMAGES < images.length + newFiles.length
      if (isImageLimitExceeded) {
        setToast({
          message: `이미지는 최대 ${MAX_UPLOAD_IMAGES}개까지 업로드 할 수 있습니다.`,
          type: 'warning',
        })
      }
      const availableSlots = MAX_UPLOAD_IMAGES - images.length
      if (availableSlots <= 0) {
        return
      }
      const filesToAdd = newFiles.slice(0, availableSlots)
      const imageData = filesToAdd.map(file => ({
        file,
        blobUrl: URL.createObjectURL(file),
      }))
      const previewsUrls = imageData.map(data => data.blobUrl)
      // 미리보기용 URL (기존 이미지 + 업로드 이미지)
      setImages(prev => [...prev, ...previewsUrls])
      // 업로드시 실질적으로 필요한 파일데이터
      setUploadedFiles(prev => [...prev, ...imageData])
    } catch (err) {
      logger.error('이미지 업로드 실패:', err)
      throw new Error('이미지 업로드에 실패하였습니다.')
    }
  }

  useEffect(() => {
    // cleanup 시점에 메모리 해제
    return () => {
      images.forEach(url => URL.revokeObjectURL(url))
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.blobUrl))
    }
  }, [])

  return (
    <div className="space-y-6">
      {toast?.message && toast?.type && (
        <Toast
          message={toast.message}
          type={toast.type}
          callback={() => setToast(null)}
        />
      )}
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {product.sku}
              </code>
              <ProductStatusBadge status={product.status} />
              {/* {product.featured && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={product.status}
            onValueChange={value => void handleStatusChange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PRODUCT_STATUS.ACTIVE}>판매중</SelectItem>
              <SelectItem value={PRODUCT_STATUS.SOLD_OUT}>품절</SelectItem>
              <SelectItem value={PRODUCT_STATUS.PAUSED}>판매중지</SelectItem>
              <SelectItem value={PRODUCT_STATUS.DELETED}>삭제</SelectItem>
            </SelectContent>
          </Select>
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={loading}>
                <X className="h-4 w-4 mr-2" />
                취소
              </Button>
              <Button form="main-form" type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? '저장 중...' : '저장'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              편집
            </Button>
          )}
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">판매가</p>
                <p className="text-2xl font-bold">
                  ₩{Number(product.price).toLocaleString()}
                </p>
                {product.originalPrice > product.price && (
                  <p className="text-sm text-gray-500 line-through">
                    ₩{Number(product.originalPrice).toLocaleString()}
                  </p>
                )}
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">재고</p>
                <p className="text-2xl font-bold">{product.stock}개</p>
                {product.stock <= lowStockThreshold && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    부족
                  </p>
                )}
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 판매량</p>
                <p className="text-2xl font-bold">5개</p>
                <p className="text-sm text-green-600">₩300</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">수익률</p>
                <p className="text-2xl font-bold">{profitMargin}%</p>
                <p className="text-sm text-green-600">
                  ₩{totalProfit.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* 메인 콘텐츠 */}
      <form id="main-form" onSubmit={e => void handleSubmit(e)}>
        <input type="hidden" name="status" value={product.status} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 상품 이미지 */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                상품 이미지
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 대표 이미지 */}
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  {images[activeImageIndex] ? (
                    <Image
                      src={images[activeImageIndex]}
                      alt="대표 이미지"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                      <Images className="w-24 h-24 mb-2" />
                      <span className="text-lg">이미지가 없습니다</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <ImagesEditor
                    {...{
                      images,
                      setImages,
                      onActiveIndexChange: index => {
                        setActiveImageIndex(index)
                      },
                      IsShowAddImageButton: isEditing && isImageCountValid,
                      onImageUpload: handleImageUpload,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 상품 정보 탭 */}
          <Card className="lg:col-span-2">
            <Tabs defaultValue="basic" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">기본 정보</TabsTrigger>
                  <TabsTrigger value="sales">판매 통계</TabsTrigger>
                  <TabsTrigger value="reviews">리뷰 관리</TabsTrigger>
                  {/* <TabsTrigger value="seo">SEO 설정</TabsTrigger> */}
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">상품명</Label>
                      {isEditing ? (
                        <>
                          <Input
                            id="name"
                            name="name"
                            value={editedProduct.name}
                            onChange={e =>
                              setEditedProduct({
                                ...editedProduct,
                                name: e.target.value,
                              })
                            }
                            className={errors?.name ? 'border-red-500' : ''}
                          />
                          {errors?.name && (
                            <p className="text-sm text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller">판매자</Label>
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {product.sellerName}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">카테고리</Label>
                      {isEditing ? (
                        <>
                          <Select
                            name="category"
                            value={editedProduct.categoryId?.toString()}
                            onValueChange={value =>
                              setEditedProduct({
                                ...editedProduct,
                                categoryId: Number.parseInt(value),
                              })
                            }>
                            <SelectTrigger
                              className={
                                errors?.category ? 'border-red-500' : ''
                              }>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}>
                                  {category.name_ko}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors?.category && (
                            <p className="text-sm text-red-500">
                              {errors.category}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.categoryName}
                        </p>
                      )}
                    </div>
                    {/* <div className="space-y-2">
                    <Label htmlFor="subcategory">하위 카테고리</Label>
                    {isEditing ? (
                      <Input
                        id="subcategory"
                        value={editedProduct.subcategory}
                        onChange={e =>
                          setEditedProduct({
                            ...editedProduct,
                            subcategory: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {product.subcategory}
                      </p>
                    )}
                  </div> */}
                    <div className="space-y-2">
                      <Label htmlFor="stock">재고</Label>
                      {isEditing ? (
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          value={editedProduct.stock}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              stock: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.stock}개
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">판매가</Label>
                      {isEditing ? (
                        <>
                          <Input
                            id="price"
                            name="price"
                            value={editedProduct.price}
                            onChange={e =>
                              setEditedProduct({
                                ...editedProduct,
                                price: formatWithCommas(e.target.value),
                              })
                            }
                            className={errors?.price ? 'border-red-500' : ''}
                          />
                          {errors?.price && (
                            <p className="text-sm text-red-500">
                              {errors.price}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          ₩{Number(product.price).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">정가</Label>
                      {isEditing ? (
                        <>
                          <Input
                            id="originalPrice"
                            name="originalPrice"
                            value={editedProduct.originalPrice}
                            onChange={e =>
                              setEditedProduct({
                                ...editedProduct,
                                originalPrice: formatWithCommas(e.target.value),
                              })
                            }
                            className={
                              errors?.originalPrice ? 'border-red-500' : ''
                            }
                          />
                          {errors?.originalPrice && (
                            <p className="text-sm text-red-500">
                              {errors.originalPrice}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          ₩{Number(product.originalPrice).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      {isEditing ? (
                        <Input
                          id="sku"
                          name="sku"
                          value={editedProduct.sku}
                          placeholder="sku가 비어있으면 자동으로 재생성됩니다."
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              sku: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.sku}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shippingFee">배송비</Label>
                      {isEditing ? (
                        <Input
                          id="shippingFee"
                          name="shippingFee"
                          type="number"
                          value={editedProduct.shippingFee}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              shippingFee: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          ₩{Number(product.shippingFee).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="description">상품 설명</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        name="description"
                        value={editedProduct.description || ''}
                        onChange={e =>
                          setEditedProduct({
                            ...editedProduct,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <Label>상품 사양</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">무게</Label>
                      {isEditing ? (
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          value={editedProduct.weight || 0}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              weight: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.weight}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">너비</Label>
                      {isEditing ? (
                        <Input
                          id="width"
                          name="width"
                          type="number"
                          value={editedProduct.width || 0}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              width: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.width}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">높이</Label>
                      {isEditing ? (
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          value={editedProduct.height || 0}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              height: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.height}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length">길이</Label>
                      {isEditing ? (
                        <Input
                          id="length"
                          name="length"
                          type="number"
                          value={editedProduct.length || 0}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              length: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.length}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                  <Label>태그</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                        {isEditing && <X className="h-3 w-3 cursor-pointer" />}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        태그 추가
                      </Button>
                    )}
                  </div>
                </div> */}

                  {/* <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={
                      isEditing ? editedProduct.featured : product.featured
                    }
                    onCheckedChange={checked =>
                      isEditing &&
                      setEditedProduct({ ...editedProduct, featured: checked })
                    }
                    disabled={!isEditing}
                  />
                  <Label htmlFor="featured">추천 상품으로 설정</Label>
                </div> */}
                </TabsContent>

                <TabsContent value="sales" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">평균 평점</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">4.8</span>
                              <div className="flex">{renderStars(4.8)}</div>
                            </div>
                            <p className="text-sm text-gray-500">156개 리뷰</p>
                          </div>
                          <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">월간 판매량</p>
                            <p className="text-2xl font-bold">63개</p>
                            <p className="text-sm text-green-600 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              +12% 증가
                            </p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">전환율</p>
                            <p className="text-2xl font-bold">3.2%</p>
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              -0.5% 감소
                            </p>
                          </div>
                          <Eye className="h-8 w-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>최근 7일 판매 현황</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {salesData.map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                {data.date}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {data.sales}개 판매
                              </p>
                              <p className="text-xs text-gray-600">
                                ₩{data.revenue.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      고객 리뷰 ({reviewsData.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(4.8)}</div>
                      <span className="text-sm text-gray-600">{4.8} / 5.0</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviewsData.map(review => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {review.comment}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              도움됨 {review.helpful}명
                            </span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                답글
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 bg-transparent">
                                <Trash2 className="h-3 w-3 mr-1" />
                                삭제
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* <TabsContent value="seo" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO 제목</Label>
                    {isEditing ? (
                      <Input
                        id="seoTitle"
                        value={editedProduct.seoTitle}
                        onChange={e =>
                          setEditedProduct({
                            ...editedProduct,
                            seoTitle: e.target.value,
                          })
                        }
                        placeholder="검색 엔진에 표시될 제목"
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {product.seoTitle}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">SEO 설명</Label>
                    {isEditing ? (
                      <Textarea
                        id="seoDescription"
                        value={editedProduct.seoDescription}
                        onChange={e =>
                          setEditedProduct({
                            ...editedProduct,
                            seoDescription: e.target.value,
                          })
                        }
                        placeholder="검색 엔진에 표시될 설명"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded">
                        {product.seoDescription}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords">SEO 키워드</Label>
                    {isEditing ? (
                      <Input
                        id="seoKeywords"
                        value={editedProduct.seoKeywords}
                        onChange={e =>
                          setEditedProduct({
                            ...editedProduct,
                            seoKeywords: e.target.value,
                          })
                        }
                        placeholder="쉼표로 구분된 키워드"
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {product.seoKeywords}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">추가 정보</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">무게 (g)</Label>
                      {isEditing ? (
                        <Input
                          id="weight"
                          type="number"
                          value={editedProduct.weight}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              weight: Number.parseInt(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.weight}g
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">크기</Label>
                      {isEditing ? (
                        <Input
                          id="dimensions"
                          value={editedProduct.dimensions}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              dimensions: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.dimensions}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warranty">보증 기간</Label>
                      {isEditing ? (
                        <Input
                          id="warranty"
                          value={editedProduct.warranty}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              warranty: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.warranty}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">공급업체</Label>
                      {isEditing ? (
                        <Input
                          id="supplier"
                          value={editedProduct.supplier}
                          onChange={e =>
                            setEditedProduct({
                              ...editedProduct,
                              supplier: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {product.supplier}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent> */}
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </form>
    </div>
  )
}
