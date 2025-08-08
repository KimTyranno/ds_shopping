'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import useStore from '@/lib/store'
import { cn } from '@/lib/utils'
import { CircleAlert, MailCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { login } from '../../components/auth/login'

function LoginMessage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const messageType = searchParams.get('messageType')
  if (!message) return null

  return (
    <Alert
      className={cn('text-white', {
        'bg-yellow-600': messageType === 'info',
        'bg-green-600': messageType === 'success',
      })}>
      {messageType === 'success' && <MailCheck />}
      {messageType === 'info' && <CircleAlert />}
      <AlertDescription className="text-inherit">{message}</AlertDescription>
    </Alert>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const setUser = useStore(state => state.setUser)
  const handleLogin = async (formData: FormData) => {
    try {
      const { user } = await login(formData)
      if (user) {
        setUser(user)
        router.push('/')
      }
    } catch (error) {
      toast('로그인에 실패했습니다.', {
        position: 'top-center',
        style: { background: '#e25c5c', color: '#fff' },
      })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Suspense>
          <LoginMessage />
        </Suspense>
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-bold text-2xl">심플몰</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">로그인</CardTitle>
            <CardDescription className="text-center">
              이메일과 비밀번호를 입력하여 로그인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full" type="submit">
                  로그인
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <Separator />
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  계정이 없으신가요?{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    회원가입하기
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
