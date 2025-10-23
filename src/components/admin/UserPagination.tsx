import { UserProps } from '@/app/[locale]/admin/users/page'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'

type UserPaginationProps = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  startIndex: number
  endIndex: number
  totalPages: number
  userList: UserProps[]
}

export default function UserPagination({
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  totalPages,
  userList,
}: UserPaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-500">
        총 {userList.length}명 중 {startIndex + 1}-
        {Math.min(endIndex, userList.length)}명 표시
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          이전
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              // 현재 페이지 주변 2페이지만 표시
              return (
                Math.abs(page - currentPage) <= 2 ||
                page === 1 ||
                page === totalPages
              )
            })
            .map((page, index, array) => {
              // 생략 표시 추가
              const showEllipsis = index > 0 && page - array[index - 1] > 1
              return (
                <div key={page} className="flex items-center gap-1">
                  {showEllipsis && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <Button
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0">
                    {page}
                  </Button>
                </div>
              )
            })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}>
          다음
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
