'use client'

import { createClient } from '@/lib/client'
import useStore from '@/lib/store'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

type LogoutButtonProps = {
  handleClose: () => void
}

const LogoutButton = (props: LogoutButtonProps) => {
  const user = useStore(state => state.user)
  const router = useRouter()

  if (!user) return null

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    props.handleClose()
    router.push('/login')
  }

  return (
    <button
      onClick={() => {
        void signOut()
      }}
      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors w-full text-left cursor-pointer">
      <LogOut className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">로그아웃</span>
    </button>
  )
}

export default LogoutButton
