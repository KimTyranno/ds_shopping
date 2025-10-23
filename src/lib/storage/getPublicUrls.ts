import { BucketName } from '@/types/enums'
import { SupabaseClient } from '@supabase/supabase-js'

/**
 * 여러 개의 스토리지 파일 경로에 대한 public URL을 배열로 반환하는 함수
 *
 * @param supabase Supabase 클라이언트 인스턴스
 * @param bucketName Supabase Storage 버킷 이름
 * @param paths 파일 경로 리스트 (예: ['abc.png', 'user1.jpg'])
 * @returns 각 경로에 대한 publicUrl 배열
 */
export function getPublicUrls(
  supabase: SupabaseClient,
  bucketName: BucketName,
  paths: string[],
) {
  if (paths.length === 0) return []

  return paths.map(path => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(path)
    return data.publicUrl
  })
}

/**
 * 여러 개의 스토리지 파일 경로에 대한 public URL을 Map으로 반환하는 함수
 *
 * @param supabase Supabase 클라이언트 인스턴스
 * @param bucketName Supabase Storage 버킷 이름
 * @param paths 파일 경로 리스트 (예: ['abc.png', 'user1.jpg'])
 * @returns 경로별 publicUrl 맵
 */
export function getPublicUrlRecord(
  supabase: SupabaseClient,
  bucketName: BucketName,
  paths: string[],
) {
  const urls: Record<string, string> = {}
  if (paths.length === 0) return urls

  paths.forEach(path => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(path)
    urls[path] = data.publicUrl
  })

  return urls
}
