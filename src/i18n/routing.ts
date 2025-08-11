import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'ko', 'ja'] as const
export const defaultLocale = 'ko'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
})
