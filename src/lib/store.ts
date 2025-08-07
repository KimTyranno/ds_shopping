import { create } from 'zustand'

type Store = {
  isMobileSearchOpen: boolean
  toggleMobileSearch: () => void
}

const useStore = create<Store>()((set, get) => ({
  isMobileSearchOpen: false,
  toggleMobileSearch: () =>
    set({ isMobileSearchOpen: !get().isMobileSearchOpen }),
}))

export default useStore
