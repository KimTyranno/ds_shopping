'use client'

import { AdminUserEditAction } from '@/app/[locale]/admin/users/[id]/actions'
import { UserDetailType } from '@/app/[locale]/admin/users/[id]/page'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useActionState, useEffect, useRef, useState } from 'react'
import UserDetailCard from './UserDetailCard'
import UserDetailHeader from './UserDetailHeader'
import UserDetailTabContent from './UserDetailTabContent'

export default function UserDetailPage({ user }: { user: UserDetailType }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  // const [gradeChangeOpen, setGradeChangeOpen] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction] = useActionState(AdminUserEditAction, {
    errors: {
      name: false,
    },
  })

  /** 수정된 항목이 있는지 확인 (없는경우 저장버튼 비활성화) */
  const isFormChanged = (
    initial: Record<string, unknown>,
    current: Record<string, unknown>,
  ) => {
    return Object.keys(initial).some(key => initial[key] !== current[key])
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            회원을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">
            요청하신 회원 정보가 존재하지 않습니다.
          </p>
          <Link href="/admin/users">
            <Button>회원 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  // TODO: 등급은 추후에 업데이트
  // const getGradeBadge = (grade: string) => {
  //   switch (grade) {
  //     case 'VIP':
  //       return (
  //         <Badge className="bg-purple-100 text-purple-800">
  //           <Crown className="h-3 w-3 mr-1" />
  //           VIP
  //         </Badge>
  //       )
  //     case '골드':
  //       return (
  //         <Badge className="bg-yellow-100 text-yellow-800">
  //           <Star className="h-3 w-3 mr-1" />
  //           골드
  //         </Badge>
  //       )
  //     case '실버':
  //       return <Badge className="bg-gray-100 text-gray-800">실버</Badge>
  //     case '브론즈':
  //       return <Badge className="bg-orange-100 text-orange-800">브론즈</Badge>
  //     default:
  //       return <Badge variant="outline">{grade}</Badge>
  //   }
  // }

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  const handleCancel = () => {
    if (isFormChanged(user, editedUser)) {
      if (window.confirm('수정한 모든 내용을 되돌릴까요?')) {
        setEditedUser(user)
      }
    }
    setIsEditing(false)
  }

  useEffect(() => {
    if (state && !state.errors?.name) {
      setIsEditing(false)
    }
  }, [state])

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <UserDetailHeader
        {...{
          userNo: user.userNo,
          isSaveDisabled: !isFormChanged(user, editedUser),
          isEditing,
          setIsEditing,
          handleSave,
          handleCancel,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 기본 정보 */}
        <UserDetailCard
          {...{
            user,
            editedUser,
            formRef,
            isEditing,
            formAction,
            setEditedUser,
          }}
        />

        {/* 상세 정보 탭 */}
        {/* TODO: 주문관리 작업 끝나고 작업해야함 */}
        <UserDetailTabContent />
      </div>
    </div>
  )
}
