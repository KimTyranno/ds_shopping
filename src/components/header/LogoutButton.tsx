'use client'

import useStore from '@/lib/store'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
  const user = useStore(state => state.user)

  if (!user) return null

  return (
    <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors w-full text-left">
      <LogOut className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">로그아웃</span>
    </button>
  )
}

export default LogoutButton
