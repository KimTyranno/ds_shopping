'use client'

import type React from 'react'

import PasswordStrength from '@/components/PasswordStrength'
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
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/client'
import { cn } from '@/lib/utils'
import { CircleAlert, Eye, EyeOff, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations('reset_password')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 클라이언트 사이드 검증
    if (!password || !confirmPassword) {
      setError('error_fill_all_fields')
      return
    }

    if (password !== confirmPassword) {
      setError('error_passwords_do_not_match')
      return
    }

    if (password.length < 8) {
      setError('error_password_too_short')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        console.error('비밀번호 재설정 실패', error)
        if (
          error.message.includes(
            'New password should be different from the old password',
          )
        ) {
          setError('error_password_same_as_old')
        } else {
          setError('error_password_reset_failed')
        }
        setIsLoading(false)
        return
      }
      // NOTE: 인증쿠키가 남아있게돼서 혹시몰라 삭제
      await supabase.auth.signOut()

      router.push('/login?message=password_reset_success&messageType=success')
    } catch {
      throw new Error('error_password_reset_exception')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-bold text-2xl">{t('site_name')}</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">
              {t('set_new_password_title')}
            </CardTitle>
            <CardDescription>
              {t('set_new_password_description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* 알림 메시지 */}
            {error && (
              <Alert
                className={cn('mb-4 text-red-600 border-red-200 bg-red-50')}>
                <CircleAlert />
                <AlertDescription className="text-red-800">
                  {t(`messages.${error}`)}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={e => void handleSubmit(e)} className="space-y-4">
              {/* 새 비밀번호 */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('new_password_label')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('new_password_placeholder')}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* 비밀번호 강도 표시 */}
                {password && <PasswordStrength password={password} />}
              </div>

              {/* 비밀번호 확인 */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {t('confirm_password_label')}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder={t('confirm_password_placeholder')}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-600">
                    {t('passwords_not_match')}
                  </p>
                )}
                {confirmPassword && password === confirmPassword && (
                  <p className="text-sm text-green-600">
                    {t('passwords_match')}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  isLoading ||
                  !password ||
                  !confirmPassword ||
                  password !== confirmPassword
                }>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t('resetting_password')}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    {t('reset_password_button')}
                  </>
                )}
              </Button>
            </form>

            {/* 보안 안내 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                {t('security_recommendations_title')}
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('rec_use_complex_password')}</li>
                <li>{t('rec_use_unique_password')}</li>
                <li>{t('rec_change_password_regularly')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
