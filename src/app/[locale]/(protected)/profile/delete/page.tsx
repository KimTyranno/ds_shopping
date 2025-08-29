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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/i18n/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  CircleAlert,
  Shield,
  Trash2,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useActionState, useEffect, useRef, useState } from 'react'
import { profileDeleteAction } from './actions'

export default function DeleteAccountPage() {
  const [confirmText, setConfirmText] = useState('')
  const [agreements, setAgreements] = useState({
    dataDelete: false,
    orderHistory: false,
    noRefund: false,
  })
  const t = useTranslations('mypage.profile_delete')
  const locale = useLocale()

  const [state, formAction, isFending] = useActionState(
    profileDeleteAction,
    undefined,
  )

  // 에러발생시 focus 하는용도
  const agreementsRef = useRef<HTMLDivElement>(null)
  const confirmTextRef = useRef<HTMLDivElement>(null)

  const isConfirmText =
    (locale === 'ko' && confirmText === '계정삭제') ||
    (locale !== 'ko' && confirmText === 'DELETE')

  const isFormValid =
    isConfirmText &&
    agreements.dataDelete &&
    agreements.orderHistory &&
    agreements.noRefund

  useEffect(() => {
    if (!state?.errors) return

    if (state.errors.agreements && agreementsRef.current) {
      agreementsRef.current.focus()
    } else if (state.errors.confirmText && confirmTextRef.current) {
      confirmTextRef.current.focus()
    }
  }, [state])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/edit">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-red-600">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
        </div>

        {/* 경고 메시지 */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{t('warning_title')}</strong> {t('warning_message')}
          </AlertDescription>
        </Alert>

        <form className="space-y-6">
          {/* 탈퇴 시 삭제되는 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                {t('info_title')}
              </CardTitle>
              <CardDescription>{t('info_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {t('info_personal')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {t('info_orders')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {t('info_cart')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {t('info_rewards')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {t('info_reviews')}
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 탈퇴 사유 */}
          <Card>
            <CardHeader>
              <CardTitle>{t('reason_title')}</CardTitle>
              <CardDescription>{t('reason_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  t('reason_low_usage'),
                  t('reason_no_products'),
                  t('reason_expensive'),
                  t('reason_delivery'),
                  t('reason_customer_service'),
                  t('reason_privacy'),
                  t('reason_etc'),
                ].map(reason => (
                  <div key={reason} className="flex items-center space-x-2">
                    <Checkbox id={reason} />
                    <Label htmlFor={reason} className="text-sm cursor-pointer">
                      {reason}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 동의 사항 */}
          <Card ref={agreementsRef}>
            {state?.errors?.agreements && (
              <CardContent>
                <Label htmlFor="confirmText" className="text-sm text-red-500">
                  <CircleAlert />
                  {t('messages.all_required')}
                </Label>
              </CardContent>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('agreement_title')}
              </CardTitle>
              <CardDescription>{t('agreement_description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`space-y-3 ${state?.errors?.agreements ? 'border-red-500' : ''}`}>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dataDelete"
                    name="dataDelete"
                    checked={agreements.dataDelete}
                    onCheckedChange={checked =>
                      setAgreements(prev => ({
                        ...prev,
                        dataDelete: checked as boolean,
                      }))
                    }
                  />
                  <Label
                    htmlFor="dataDelete"
                    className="text-sm cursor-pointer leading-relaxed">
                    {t('agreement_data_delete')}
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="orderHistory"
                    name="orderHistory"
                    checked={agreements.orderHistory}
                    onCheckedChange={checked =>
                      setAgreements(prev => ({
                        ...prev,
                        orderHistory: checked as boolean,
                      }))
                    }
                  />
                  <Label
                    htmlFor="orderHistory"
                    className="text-sm cursor-pointer leading-relaxed">
                    {t('agreement_order_history')}
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="noRefund"
                    name="noRefund"
                    checked={agreements.noRefund}
                    onCheckedChange={checked =>
                      setAgreements(prev => ({
                        ...prev,
                        noRefund: checked as boolean,
                      }))
                    }
                  />
                  <Label
                    htmlFor="noRefund"
                    className="text-sm cursor-pointer leading-relaxed">
                    {t('agreement_no_refund')}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 확인 입력 */}
          <Card
            ref={confirmTextRef}
            className={state?.errors?.confirmText ? 'border-red-500' : ''}>
            {state?.errors?.confirmText && (
              <CardContent>
                <Label htmlFor="confirmText" className="text-sm text-red-500">
                  <CircleAlert />
                  {t('messages.text_mismatch')}
                </Label>
              </CardContent>
            )}
            <CardHeader>
              <CardTitle>{t('confirmation_title')}</CardTitle>
              <CardDescription>{t('confirmation_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="confirmText">
                  {t('confirmation_input_label')}
                </Label>
                <Input
                  id="confirmText"
                  name="confirmText"
                  value={confirmText}
                  onChange={e => setConfirmText(e.target.value)}
                  placeholder={t('confirmation_placeholder')}
                  className={
                    (locale === 'ko' && confirmText === '계정삭제') ||
                    (locale !== 'ko' && confirmText === 'DELETE')
                      ? 'border-green-500'
                      : ''
                  }
                />
                <p className="text-sm text-muted-foreground">
                  {t('confirmation_helper')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex gap-3">
            <Button
              formAction={formAction}
              variant="destructive"
              disabled={!isFormValid || isFending}
              className="flex-1">
              {isFending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t('submit_processing')}
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('submit_button')}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              asChild
              className="bg-transparent flex-1">
              <Link href="/profile/edit">{t('cancel_button')}</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
