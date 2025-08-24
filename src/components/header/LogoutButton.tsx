'use client'

import { createClient } from '@/lib/client'
import useStore from '@/lib/store'
import useLocalePath from '@/lib/useLocalePath'
import { LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

type LogoutButtonProps = {
  handleClose: () => void
}

const LogoutButton = (props: LogoutButtonProps) => {
  const t = useTranslations()
  const user = useStore(state => state.user)
  const router = useRouter()
  const path = useLocalePath()

  if (!user) return null

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    props.handleClose()
    router.push(path('/login'))
  }

  return (
    <button
      onClick={() => {
        void signOut()
      }}
      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors w-full text-left cursor-pointer">
      <LogOut className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">{t('user.logout')}</span>
    </button>
  )
}

export default LogoutButton
