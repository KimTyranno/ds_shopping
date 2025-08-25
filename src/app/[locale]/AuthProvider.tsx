'use client'

import { useRouter } from '@/i18n/navigation'
import { User } from '@/lib/auth'
import { createClient } from '@/lib/client'
import useStore from '@/lib/store'
import useLocalePath from '@/lib/useLocalePath'
import { useEffect } from 'react'

export default function AuthProvider({ user }: { user: User | null }) {
  const setUser = useStore(state => state.setUser)
  const clearUser = useStore(state => state.clearUser)
  const router = useRouter()
  const path = useLocalePath()

  useEffect(() => {
    const supabase = createClient()

    if (user) {
      setUser(user)
    } else {
      clearUser()
    }

    // 로그인/로그아웃 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // 세션 만료 or 로그아웃
      if (!session || !session.user || event === 'SIGNED_OUT') {
        clearUser()
        router.push(path('/login?message=sessionExpired'))
        return
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return null
}
