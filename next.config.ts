import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import withPWAInit from 'next-pwa'

const withNextIntl = createNextIntlPlugin()

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',

  // Supabase API는 캐시하지 않도록 권장
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
      handler: 'NetworkOnly',
    },
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/auth\/v1\/.*/i,
      handler: 'NetworkOnly',
    },
  ],
})

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['picsum.photos', 'jbrynriwmakxhwozvsja.supabase.co'],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

// 플러그인 합성 순서 중요
export default withPWA(withNextIntl(nextConfig))
