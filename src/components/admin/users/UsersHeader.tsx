'user client'

import { Button } from '@/components/ui/button'
import { Download, Mail } from 'lucide-react'

export default function UserHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          회원 관리
        </h1>
        {/* <p className="text-gray-600 mt-1">
          회원 정보를 관리하고 등급을 조정하세요
        </p> */}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent">
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">이메일 발송</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">엑셀 다운로드</span>
        </Button>
      </div>
    </div>
  )
}
