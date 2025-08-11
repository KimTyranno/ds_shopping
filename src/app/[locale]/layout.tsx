import Footer from '@/components/Footer'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { locales } from '@/lib/i18n'
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
  }
}

type rootProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children, params }: rootProps) {
  const { locale } = await params
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider />
          <Toaster />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
