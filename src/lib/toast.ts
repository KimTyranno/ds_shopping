'use client'

import { useEffect, useMemo } from 'react'
import { ExternalToast, toast } from 'sonner'

const toastTypeList = [
  'info',
  'success',
  'error',
  'warning',
  'loading',
  'message',
] as const

export type ToastTypes = (typeof toastTypeList)[number]

/** Toast 타입체크 */
function isToastType(type: string | null): type is ToastTypes {
  return typeof type === 'string' && toastTypeList.includes(type as ToastTypes)
}

/** Toast 타입체크후에 해당 타입으로 반환 (없으면 info반환) */
export function getToastType(
  type: string | null,
  fallback: ToastTypes = 'info',
): ToastTypes {
  return isToastType(type) ? type : fallback
}

type ToastProps = {
  message: string
  type?: ToastTypes
  callback?: () => void
} & ExternalToast

export default function Toast({
  message,
  type = 'message',
  style,
  callback,
  position = 'top-center',
  ...toastOptions
}: ToastProps) {
  const toastStyle = useMemo(
    () => ({
      info: { backgroundColor: '#2c7be5', color: '#ffffff' },
      warning: { backgroundColor: '#f08c00ff', color: '#ffffff' },
      error: { backgroundColor: '#d63333', color: '#ffffff' },
      success: { backgroundColor: '#2b8a3e', color: '#ffffff' },
      loading: { backgroundColor: '#374151', color: '#d1d5db' },
      message: { backgroundColor: '#3f3f46', color: '#e4e4e7' },
    }),
    [],
  )
  useEffect(() => {
    // 이전에 뜬 로딩 토스트 제거
    toast.dismiss() // 모든 토스트 제거
    // NOTE: 이렇게도 가능한데, 스타일을 따로 못줘서 포기
    // const show = {
    //   info: toast.info,
    //   warning: toast.warning,
    //   success: toast.success,
    //   error: toast.error,
    //   loading: toast.loading,
    //   message: toast.message,
    // }

    // show[type](message, {
    //   ...toastOptions,
    //   position,
    // })

    switch (type) {
      case 'info':
        toast.info(message, {
          position,
          style: style ? { ...toastStyle.info, ...style } : toastStyle.info,
          ...toastOptions,
        })
        break
      case 'warning':
        toast.warning(message, {
          position,
          style: style
            ? { ...toastStyle.warning, ...style }
            : toastStyle.warning,
          ...toastOptions,
        })
        break
      case 'error':
        toast.error(message, {
          position,
          style: style ? { ...toastStyle.error, ...style } : toastStyle.error,
          ...toastOptions,
        })
        break
      case 'success':
        toast.success(message, {
          position,
          style: style
            ? { ...toastStyle.success, ...style }
            : toastStyle.success,
          ...toastOptions,
        })
        break
      case 'loading':
        // 자동으로 사라지지 않으므로 다른 toast를 호출시켜서 사라지게 해야함
        toast.loading(message, {
          position,
          style: style
            ? { ...toastStyle.loading, ...style }
            : toastStyle.loading,
          ...toastOptions,
        })
        break
      default:
        toast.message(message, {
          position,
          style: style
            ? { ...toastStyle.message, ...style }
            : toastStyle.message,
          ...toastOptions,
        })
        break
    }

    callback?.()
  }, [])

  return null
}
