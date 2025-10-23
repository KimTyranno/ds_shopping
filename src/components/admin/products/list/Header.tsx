'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Download, Plus, Upload } from 'lucide-react'

export default function ProductListHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          상품 관리
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent">
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">일괄 업로드</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">엑셀 다운로드</span>
        </Button>
        <Link href="/admin/products/add">
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">상품 등록</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
