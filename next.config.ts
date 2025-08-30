import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  // yarn build시 ESLint 비활성화 (임시 회피용)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 외부 도메인 허용
  images: {
    // 이미지 때문에 임시로 허용
    domains: ['picsum.photos'],
  },
  experimental: {
    serverActions: {
      // 용량제한이 기본적으로 1MB이므로 제한을 2MB로 변경
      bodySizeLimit: '2mb',
    },
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
