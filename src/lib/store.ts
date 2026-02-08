import { ProductByCategory } from '@/components/products'
import { UserWithProfile } from '@/lib/auth'
import { create } from 'zustand'

type Store = {
  isMobileSearchOpen: boolean
  toggleMobileSearch: () => void
  isAdminSidebar: boolean
  setIsAdminSidebar: (_value: boolean) => void
  user: UserWithProfile | null
  setUser: (_user: UserWithProfile) => void
  clearUser: () => void
}

const useStore = create<Store>()((set, get) => ({
  isMobileSearchOpen: false,
  toggleMobileSearch: () =>
    set({ isMobileSearchOpen: !get().isMobileSearchOpen }),
  isAdminSidebar: false,
  setIsAdminSidebar: value => set({ isAdminSidebar: value }),
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}))

const CACHE_TTL = 1000 * 60 * 5 // 5분

type CategoryProducts = {
  products: ProductByCategory[]
  lastId: number | null
  hasMore: boolean
  timestamp: number
}

type ProductStore = {
  categories: Record<string, CategoryProducts>
  /** 특정 카테고리의 상품목록을 캐시로 저장 */
  setCategoryData: (
    _categoryId: string,
    _data: Omit<CategoryProducts, 'timestamp'>,
  ) => void

  /** 지정한 카테고리의 상품목록을 캐시에서 제거 (사용은 안하는데 일단 남겨둠) */
  // clearCategoryData: (_categoryId: string) => void

  /** TTL이 지난 캐시들을 제거 */
  clearExpiredCache: () => void

  /** 모든 캐시제거 */
  clearAllCache: () => void
}

const useProductsStore = create<ProductStore>(set => ({
  categories: {},

  setCategoryData: (categoryId, data) =>
    set(state => ({
      categories: {
        ...state.categories,
        [categoryId]: { ...data, timestamp: Date.now() },
      },
    })),

  // clearCategoryData: categoryId =>
  //   set(state => {
  //     const newState = { ...state.categories }
  //     delete newState[categoryId]
  //     return newState
  //   }),

  clearExpiredCache: () =>
    set(state => {
      const now = Date.now()
      const newCategories = Object.fromEntries(
        Object.entries(state.categories).filter(
          ([, c]) => now - c.timestamp < CACHE_TTL,
        ),
      )
      return { categories: newCategories }
    }),

  clearAllCache: () => set({ categories: {} }),
}))

export { useProductsStore, useStore }
