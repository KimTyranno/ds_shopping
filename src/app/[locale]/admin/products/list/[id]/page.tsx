import ProductDetailPage from '@/components/admin/products/list/detail'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { getPublicUrls } from '@/lib/storage/getPublicUrls'
import { BucketName, PRODUCT_STATUS_TYPE } from '@/types/enums'
import { Categories, ProductImages, Products } from '@/types/tables'
import { PostgrestError } from '@supabase/supabase-js'

type ProductDetailReturnType = Products & {
  product_images: Pick<ProductImages, 'img_url' | 'img_order'>[]
  profiles: {
    name: string
  }
}

export type ProductDetailType = {
  categoryId: number
  categoryName: string
  createdAt: string
  deletedAt: string | null
  description: string | null
  name: string
  originalPrice: string
  price: string
  productId: number
  sellerName: string
  shippingFee: number
  sku: string
  soldCount: number
  status: PRODUCT_STATUS_TYPE
  stock: number
  views: number
  images: {
    url: string
    order: number
  }[]
  weight: number | null
  width: number | null
  height: number | null
  length: number | null
}

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // foreign key관계가 설정되어 있으면 product_images로 가져오기 가능
  // profiles:seller_no 는 명확한 관계를 지정해야할때 사용 (외래키가 2개이상이면 무조건)
  const { data, error } = await supabase
    .from('products')
    .select(
      `
    *,
    product_images (
      img_url,
      img_order
    ),
    profiles:seller_no (
      name
    )
  `,
    )
    .eq('product_id', id)
    .single<ProductDetailReturnType>()

  if (error) {
    logger.error('관리자페이지 상품상세 불러오기에서 에러발생', error)
    throw error
  }

  const { data: categoryData, error: categoryError } = (await supabase
    .from('categories')
    .select('id, name')) as {
    data: Categories[]
    error: PostgrestError | null
  }

  if (categoryError) {
    logger.error(
      '관리자페이지 상품상세 카테고리 불러오기에서 에러발생',
      categoryError,
    )
    throw categoryError
  }

  // 혹시모르니 이미지를 수동으로 정렬
  const sortedImages = data.product_images.sort(
    (a, b) => a.img_order - b.img_order,
  )

  const productImgPaths = sortedImages
    ?.map(product => product.img_url)
    .filter(path => typeof path === 'string')

  // 공개 URL 매핑 생성
  const productMainImageUrlAry = getPublicUrls(
    supabase,
    BucketName.ProductImages,
    productImgPaths,
  )

  const productDetail: ProductDetailType = {
    productId: data.product_id,
    categoryId: data.category_id,
    categoryName:
      categoryData.find(category => category.id === data.category_id)?.name ||
      '',
    createdAt: data.created_at,
    deletedAt: data.deleted_at,
    description: data.description,
    images: productMainImageUrlAry.map((url, idx) => ({ url, order: idx })),
    name: data.name,
    originalPrice: String(data.original_price),
    price: String(data.price),
    sellerName: data.profiles.name,
    shippingFee: data.shipping_fee,
    sku: data.sku,
    soldCount: data.sold_count,
    status: data.status,
    stock: data.stock,
    views: data.views,
    weight: data.weight,
    width: data.width,
    height: data.height,
    length: data.length,
  }

  return <ProductDetailPage product={productDetail} categories={categoryData} />
}
