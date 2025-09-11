import { clsx, type ClassValue } from 'clsx'
import { format, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { logger } from './logger'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const DateFormatPattern = {
  FULL_DATE_TIME: 'yyyy-MM-dd HH:mm:ss', // 2025-09-10 14:30:00
  DATE_ONLY: 'yyyy-MM-dd', // 2025-09-10
  TIME_ONLY: 'HH:mm:ss', // 14:30:00
  SHORT_DATE: 'yy-MM-dd', // 25-09-10
  COMPACT_DATE: 'yyyyMMdd', // 20250910
  FULL_DATE_KR: 'yyyy년 MM월 d일', // 2025년 09월 10일
  FULL_DATE_TIME_KR: 'yyyy년 MM월 dd일 HH시 mm분 ss초',
  YEAR_MONTH: 'yyyy-MM', // 2025-09
} as const

export type DatePatternKey = keyof typeof DateFormatPattern
export type DatePattern = (typeof DateFormatPattern)[DatePatternKey]

/**
 * 날짜 포맷팅
 * 기본 포맷: yyyy-MM-dd HH:mm:ss
 */
export function formatDate(
  dateString: string | Date | null,
  pattern: DatePattern = 'yyyy-MM-dd HH:mm:ss',
): string {
  if (!dateString) return '-'

  try {
    const date =
      typeof dateString === 'string' ? parseISO(dateString) : dateString
    return format(date, pattern)
  } catch (error) {
    if (error instanceof Error) {
      logger.error('잘못된 날짜', error)
    } else {
      logger.error('날짜 포맷중 예기치않은 에러', error)
    }
    return ''
  }
}
