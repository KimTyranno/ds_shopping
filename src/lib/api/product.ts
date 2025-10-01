import { Products } from '@/types/tables'
import { SupabaseClient } from '@supabase/supabase-js'

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
