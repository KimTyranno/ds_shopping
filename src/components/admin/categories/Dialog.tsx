'use client'

import { Category } from '@/app/[locale]/admin/categories/page'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Dispatch, SetStateAction } from 'react'

type CategoriesDialogProps = {
  dialogOpen: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  editingCategory: Category | null
  pathname: string
  formAction: (_payload: FormData) => void
  error?: string
  onCancel: () => void
}

export default function CategoriesDialog({
  dialogOpen,
  setDialogOpen,
  editingCategory,
  pathname,
  formAction,
  error,
  onCancel,
}: CategoriesDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-md">
        <form action={formAction}>
          <input type="hidden" name="id" value={editingCategory?.id || ''} />
          <input type="hidden" name="currentPath" value={pathname} />
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? '카테고리 수정' : '카테고리 추가'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">카테고리명 *</Label>
              <Input
                id="name"
                name="name"
                placeholder="카테고리명을 입력하세요"
                defaultValue={editingCategory?.name || ''}
                className={error ? 'border-red-500' : ''}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* <div className="space-y-2">
              <Label htmlFor="categorySlug">슬러그 *</Label>
              <Input
                id="categorySlug"
                placeholder="category-slug"
                defaultValue={editingCategory?.slug || ''}
              />
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="카테고리에 대한 설명을 입력하세요"
                defaultValue={editingCategory?.description || ''}
                rows={3}
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="parentCategory">상위 카테고리</Label>
              <select
                id="parentCategory"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={editingCategory?.parentId || ''}>
                <option value="">최상위 카테고리</option>
                {categoriesData
                  .filter(cat => cat.level === 0)
                  .map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div> */}

            <div className="flex items-center justify-between">
              <Label htmlFor="status">활성 상태</Label>
              <Switch
                id="status"
                name="status"
                defaultChecked={editingCategory?.status || !editingCategory}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                취소
              </Button>
              <Button type="submit">{editingCategory ? '수정' : '추가'}</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
