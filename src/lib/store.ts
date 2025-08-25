import { User } from '@/lib/auth'
import { create } from 'zustand'

type Store = {
  isMobileSearchOpen: boolean
  toggleMobileSearch: () => void
  user: User | null
  setUser: (_user: User) => void
  clearUser: () => void
}

const useStore = create<Store>()((set, get) => ({
  isMobileSearchOpen: false,
  toggleMobileSearch: () =>
    set({ isMobileSearchOpen: !get().isMobileSearchOpen }),
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useStore
