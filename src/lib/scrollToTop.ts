'use client'

import { useEffect } from 'react'

// 브라우저의 기본 스크롤 위치 복원 (스크롤 위치를 브라우저가 기억하고 복원) 때문에 만들었음
// 화면 전환 후 스크롤을 맨 위로 두고 싶을때 사용
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}
