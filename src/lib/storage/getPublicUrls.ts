import { BucketName } from '@/types/enums'
import { createClient } from '../client'

/**
 * 여러 개의 스토리지 파일 경로에 대한 public URL을 반환하는 함수
 *
 * @param bucketName Supabase Storage 버킷 이름
 * @param paths 파일 경로 리스트 (예: ['abc.png', 'user1.jpg'])
 * @returns 각 경로에 대한 publicUrl 배열
 */
export function getPublicUrls(bucketName: BucketName, paths: string[]) {
  const supabase = createClient()
  return paths.map(path => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(path)
    return data.publicUrl
  })
}
