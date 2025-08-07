'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl">오류가 발생했습니다</CardTitle>
            <CardDescription>
              {searchParams.message || '알 수 없는 오류가 발생했습니다.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">로그인 페이지로 돌아가기</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent">
                <Link href="/">홈으로 가기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
