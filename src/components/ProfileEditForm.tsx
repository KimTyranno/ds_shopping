'use client'

import {
  profileEditAction,
  ProfileEditState,
} from '@/app/[locale]/(protected)/profile/edit/actions'
import { Label } from '@/components/ui/label'
import { Link } from '@/i18n/navigation'
import { logger } from '@/lib/logger'
import type { User as AuthUser } from '@supabase/supabase-js'
import imageCompression from 'browser-image-compression'
import heic2any from 'heic2any'
import {
  AlertCircle,
  Camera,
  KeyRound,
  MapPin,
  Save,
  Trash2,
  User,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription } from './ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'

export type UserProfile = {
  id: string
  email?: string
  name?: string | null
  avatar?: string | null
  address?: string | null
  detail_address?: string | null
  zip_code?: string | null
} & AuthUser

export default function ProfileEditForm({ user }: { user: UserProfile }) {
  const initData = {
    name: user.name || '',
    avatar: user.avatar || '',
    email: user.email || '',
    address: user.address || '',
    detailAddress: user.detail_address || '',
    zipCode: user.zip_code || '',
  }

  const [formData, setFormData] = useState<ProfileEditState>(initData)
  // 이미지 확장자 에러표시용도
  const [formatError, setFormatError] = useState<string | null>(null)

  // 에러발생시 focus 하는용도
  const avatarRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const zipCodeRef = useRef<HTMLInputElement>(null)

  const t = useTranslations('mypage.profile_edit.form')

  const [state, formAction, isFending] = useActionState(
    profileEditAction,
    formData,
  )

  // 수정된 항목이 있는지 확인 (없는경우 저장버튼 비활성화)
  const isFormChanged = (
    initial: Record<string, unknown>,
    current: Record<string, unknown>,
  ) => {
    return Object.keys(initial).some(key => initial[key] !== current[key])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChangeAsync(e).catch(console.error)
  }

  const handleFileChangeAsync = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFormatError(null)
    let convertedFile = file

    if (!file.name.includes('.')) {
      setFormatError('extension_not_found')
      return
    }
    const extension = file.name.split('.').pop()?.toLowerCase()
    logger.info('extension -- ', extension)
    const isHeifOrHeic =
      ['image/heic', 'image/heif'].includes(file.type) ||
      extension === 'heic' ||
      extension === 'heif'

    logger.info('file.type -- ', file.type)
    logger.info('isHeifOrHeic -- ', isHeifOrHeic)
    // HEIF 혹은 HEIC → JPEG 변환
    if (isHeifOrHeic) {
      try {
        const blob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        })
        logger.info('heic2any 변환 성공', blob)
        convertedFile = new File(
          [blob as BlobPart],
          file.name.replace(/\.[^/.]+$/i, '.jpg'),
          {
            type: 'image/jpeg',
          },
        )
        logger.info('convertedFile 내용 --', convertedFile)
      } catch (error) {
        logger.error('HEIC 변환 실패:', error)
        setFormatError('upload_error')
        return
      }
    }

    try {
      // 리사이징 옵션 설정
      const options = {
        maxWidthOrHeight: 1024,
        maxSizeMB: 2, // 업로드 제한
      }

      // 이미지 리사이징 및 압축
      const compressedFile = await imageCompression(convertedFile, options)
      logger.info(
        'compressedFile size:',
        compressedFile.size / 1024 / 1024,
        'MB',
      )

      // 새 이미지 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(compressedFile)

      setFormData(prev => ({
        ...prev,
        avatar: objectUrl,
      }))
    } catch (error) {
      logger.error('이미지 리사이징 중 에러', error)
    }
  }

  useEffect(() => {
    if (!state.errors) return

    if (state.errors.avatar && avatarRef.current) {
      avatarRef.current.focus()
    } else if (state.errors.name && nameRef.current) {
      nameRef.current.focus()
    } else if (state.errors.password && passwordRef.current) {
      passwordRef.current.focus()
    } else if (state.errors.confirmPassword && confirmPasswordRef.current) {
      confirmPasswordRef.current.focus()
    } else if (state.errors.zipCode && zipCodeRef.current) {
      zipCodeRef.current.focus()
    }
  }, [state.errors])

  return (
    <>
      {/* 알림 메시지 */}
      {state.errors && Object.keys(state.errors).length > 0 && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {t('error.alert')}
          </AlertDescription>
        </Alert>
      )}
      <form className="space-y-6">
        {/* 프로필 사진 */}
        <Card
          className={
            state.errors?.avatar || formatError ? 'border-red-500' : ''
          }>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              {t('avatar.title')}
            </CardTitle>
            <CardDescription>{t('avatar.description')}</CardDescription>
            {/* 서버에서 오는 에러메시지 */}
            {state.errors?.avatar && (
              <p className="text-sm text-red-500">
                {t(`error.${state.errors.avatar}`)}
              </p>
            )}
            {/* 클라이언트에서 오는 에러메시지 */}
            {formatError && (
              <p className="text-sm text-red-500">
                {t(`error.${formatError}`)}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.avatar || ''} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {state.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <input
                  ref={avatarRef}
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="bg-transparent">
                  <label htmlFor="avatar" className="cursor-pointer">
                    <Camera className="w-4 h-4 mr-2" />
                    {t('avatar.change')}
                  </label>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('avatar.note', { size: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('basic.title')}
            </CardTitle>
            <CardDescription>{t('basic.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name.label')}</Label>
              <Input
                ref={nameRef}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('name.placeholder')}
                className={state.errors?.name ? 'border-red-500' : ''}
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500">
                  {t(`error.${state.errors.name}`)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email.label')}</Label>
              <Input id="email" name="email" value={state.email} readOnly />
            </div>
          </CardContent>
        </Card>

        {/* 비밀번호 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              {t('password.title')}
            </CardTitle>
            <CardDescription>{t('password.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t('password.current')}</Label>
              <Input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder={t('password.placeholder')}
                minLength={8}
                className={state.errors?.password ? 'border-red-500' : ''}
              />
              {state.errors?.password && (
                <p className="text-sm text-red-500">
                  {t(`error.${state.errors.password}`)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password.new')}</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={handleChange}
                placeholder={t('password.new_placeholder')}
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password.confirm')}</Label>
              <Input
                ref={confirmPasswordRef}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                placeholder={t('password.confirm_placeholder')}
                minLength={8}
                className={
                  state.errors?.confirmPassword ? 'border-red-500' : ''
                }
              />
              {state.errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {t(`error.${state.errors.confirmPassword}`)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 주소 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('address.title')}
            </CardTitle>
            <CardDescription>{t('address.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="zipCode">{t('zip_code.label')}</Label>
                <Input
                  ref={zipCodeRef}
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="12345"
                  className={state.errors?.zipCode ? 'border-red-500' : ''}
                />
                {state.errors?.zipCode && (
                  <p className="text-sm text-red-500">
                    {t(`error.${state.errors.zipCode}`)}
                  </p>
                )}
              </div>
              {/* <Button
                  type="button"
                  variant="outline"
                  className="mt-8 bg-transparent">
                  주소 검색
                </Button> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t('address.label')}</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t('address.placeholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailAddress">{t('detail_address.label')}</Label>
              <Input
                id="detailAddress"
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handleChange}
                placeholder={t('detail_address.placeholder')}
              />
            </div>
          </CardContent>
        </Card>

        {/* 저장 버튼 */}
        <div className="flex gap-3">
          <Button
            formAction={formAction}
            disabled={isFending || !isFormChanged(initData, formData)}
            className="flex-1 cursor-pointer">
            {isFending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {t('button.saving')}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t('button.save')}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            asChild
            className="bg-transparent">
            <Link href="/mypage">{t('button.cancel')}</Link>
          </Button>
        </div>
        <Card className="border-red-200">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t('delete.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('delete.description')}
                </p>
              </div>
              <Button variant="destructive" asChild>
                <Link href="/profile/delete">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('delete.button')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
