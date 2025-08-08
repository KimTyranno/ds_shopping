'use client'

import { createClient } from '@/lib/client'
import useStore from '@/lib/store'
import { useEffect } from 'react'

export default function AuthProvider() {
  const setUser = useStore(state => state.setUser)
  const clearUser = useStore(state => state.clearUser)

  useEffect(() => {
    const supabase = createClient()

    // 유저정보를 상태관리에 갱신
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const profile = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        setUser({ ...user, name: profile.data.name })
      } else clearUser()
    })

    // 로그인/로그아웃 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setUser(session.user)
        else clearUser()
      },
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  })

  return null
}
