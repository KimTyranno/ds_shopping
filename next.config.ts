import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // yarn build시 ESLint 비활성화 (임시 회피용)
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
