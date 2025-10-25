'use client'

import { AdminUserStatueChangeAction } from '@/app/[locale]/admin/users/[id]/actions'
import { UserDetailType } from '@/app/[locale]/admin/users/[id]/page'
import UserStatusBadge from '@/components/admin/users/UserStatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { usePathname } from '@/i18n/navigation'
import { USER_ROLE, USER_STATUS, USER_STATUS_TYPE } from '@/types/enums'
import { Ban, Calendar, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import UserRoleBadge from '../UserRoleBadge'

type UserDetailCardProps = {
  user: UserDetailType
  formRef: React.RefObject<HTMLFormElement | null>
  isEditing: boolean
  editedUser: UserDetailType
  setEditedUser: Dispatch<SetStateAction<UserDetailType>>
  formAction: (_payload: FormData) => void
}

export default function UserDetailCard({
  user,
  formRef,
  isEditing,
  editedUser,
  setEditedUser,
  formAction,
}: UserDetailCardProps) {
  const pathname = usePathname()
  const statusChangeFormRef = useRef<HTMLFormElement>(null)
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(user.status ?? undefined)

  // TODO: 추후에 공통으로 분리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setEditedUser(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleStatusChange = () => {
    if (statusChangeFormRef.current) {
      setStatusChangeOpen(false)
      statusChangeFormRef.current.requestSubmit()
    }
  }

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || ''} />
              <AvatarFallback className="text-lg">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="text-lg font-semibold h-8 mb-2"
                  placeholder="이름을 입력하세요"
                />
              ) : (
                <h3 className="text-lg font-semibold">{editedUser.name}</h3>
              )}
              <div className="flex items-center gap-2 mt-1">
                {/* {getGradeBadge(user.grade)} */}
                <UserStatusBadge status={user.status} />
                <UserRoleBadge role={user.userRole} />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form ref={formRef} action={formAction}>
            <input type="hidden" name="userNo" value={user.userNo} />
            <input type="hidden" name="name" value={editedUser.name || ''} />
            <div className="space-y-3">
              {/* 이메일 */}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <p className="text-sm">{editedUser.email}</p>
              </div>
              {/* 전화번호 */}
              <div className="flex items-center gap-3">
                {/* TODO: 전화번호는 추후에 추가 */}
                {/* <Label className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-gray-500" />
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedUser.phone || ''}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      placeholder="010-0000-0000"
                    />
                  ) : (
                    <p className="text-sm">{editedUser.phone}</p>
                  )} */}
                <Phone className="h-4 w-4 text-gray-500" />
                <p className="text-sm">{editedUser.phone}</p>
              </div>
              {/* 주소 */}
              <div className="flex gap-3">
                <Label className="flex items-start relative top-[3px] gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </Label>
                {isEditing ? (
                  <div className="flex flex-col space-y-2">
                    <Input
                      id="zipCode"
                      name="zipCode"
                      type="number"
                      value={editedUser.zipCode || ''}
                      onChange={handleInputChange}
                      placeholder="우편번호를 입력하세요"
                    />
                    <Input
                      id="address"
                      name="address"
                      value={editedUser.address || ''}
                      onChange={handleInputChange}
                      placeholder="주소를 입력하세요"
                    />
                    <Input
                      id="detailAddress"
                      name="detailAddress"
                      value={editedUser.detailAddress || ''}
                      onChange={handleInputChange}
                      placeholder="상세주소를 입력하세요"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm">{user.zipCode}</span>
                    <span className="text-sm">{user.address}</span>
                    <span className="text-sm">{user.detailAddress}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">가입일: {user.createdAt}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">최근 로그인: {user.lastLoginAt}</span>
              </div>
            </div>
          </form>

          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">총 주문수</span>
              <span className="font-medium">15회</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">총 구매액</span>
              <span className="font-medium">
                ₩{Number(1250000).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">평균 주문액</span>
              <span className="font-medium">
                ₩{Math.round(1250000 / 15).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            {/* 등급은 추후에 업데이트 */}
            {/* <Dialog
                  open={gradeChangeOpen}
                  onOpenChange={setGradeChangeOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent">
                      <Star className="h-4 w-4 mr-2" />
                      등급 변경
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>회원 등급 변경</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>현재 등급</Label>
                        <div className="mt-1">
                          {getGradeBadge(userDummy.grade)}
                        </div>
                      </div>
                      <div>
                        <Label>변경할 등급</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="등급 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VIP">VIP</SelectItem>
                            <SelectItem value="골드">골드</SelectItem>
                            <SelectItem value="실버">실버</SelectItem>
                            <SelectItem value="브론즈">브론즈</SelectItem>
                            <SelectItem value="일반">일반</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>변경 사유</Label>
                        <Textarea
                          className="mt-1"
                          placeholder="등급 변경 사유를 입력하세요"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">변경</Button>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setGradeChangeOpen(false)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog> */}

            {user.userRole !== USER_ROLE.ADMIN && (
              <Dialog
                open={statusChangeOpen}
                onOpenChange={setStatusChangeOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent">
                    <Ban className="h-4 w-4 mr-2" />
                    상태 변경
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form
                    ref={statusChangeFormRef}
                    action={AdminUserStatueChangeAction}
                    className="space-y-4">
                    <input type="hidden" name="currentPath" value={pathname} />
                    <input type="hidden" name="userNo" value={user.userNo} />
                    <input type="hidden" name="status" value={selectedStatus} />
                    <DialogHeader>
                      <DialogTitle>회원 상태 변경</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>현재 상태</Label>
                        <div className="mt-1">
                          <UserStatusBadge status={user.status} />
                        </div>
                      </div>
                      <div>
                        <Label>변경할 상태</Label>
                        <Select
                          value={selectedStatus}
                          onValueChange={e => {
                            setSelectedStatus(e as USER_STATUS_TYPE)
                          }}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="상태 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={USER_STATUS.ACTIVE}>
                              활성
                            </SelectItem>
                            <SelectItem value={USER_STATUS.SUSPENDED}>
                              정지
                            </SelectItem>
                            <SelectItem value={USER_STATUS.DELETED}>
                              탈퇴
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>변경 사유</Label>
                        <Textarea
                          className="mt-1"
                          placeholder="상태 변경 사유를 입력하세요"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={handleStatusChange}>
                          변경
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          className="flex-1 bg-transparent"
                          onClick={() => setStatusChangeOpen(false)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            {/* TODO: 이메일 발송은 추후에 업데이트 */}
            {/* <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  이메일 발송
                </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
