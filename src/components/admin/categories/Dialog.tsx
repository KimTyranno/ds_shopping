'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { Categories } from '@/types/tables'
import { Dispatch, SetStateAction } from 'react'

type CategoriesDialogProps = {
  dialogOpen: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  editingCategory: Categories | null
  pathname: string
  formAction: (_payload: FormData) => void
  error?: {
    slug?: string | undefined
    name?: string | undefined
  } | null
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
      <DialogContent
        className="max-w-md"
        // Description 경고 나오길래 그냥 추가
        aria-label={editingCategory ? '카테고리 수정' : '카테고리 추가'}
        aria-describedby={undefined}>
        <form action={formAction}>
          <input type="hidden" name="id" value={editingCategory?.id || ''} />
          <input type="hidden" name="currentPath" value={pathname} />
          {/* NOTE: useState방식으로 하려면 useEffect도 사용해서 state업데이트 해주면됨 */}
          <input
            type="hidden"
            name="name_en"
            value={editingCategory?.name_en || ''}
          />
          <input
            type="hidden"
            name="description_en"
            value={editingCategory?.description_en || ''}
          />
          <input
            type="hidden"
            name="name_ja"
            value={editingCategory?.name_ja || ''}
          />
          <input
            type="hidden"
            name="description_ja"
            value={editingCategory?.description_ja || ''}
          />
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? '카테고리 수정' : '카테고리 추가'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="slug">슬러그 *</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="URL에 표시할 내용"
                defaultValue={editingCategory?.slug || ''}
                className={error?.slug ? 'border-red-500' : ''}
              />
            </div>
            {error?.slug && (
              <p className="text-sm text-red-500">{error.slug}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="name_ko">카테고리명(한국어) *</Label>
              <Input
                id="name_ko"
                name="name_ko"
                placeholder="카테고리명을 입력하세요"
                defaultValue={editingCategory?.name_ko || ''}
                className={error?.name ? 'border-red-500' : ''}
              />
            </div>
            {error?.name && (
              <p className="text-sm text-red-500">{error.name}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="description_ko">설명(한국어)</Label>
              <Textarea
                id="description_ko"
                name="description_ko"
                placeholder="카테고리에 대한 설명을 입력하세요"
                defaultValue={editingCategory?.description_ko || ''}
                rows={3}
              />
            </div>

            <Accordion type="multiple" className="space-y-2">
              <AccordionItem value="en">
                <AccordionTrigger className="hover:no-underline">
                  영어
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <Label htmlFor="name_en">카테고리명(영어)</Label>
                  <Input
                    id="name_en"
                    placeholder="카테고리명을 입력하세요(영어 표시)"
                    defaultValue={editingCategory?.name_en || ''}
                    onChange={e => {
                      const hiddenInput =
                        document.querySelector<HTMLInputElement>(
                          'input[name="name_en"]',
                        )
                      if (hiddenInput) hiddenInput.value = e.target.value
                    }}
                    className={error ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="description_en">설명(영어)</Label>
                  <Textarea
                    id="description_en"
                    placeholder="카테고리에 대한 설명을 입력하세요(영어 표시)"
                    defaultValue={editingCategory?.description_en || ''}
                    onChange={e => {
                      const hiddenInput =
                        document.querySelector<HTMLInputElement>(
                          'input[name="description_en"]',
                        )
                      if (hiddenInput) hiddenInput.value = e.target.value
                    }}
                    rows={3}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ja">
                <AccordionTrigger className="hover:no-underline">
                  일본어
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <Label htmlFor="name_ja">카테고리명(일본어)</Label>
                  <Input
                    id="name_ja"
                    placeholder="카테고리명을 입력하세요(일본어 표시)"
                    defaultValue={editingCategory?.name_ja || ''}
                    onChange={e => {
                      const hiddenInput =
                        document.querySelector<HTMLInputElement>(
                          'input[name="name_ja"]',
                        )
                      if (hiddenInput) hiddenInput.value = e.target.value
                    }}
                    className={error ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="description_ja">설명(일본어)</Label>
                  <Textarea
                    id="description_ja"
                    placeholder="카테고리에 대한 설명을 입력하세요(일본어 표시)"
                    defaultValue={editingCategory?.description_ja || ''}
                    onChange={e => {
                      const hiddenInput =
                        document.querySelector<HTMLInputElement>(
                          'input[name="description_ja"]',
                        )
                      if (hiddenInput) hiddenInput.value = e.target.value
                    }}
                    rows={3}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
