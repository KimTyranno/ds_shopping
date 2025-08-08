import Footer from '@/components/Footer'
import Header from '@/components/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import AuthProvider from './AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '심플 쇼핑몰 - 최고의 상품을 만나보세요',
  description: '다양한 카테고리의 상품을 합리적인 가격에 만나보세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
