import { Database } from '@/types/supabase'
import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type Profile = Database['public']['Tables']['profiles']['Row']

type UserWithProfile = User & { name?: Profile['name'] }

type Store = {
  isMobileSearchOpen: boolean
  toggleMobileSearch: () => void
  user: UserWithProfile | null
  setUser: (user: UserWithProfile) => void
  clearUser: () => void
}

const useStore = create<Store>()((set, get) => ({
  isMobileSearchOpen: false,
  toggleMobileSearch: () =>
    set({ isMobileSearchOpen: !get().isMobileSearchOpen }),
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useStore
