'use client'

import { BeforeInstallPromptEvent, usePWAStore } from '@/lib/pwaStore'
import { useEffect } from 'react'

export function PWAListener({ children }: { children: React.ReactNode }) {
  const setDeferredPrompt = usePWAStore(state => state.setDeferredPrompt)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [setDeferredPrompt])

  return <>{children}</>
}
