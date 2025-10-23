'use client'

import {
  deleteCategoryAction,
  saveCategoryAction,
} from '@/app/[locale]/admin/categories/actions'
import {
  Category,
  CategoryWithProductsCount,
} from '@/app/[locale]/admin/categories/page'
import { usePathname } from '@/i18n/navigation'
import Toast, { ToastTypes } from '@/lib/toast'
import { useActionState, useEffect, useState } from 'react'
import CategoriesDialog from './Dialog'
import CategoriesHeader from './Header'
import CategoriesStats from './Stats'
import CategoriesTable from './Table'

type CategoriesListProps = {
  categories: CategoryWithProductsCount[]
}

export default function CategoriesPage({ categories }: CategoriesListProps) {
  const pathname = usePathname()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [state, formAction] = useActionState(saveCategoryAction, {
    success: false,
    errors: {
      name: '',
    },
  })
  // state.errors.name이 있을때 dialog를 닫았다 다시 열어도 남아있어서 에러를 별도 state로 관리
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{
    message: string
    type: ToastTypes
  } | null>(null)

  // const toggleExpanded = (categoryId: number) => {
  //   setExpandedCategories(prev =>
  //     prev.includes(categoryId)
  //       ? prev.filter(id => id !== categoryId)
  //       : [...prev, categoryId],
  //   )
  // }

  const handleEdit = (category: Category) => {
    // focus trap과 드롭다운 컴포넌트의 unmount 타이밍 충돌방지 (setTimeout 으로도 해결가능)
    requestAnimationFrame(() => {
      setEditingCategory(category)
      setDialogOpen(true)
    })
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setDialogOpen(true)
  }

  const handleCancel = () => {
    setDialogOpen(false)
    setError('')
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`정말 [ ${name} ] 카테고리를 삭제하시겠습니까?`)) {
      return
    }

    const formData = new FormData()
    formData.set('id', String(id))
    formData.set('currentPath', pathname)

    try {
      await deleteCategoryAction(formData)
      setToast({
        message: `${name} 카테고리가 삭제되었습니다.`,
        type: 'success',
      })
    } catch {
      setToast({
        message: '카테고리 삭제 중 오류가 발생했습니다.',
        type: 'error',
      })
    }
  }

  const categoryStats = {
    total: categories.length,
    active: categories.filter(cat => cat.status).length,
    inactive: categories.filter(cat => !cat.status).length,
  }

  useEffect(() => {
    // 서버액션에서 ...prevState 안하고 그냥 이렇게함
    if (state && 'errors' in state && state.errors?.name) {
      setError(state.errors.name)
    }

    if (state.success) {
      // 문제가 없으면 다이얼로그 닫음
      setDialogOpen(false)
      setError('')
    }
  }, [state])

  return (
    <div className="space-y-6">
      {toast?.message && <Toast message={toast.message} type={toast.type} />}
      {/* 페이지 헤더 */}
      <CategoriesHeader onAdd={handleAdd} />

      {/* 통계 카드 */}
      <CategoriesStats {...categoryStats} />

      {/* 카테고리 목록 */}
      <CategoriesTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 카테고리 추가/수정 다이얼로그 */}
      <CategoriesDialog
        {...{
          dialogOpen,
          setDialogOpen,
          editingCategory,
          pathname,
          formAction,
          error,
          onCancel: handleCancel,
        }}
      />
    </div>
  )
}
