'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// 스크롤 복원할 경로들 정의 (스크롤을 맨위로 가지않고 유지하고 싶은곳에 추가)
const pathsToPreserveScroll = ['/product']

// 브라우저의 기본 스크롤 위치 복원 (스크롤 위치를 브라우저가 기억하고 복원) 때문에 만들었음
// 화면 전환 후 스크롤을 맨 위로 가게함
export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const shouldPreserve = pathsToPreserveScroll.some(path =>
      pathname.startsWith(path),
    )
    if (!shouldPreserve) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
