import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { BucketName, PRODUCT_STATUS, USER_ROLE } from '@/types/enums'
import { Products, Profile } from '@/types/tables'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { generateUniqueSku } from '../route'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  const formData = await req.formData()
  const { id: productId } = await params

  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const price = formData.get('price') as string
  const originalPrice = formData.get('originalPrice') as string
  const stock = formData.get('stock') as string | null
  const description = formData.get('description') as string
  /** 기존이미지 URL와 새로 업로드된 File이 저장됨 */
  const productImages = formData.getAll('productImages') as (File | string)[]
  let sku = formData.get('sku') as string
  const status = formData.get('status') as string
  const shippingFee = formData.get('shippingFee') as string
  const weight = formData.get('weight') as string
  const width = formData.get('width') as string
  const height = formData.get('height') as string
  const length = formData.get('length') as string

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
  if (!sku) {
    try {
      sku = await generateUniqueSku(supabase)
    } catch {
      errors.sku =
        '고유한 SKU를 생성하지 못했습니다.\n 다시 한 번 시도해주세요.'
    }
  }

  // 검증에러가 있으면 이미지 처리전에 에러를 반환
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors })
  }

  // 이미지 업로드 처리
  const bucket = BucketName.ProductImages
  const uploadedImageUrls: string[] = productImages.map(img => {
    if (typeof img === 'string') return img
    return img.name
  })

  const { data: existingImages } = (await supabase
    .from('product_images')
    .select('id, img_url')
    .eq('product_id', productId)) as { data: { id: number; img_url: string }[] }

  // 1. 기존 이미지가 제거됐으면 DB와 storage에서 삭제
  // 기존 이미지 URL만 필터링
  const existingImageUrls = productImages.filter(img => typeof img === 'string')
  // 제거된 이미지 찾기
  const imagesToDelete = existingImages
    .map(img => img.img_url)
    .filter(img => !existingImageUrls.some(url => url.includes(img)))

  // 편집해서 저장하면 file을 url로 바꿔놔야할듯? typeof img === 'string'에서 계속 걸림

  if (imagesToDelete.length > 0) {
    // 제거된 이미지를 DB에서 삭제
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('product_id', productId)
      .in('img_url', imagesToDelete)

    if (error) {
      logger.error('상품 이미지 삭제 처리중 이미지 불러오기 실패', error)
      return NextResponse.json(
        { error: '상품 이미지 삭제 처리중 이미지 불러오기 실패' },
        { status: 500 },
      )
    }

    // 제거된 이미지를 storage에서 삭제
    await supabase.storage.from(bucket).remove(imagesToDelete)
  }

  // 2. 이미지가 업로드 됐으면 새롭게 추가
  // 새로 업로드된 파일만 필터링
  const newFiles = productImages.filter(img => img instanceof File)
  if (newFiles.length > 0) {
    // 확장자 확인
    for (const file of newFiles) {
      // 확장자가 없는지 확인
      if (!file.name.includes('.')) {
        errors.file = 'extension_not_found'
      }

      // 허용된 확장자인지 확인
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
      if (!allowedExtensions.includes(extension)) {
        errors.file = 'invalid_file_type'
      }
    }

    // 검증에러가 있으면 중간에 에러를 반환
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors })
    }

    try {
      // storage에 이미지를 새롭게 업로드
      for (const file of newFiles) {
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const filename = `${productId}/${uuidv4()}.${extension}`
        const uploadBuffer = Buffer.from(await file.arrayBuffer())
        const contentType = file.type

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
        const urlIndex = uploadedImageUrls.findIndex(url => url === file.name)
        uploadedImageUrls[urlIndex] = filename
      }
    } catch (e) {
      logger.error('상품 이미지 업로드중 예기치않은 에러', e)
      return NextResponse.json({ error: '상품 이미지 업로드중 에러발생' })
    }
  }

  // 3. 이미지 순서를 재정렬
  // 순서 변경 여부 확인
  const existingUrls = existingImages.map(img => img.img_url)
  const isOrderChanged = productImages.every((img, index) => {
    if (img instanceof File) return false
    return img === existingUrls[index]
  })
  if (
    // 삭제된 이미지 유무
    imagesToDelete.length > 0 ||
    // 추가된 이미지 유무
    newFiles.length > 0 ||
    isOrderChanged
  ) {
    // 순서가 바뀌었으므로 img_order만 업데이트
    for (let i = 0; i < productImages.length; i++) {
      const file = productImages[i]

      // 새로 업로드된 파일이 아니라 기존 파일인 경우만 처리
      if (typeof file === 'string') {
        const { error } = await supabase
          .from('product_images')
          .update({ img_order: i })
          .eq('product_id', productId)
          .eq('img_url', file)

        if (error) {
          logger.error('이미지 순서 업데이트 실패', error)
          return NextResponse.json(
            { error: '이미지 순서 업데이트 실패' },
            { status: 500 },
          )
        }
      }
    }
  }

  // 상품 업데이트
  const { data: product, error: productError } = await supabase
    .from('products')
    .update({
      name,
      description,
      category_id: category,
      original_price: originalPrice,
      price,
      stock: stock || 0,
      sku,
      status:
        status === PRODUCT_STATUS.DELETED
          ? status
          : status === PRODUCT_STATUS.ACTIVE && stock === '0'
            ? PRODUCT_STATUS.SOLD_OUT
            : status,
      weight: weight || 0,
      length: length || 0,
      width: width || 0,
      height: height || 0,
      shipping_fee: shippingFee || 0,
      seller_no: data.user_no,
    })
    .eq('product_id', productId)
    .select()
    .single<Products>()

  if (productError || !product) {
    logger.error('상품 업데이트 실패', productError)
    return NextResponse.json({ error: '상품 업데이트 실패' }, { status: 500 })
  }

  if (newFiles.length > 0) {
    const imageRecords = uploadedImageUrls.map((url, idx) => ({
      product_id: productId,
      img_url: url,
      img_order: idx,
    }))

    // product_images에 저장
    const { error: imageInsertError } = await supabase
      .from('product_images')
      .upsert(imageRecords)

    if (imageInsertError) {
      logger.error('상품 이미지 등록 실패', imageInsertError)
      return NextResponse.json(
        { error: '상품 이미지 등록 실패' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ success: true })
}
