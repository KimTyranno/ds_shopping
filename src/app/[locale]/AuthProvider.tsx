'use client'

import { User } from '@/lib/auth'
import useStore from '@/lib/store'
import { useEffect } from 'react'

export default function AuthProvider({ user }: { user: User | null }) {
  const setUser = useStore(state => state.setUser)
  const clearUser = useStore(state => state.clearUser)

  useEffect(() => {
    if (user) {
      setUser(user)
    } else {
      clearUser()
    }
  }, [user])

  return null
}
