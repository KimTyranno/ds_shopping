import Footer from '@/components/Footer'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { locales } from '@/i18n/routing'
import { getCategories } from '@/lib/api/category'
import { getCurrentUser } from '@/lib/auth'
import ScrollToTop from '@/lib/scrollToTop'
import { createTranslator, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import type React from 'react'
import AuthProvider from './AuthProvider'
import './globals.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const messages = await getMessages({ locale })
  const t = createTranslator({ locale, messages, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),

    // iOS 대응
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('title'),
    },
  }
}

// PWA 설정
export function generateViewport() {
  return {
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#000000',
  }
}

type rootProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children, params }: rootProps) {
  const user = await getCurrentUser()
  const { locale } = await params
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const messages = await getMessages({ locale })
  const categories = await getCategories()

  return (
    // hydration warning 방지
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        {/* Apple 홈화면 아이콘 */}
        <link rel="apple-touch-icon" href="/icons/192.png" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider user={user} />
          <Toaster />
          <ScrollToTop />
          <Header categories={categories} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
