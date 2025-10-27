'use server'

import { logger } from '@/lib/logger'
import { createClient } from '@/lib/server'
import { BucketName } from '@/types/enums'
import { revalidatePath } from 'next/cache'

export async function ChangeProductStatusAction(
  productId: number,
  newStatus: string,
) {
  const supabase = await createClient()

  try {
    const updateData: { status: string; deleted_at?: string | null } = {
      status: newStatus,
      // 상태가 'deleted'라면 현재 날짜를 deleted_at에 추가
      deleted_at: newStatus === 'deleted' ? new Date().toISOString() : null,
    }

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('product_id', productId)

    if (error) {
      logger.error('상품 상태 변경 실패', error)
      throw new Error('상품 상태 변경에 실패하였습니다.')
    }
  } catch (error) {
    logger.error('상품 상태 변경 중 에러', error)
    throw new Error('상품 상태 변경 중 에러가 발생하였습니다.')
  }

  revalidatePath(`/admin/products/list/${productId}`)
}

/** 상품 물리삭제 */
export async function DeleteProduct(id: number) {
  const supabase = await createClient()
  const bucket = BucketName.ProductImages

  const { data: existingImages } = (await supabase
    .from('product_images')
    .select('img_url')
    .eq('product_id', id)) as {
    data: { img_url: string }[]
  }

  const deleteUrls = existingImages.map(img => img.img_url)

  // storage에서 삭제
  await supabase.storage.from(bucket).remove(deleteUrls)

  // 상품 삭제 (product_images는 cascade에 의해 삭제됨)
  await supabase.from('products').delete().eq('product_id', id)
}
