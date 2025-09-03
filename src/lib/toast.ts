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
      info: { backgroundColor: '#1e3a8a', color: '#93c5fd' },
      warning: { backgroundColor: '#78350f', color: '#facc15' },
      error: { backgroundColor: '#7f1d1d', color: '#fca5a5' },
      success: { backgroundColor: '#14532d', color: '#86efac' },
      loading: { backgroundColor: '#374151', color: '#d1d5db' },
      message: { backgroundColor: '#334155', color: '#e5e7eb' },
    }),
    [],
  )
  useEffect(() => {
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
