declare module 'next-pwa' {
  import type { NextConfig } from 'next'

  interface PWAOptions {
    dest: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    runtimeCaching?: unknown[]
  }

  // eslint-disable-next-line no-unused-vars
  const withPWA: (options: PWAOptions) => (config: NextConfig) => NextConfig

  export default withPWA
}
