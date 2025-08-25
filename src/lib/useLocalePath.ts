'use client'

import { useLocale } from 'next-intl'
import { useCallback } from 'react'

/** 현재 locale을 감지해서 경로에 붙여주는 훅 (client component 전용) */
export default function useLocalePath() {
  const locale = useLocale()

  const localePath = useCallback(
    (path: string) => {
      if (path.startsWith(`/${locale}`)) return path
      return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`
    },
    [locale],
  )

  return localePath
}
