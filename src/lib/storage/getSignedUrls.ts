import { BucketName } from '@/types/enums'
import { SupabaseClient } from '@supabase/supabase-js'
import { logger } from '../logger'

/**
 * Supabase 비공개 스토리지 파일들에 대한 signed URL 목록 반환
 *
 * @param bucket Supabase 버킷 이름
 * @param paths 파일 경로 배열
 * @param expiresIn 유효 시간 (초) — 기본 60초
 * @returns 경로 순서와 일치하는 signed URL 배열
 */
export async function getSignedUrls(
  supabase: SupabaseClient,
  bucket: BucketName,
  paths: string[],
  expiresIn = 60,
): Promise<string[]> {
  const signedUrls: string[] = []

  for (const path of paths) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error || !data?.signedUrl) {
      logger.error(`서명된 URL 생성실패: ${path}`, error)
      continue
    }

    signedUrls.push(data.signedUrl)
  }

  return signedUrls
}

export async function getSignedUrlRecord(
  supabase: SupabaseClient,
  bucket: BucketName,
  paths: string[],
  expiresIn = 60,
): Promise<Record<string, string>> {
  const signedUrlRecord: Record<string, string> = {}

  for (const path of paths) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error || !data?.signedUrl) {
      logger.error(`서명된 URL 생성실패: ${path}`, error)
      continue
    }

    signedUrlRecord[path] = data.signedUrl
  }

  return signedUrlRecord
}
