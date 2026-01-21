'use client'

import { usePWAStore } from '@/lib/pwaStore'

export function PWAInstallButton() {
  const deferredPrompt = usePWAStore(state => state.deferredPrompt)
  const setDeferredPrompt = usePWAStore(state => state.setDeferredPrompt)

  if (!deferredPrompt) return null

  const install = async () => {
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    // 분석용 로그
    console.log('PWA install outcome:', outcome)

    setDeferredPrompt(null)
  }

  return (
    <button className="cursor-pointer" onClick={() => void install()}>
      앱 설치
    </button>
  )
}
