'use client'

import { UserWithProfile } from '@/lib/auth'
import { createClient } from '@/lib/client'
import useStore from '@/lib/store'
import { useEffect } from 'react'

export default function AuthProvider({
  user,
}: {
  user: UserWithProfile | null
}) {
  const setUser = useStore(state => state.setUser)
  const clearUser = useStore(state => state.clearUser)

  useEffect(() => {
    if (user) {
      setUser(user)
    } else {
      clearUser()
    }
  }, [user])

  useEffect(() => {
    const supabase = createClient()
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          clearUser()
        }
      },
    )

    return () => subscription.subscription.unsubscribe()
  }, [])

  return null
}
