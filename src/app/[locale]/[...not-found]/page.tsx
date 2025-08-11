import { notFound } from 'next/navigation'

/**
 * catch-all 라우트
 * src/app/[locale] 하위의 어떤 경로든 다 매칭한다
 * 단, 존재하는 경로가 있다면 그쪽이 우선이고, 존재하지 않을때만 여기로 온다.
 *  */
export default function CatchAllPage() {
  return notFound()
}
