import { routing } from '@/i18n/routing'
import { updateSession } from '@/lib/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware(routing)

export function middleware(request: NextRequest) {
  // next-intl 미들웨어를 먼저 적용
  const intlResponse = intlMiddleware(request)

  // locale 처리 결과를 기반으로 Supabase 세션 처리
  return updateSession(request, intlResponse)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
