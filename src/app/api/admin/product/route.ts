import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { BucketName, PRODUCT_STATUS, USER_ROLE } from '@/types/enums'
import { Products, Profile } from '@/types/tables'
import { SupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

/** sku 자동생성 */
function generateSku(): string {
  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `SKU-${dateStr}-${random}` // 예: SKU-20250927-K1W9Z
}

/** 고유한 sku 생성 (중복이 있으면 재시도) */
export async function generateUniqueSku(
  supabase: SupabaseClient,
  maxRetries = 5,
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    const sku = generateSku() // 랜덤 SKU 생성
    const { error } = await supabase
      .from('products')
      .select('id')
      .eq('sku', sku)
      .single<Products>()

    // PGRST116 = row not found => 중복 아님
    if (error && error.code === 'PGRST116') {
      return sku
    }

    // 중복이거나 에러면 재시도
  }

  throw new Error()
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const formData = await req.formData()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const originalPrice = formData.get('originalPrice') as string
  const sameAsOriginal = formData.has('sameAsOriginal')
  const price = sameAsOriginal
    ? originalPrice
    : (formData.get('price') as string)
  const stock = formData.get('stock') as string | null
  let sku = formData.get('sku') as string | null
  const autoGenerateSku = formData.has('autoGenerateSku')
  const productImages = formData.getAll('productImages') as File[]
  const status = formData.has('status')
  const weight = formData.get('weight') as string
  const length = formData.get('length') as string
  const width = formData.get('width') as string
  const height = formData.get('height') as string
  const shippingFee = formData.get('shippingFee') as string

  // 에러수집용
  const errors: Record<string, string> = {}

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 })
  }

  const { data } = await supabase
    .from('profiles')
    .select('user_no')
    .eq('id', user.id)
    .in('user_role', [USER_ROLE.ADMIN, USER_ROLE.SELLER])
    .single<Profile>()
  if (!data) {
    await supabase.auth.signOut()
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  // 상품명 체크
  if (!name.trim()) {
    errors.name = '상품명을 입력해주세요.'
  }

  // 카테고리 체크
  if (!category) {
    errors.category = '카테고리를 선택해주세요.'
  }

  // 정가 체크
  if (originalPrice === '0') {
    errors.originalPrice = '정가는 0원으로 설정할 수 없습니다.'
  }

  // 판매가가 정가보다 높으면 안됨
  if (price > originalPrice) {
    errors.price = '판매가를 정가보다 높게 설정할 수 없습니다.'
  }

  // sku 자동생성 (sku 입력이 없어도 강제생성)
  if (!sku || autoGenerateSku) {
    try {
      sku = await generateUniqueSku(supabase)
    } catch {
      errors.sku =
        '고유한 SKU를 생성하지 못했습니다.\n 다시 한 번 시도해주세요.'
    }
  }

  // 검증에러가 있으면 이미지 체크까지는 하지 않도록함
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors })
  }

  // 이미지 업로드 처리
  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name,
        description,
        category_id: category,
        original_price: originalPrice,
        price,
        stock: stock || 0,
        sku,
        status: status
          ? stock === '0'
            ? PRODUCT_STATUS.SOLD_OUT
            : PRODUCT_STATUS.ACTIVE
          : PRODUCT_STATUS.PAUSED,
        weight: weight || 0,
        length: length || 0,
        width: width || 0,
        height: height || 0,
        shipping_fee: shippingFee || 0,
        seller_no: data.user_no,
      })
      .select()
      .single<Products>()

    if (productError || !product) {
      logger.error('상품 등록 실패', productError)
      return NextResponse.json({ error: '상품 등록 실패' }, { status: 500 })
    }

    const uploadedImageUrls: string[] = []
    const bucket = BucketName.ProductImages
    for (const file of productImages) {
      if (!file.name.includes('.')) {
        errors.file = 'extension_not_found'
      } else {
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const filename = `${product.product_id}/${uuidv4()}.${extension}`
        const uploadBuffer = Buffer.from(await file.arrayBuffer())
        const contentType = file.type

        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
        if (!allowedExtensions.includes(extension)) {
          errors.file = 'invalid_file_type'
          return NextResponse.json({ errors })
        }

        // storage에 업로드
        const { error } = await supabase.storage
          .from(bucket)
          .upload(filename, uploadBuffer, {
            contentType,
            upsert: true,
          })

        if (error) {
          logger.error('상품이미지 업로드 실패', error)
          errors.file = 'upload_error'
          return NextResponse.json({ errors })
        }

        uploadedImageUrls.push(filename)
      }
    }

    const imageRecords = uploadedImageUrls.map((url, idx) => ({
      product_id: product.product_id,
      img_url: url,
      img_order: idx,
    }))

    // product_images에 저장
    const { error: imageInsertError } = await supabase
      .from('product_images')
      .insert(imageRecords)

    if (imageInsertError) {
      logger.error('상품 이미지 등록 실패', imageInsertError)
      return NextResponse.json(
        { error: '상품 이미지 등록 실패' },
        { status: 500 },
      )
    }
  } catch (e) {
    logger.error('상품 등록중 예기치않은 에러', e)
    return NextResponse.json({ error: '상품 등록중 에러발생' })
  }

  return NextResponse.json({ success: true })
}
