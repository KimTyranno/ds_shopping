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
  /* config options here */
  // yarn build시 ESLint 비활성화 (임시 회피용)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 외부 도메인 허용
  images: {
    // 이미지 때문에 임시로 허용
    domains: ['picsum.photos', 'jbrynriwmakxhwozvsja.supabase.co'],
  },
  experimental: {
    serverActions: {
      // 용량제한이 기본적으로 1MB이므로 제한을 2MB로 변경
      bodySizeLimit: '2mb',
    },
  },
}

// 플러그인 합성 순서 중요
export default withPWA(withNextIntl(nextConfig))
