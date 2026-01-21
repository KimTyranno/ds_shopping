import { create } from 'zustand'

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

interface PWAState {
  deferredPrompt: BeforeInstallPromptEvent | null
  setDeferredPrompt: (_: BeforeInstallPromptEvent | null) => void
}

export const usePWAStore = create<PWAState>(set => ({
  deferredPrompt: null,
  setDeferredPrompt: e => set({ deferredPrompt: e }),
}))
