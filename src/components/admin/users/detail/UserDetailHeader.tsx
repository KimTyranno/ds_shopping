'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/navigation'
import { ArrowLeft, Edit, Save, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type UserDetailHeaderProps = {
  userNo: number | null
  isEditing: boolean
  isSaveDisabled: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  handleSave: () => void
  handleCancel: () => void
}

export default function UserDetailHeader({
  userNo,
  isEditing,
  isSaveDisabled,
  setIsEditing,
  handleSave,
  handleCancel,
}: UserDetailHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => router.push('/admin/users')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로가기
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 상세정보</h1>
          <p className="text-gray-600">회원 번호: {userNo}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={handleSave}
              disabled={isSaveDisabled}>
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={e => {
              e.preventDefault()
              setIsEditing(true)
            }}>
            <Edit className="h-4 w-4 mr-2" />
            편집
          </Button>
        )}
      </div>
    </div>
  )
}
